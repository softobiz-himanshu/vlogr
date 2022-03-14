import { ItemType } from "@/constants/itemTypes";
import { Item } from "@/interfaces/Item";
import React from "react";

/**
 *UsePlayGIF Hook Props
 */
interface UsePlayGIF {
    /**
     * Timeline item
     */
    item: Item;

    /**
     * Timeline item container DOM reference
     */
    itemWrapperRef: React.MutableRefObject<HTMLDivElement>

    /**
     * Timeline item DOM Reference
     */
    itemRef: React.MutableRefObject<HTMLDivElement>

    /**
     * Playhead X position
     */
    playheadPosition: number

    /**
     * Timeline scale factor
     */
    scaleFactor: number

    /**
     * Canvas Editor instance reference
     */
    editor: any
}


/**
 * Hook
 * @param props UsePlayGIF
 */
export const usePlayGIF = (props: UsePlayGIF) => {
    const { item, itemWrapperRef, itemRef, playheadPosition, scaleFactor, editor } = props;

    /**
     * Determines whether the playhead is over the GIF item and display the corresponding GIF Frame
     * @returns 
     */
    const onPlayheadPositionChanged = () => {
        if (!item || item.type !== ItemType.gif || !itemWrapperRef.current || !itemRef.current) return;

        const { x: itemX } = itemWrapperRef?.current?.getBoundingClientRect();
        const { width: itemW } = itemRef?.current?.getBoundingClientRect();

        const canvasObject = editor.objects.findOneById(item.id) as any;

        if (!canvasObject || canvasObject.type !== 'StaticGIF') return;

        if (playheadPosition >= itemX && playheadPosition <= itemX + itemW) {
            if (!canvasObject.dirty) {

                const cursorPosition = playheadPosition - itemX;
                const unit = canvasObject.totalDuration / canvasObject.framesLength;

                const frameIndex = Math.round(cursorPosition / (unit * scaleFactor));

                canvasObject.play(frameIndex);
            }
        } else {
            canvasObject.pause();
        }
    }

    React.useEffect(() => {
        onPlayheadPositionChanged();
    }, [playheadPosition])
}