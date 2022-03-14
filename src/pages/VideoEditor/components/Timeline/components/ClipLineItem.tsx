import React from 'react'
import { useDndProvider } from '@/contexts/DndProvider';
import { useMousseContext } from '@/contexts/MousseContext';
import { useResizeContext } from '@/contexts/ResizeProvider';
import { useDragClip } from '@/hooks/useDragClip';
import { ClipItem } from '@/interfaces/ClipItem';
import { Item } from '@/interfaces/Item';
import { selectLineItems, selectScaleFactor, selectShowGuide, selectWrapperHeight } from '@/store/slices/timeline/selectors';
import { Box } from '@chakra-ui/react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { useSelector } from 'react-redux';
import image from '../../../../../assets/images/reactangule.png';
import ResizeControl from './ResizeControl'
import trimmingBar from '../../../../../assets/images/ArrowsOutLineHorizontal.svg'
import scissor from '../../../../../assets/images/Scissors.svg'
import { useAppDispatch } from '@/store/store';
import { useScissorContext } from '@/contexts/ScissorProvider';
import { getZoom } from '@/utils/timelineHelper';
import { openMenu } from '@/store/slices/item-menu/actions';
import { useEditor } from '@/sdk';

interface ClipLineItemProps {
    clip: ClipItem,
    index: number;
    splitClip: (item: Item | ClipItem, trimmedItem: Item | ClipItem) => void;
    onDrop: () => void;
    resize: (clipId: string | number, width: number, x: number, right: number, selectedItem: ClipItem) => void
    clips: ClipItem[]
}

