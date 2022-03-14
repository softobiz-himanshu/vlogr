import React from 'react'
import { useDndProvider } from '@/contexts/DndProvider';
import { useMousseContext } from '@/contexts/MousseContext';
import { useResizeContext } from '@/contexts/ResizeProvider';
import { Item as TimelineItem } from '@/interfaces/Item'
import { getZoom, setBorder, setFontColor, setItemColor } from '@/utils/timelineHelper';
import { Box, Text } from '@chakra-ui/react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable'
import { useDispatch, useSelector } from 'react-redux';
import ResizeControl from './ResizeControl';
import ItemIcon from './ItemIcon';
import { ClipItem } from '@/interfaces/ClipItem';
import { selectItemMenuState } from '@/store/slices/item-menu/selectors';
import { openMenu } from '@/store/slices/item-menu/actions';
import { selectClips, selectLineItems, selectPlayheadPosition, selectScaleFactor, selectShowGuide, selectWrapperHeight } from '@/store/slices/timeline/selectors';
import { useDragItem } from '@/hooks/useDragItem';
import trimmingBar from '../../../../../assets/images/ArrowsOutLineHorizontal.svg'
import scissor from '../../../../../assets/images/Scissors.svg'
import { useScissorContext } from '@/contexts/ScissorProvider';
import { ItemType } from '@/constants/itemTypes';
import { useActiveObject, useEditor } from '@/sdk';
import { usePlayGIF } from '@/hooks/usePlayGIF';

interface ItemProps {
    item: TimelineItem;
    index: number;
    setItemY: (item: TimelineItem, index: number) => number
    dropItem: () => void,
    splitItem: (item: TimelineItem | ClipItem, trimmedItem: TimelineItem | ClipItem) => void
    resize: (itemId: string, width: number, x: number, right: number) => void
}

