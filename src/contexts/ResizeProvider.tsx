import { ItemType } from '@/constants/itemTypes';
import { ClipItem } from '@/interfaces/ClipItem';
import { Item } from '@/interfaces/Item';
import { setGuideLeft, showGuide } from '@/store/slices/timeline/actions';
import { useAppDispatch } from '@/store/store';
import { adapItemsToLeftClipResize, adaptItemsToRightClipResize, adaptWrapperAndNextClips, clearClipsCache, clearItemsCache, clipMagnetic, getZoom, handleCollidingLeftItems, handleCollidingRightItems, leftTrimmingMagnetic, moveRightClips, playHeadMagnetic, rightTrimmingMagnetic, setRedPlayhead } from '@/utils/timelineHelper';
import React from 'react'
import { useMousseContext } from './MousseContext';

interface OnMouseMoveProps {
    /**
     * Mousse Event, optional
     */
    ev?: React.MouseEvent<HTMLDivElement, MouseEvent>,
    /**
     * The id of the item to be resized/trimmed
     */
    itemId?: any,

    /**
     * Callback used to change the cursor style, optional
     */
    callback?: Function,

    /**
     * Callback used to set the default cursor style, optional
     */
    notResizeCallback?: Function,

    /**
     * Item or clip object reference
     */
    selectedItem: Item | ClipItem,
}

interface OnMouseDown {
    /**
     * Mousse event, optional
     */
    ev?: React.MouseEvent<HTMLDivElement, MouseEvent>,

    /**
     * The id of the item to be resized/trimmed, optional
     */
    itemId?: string,

    /**
     * Callback function used to trim the item, optional
     */
    onStopCallback?: Function,

    /**
     * Callback used to set the default cursor style, optional
     */
    callback?: Function,

    /**
     * Timeline Items array. Required to handle the magnetic effect and the collision between elements, optional
     */
    items?: Item[],

    /**
     * Timeline clips array. Required to handle the magnetic effect and the collision between elements, optional
     */
    clips?: ClipItem[];

    /**
     * Timescale scalefactor. Used to get the zoom. Passed through parameters to helper functions, optional 
     */
    scaleFactor?: number;

    /**
     * Timescale height. Passed as argument through parameters to helper functions, optional
     */
    wrapperHeight?: number;
}

interface ResizeContextValue {
    /**
     * Callback for mousemove event. Used to change cursor style and the context state
     */
    onMouseMove: (props?: OnMouseMoveProps) => any,

    /**
     * Callback for mousemove event. Used to change set default the cursor style and the context state to the initial value
     */
    onMouseLeave: (callback?: Function) => void,

    /**
     * Callback for moussedown event. Allow to resize/trim an item or clip
     */
    onMouseDown: (props: OnMouseDown) => void,

    /**
     * Whether the mousse is over the element
     */
    isResizeActive: boolean,

    /**
     * The id of the item to be resized/trimmed
     */
    selectedItemId: string | number | null,

    /**
     * The width of item to be resized/trimmed
     */
    itemWidth: null | number,

    /**
     * Wheter the item is being trimmed or resized
     */
    isDragging: boolean,

    /**
     * ClientX and clientY coordinates
     */
    coors: { x: number, y: number },

    /**
     * Wheter the item can be trimmed or resized
     */
    canTrim: boolean,

    /**
     * Absolute left position of the item
     */
    itemLeft: number | null
}

const ResizeContext = React.createContext<ResizeContextValue>({
    onMouseMove: () => { },
    onMouseLeave: () => { },
    onMouseDown: () => { },
    isResizeActive: false,
    selectedItemId: null,
    itemWidth: null,
    isDragging: false,
    coors: { x: 0, y: 0 },
    canTrim: false,
    itemLeft: null
});

/**
 * Provider component to be consumed
 * @param param0 
 * @returns JSX.Element
 */
