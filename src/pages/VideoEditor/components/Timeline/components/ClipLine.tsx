import React from 'react'
import { useDndProvider } from '@/contexts/DndProvider'
import { ClipItem } from '@/interfaces/ClipItem'
import { Item } from '@/interfaces/Item'
import { setTimelineClips, setTimelineItems, showGuide } from '@/store/slices/timeline/actions'
import { selectLineItems, selectScaleFactor, selectWrapperHeight } from '@/store/slices/timeline/selectors'
import { useAppDispatch } from '@/store/store'
import { clearLastItemX, dropClip, getZoom, reasignParent, reasignPosition, resizeClip, setRedPlayhead, splitClip, updateClipChildItemPosition, updateSideClipsPosition } from '@/utils/timelineHelper'
import { Box, Flex } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import ClipLineItem from './ClipLineItem'
import { initialScaleFactor } from '@/constants/contants'

interface ClipLineProps {
    /**
     * Timeline clips
     */
    clipList: ClipItem[];
}

export default function ClipLine({ clipList }: ClipLineProps) {

    const { dragState, restartState } = useDndProvider();

    const { selectedItem, deltaPosition, isClip, position, positionDiference } = dragState;

    const items = useSelector(selectLineItems);
    const wrapperHeight = useSelector(selectWrapperHeight);
    const dispatch = useAppDispatch();

    const scaleFactor = useSelector(selectScaleFactor);
    const zoom = getZoom(scaleFactor);

    /**
     * Function used as  callbackt to split an item
     * @param item timeline clip
     * @param splittedClip clip that has been splitted
     * @returns
     */
    const split = (item: Item | ClipItem, splittedClip: Item | ClipItem) => {
        if ((item as ClipItem).type === 'clip') {
            let newClipState = splitClip(clipList, item as ClipItem, splittedClip as ClipItem)

            const newItemsState = reasignParent(splittedClip as ClipItem, items);

            dispatch(setTimelineItems({ items: [] }));
            dispatch(setTimelineItems({ items: newItemsState }));
            dispatch(setTimelineClips({ clips: newClipState }));
        }
    }

    /**
     * Function used as a callback that allows to drop the clip
     * @returns 
     */
    const onDrop = () => {
        if (!selectedItem || !isClip) return;

        let { x, y } = deltaPosition;

        x = positionDiference && position.x !== 0 ? (Math.abs(x) + positionDiference) * Math.sign(x) : x

        let newPosition = x + (selectedItem?.x * zoom || 0);

        newPosition = newPosition < 0 ? 0 : newPosition;

        dispatch(showGuide({ visible: false }));
        setRedPlayhead();
        clearLastItemX();

        const { newClipsState, newItemsState } = dropClip({
            selectedItem: selectedItem as ClipItem,
            newPosition,
            clipList,
            items,
            deltaY: y,
            clips: clipList,
            wrapperHeight,
            zoom
        });

        restartState();

        dispatch(setTimelineClips({ clips: [] }));
        dispatch(setTimelineItems({ items: [] }));
        dispatch(setTimelineClips({ clips: newClipsState }));
        dispatch(setTimelineItems({ items: newItemsState || [] }));
    }

    /**
     * Allows to trim an item
     * @param {String} clipId timelline clip id
     * @param {String} width clip width 
     * @param {String} x absolute left position 
     * @param {String} right the diference between the last width and the current width
     * @param selectedItem Timeline clip reference
     */
    const resize = (clipId: string | number, width: number, x: number, right: number ,selectedItem: ClipItem) => {
        let newClipList = resizeClip({ clips: clipList, clipId, width, x, zoom, right });
        const { newClipsState: clipsState, newItemsState: itemsState } = reasignPosition({
            clips: clipList,
            newClipList: newClipList,
            selectedClip: selectedItem,
            items: items
        });
        const { newClipsState, newItemsState } = updateSideClipsPosition(clipsState, itemsState);
        dispatch(setTimelineClips({ clips: [] }));
        dispatch(setTimelineItems({ items: [] }));
        const itemsWrapper = document.getElementById("timelineWrapper");
        itemsWrapper.style.transform = `translateX(${0}px)`;
        dispatch(setTimelineClips({ clips: newClipsState }));
        dispatch(setTimelineItems({ items: updateClipChildItemPosition(newItemsState) }))
    }

    return (
        <Box>
            <Flex
                align="center"
                height="54px"
                bgColor={"#f0f1f2"}
                cursor="inherit"
                position="relative"
            >
                {
                    clipList.map((clip, index) =>
                        <ClipLineItem
                            key={clip.id}
                            clip={clip}
                            index={index}
                            splitClip={split}
                            onDrop={onDrop}
                            resize={resize}
                            clips={clipList}
                        />
                    )
                }
            </Flex>
        </Box>
    )
}
