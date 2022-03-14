import { fabric } from "fabric";
import { parseGIF, decompressFrames } from "gifuct-js";

/**
 * gifToSprite "async"
 * @param {string|input File} gif can be a URL, dataURL or an "input File"
 * @param {number} maxWidth Optional, scale to maximum width
 * @param {number} maxHeight Optional, scale to maximum height
 * @param {number} maxDuration Optional, in milliseconds reduce the gif frames to a maximum duration, ex: 2000 for 2 seconds
 * @returns {*} {error} object if any or a sprite sheet of the converted gif as dataURL
 */
export const gifToSprite = async (gif, maxWidth, maxHeight, maxDuration) => {
    let arrayBuffer;
    let error;
    let frames;

    // if the gif is an input file, get the arrayBuffer with FileReader
    if (gif.type) {
        const reader = new FileReader();
        try {
            arrayBuffer = await new Promise((resolve, reject) => {
                reader.onload = () => resolve(reader.result);
                reader.onerror = () => reject(reader.error);
                reader.readAsArrayBuffer(gif);
            });
        } catch (err) {
            error = err;
        }
    }
    // else the gif is a URL or a dataUrl, fetch the arrayBuffer
    else {
        try {
            arrayBuffer = await fetch(gif).then((resp) => resp.arrayBuffer());
        } catch (err) {
            error = err;
        }
    }

    // Parse and decompress the gif arrayBuffer to frames with the "gifuct-js" library
    if (!error) frames = decompressFrames(parseGIF(arrayBuffer), true);
    if (!error && (!frames || !frames.length)) error = "No_frame_error";
    if (error) {
        console.error(error);
        return { error };
    }

    // Create the needed canvass
    const dataCanvas = document.createElement("canvas");
    const dataCtx = dataCanvas.getContext("2d");
    const frameCanvas = document.createElement("canvas");
    const frameCtx = frameCanvas.getContext("2d");
    const spriteCanvas = document.createElement("canvas");
    const spriteCtx = spriteCanvas.getContext("2d");

    // Get the frames dimensions and delay
    let [width, height, delay] = [
        frames[0].dims.width,
        frames[0].dims.height,
        frames.reduce((acc, cur) => (acc = !acc ? cur.delay : acc), null)
    ];

    const totalDuration = frames.reduce((acc, cur) => (acc = cur.delay ? acc + cur.delay : acc), 0)

    // Set the Max duration of the gif if any
    // FIXME handle delay for each frame
    const duration = frames.length * delay;
    maxDuration = maxDuration || duration;
    if (duration > maxDuration) frames.splice(Math.ceil(maxDuration / delay));

    // Set the scale ratio if any
    maxWidth = maxWidth || width;
    maxHeight = maxHeight || height;
    const scale = Math.min(maxWidth / width, maxHeight / height);
    width = width * scale;
    height = height * scale;

    //Set the frame and sprite canvass dimensions
    frameCanvas.width = width;
    frameCanvas.height = height;
    spriteCanvas.width = width * frames.length;
    spriteCanvas.height = height;

    frames.forEach((frame, i) => {
        // Get the frame imageData from the "frame.patch"
        const frameImageData = dataCtx.createImageData(
            frame.dims.width,
            frame.dims.height
        );
        frameImageData.data.set(frame.patch);
        dataCanvas.width = frame.dims.width;
        dataCanvas.height = frame.dims.height;
        dataCtx.putImageData(frameImageData, 0, 0);

        // Draw a frame from the imageData
        if (frame.disposalType === 2) frameCtx.clearRect(0, 0, width, height);
        frameCtx.drawImage(
            dataCanvas,
            frame.dims.left * scale,
            frame.dims.top * scale,
            frame.dims.width * scale,
            frame.dims.height * scale
        );

        // Add the frame to the sprite sheet
        spriteCtx.drawImage(frameCanvas, width * i, 0);
    });

    // Get the sprite sheet dataUrl
    const dataUrl = spriteCanvas.toDataURL();

    // Clean the dom, dispose of the unused canvass
    dataCanvas.remove();
    frameCanvas.remove();
    spriteCanvas.remove();

    return {
        dataUrl,
        frameWidth: width,
        framesLength: frames.length,
        delay,
        totalDuration
    };
};



const [PLAY, PAUSE, STOP] = [0, 1, 2];

/**
 * fabricGif "async"
 * Mainly a wrapper for gifToSprite
 * @param {string|File} gif can be a URL, dataURL or an "input File"
 * @param {number} maxWidth Optional, scale to maximum width
 * @param {number} maxHeight Optional, scale to maximum height
 * @param {number} maxDuration Optional, in milliseconds reduce the gif frames to a maximum duration, ex: 2000 for 2 seconds
 * @param {object} options Optional, fabric.Image options 
 * @returns {*} {error} object if any or a 'fabric.image' instance of the gif with new 'play', 'pause', 'stop' methods
 */
export const fabricGif = async (gif, options?, maxWidth?, maxHeight?, maxDuration?) => {
    const { error, dataUrl, delay, frameWidth, framesLength, totalDuration } = await gifToSprite(
        gif,
        maxWidth,
        maxHeight,
        maxDuration
    );

    if (error) return { error };

    return new Promise((resolve) => {
        fabric.Image.fromURL(dataUrl, (img) => {
            const sprite = img.getElement();
            // let framesIndex = 0;
            let start = performance.now();
            let status;

            img.width = frameWidth;
            //@ts-ignore
            img.height = sprite.naturalHeight;
            //@ts-ignore
            img.mode = "image";
            img.top = 200;
            img.left = 200;

            img._render = function (ctx) {
                this.framesIndex = this.framesIndex ? this.framesIndex : 1;
                // if (status === PAUSE || (status === STOP && framesIndex === 0)) return;
                const now = performance.now();
                const delta = now - start;
                if (delta > delay) {
                    start = now;
                    if (status === PLAY) {
                        // framesIndex++;
                    }
                }
                if (this.framesIndex === framesLength || status === STOP) this.framesIndex = 0;
                ctx.drawImage(
                    sprite,
                    frameWidth * this.framesIndex,
                    0,
                    frameWidth,
                    sprite.height,
                    -this.width / 2,
                    -this.height / 2,
                    frameWidth,
                    sprite.height
                );
            };
            //@ts-ignore
            img.play = function (framesIndex?) {
                status = PLAY;
                this.dirty = true;
                this.framesIndex = framesIndex
            };
            //@ts-ignore
            img.pause = function () {
                status = PAUSE;
                this.dirty = false;
            };
            //@ts-ignore
            img.stop = function () {
                status = STOP;
                this.dirty = false;
            };
            //@ts-ignore
            img.getStatus = () => ["Playing", "Paused", "Stopped"][status];

            //@ts-ignore
            img.play();
            resolve(img);
        }, { ...options, totalDuration, framesLength });
    });
};