export const ResizeProvider: React.FC = ({ children }) => {
    const [isResizeActive, setIsResizeActive] = React.useState(false);
    const [canTrim, setCanTrim] = React.useState(false);
    const [selectedItemId, setSelectedItemId] = React.useState<string | number | null>(null);
    const [startWidth, setStartWidth] = React.useState<number | null>(null);
    const [itemWidth, setItemWidth] = React.useState<number | null>(null);
    const [itemLeft, setItemLeft] = React.useState<number>(null)
    const [coors, setCoors] = React.useState({ x: Infinity, y: Infinity });
    const [isDragging, setIsDragging] = React.useState(false);
    const [itemSelected, setItemSelected] = React.useState<Item | ClipItem>(null);
    const { cursor, setCursor } = useMousseContext();
    const dispatch = useAppDispatch();

    /**
     * Show magnetic guide
     * @returns 
     */
    const displayGuide = () => dispatch(showGuide({ visible: true }));

    /**
     * Hide magnetic guide
     * @returns 
     */
    const hideGuide = () => dispatch(showGuide({ visible: false }))

    /**
     * Set the absolute position of the magnetic guide
     * @param left absolute position relative to the timeline wrapper
     * @returns 
     */
    const setGuideX = (left: number) => dispatch(setGuideLeft({ left }))

    /**
     * Function to be used as callback for mousse move event
     * @param props OnMouseMoveProps
     * @returns 
     */
    const onMouseMove = (props?: OnMouseMoveProps) => {
        if (isDragging) return;

        if (!props) return;
        const { ev, itemId, callback, notResizeCallback, selectedItem } = props;

        if (!ev || !itemId) return;
        const { clientX } = ev;
        const item = document.getElementsByClassName(`item-${itemId}`)?.[0];

        if (!item) return;
        setSelectedItemId(itemId);

        if (!selectedItem) return;
        setItemSelected(selectedItem);

        const { x, width } = item.getBoundingClientRect();
        const mousePosition = clientX - x;

        setIsResizeActive(true);
        if (mousePosition <= 15 || width - mousePosition <= 15) {
            setCanTrim(true);
            if (callback) {
                callback();
            }
        } else {
            notResizeCallback();
            setCanTrim(false);
        }
    }

    /**
     * Callback function for mousse leave event
     * @param {Function} callback to set the default cursor style 
     * @returns 
     */
    const onMouseLeave = (callback?: Function) => {
        if (isDragging) return;
        setIsResizeActive(false);
        setSelectedItemId(null);
        setCanTrim(false);
        if (callback) {
            callback();
        }
    }


    /**
     * Callback function for mousse down event
     * @param props OnMouseDown
     * @returns 
     */
    const onMouseDown = (props: OnMouseDown) => {

        const { ev, itemId, callback, onStopCallback, items = [], clips = [], scaleFactor = 0.1, wrapperHeight } = props

        if (!ev || !itemId) return;

        const item = document.querySelector(`.item-${itemId}`) as HTMLElement;
        const itemWrapper = itemSelected?.type !== ItemType.video
            ? document.getElementById(itemId) as HTMLDivElement
            : document.getElementById(`video-${itemId}`);

        let { width: itemW, x: itemX } = item.getBoundingClientRect();

        const startX = ev.clientX;
        const startY = ev.clientY;
        const cursorPosition = startX - itemX;
        const startLeft = parseInt(itemWrapper?.style.left.split('px')[0] || '0');
        const startRight = startLeft + itemW;

        const isRightControl = cursorPosition >= itemW - 15;
        const zoom = getZoom(scaleFactor);
        const selected = itemSelected;

        setCoors({ x: startX, y: startY });
        setStartWidth(itemW);
        setItemWidth(itemW);
        setItemLeft(startLeft / zoom);

        let currentItemWidth = itemW;
        let left = startLeft
        let right = 0

        setIsDragging(true);

        /**
         * Function used as callback for window moussemove event
         * Allows to trim the item
         * @param ev MouseEvent
         * @returns 
         */
        const doDrag = (ev: MouseEvent) => {
            if (isResizeActive && canTrim) {
                if (isRightControl) {
                    let currentW = itemW + ev.clientX - startX;
                    setCoors({ x: ev.clientX, y: ev.clientY })

                    const isVideoOrGifOrClip = selected.type === ItemType.video || selected.type === ItemType.gif || selected?.type === 'clip';
                    const gtMaxWidth = Math.floor(selected.cutTo) >= Math.floor(selected.maxWidth)
                    const rightDragging = Math.sign(ev.clientX - startX) > -1;
                    const currentWidthgtMaxWidth = Math.floor(currentW) >= Math.floor(selected.maxWidth);

                    if (currentW < 30) return;
                    if ((isVideoOrGifOrClip) && ((gtMaxWidth && rightDragging) || currentWidthgtMaxWidth)) return;

                    item.style.width = `${currentW}px`;
                    item.style.transition = "0s";

                    currentItemWidth = zoom !== 1 && zoom !== 0 ? currentW / zoom : currentW;
                    right = ev.clientX - startX

                    if (selected?.type === 'clip') {
                        const { distance } = playHeadMagnetic({
                            item: selected, items, zoom, setGuideLeft: setGuideX,
                            showGuide: displayGuide,
                            hideGuide,
                            toRight: isRightControl
                        })

                        currentW += distance;
                        currentItemWidth += distance / zoom;

                        adaptItemsToRightClipResize(selected as ClipItem, items, (selected.x * zoom) + currentW, zoom);
                        moveRightClips({
                            clips,
                            currentWidth: currentItemWidth,
                            items,
                            selectedClip: selected as ClipItem,
                            scaleFactor
                        });

                        item.style.backgroundSize = currentW > 85 ? "contain" : "cover"
                        setItemWidth(currentItemWidth);
                    } else {
                        const { diference } = rightTrimmingMagnetic({
                            item: selected,
                            items,
                            zoom,
                            setGuideLeft: setGuideX,
                            showGuide: displayGuide,
                            hideGuide
                        });

                        let playHeadDistance = 0

                        if (!diference) {
                            const { distance } = playHeadMagnetic({
                                item: selected,
                                items,
                                zoom,
                                setGuideLeft: setGuideX,
                                showGuide: displayGuide,
                                hideGuide,
                                toRight: isRightControl
                            })
                            playHeadDistance = distance;
                        }

                        let clipDistance = 0;

                        if (!diference && !playHeadDistance) {
                            const { clipDistance: clipDiference } = clipMagnetic({
                                item: selected,
                                clips,
                                zoom,
                                setGuideLeft: setGuideX,
                                showGuide: displayGuide,
                                hideGuide,
                                toRight: isRightControl
                            })

                            clipDistance = clipDiference
                        }


                        handleCollidingRightItems({ itemId: selected.id, items, zoom, wrapperHeight });

                        currentItemWidth = currentItemWidth + diference / zoom + playHeadDistance / zoom + clipDistance / zoom;
                        right = right + diference / zoom + playHeadDistance / zoom + clipDistance / zoom
                        setItemWidth(currentItemWidth);
                    }

                } else {
                    const currentW = itemW - (ev.clientX - startX);

                    const isVideoOrGifOrClip = selected.type === ItemType.video || selected.type === ItemType.gif || selected?.type === 'clip';

                    if (currentW < 30) return;

                    const ltZero = selected.cutFrom + (ev.clientX - startX) < 0
                    const gtCutTo = Math.floor((ev.clientX - startX) + selected.cutFrom) >= Math.floor(selected.cutTo - 30);
                    const gtMaxWidth = currentW >= selected.maxWidth * zoom

                    if ((isVideoOrGifOrClip) && (ltZero || gtCutTo || gtMaxWidth)) return;

                    currentItemWidth = zoom !== 1 && zoom !== 0 ? currentW / zoom : currentW;
                    left = startLeft + (ev.clientX - startX);

                    item.style.width = `${currentW}px`;
                    item.style.transition = "0s";
                    if (itemWrapper) {
                        if (selected.type !== 'clip') {
                            itemWrapper.style.left = `${left}px`;
                            itemWrapper.style.transition = "0s";
                        }
                    }

                    if (selected?.type === 'clip') {
                        adapItemsToLeftClipResize({ clip: selected as ClipItem, items, clipX: left, startX: startLeft, zoom, clips });
                        adaptWrapperAndNextClips({
                            clip: selected as ClipItem,
                            items,
                            clipX: left,
                            startX: startLeft,
                            clips
                        });

                        item.style.backgroundSize = currentW > 85 ? "contain" : "cover"
                        setItemWidth(currentItemWidth);
                    } else {
                        handleCollidingLeftItems({ itemId: selected.id, items, zoom, wrapperHeight });
                        const { diference } = leftTrimmingMagnetic({
                            item: selected,
                            items,
                            zoom,
                            setGuideLeft: setGuideX,
                            showGuide: displayGuide,
                            hideGuide,
                            left
                        });

                        let playHeadDistance = 0;

                        if (!diference) {
                            const { distance } = playHeadMagnetic({
                                item: selected,
                                items,
                                zoom,
                                setGuideLeft: setGuideX,
                                showGuide: displayGuide,
                                hideGuide,
                                toRight: isRightControl
                            })
                            playHeadDistance = distance;
                        }

                        let clipDistance = 0;

                        if (!diference && !playHeadDistance) {
                            const { clipDistance: clipDiference } = clipMagnetic({
                                item: selected,
                                clips,
                                zoom,
                                setGuideLeft: setGuideX,
                                showGuide: displayGuide,
                                hideGuide,
                                toRight: isRightControl
                            })

                            clipDistance = clipDiference
                        }


                        left = left - diference / zoom - playHeadDistance / zoom - clipDistance / zoom;
                        setItemLeft(left / zoom);
                        currentItemWidth = currentItemWidth + diference / zoom + playHeadDistance / zoom + clipDistance / zoom;
                        setItemWidth(currentItemWidth);
                    }

                    setCoors({ x: ev.clientX, y: ev.clientY })
                }
                if (callback) {
                    callback();
                }
            }
        }

        /**
         * Function used as callback for window mousse leave event.
         * Allows to finish the trimming process and set the default cursor style
         * @param ev MouseEvent
         * @returns
         */
        const stopDrag = (ev: MouseEvent) => {
            if (onStopCallback) {
                onStopCallback(currentItemWidth, left, right, selected);
            }

            setRedPlayhead();
            hideGuide();

            setTimeout(() => setCursor('default'), 500)
            setIsResizeActive(false);
            setCanTrim(false);
            setSelectedItemId(null);
            setCoors({ x: 0, y: 0 });
            setStartWidth(null);
            setItemWidth(null);
            setIsDragging(false);
            setItemSelected(null);
            clearItemsCache();
            clearClipsCache();

            window.removeEventListener('mousemove', doDrag, false);
            window.removeEventListener('mouseup', stopDrag, false);
        }

        window.addEventListener('mousemove', doDrag, false);
        window.addEventListener('mouseup', stopDrag, false);
    }


    return (
        <ResizeContext.Provider value={{
            onMouseMove,
            onMouseLeave,
            isResizeActive,
            selectedItemId,
            onMouseDown,
            itemWidth,
            isDragging,
            coors,
            canTrim,
            itemLeft
        }}>
            {children}
        </ResizeContext.Provider>
    )
}

/**
 * Custom to hook
 * Used to consume the context
 * @returns the context value
 */
export const useResizeContext = () => React.useContext(ResizeContext);