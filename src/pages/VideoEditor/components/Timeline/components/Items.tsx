import React from 'react'
import { Item } from '@/interfaces/Item'
import { Box, Flex } from '@chakra-ui/react'
import TimelineItem from './Item'
import { clearLastItemX, convertItemToClip, dropItem, getCurrentY, getZoom, hideClipsShapes, reasignYpositions, recalculatePositions, resizeItem, setRedPlayhead, setTransitionToZero, splitItem, updateClipChildItemPosition } from '@/utils/timelineHelper';
import { useDndProvider } from '@/contexts/DndProvider';
import { ClipItem } from '@/interfaces/ClipItem';
import { useSelector } from 'react-redux';
import { setTimelineClips, setTimelineItems, setWrapperHeight, showGuide } from '@/store/slices/timeline/actions';
import { useAppDispatch } from '@/store/store';
import { selectClips, selectScaleFactor, selectWrapperHeight } from '@/store/slices/timeline/selectors';
import { useEditor, useEditorObjects } from '@/sdk';
import GuideBar from './GuideBar';

interface ItemsProps {
    /**
     * Timeline item list
     */
    items: Item[];
}

export default function Items({ items }: ItemsProps) {

    const droppableRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;
    const { dragState, restartState } = useDndProvider();
    const { isClip, deltaPosition, selectedItem, position, positionDiference, stuckSide } = dragState;
    const dispatch = useAppDispatch()
    const clips = useSelector(selectClips);
    const editorObjects = useEditorObjects();
    const editor = useEditor();

    const wrapperHeight = useSelector(selectWrapperHeight);
    const scaleFactor = useSelector(selectScaleFactor);

    const zoom = getZoom(scaleFactor);

    /**
     * Set the top absolute position 
     * @param item timeline item
     * @returns the top absolute position relative to the timeline
     */
    const setY = (item: Item) =>
        getCurrentY(item.y, wrapperHeight)

    /**
     * Allows to drop an item 
     * @returns 
     */
    const onDrop = () => {
        if (!selectedItem || isClip) return;

        let { x, y } = deltaPosition;

        dispatch(showGuide({ visible: false }));
        setRedPlayhead();
        clearLastItemX();

        const xPlusMagnetic = stuckSide === 'tail' ? (x + positionDiference) : (x - positionDiference)

        if (y - (selectedItem as Item).y < 12) {
            let newItemsState = dropItem({
                selectedItem: selectedItem as Item,
                x: positionDiference && position.x !== 0 ? xPlusMagnetic : x,
                items,
                clips,
                wrapperHeight: droppableRef?.current?.offsetHeight || 0,
                zoom
            });

            restartState();

            dispatch(setTimelineItems({ items: [] }));
            dispatch(setTimelineItems({ items: reasignYpositions(newItemsState, zoom) }));
            setTransitionToZero(items, clips)
        } else {
            const { newClipsState, newItemsState } = convertItemToClip({
                clips,
                items,
                item: selectedItem as Item,
                x,
                editorObjects,
                wrapperHeight
            });

            editor.objects.removeById(selectedItem.id);

            dispatch(setTimelineItems({ items: [] }));
            dispatch(setTimelineItems({ items: newItemsState }));
            dispatch(setTimelineClips({ clips: [] }));
            dispatch(setTimelineClips({ clips: newClipsState }));
        }

        hideClipsShapes(clips, zoom);
    }

    /**
     * Functin used as callback to split an item
     * @param item timeline item
     * @param splittedItem trimmed item
     */
    const split = (item: Item | ClipItem, splittedItem: Item | ClipItem) => {
        if ((item as any).type !== 'clip') {
            let newItemsState = splitItem(items, item as Item, splittedItem as Item);
            newItemsState = recalculatePositions(newItemsState);
            dispatch(setTimelineItems({ items: newItemsState }));
        }
    }

    /**
     * Function used as callback to trim an item
     * @param {String} itemId timeline item id 
     * @param {Number} width timeline item width 
     * @param {Number} x absolute left position
     * @param {Number} right diference between last item width and current item width
     */
    const resize = (itemId: string, width: number, x: number, right: number) => {
        let newState = resizeItem({ items, itemId, width, x, zoom, right });
        newState = updateClipChildItemPosition(newState);
        newState = recalculatePositions(newState, true, itemId);
        dispatch(setTimelineItems({ items: [] }));
        dispatch(setTimelineItems({ items: newState }));
    }

    React.useEffect(() => {
        if (!droppableRef) return;

        const setCanvasHeight = () => {
            dispatch(setWrapperHeight({
                height: droppableRef?.current?.offsetHeight || 0
            }));
            console.log('called');
        }
        setCanvasHeight();

    }, [droppableRef])


    return (
        <Box>
            <Flex
                align="center"
                minH="240px"
                cursor="inherit"
                bgColor={"#f0f1f2"}
                position="relative"
                ref={droppableRef}
                id="itemsContainer"
            >
                {items.map((item, index) =>
                    <TimelineItem
                        key={item.id}
                        item={item}
                        index={index}
                        setItemY={setY}
                        dropItem={onDrop}
                        splitItem={split}
                        resize={resize}
                    />
                )}

                <GuideBar />
            </Flex>
        </Box>
    )
}
