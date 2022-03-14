import { fabric } from 'fabric'
import Editor from '../Editor'
import { createFFmpeg, FFmpeg } from '@ffmpeg/ffmpeg'
import { v4 as uuid4 } from 'uuid'

class Videos {
  private videoElements: HTMLVideoElement[]
  private VideoObjects: fabric.StaticVideo
  private ffmpeg: FFmpeg

  constructor(public editor: Editor) {
    this.videoElements = []
    this.ffmpeg = createFFmpeg({
      log: false,
    })
    this.initialize()
  }

  private initialize = async () => {
    console.log('Loading')
    await this.ffmpeg.load()
    console.log('LOADED')
  }

  public loadVideo = async (url: string) => {
    const id = uuid4()
    const sourceBuffer = await fetch(url).then(r => r.arrayBuffer())
    const filename = `"${id}.mp4"`
    this.ffmpeg.FS('writeFile', filename, new Uint8Array(sourceBuffer, 0, sourceBuffer.byteLength))
    const output = this.ffmpeg.FS('readFile', filename)
    const src = URL.createObjectURL(new Blob([output.buffer], { type: 'video/mp4' }))
    return await this.createVideoElement(id, src, url)
  }

  private createVideoElement = async (
    id: string,
    src: string,
    originalURL: string
  ): Promise<fabric.Object> => {
    return new Promise((resolve, reject) => {
      const container = document.getElementById('scenify-editor-container')
      const videoElement = document.createElement('video')
      videoElement.setAttribute('id', id)
      videoElement.setAttribute('src', src)
      videoElement.style.display = 'none'
      videoElement.style.zIndex = '1000'
      videoElement.style.position = 'absolute'
      videoElement.setAttribute('controls', 'true')
      container.appendChild(videoElement)
      console.log({ originalURL })
      const video = new fabric.StaticVideo(videoElement, {
        id: id,
        left: 50,
        top: 0,
        width: 300,
        height: 150,
        src: originalURL,
        originalURL,
        duration: videoElement.duration
      }) as unknown as fabric.Object

      videoElement.addEventListener('loadedmetadata', e => {
        const height = videoElement.videoHeight
        const width = videoElement.videoWidth
        const duration = videoElement.duration
        // @ts-ignore
        video.set({ width, height, totalDuration: duration })
        // @ts-ignorey
        video.set('time', 10)
        videoElement.currentTime = 10
        setTimeout(() => {
          resolve(video)
        }, 50)
      })
    })
  }

  public play = () => {}

  public reset = () => {
    this.videoElements.forEach(videoElement => {
      videoElement.currentTime = 1
    })
  }

  public setTime = (time: number) => {
    this.videoElements.forEach(videoElement => {
      videoElement.currentTime = time
    })
  }
}
export default Videos
