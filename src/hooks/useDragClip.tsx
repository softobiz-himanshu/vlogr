import { ItemType } from "@/constants/itemTypes";
import { ClipItem } from "@/interfaces/ClipItem";
import { Item } from "@/interfaces/Item";
import { setGuideLeft, showGuide } from "@/store/slices/timeline/actions";
import { clipsBackup, displaceBoundingClips, getChildrenItems, getCurrentY, getZoom, itemsBackup, magneticEffect, removeTargetArea, restartClipsAndItemPositions, setIsToLeft, showTargetArea } from "@/utils/timelineHelper";
import React from "react";

type UseDragClipProps = {
    isClip: boolean,
    selectedClip: ClipItem | null,
    deltaPosition: { x: number, y: number },
    currentClipId: string | number,
    items: Item[],
    wrapperHeight: number,
    clips: ClipItem[],
    allowDisplacement: boolean,
    scaleFactor: number,
    dispatch: any,
    showGuide: boolean,
    setPosition: (x: number, y: number, diference: number, stuckSide: 'head' | 'tail') => void;
    positionDiference: number;
    positionX: number,
    clientX: number
}

export const useDragClip = (props: UseDragClipProps) => {

    const {
        isClip,
        selectedClip,
        deltaPosition,
        currentClipId,
        items,
        clips,
        wrapperHeight,
        allowDisplacement,
        scaleFactor,
        dispatch,
        showGuide: show,
        setPosition,
        positionDiference,
        positionX,
        clientX
    } = props;
    const { x, y } = deltaPosition;

    const displayGuide = () => dispatch(showGuide({ visible: true }));
    const hideGuide = () => {
        if (show) {
            dispatch(showGuide({ visible: false }))
        }
    };
    const setGuideX = (left: number) => dispatch(setGuideLeft({ left }))

    const zoom = getZoom(scaleFactor);

    const moveChildItemsDOMRef = (items: Item[], deltaY: number, deltaX: number, zoom: number) => {
        items.map(item => {
            const itemId = item.type !== ItemType.video ? item.id : `video-${item.id}`
            const itemRef = document.getElementById(itemId) as HTMLElement;

            const itemY = item.y - deltaY
            // const itemX = item.x + deltaX;
            const itemXWithZoom = (item.x * zoom) + deltaX;

            itemRef.style.transition = "0s"
            itemRef.style.top = `${getCurrentY(itemY, wrapperHeight)}px`;
            itemRef.style.left = `${itemXWithZoom}px`

        })
    }

    const moveBoundingClips = (clips: ClipItem[], items: Item[], zoom: number) => {
        displaceBoundingClips(clips, items, selectedClip, x, zoom);
    }

    React.useEffect(() => {

        if (!isClip || !selectedClip || !allowDisplacement) return;

        if (selectedClip.id !== currentClipId) return;

        const childItemsIds: Item[] = getChildrenItems(selectedClip.id, items) || [];
        moveChildItemsDOMRef(childItemsIds, y, x, zoom);

        if (y >= -64) {
            removeTargetArea();
            restartClipsAndItemPositions(clips, items, selectedClip, zoom);
            moveBoundingClips(clips, items, zoom);
            hideGuide();
        } else {

            setIsToLeft(x)

            if (clips.length > 1) {
                showTargetArea({
                    clip: selectedClip,
                    clips,
                    x: deltaPosition.x,
                    items,
                    wrapperHeight,
                    zoom,
                    y,
                });

                magneticEffect({
                    item: selectedClip,
                    x,
                    zoom,
                    setPosition,
                    y,
                    showGuide: displayGuide,
                    hideGuide,
                    setGuideLeft: setGuideX,
                    items: itemsBackup,
                    clips: clipsBackup,
                    clientX
                });
            };
        }


    }, [isClip, selectedClip, deltaPosition.x, deltaPosition.y, allowDisplacement, positionDiference, positionX]);
}