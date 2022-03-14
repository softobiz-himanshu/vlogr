import { ItemType } from "@/constants/itemTypes";
import { ClipItem } from "@/interfaces/ClipItem";
import { Item } from "@/interfaces/Item";
import { setGuideLeft, showGuide } from "@/store/slices/timeline/actions";
import { displaceClips, magneticEffect, playHeadMagnetic, removeTargetArea, setIsToLeft, showItemTargetArea } from "@/utils/timelineHelper";
import React from "react";

/**
 * DragItem hook properties
 */
interface DragItemProps {
    /**
     * Dragged item
     */
    item: Item;
    /**
     * Timeline Item List
     */
    items: Item[];
    /**
     * Timeline clip list
     */
    clips: ClipItem[];

    /**
     * Dragged item reference from DND-Provider
     */
    selectedItem: Item | ClipItem;

    /**
     * DeltaX (diference between starting point and current point)
     */
    x: number;

    /**
     * DeltaY (diference between starting point and current point)
     */
    y: number;

    /**
     * Timescale zoom value
     */
    zoom: number;

    /**
     * Callback function required for the magnetic effec
     */
    setPosition?: (x: number, y: number, diference: number, stuckSide: 'head' | 'tail') => void;

    /**
     * Redux dispatcher
     */
    dispatch: any;

    /**
     * whether magnetic guide should be displayed
     */
    showGuide: boolean;

    /**
     * Timeline height
     */
    wrapperHeight: number;

    /**
     * X and Y positions for magnetic effect 
     */
    position: number,

    /**
     * Mousse clientX
     */
    clientX: number
}

/**
 * Hook that handles the item dragging process
 * @param props DragItemPropsr
 */
export const useDragItem = (props: DragItemProps) => {
    const { clips, item, items, selectedItem, x, y, zoom, setPosition, dispatch, showGuide: show, wrapperHeight, position, clientX } = props;

    /**
     * Show magnetic guide
     * @returns 
     */
    const displayGuide = () => dispatch(showGuide({ visible: true }));

    /**
     * Hide magnetic guide
     * @returns 
     */
    const hideGuide = () => {
        if (show) {
            dispatch(showGuide({ visible: false }))
        }
    };
    const setGuideX = (left: number) => dispatch(setGuideLeft({ left }))

    React.useEffect(() => {

        if (!selectedItem) return;

        if (selectedItem.id !== item.id) return;

        if ((selectedItem.type === ItemType.element || selectedItem.type === ItemType.video)) {
            displaceClips({ clips, item, x, y, items, zoom });
        };

        setIsToLeft(x)

        if (y < item.y) {
            showItemTargetArea({
                item,
                items,
                x,
                y,
                zoom,
                wrapperHeight
            })
            magneticEffect({
                item,
                items,
                x,
                zoom,
                setPosition,
                y,
                showGuide: displayGuide,
                hideGuide,
                setGuideLeft: setGuideX,
                clips,
                clientX
            });
        } else {
            removeTargetArea();
            hideGuide()
        }

    }, [item, selectedItem, x, y, position])
}