import { Item } from '@/interfaces/Item';
import { setTimelineDimensions, setWrapperHeight } from '@/store/slices/timeline/actions';
import React from 'react';

type UseResizebleTimelineProps = {
    timelineWrapperRef: React.MutableRefObject<HTMLDivElement>
    wrapperHeight: number
    timelineItems: Item[];
    dispatch: any;
    isScissorSelected: () => boolean
    setCursor: React.Dispatch<React.SetStateAction<string>>,
    cursor: string;
}

export default function useResizableTimeline(props: UseResizebleTimelineProps) {

    const { dispatch, isScissorSelected, setCursor, timelineItems, timelineWrapperRef, wrapperHeight, cursor } = props;

    const [isResizeActive, setIsResizeActive] = React.useState(false);
    const [isDragging, setIsDragging] = React.useState(false);

    const onMouseDown = (ev: React.MouseEvent) => {

        if (isResizeActive) {
            const startY = ev.clientY;
            const itemsWrapperRef = document.getElementById("itemsContainer");
            const timelineHeight = timelineWrapperRef.current.offsetHeight;

            let newWrapperHeight = 0;

            const doDrag = (ev: MouseEvent) => {
                setIsDragging(true);
                const currentHeight = timelineHeight + startY - ev.clientY;

                if (currentHeight < 426 || currentHeight > 920) return;

                const diference = currentHeight - timelineHeight;

                const newItemsWrapperHegiht = wrapperHeight + (diference);
                newWrapperHeight = newItemsWrapperHegiht

                timelineWrapperRef.current.style.height = `${currentHeight}px`

                itemsWrapperRef.style.height = `${newItemsWrapperHegiht}px`;

                timelineItems.forEach(item => {
                    const itemDomRef = document.getElementById(item.id);
                    itemDomRef.style.top = `${newItemsWrapperHegiht - 24 - item.y}px`;
                    itemDomRef.style.transition = "0s";
                });

                const trackerLineRef = document.getElementById("markerLine");
                const initialTrackerHeight = wrapperHeight + 77;
                trackerLineRef.style.height = `${initialTrackerHeight + diference}px`

                setCursor('ns-resize');
            }

            const stopDrag = (ev: MouseEvent) => {
                if (!isResizeActive) return;
                setIsResizeActive(false);
                setCursor('default');
                setIsDragging(false);
                const itemsWrapperRef = document.getElementById("timelineWrapper");
                const { top, height, width } = itemsWrapperRef.getBoundingClientRect();
                dispatch(setTimelineDimensions({ top, height, width }))
                dispatch(setWrapperHeight({ height: newWrapperHeight || wrapperHeight }));
                window.removeEventListener('mousemove', doDrag, false);
                window.removeEventListener('mouseup', stopDrag, false);
            }

            window.addEventListener('mousemove', doDrag, false);
            window.addEventListener('mouseup', stopDrag, false);
        }
    }

    const onMouseMove = (ev: React.MouseEvent) => {
        if (isScissorSelected() || isDragging) return;
        if (!timelineWrapperRef) return;
        const { y } = timelineWrapperRef.current.getBoundingClientRect();
        const cursorPosition = ev.clientY - y;

        if (cursorPosition <= 15 && cursorPosition >= - 15) {
            setCursor('ns-resize');
            setIsResizeActive(true)
        } else {
            if (cursor.includes('ns-resize')) {
                setCursor('default');
                setIsResizeActive(false)
            }
        }
    }

    const onMouseLeave = () => {
        setIsResizeActive(false);
        setCursor('default');
    }

    return { isResizeActive, onMouseMove, onMouseDown, onMouseLeave }
}