export default function ClipLineItem({ clip, index, splitClip, onDrop, resize, clips }: ClipLineItemProps) {
    const clipRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;
    const [isItemHovered, setIsItemHovered] = React.useState(false);

    const scaleFactor = useSelector(selectScaleFactor);
    const zoom = getZoom(scaleFactor);

    const { cursor, setCursor } = useMousseContext();
    const {
        cursorPosition,
        isHovering,
        onScissorOver,
        cropElement,
        onScissorLeave,
        itemId
    } = useScissorContext();

    const {
        isResizeActive,
        onMouseMove: setResizeCursor,
        onMouseLeave: quitResizeCursor,
        onMouseDown: initResizeDrag,
        isDragging: isResizing,
        selectedItemId,
        canTrim
    } = useResizeContext();

    const { onStart, onStop, onDrag, dragState, setPosition } = useDndProvider();
    const { isDragging, selectedItem, deltaPosition, isClip, allowDisplacement, position, positionDiference, clientX } = dragState;

    const wrapperHeight = useSelector(selectWrapperHeight);
    const timelineItems = useSelector(selectLineItems);
    const showGuide = useSelector(selectShowGuide);

    const dispatch = useAppDispatch();

    const editor = useEditor();

    useDragClip({
        isClip,
        selectedClip: selectedItem as ClipItem | null,
        deltaPosition,
        currentClipId: clip.id,
        items: timelineItems,
        wrapperHeight,
        clips,
        allowDisplacement,
        scaleFactor,
        dispatch,
        showGuide,
        setPosition,
        positionDiference,
        positionX: position.x,
        clientX
    })

    const isScissorSelected = () => cursor.includes('url(' + scissor + ')');

    const isScissorOver = () =>
        isScissorSelected() && itemId == clip.id.toString() && isHovering;

    const itemIsBeingDragged = () => isDragging && selectedItem?.id === clip?.id
    const itemIsBeingResized = () => isResizing && selectedItemId === clip.id.toString();
    const itemIsBeingHovered = () => isItemHovered && !isDragging && !isResizing;

    const isResizingSplittingDraggingOrHovering = () =>
        itemIsBeingDragged() || itemIsBeingResized() || isScissorOver() || itemIsBeingHovered();

    const canDrag = () => !isScissorSelected() && !canTrim;

    const handleDraggleMouseStart = (ev: DraggableEvent, ui: DraggableData, clip: ClipItem) =>
        canDrag() ? onStart(ev, ui, clip) : false;


    const handleDraggleMouseMove = (ev: DraggableEvent, ui: DraggableData) =>
        canDrag() ? onDrag(ev, ui) : ev.preventDefault();

    const handleDraggableMouseStop = (ev: DraggableEvent, ui: DraggableData) =>
        canDrag() ? onStop(ev, ui, onDrop) : false;

    const setDraggablePosition = () => selectedItem?.id === clip.id ? position : { x: 0, y: 0 }

    const resizeItem = (ev: React.MouseEvent<HTMLDivElement>) =>
        !isDragging && !isScissorSelected() ? initResizeDrag({
            ev,
            itemId: clip.id.toString(),
            callback: () => setCursor('url(' + trimmingBar + ') 10 0, move !important'),
            onStopCallback: onResizeDragStop,
            items: timelineItems,
            clips,
            scaleFactor
        }) : null

    const onResizeDragStop = (currentClipWidth: number, x: number, right: number, selectedClip: ClipItem) => {

        if (!selectedItemId) return;

        if (clip.id != selectedItemId) return;

        if (!resize) return;

        if (isResizeActive && currentClipWidth !== clip.width) {
            resize(clip.id, (currentClipWidth || clip.width), x, right, selectedClip);
        }
    }

    const onRightClick = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // if (item.type !== ItemType.audios) return;

        ev.preventDefault();
        ev.stopPropagation();

        const position = ev.clientX - clipRef.current.getBoundingClientRect().x;

        dispatch(openMenu({ item: clip, top: 0, left: clip.x * zoom + position, clientX: ev.clientX }));
    }

    const setAsActiveObject = () => {
        editor.objects.selectById(clip.id);
        editor.objects.selectOnCanvasById(clip.id);
    }

    return (
        <>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: clip.x * zoom,
                }}
                id={clip.id}
                onMouseDown={resizeItem}
                ref={clipRef}
                onMouseOver={() => setIsItemHovered(true)}
                onMouseOut={() => setIsItemHovered(false)}
                onClick={setAsActiveObject}
            >
                <Draggable
                    onStart={(ev, ui) => handleDraggleMouseStart(ev, ui, clip)}
                    onStop={handleDraggableMouseStop}
                    onDrag={handleDraggleMouseMove}
                    position={setDraggablePosition()}
                >

                    <Box
                        position="relative"
                        sx={{ cursor, zIndex: (selectedItem?.id === clip?.id) ? 100 : 1 }}
                        onClick={(ev) => cropElement(ev, clip, splitClip)}

                        onMouseMove={ev =>
                            isScissorSelected() ? onScissorOver(ev, clip.id.toString()) : setResizeCursor({
                                ev: ev,
                                itemId: clip.id.toString(),
                                callback: () => setCursor('url(' + trimmingBar + ') 10 0, move !important'),
                                notResizeCallback: () => setCursor('default'),
                                selectedItem: clip,
                            })
                        }
                        onMouseLeave={ev => isScissorSelected() ? onScissorLeave() : quitResizeCursor(() => setCursor('default'))}
                        onContextMenu={onRightClick}
                    >
                        <div
                            className={`item-${clip.id}`}
                            style={{
                                borderRadius: '10px',
                                height: "54px",
                                overflow: "hidden",
                                backgroundImage: `url(${clip.src || image})`,
                                backgroundSize: clip.width / zoom > 56 ? "contain" : "cover",
                                backgroundRepeat: "repeat",
                                width: (clip.width * zoom) || 2
                            }}
                        />

                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                borderRadius: "10px",
                                background: "transparent",
                                border: isResizingSplittingDraggingOrHovering() ? "2px solid #3782f7" : "none"
                            }}
                        />

                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: cursorPosition,
                                height: "100%",
                                width: 1,
                                borderRight: "2px dashed #3782f7",
                                display: isScissorOver() ? 'block' : 'none',
                            }}
                        />

                        <ResizeControl
                            side='left'
                            item={clip}
                        />

                        <ResizeControl
                            side='right'
                            item={clip}
                        />
                    </Box>
                </Draggable>
            </div>

            <div
                id={`outlineClip-${clip.id}`}
                style={{
                    position: "absolute",
                    top: 0,
                    left: clip.x,
                    display: 'none',
                    width: clipRef?.current?.offsetWidth,
                    height: clipRef?.current?.offsetHeight,
                    borderRadius: "10px",
                    border: "1px solid #3782f7"
                }}
            />
        </>
    )
}