export default function Item({ item, index, setItemY, dropItem, splitItem, resize }: ItemProps) {
    const itemWrapperRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;
    const itemRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;
    const { cursor, setCursor } = useMousseContext();
    const [isItemHovered, setIsItemHovered] = React.useState(false);
    // const activeoObjectRef = React.useRef<any>();
    const activeObject = useActiveObject() as any;

    const scaleFactor = useSelector(selectScaleFactor);
    const zoom = getZoom(scaleFactor);

    const wrapperHeight = useSelector(selectWrapperHeight);

    const {
        cursorPosition,
        isHovering,
        onScissorOver,
        cropElement,
        onScissorLeave,
        itemId
    } = useScissorContext();

    const {
        onMouseMove: setResizeCursor,
        onMouseLeave: quitResizeCursor,
        onMouseDown: initResizeDrag,
        isDragging: isResizing,
        selectedItemId,
        canTrim
    } = useResizeContext();

    const dispatch = useDispatch();

    const isScissorSelected = () => cursor.includes('url(' + scissor + ')');

    const { onStart, onStop, onDrag, dragState, setPosition } = useDndProvider();
    const { isDragging, selectedItem, deltaPosition, position, clientX } = dragState;

    const items = useSelector(selectLineItems);
    const clips = useSelector(selectClips);
    const showGuide = useSelector(selectShowGuide);
    const playheadPosition = useSelector(selectPlayheadPosition);

    useDragItem({
        item,
        items,
        clips,
        selectedItem: selectedItem,
        x: deltaPosition.x,
        y: deltaPosition.y,
        zoom,
        setPosition,
        dispatch,
        showGuide,
        wrapperHeight,
        position: position.x,
        clientX
    })

    const { open: isMenuOpen, item: itemMenuElement } = useSelector(selectItemMenuState);

    const editor = useEditor();

    const canDrag = () => !isScissorSelected() && !canTrim;

    const handleDraggleMouseStart = (ev: DraggableEvent, ui: DraggableData) =>
        canDrag() ? onStart(ev, ui, item) : false;

    const handleDraggleMouseMove = (ev: DraggableEvent, ui: DraggableData) =>
        canDrag() ? onDrag(ev, ui) : ev.preventDefault();

    const handleDraggableMouseStop = (ev: DraggableEvent, ui: DraggableData) => {
        if (canDrag()) {
            quitResizeCursor(() => setCursor('default'));
            return onStop(ev, ui, dropItem);
        }
        return false;
    }

    const isScissorOver = () =>
        isScissorSelected() && itemId == item.id.toString() && isHovering;

    const itemIsBeingDragged = () => isDragging && selectedItem?.id === item?.id
    const itemIsBeingResized = () => isResizing && selectedItemId === item?.id?.toString();
    const itemIsBeingHovered = () => isItemHovered && !isDragging && !isResizing;
    const openMenuIsOpen = () => isMenuOpen && itemMenuElement?.id === item.id;
    const itemIsSelected = () => item.id === activeObject?.id

    const isResizingSplittingDraggingOrHovering = () =>
        itemIsBeingDragged() || itemIsBeingResized() || isScissorOver() || itemIsBeingHovered() || openMenuIsOpen() || itemIsSelected();

    const setDraggablePosition = () => selectedItem?.id === item.id ? position : { x: 0, y: 0 }


    const resizeItem = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        !isDragging && !isScissorSelected() && canTrim ? initResizeDrag({
            ev,
            itemId: item.id.toString(),
            callback: () => setCursor('url(' + trimmingBar + ') 10 0, move !important'),
            onStopCallback: onResizeDragStop,
            scaleFactor,
            items,
            wrapperHeight,
            clips
        }) : null



    const onResizeDragStop = (currentItemWidth: number, x: number, right: number) => {

        if (!selectedItemId) return;

        if (item.id != selectedItemId) return;

        if (!resize) return;

        if (canTrim && currentItemWidth !== item.width) {
            resize(item.id, (currentItemWidth || item.width), x, right);
        }
    }


    const onRightClick = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // if (item.type !== ItemType.audios) return;

        ev.preventDefault();
        ev.stopPropagation();

        const position = ev.clientX - itemRef.current.getBoundingClientRect().x;

        dispatch(openMenu({ item, top: item.y, left: item.x * zoom + position, clientX: ev.clientX }));
    }

    const setAsActiveObject = () => {
        editor.objects.selectById(item.id);
        if (item.type !== ItemType.audio) {
            editor.objects.selectOnCanvasById(item.id);
            // activeoObjectRef.current = editor.objects.findOneById(item.id);
        }
    }


    usePlayGIF({
        item,
        itemWrapperRef,
        itemRef,
        playheadPosition,
        scaleFactor,
        editor
    });

    return (
        <div
            style={{
                position: 'absolute',
                top: setItemY(item, index),
                left: item.x * zoom
            }}
            id={item.type !== ItemType.video ? item.id : `video-${item.id}`}
            onMouseDown={resizeItem}
            onMouseOver={() => setIsItemHovered(true)}
            onMouseOut={() => setIsItemHovered(false)}
            // onMouseUp={() => quitResizeCursor(() => setCursor('default'))}
            onClick={setAsActiveObject}
            ref={itemWrapperRef}
        >
            <Draggable
                key={item.id}
                onStart={handleDraggleMouseStart}
                onStop={handleDraggableMouseStop}
                onDrag={handleDraggleMouseMove}
                position={setDraggablePosition()}
            >
                <Box
                    sx={{
                        cursor: cursor,
                        position: "relative",
                        zIndex: (selectedItem?.id === item?.id || selectedItem?.id === item?.clipParentId) ? 100 : 1
                    }}
                    onClick={(ev) => cropElement(ev, item, splitItem)}
                    onMouseMove={ev => isScissorSelected() ? onScissorOver(ev, item.id.toString()) : !isMenuOpen ? setResizeCursor({
                        ev: ev,
                        itemId: item.id.toString(),
                        callback: () => setCursor('url(' + trimmingBar + ') 10 0, move !important'),
                        notResizeCallback: () => setCursor('default'),
                        selectedItem: item,
                    }) : null}
                    onMouseLeave={ev => isScissorSelected() ? onScissorLeave() : quitResizeCursor(() => setCursor('default'))}
                    onContextMenu={onRightClick}
                >
                    <div
                        ref={itemRef}
                        className={`item-${item.id}`}
                        style={{
                            backgroundColor: setItemColor(item.type),
                            width: item.width * zoom,
                            height: 24,
                            borderRadius: 4,
                            padding: '0',
                            boxSizing: 'border-box',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            position: 'relative'
                        }}
                    >
                        <Text
                            color={setFontColor(item.type)}
                            fontWeight="600"
                            fontSize="12px"
                            lineHeight="14px"
                            isTruncated
                            ml={18}
                            maxW={item.width - 9}
                            textTransform="capitalize"
                        >
                            <ItemIcon itemType={item.type} />
                            {item.type !== ItemType.gif ? item.type : ItemType.element}
                        </Text>


                    </div>

                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            borderRadius: "4px",
                            background: "transparent",
                            border: isResizingSplittingDraggingOrHovering() ? '2px solid #3782F7' : setBorder(item.type)
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
                            zIndex: 99
                        }}
                    />
                    <ResizeControl
                        side='left'
                        item={item}
                    />

                    <ResizeControl
                        side='right'
                        item={item}
                    />

                </Box>
            </Draggable>
        </div>
    )
}
