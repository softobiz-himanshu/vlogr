import { ItemType } from "@/constants/itemTypes";
import { ClipItem } from "@/interfaces/ClipItem";
import { Item } from "@/interfaces/Item";
import React from "react";
import { v4 as uuid4 } from 'uuid';

type SetItemYProps = {
    items: Item[],
    item: Item,
    index: number,
    initialY: number;
}

type ResizeItemProps = {
    items: Item[];
    itemId: string | number;
    width: number;
    x: number;
    zoom: number;
    right: number
}

type ResizeClipProps = {
    clips: ClipItem[];
    clipId: string | number;
    width: number;
    x: number;
    zoom: number;
    right: number
}

type OnCLipDroppedProps = {
    items: Item[],
    selectedClip: ClipItem,
    deltaX: number
}

type DropItemProps = {
    selectedItem: Item;
    items: Item[];
    x: number;
    wrapperHeight: number;
    clips: ClipItem[];
    zoom?: number
}

type DropClipProps = {
    selectedItem: ClipItem,
    newPosition: number,
    clipList: ClipItem[],
    items: Item[],
    deltaY: number;
    clips: ClipItem[];
    wrapperHeight: number;
    zoom?: number
}

type ReDropItems = {
    items: Item[];
    clipId: string;
    clips: ClipItem[];
    wrapperHeight: number;
}

type ReDropItemList = {
    items: Item[];
    clips: ClipItem[];
    wrapperHeight: number;
    zoom: number;
}

type ConvertClipToElementProps = {
    clips: ClipItem[],
    newPosition: number,
    items: Item[],
    wrapperHeight: number,
    clipId: string;
    itemType: ItemType;
    clipWidth: number;
}

type MoveSideClips = {
    clips: ClipItem[];
    selectedClip: ClipItem;
    items: Item[];
    currentWidth: number;
    scaleFactor: number;
}

type DisplaceClipsPrpos = {
    clips: ClipItem[];
    item: Item;
    items: Item[];
    x: number;
    y: number;
    zoom?: number
}

type ConvertItemToClipProps = {
    clips: ClipItem[];
    items: Item[];
    item: Item;
    x: number;
    editorObjects: any[];
    wrapperHeight: number
}

type AdaptWrapperAndNextClipsProps = {
    clip: ClipItem,
    clips: ClipItem[],
    items: Item[],
    clipX: number,
    startX: number
}

type ReasignPositionProps = {
    selectedClip: ClipItem,
    clips: ClipItem[],
    newClipList: ClipItem[],
    items: Item[];
}

type ShowItemTargetAreaProps = {
    item: Item;
    items: Item[];
    x: number;
    wrapperHeight: number;
    zoom: number;
    y: number;
}

type ShowTargetAreaProps = {
    clip: ClipItem;
    x: number;
    items: Item[];
    wrapperHeight: number;
    clips: ClipItem[];
    zoom: number;
    y: number;
}

type AdapItemsToLeftClipResizeProps = {
    clip: ClipItem,
    items: Item[],
    clipX: number,
    startX: number,
    zoom: number,
    clips: ClipItem[]
}

type HandleCollidingItemsProps = {
    itemId: string;
    items: Item[];
    zoom: number;
    wrapperHeight: number;
}

type MagneticEffectProps = {
    item: Item | ClipItem;
    items: Item[];
    clips: ClipItem[];
    zoom: number;
    x: number;
    y: number;
    setPosition: (x: number, y: number, diference: number, stuckSide: 'head' | 'tail') => void;
    showGuide: () => void;
    hideGuide: () => void;
    setGuideLeft: (left: number) => void;
    fromClipShape?: boolean;
    clipDeltaX?: number;
    clientX?: number;
}

type PlayHeadMagneticProps = {
    item: Item | ClipItem,
    items: Item[],
    zoom: number;
    toRight: boolean;
    showGuide: () => void;
    hideGuide: () => void;
    setGuideLeft: (left: number) => void
}

type ClipMagneticProps = {
    item: Item;
    clips: ClipItem[];
    toRight: boolean;
    zoom: number;
    showGuide: () => void;
    hideGuide: () => void;
    setGuideLeft: (left: number) => void
}

type SetNewClipXResponse = {
    newX: number,
    boundingClip?: ClipItem | null
}

type CalculateNewXResponse = {
    newX: number;
    parentClipId: string;
}

type TrimmingMagneticProps = {
    item: Item,
    items: Item[],
    zoom: number,
    showGuide: () => void,
    setGuideLeft: (left: number) => void,
    hideGuide: () => void,
    left?: number
}
interface OverlapedItem extends Item {
    rightOverlap: boolean;
    lefOverlap: boolean;
    isWhithinELRange: boolean;
}

interface SideClip extends ClipItem {
    childrenItems: Item[]
}

let itemsCache: { [id: string]: Item } = {};
let clipsCache: { [id: string]: SideClip } = {};
export let clipsBackup: ClipItem[] = [];
export let itemsBackup: Item[] = [];
let clipCache: ClipItem;
let movedClipsIds: string[] = [];
let lastItemX = 0;
let itemCache: Item;
let distanceCache = 0;
let prevDistances = [];
let prevX = 0;
let isDraggingToLeft = false;
let lastStickPosition: number = 0;
let clientXFlag: number = 0;
let itemsIds: string[] = [];
let xPositionFlag = 0;
let isClip: boolean = false;
let isVideo: boolean = false;

export const setItemCache = (item: Item) => itemCache = item;
export const clearItemsCache = () => itemsCache = {}
export const clearClipsCache = () => clipsCache = {};
export const clearLastItemX = () => lastItemX = 0;
export const clearItemCache = () => itemsCache = null;
export const clearClipsBackup = () => itemsBackup = [];
export const clearItemsBackup = () => itemsBackup = [];
export const clearDistanceCache = () => distanceCache = 0;
export const clearClipCache = () => clipCache = null;
export const clearPrevX = () => prevX = 0;
export const celarLastStickPosition = () => lastStickPosition = null
export const clearClientXFlag = () => clientXFlag = 0;
export const setItemIds = (items: Item[]) => itemsIds = items.map(item => item.id);
export const isPastedItem = (id: string) => !!itemsIds.length && !itemsIds.includes(id);
export const clearItemIds = () => itemsIds = [];
export const setXPositionFlag = (x: number) => xPositionFlag = x;
export const getXpositionFlag = () => xPositionFlag;
export const clearXpositionFlag = () => xPositionFlag = 0;
export const getIsVideo = () => isVideo;
export const setIsVideo = (isVideoType: boolean) => isVideo = isVideoType;
export const clearIsVideo = () => isVideo = false;
export const setIsClip = (isClipType: boolean) => isClip = isClipType;
export const getIsClip = () => isClip;
export const clearIsClip = () => isClip = false;

export const setItemColor = (itemType: ItemType) =>
    itemType === ItemType.audio
        ? '#68BD84'
        : itemType === ItemType.element || itemType === ItemType.video || itemType === ItemType.gif
            ? '#FE8000'
            : '#fff'

export const setFontColor = (itemType: ItemType) =>
    itemType === ItemType.text ? '#999' : 'white';

export const setBorder = (itemType: ItemType) =>
    itemType === ItemType.text ? '1px solid #EDEDED' : 'none';


export const getCurrentY = (y: number, initialY: number) => {
    return initialY - 24 - y;
}


export const setLineItemY = ({ items, item, initialY, index }: SetItemYProps) => {
    let currentY = getCurrentY(item.y, initialY);

    return currentY;
}

export const calculateNewX = (clips: ClipItem[], item: Item): CalculateNewXResponse => {
    const overlapsClip = clips.filter(clip => {
        const currentItemOffset = item.x + item.width;
        const clipOffset = clip.x + clip.width;

        const rightOverlap = clip.x < currentItemOffset && clip.x >= item.x;
        const lefOverlap = clipOffset > item.x && clipOffset <= currentItemOffset;

        const isWhithinELRange = currentItemOffset >= clip.x && currentItemOffset <= clipOffset;
        const isWithinClipRagne = item.x >= clip.x && item.x <= clipOffset;

        return (rightOverlap || lefOverlap || isWhithinELRange || isWithinClipRagne);
    })

    if (overlapsClip.length) {

        const parentClip = overlapsClip.sort((a, b) => a.x - b.x)[0];

        if (item.id === clipCache?.id) return { newX: item.x, parentClipId: parentClip.id };

        if (item.x < parentClip.x) return { newX: parentClip.x, parentClipId: parentClip.id };

        return { newX: item.x, parentClipId: parentClip.id };
    }

    const closestClip = [...clips].sort((a, b) => a.x - b.x).map(clip => {
        const leftDistance = Math.abs(item.x - (clip.x + clip.width));
        const rightDistance = Math.abs((item.x /*+ item.width*/) - clip.x);

        const getMinDistance = () => Math.min(leftDistance, rightDistance);

        const direction = getMinDistance() === leftDistance ? 'left' : 'right';

        return {
            ...clip,
            distance: getMinDistance(),
            direction
        }
    }).sort((a, b) => a.distance - b.distance)[0];


    if (closestClip.direction === 'left') {
        return { newX: closestClip.x + closestClip.width - 1, parentClipId: closestClip.id };
    }

    return { newX: closestClip.x + 1, parentClipId: closestClip.id };
}

export const filterItem = (items: Item[], item: Item) => items.filter(it => it.id !== item.id);

export const calculateY = (
    items: Item[],
    item: Item,
    zoom: number = 1,
    isFirstDrop = false,
    fromTargetShape = false
) => {
    let newItemsState = [...items];
    const overlapedItems: OverlapedItem[] = [];
    items.forEach(el => {

        const itemX = !fromTargetShape ? item.x * zoom : item.x;
        const currentItemOffset = itemX + item.width * zoom;
        const elOffset = el.x * zoom + el.width * zoom;

        const isNotCurrentItem = el.id !== item.id;
        const rightOverlap = el.x * zoom < currentItemOffset && el.x * zoom >= itemX;
        const lefOverlap = elOffset > itemX && elOffset <= currentItemOffset;
        const isWhithinELRange = currentItemOffset > el.x * zoom && currentItemOffset <= elOffset;

        if ((rightOverlap || lefOverlap || isWhithinELRange) && isNotCurrentItem) {
            overlapedItems.push({ ...el, rightOverlap, lefOverlap, isWhithinELRange });
        }
    });


    if (!overlapedItems.length) {
        newItemsState = isFirstDrop ? newItemsState : filterItem(items, item);
        return [...newItemsState, { ...item, y: 0 }];
    };

    let sortedOverlaps: Item[] = [];

    newItemsState = isFirstDrop ? newItemsState : filterItem(items, item);
    sortedOverlaps = getSortedOverlaps(newItemsState, item);


    const AreStackItemsPositionsRight = sortedOverlaps.every((el, i) => el.y === i * 24);
    const isStack = sortedOverlaps.length && sortedOverlaps.every((el, i) => {

        let nextItemsOverlaps = getSortedOverlaps(
            newItemsState,
            sortedOverlaps[i]
        );

        nextItemsOverlaps = [...nextItemsOverlaps, item];

        const itemOverlapsIncludesAllNextOverlaps = [...sortedOverlaps, item].every(
            it => nextItemsOverlaps.find(nextEl => nextEl.id === it.id)
        );

        const nextOverlapsIncludesAllItemOverlaps = nextItemsOverlaps.every(
            it => [...sortedOverlaps, item].find(overlapedItem => overlapedItem.id === it.id)
        );

        if (sortedOverlaps[i + 1]) {
            const nextItemIsHigher = sortedOverlaps[i + 1].y > el.y;
            return nextItemIsHigher && itemOverlapsIncludesAllNextOverlaps && nextOverlapsIncludesAllItemOverlaps;
        }


        return true && itemOverlapsIncludesAllNextOverlaps && nextOverlapsIncludesAllItemOverlaps;
    })


    if (AreStackItemsPositionsRight && isStack) {
        const newY = sortedOverlaps.length * 24;
        return [...newItemsState, { ...item, y: newY }];

    }


    const overSet = Array.from(new Set(overlapedItems.map(el => el.y)));
    const maxY = Math.max(...overSet);
    const minY = Math.min(...overSet);

    if (!AreStackItemsPositionsRight && !isStack) {

        return [...newItemsState, { ...item, y: maxY + 24 }]
    }

    if (isStack && !AreStackItemsPositionsRight) {
        if (minY > 0 && isFirstDrop) {
            return [...newItemsState, { ...item, y: 0 }]
        }

        const newItem = minY === 0 ? { ...item, y: maxY + 24 } : { ...item, y: maxY };

        newItemsState = [...newItemsState, newItem];

        const map = new Map();
        const sortedList: Item[] = [];
        for (let it of getSortedOverlaps(newItemsState, newItem)) {
            if (!map.has(it.id)) {
                map.set(it.id, true);
                sortedList.push(it);
            }
        }

        sortedList.forEach((it, index) => {
            if (index === 0 && it.y > 0) {
                sortedList[index] = { ...sortedList[index], y: 0 }
            }

            const nextItem = sortedList[index + 1];

            if (nextItem && nextItem.y > sortedList[index].y + 24) {
                sortedList[index + 1] = { ...nextItem, y: sortedList[index].y + 24 };
            }
        });

        sortedList.forEach(it => {
            const itemIndex = newItemsState.findIndex(el => el.id === it.id);
            newItemsState.splice(itemIndex, 1, { ...it });
        })


        return newItemsState
    }

    if (AreStackItemsPositionsRight && !isStack) {
        return [...newItemsState, { ...item, y: maxY + 24 }]
    }
    return [...newItemsState, item]
}

const getOverlaped = (items: Item[], item: Item, zoom: number, fromTargetShape = false) => {
    return items.filter(el => {
        const itemX = !fromTargetShape ? item.x * zoom : item.x;
        const currentItemOffset = itemX + item.width * zoom;
        const elOffset = el.x * zoom + el.width * zoom;

        const isNotCurrentItem = el.id !== item.id;
        const rightOverlap = el.x * zoom < currentItemOffset && el.x * zoom >= itemX;
        const lefOverlap = elOffset > itemX && elOffset <= currentItemOffset;
        const isWhithinELRange = currentItemOffset > el.x * zoom && currentItemOffset <= elOffset;

        return (rightOverlap || lefOverlap || isWhithinELRange) && isNotCurrentItem;
    })
}

export const reasignYpositions = (items: Item[], zoom: number, fromTargetShape = false) => {

    let newItemsState = [...items].sort((a, b) => b.y - a.y);

    let itemsState: Item[] = [...newItemsState];

    newItemsState.map((item, index) => {

        const state = [...newItemsState];
        itemsState.forEach(stateEl => {
            const modifiedItem = state.find(prevStateIt => prevStateIt.id === stateEl.id);
            if (modifiedItem) {
                const modifiedItemIndex = state.findIndex(prevStateIt => prevStateIt.id === stateEl.id);
                state.splice(modifiedItemIndex, 1, stateEl);
            }
        })

        const overlaped = getOverlaped(state, item, zoom, fromTargetShape);

        if (!overlaped.length) {
            const newItem: Item = { ...item, y: 0 };
            const exists = itemsState.find(el => el.id === newItem.id);
            if (exists) {
                const itemIndex = itemsState.findIndex(el => el.id === newItem.id);
                itemsState.splice(itemIndex, 1, newItem);
            } else {
                itemsState.push(newItem);
            }
            return newItem;
        }


        overlaped.sort((a, b) => a.y - b.y);

        const lastOverlaped = overlaped[overlaped.length - 1];

        const diference = item.y - lastOverlaped.y;

        const isStack = overlaped.length && overlaped.every((el, i) => {

            let nextItemsOverlaps = getSortedOverlaps(
                state,
                overlaped[i]
            );

            nextItemsOverlaps = [...nextItemsOverlaps, item];

            const itemOverlapsIncludesAllNextOverlaps = [...overlaped, item].every(
                it => nextItemsOverlaps.find(nextEl => nextEl.id === it.id)
            );

            const nextOverlapsIncludesAllItemOverlaps = nextItemsOverlaps.every(
                it => [...overlaped, item].find(overlapedItem => overlapedItem.id === it.id)
            )

            if (overlaped[i + 1]) {
                const nextItemIsHigher = overlaped[i + 1].y > el.y;
                return nextItemIsHigher && itemOverlapsIncludesAllNextOverlaps && nextOverlapsIncludesAllItemOverlaps;
            }


            return true && itemOverlapsIncludesAllNextOverlaps && nextOverlapsIncludesAllItemOverlaps;
        })


        if (diference > 24) {
            const newItem = { ...item, y: lastOverlaped.y + 24 };
            const exists = itemsState.find(el => el.id === newItem.id);
            if (exists) {
                const itemIndex = itemsState.findIndex(el => el.id === newItem.id);
                itemsState.splice(itemIndex, 1, newItem);
            } else {
                itemsState.push(newItem);
            }
            return newItem;
        }

        const thereIsABottomItem = overlaped.find(it => it.y === item.y - 24);

        if (diference < 24 && isStack && !thereIsABottomItem && item.y > 0) {
            const stack = [...overlaped, item].sort((a, b) => a.y - b.y);

            let newItem: Item;

            stack.forEach((stackItem, i) => {
                if (stackItem.y === item.y) {
                    newItem = { ...stackItem, y: 24 * i }
                }

                if (stackItem.y > item.y) {
                    const stackItemIndex = newItemsState.findIndex(el => el.id === stackItem.id);
                    const newStackItem = { ...stackItem, y: 24 * i };

                    const exists = itemsState.find(el => el.id === newStackItem.id);
                    if (exists) {
                        const itemIndex = itemsState.findIndex(el => el.id === newStackItem.id);
                        itemsState.splice(itemIndex, 1, newStackItem);
                    } else {
                        itemsState.push(newStackItem);
                    }

                }
            })

            // newItemsState.splice(index, 1, newItem);
            const exists = itemsState.find(el => el.id === newItem.id);
            if (exists) {
                const itemIndex = itemsState.findIndex(el => el.id === newItem.id);
                itemsState.splice(itemIndex, 1, newItem);
            } else {
                itemsState.push(newItem);
            }
            return newItem;
        }


        if (!isStack) {

            const [firstOverlaped] = overlaped;

            if (firstOverlaped.y > item.y && item.y > 0) {

                const setItemsY = (overlapedItems: Item[], itemId: string, ids = []) => {

                    if (!overlapedItems || !overlapedItems.length) return;

                    if (ids.includes(itemId)) return;
                    ids.push(itemId);

                    overlapedItems.forEach(it => {
                        const nextItemOverlaps = getSortedOverlaps(itemsState, it);
                        const thereIsLowerItem = nextItemOverlaps.find(el => el.y < it.y);
                        const thereIsABottomItem = nextItemOverlaps.find(el => el.y === it.y - 24 && el.id !== item.id);

                        if (!nextItemOverlaps.length || !thereIsLowerItem || (thereIsLowerItem && !thereIsABottomItem)) {

                            const newItem = { ...it, y: it.y - item.y };

                            const exists = itemsState.find(el => el.id === newItem.id);
                            if (exists) {
                                const itemIndex = itemsState.findIndex(el => el.id === newItem.id);
                                itemsState.splice(itemIndex, 1, newItem);
                            } else {
                                itemsState.push(newItem);
                            }
                            setItemsY(getSortedOverlaps(newItemsState, newItem), newItem.id, ids);
                        } else {
                            setItemsY([], '', ids);
                        }
                    });

                }

                setItemsY(overlaped, item.id);

                const newItem = { ...item, y: item.y - item.y };
                const exists = itemsState.find(el => el.id === newItem.id);
                if (exists) {
                    const itemIndex = itemsState.findIndex(el => el.id === newItem.id);
                    itemsState.splice(itemIndex, 1, newItem);
                } else {
                    itemsState.push(newItem);
                }
                return { ...item, y: item.y - item.y }
            }

        }

        const exists = itemsState.find(el => el.id === item.id);
        if (exists) {
            const itemIndex = itemsState.findIndex(el => el.id === item.id);
            itemsState.splice(itemIndex, 1, item);
        } else {
            itemsState.push(item);
        }
        return item;

    })

    return itemsState;
}

export const calculateNewY = (items: Item[], item: Item, zoom: number = 1, fromTargetShape = false, fromResize = false) => {

    if (fromResize) {
        return item.y;
    }

    const overlapedItems: OverlapedItem[] = [];
    items.forEach(el => {

        const itemX = !fromTargetShape ? item.x * zoom : item.x;
        const currentItemOffset = itemX + item.width * zoom;
        const elOffset = el.x * zoom + el.width * zoom;

        const rightOverlap = el.x * zoom < currentItemOffset && el.x * zoom >= itemX;
        const lefOverlap = elOffset > itemX && elOffset <= currentItemOffset;

        const isWhithinELRange = currentItemOffset > el.x * zoom && currentItemOffset <= elOffset;

        if (rightOverlap || lefOverlap || isWhithinELRange) {
            overlapedItems.push({ ...el, rightOverlap, lefOverlap, isWhithinELRange });
        }

        return (rightOverlap || lefOverlap || isWhithinELRange);
    })

    const overSet = Array.from(new Set(overlapedItems.map(el => el.y)));

    const maxY = Math.max(...overSet);
    const minY = Math.min(...overSet);

    const isProportional = maxY / 24 === overlapedItems.length
    let rows = maxY / 24 - overlapedItems.length;
    rows = rows < 0 ? 0 : rows;

    const sortedOverlaps = getSortedOverlaps([...items, item], item);


    const AreStackItemsPositionsRight = sortedOverlaps.every((el, i) => el.y === i * 24);
    const isStack = sortedOverlaps.length > 1 && sortedOverlaps.every((el, i) => {
        if (sortedOverlaps[i + 1]) {
            return sortedOverlaps[i + 1].y > el.y;
        }
        return true;
    });

    if (fromTargetShape) {
        const sortedBackup = [...clipsBackup].sort((a, b) => b.x - a.x);
        const [lastClip] = sortedBackup;

        if (lastClip) {
            const lastClipOffset = lastClip.x * zoom + lastClip.width * zoom;
            if (sortedBackup.length && item.x >= lastClipOffset) {

                const lastClipItems = items.filter(it => it.clipParentId === lastClip.id);

                const lastClipsOverlaps = getOverlapedItems(lastClipItems, { ...item, x: lastClipOffset });

                return lastClipsOverlaps.length * 24;
            }
        }

    }


    // console.log({AreStackItemsPositionsRight, isProportional, isStack, maxY, minY, itemName: item.name, item})

    if (overlapedItems.length === 1 && maxY > 0) {
        if (fromTargetShape) {
            return maxY + 24;
        } else {
            return 0;
        }
    }

    if (isProportional && AreStackItemsPositionsRight) {
        return item.y
    }

    if (!isProportional && maxY === 0) {
        return 24;
    }


    if (!isProportional && minY > 0) {
        return item.y - sortedOverlaps[0].y
    }

    if (!isProportional && !AreStackItemsPositionsRight && isStack) {
        const itemIndex = sortedOverlaps.findIndex(it => it.id === item.id);
        const prev = sortedOverlaps[itemIndex - 1];

        if (prev) {
            return prev.y + 24;
        }

    }


    if (!isProportional && !isStack && AreStackItemsPositionsRight && maxY === -Infinity && minY === -Infinity) {
        return maxY > 0 ? maxY + 24 : overSet.length * 24
    }


    if (!isProportional && !AreStackItemsPositionsRight && !isStack && maxY > 0 && item.id !== itemCache?.id) {
        return item.y;
    }

    return maxY > 0 ? maxY + 24 : overSet.length * 24;
}

const getOverlapedItems = (items: Item[], item: Item) => {
    return items.filter(el => {

        const currentItemOffset = item.x + item.width;
        const elOffset = el.x + el.width;

        const isNotCurrentItem = item.id !== el.id;
        // const isNotInTheSameY = el.y !== item.y
        const rightOverlap = el.x < currentItemOffset && el.x > item.x;
        const lefOverlap = elOffset > item.x && elOffset < currentItemOffset;
        const isWhithinELRange = currentItemOffset - 1 >= el.x && currentItemOffset <= elOffset;

        return (isNotCurrentItem && (rightOverlap || lefOverlap || isWhithinELRange));
    })
}

export const getItemChunkPosition = (items: Item[], item: Item) => {
    const overlaped = items.filter(el => {

        const currentItemOffset = item.x + item.width;
        const elOffset = el.x + el.width;
        // const isNotInTheSameY = el.y !== item.y
        const rightOverlap = el.x < currentItemOffset && el.x >= item.x;
        const lefOverlap = elOffset > item.x && elOffset <= currentItemOffset;
        const isWhithinELRange = currentItemOffset >= el.x && currentItemOffset <= elOffset;

        return ((rightOverlap || lefOverlap || isWhithinELRange));
    });

    const index = overlaped.findIndex((el) => el.id === item.id);

    return index;
}

export const getSortedOverlaps = (items: Item[], item: Item) => {

    const overlaped = items.filter(el => {

        const currentItemOffset = item.x + item.width;
        const elOffset = el.x + el.width;
        // const isNotInTheSameY = el.y !== item.y
        const rightOverlap = el.x < currentItemOffset && el.x >= item.x;
        const lefOverlap = elOffset > item.x && elOffset <= currentItemOffset;
        const isWhithinELRange = currentItemOffset >= el.x && currentItemOffset <= elOffset;

        return ((rightOverlap || lefOverlap || isWhithinELRange));
    });

    return overlaped.sort((a, b) => a.y - b.y);
}

export const recalculatePositions = (items: Item[], fromResize = false, itemId?: string) => {

    let newState: Item[] = [];

    const clonedItems = [...items].sort((a, b) => a.y - b.y)

    clonedItems.forEach((item, index) => {

        const newPosition = calculateNewY(clonedItems.filter(it => it.id !== item.id), item, 1, false, fromResize && item.id === itemId ? fromResize : false);

        newState.push({ ...item, y: newPosition });
        clonedItems.splice(index, 1, { ...item, y: newPosition })
    });

    return newState;
};

export const splitElement = (item: Item | ClipItem, clientX: number, zoom: number) => {
    const itemRef = document.querySelector(`.item-${item.id}`);
    const { width, left } = itemRef.getBoundingClientRect();

    const cursorPosition = clientX - left;
    const positionWithoutZoom = zoom !== 0 ? cursorPosition / zoom : cursorPosition;

    const trimmedWidth = width - cursorPosition;
    const trimmedWidthoutZoom = zoom !== 0 ? trimmedWidth / zoom : trimmedWidth;

    const trimmedItem: Item | ClipItem = {
        ...item,
        width: positionWithoutZoom,
        cutFrom: 0,
        cutTo: positionWithoutZoom,
        prevTailWidth: positionWithoutZoom,
        prevHeadWidth: item.maxWidth
    }
    const newItem: Item | ClipItem = {
        ...item,
        width: trimmedWidthoutZoom,
        id: uuid4(),
        x: (item?.x as number) + positionWithoutZoom,
        cutFrom: positionWithoutZoom,
        cutTo: item.maxWidth,
        prevHeadWidth: trimmedWidthoutZoom,
        prevTailWidth: item.maxWidth
    };

    return { trimmedItem, newItem };
}

export const splitItem = (items: Item[], item: Item, trimmedItem: Item) => {
    let newItemsState: Item[] = [];
    const itemIndex = items.findIndex(el => el.id === item.id);
    newItemsState = items.map(el => el.id === item.id ? { ...item as Item } : el);
    newItemsState.splice(itemIndex, 0, trimmedItem);
    return newItemsState;
}

export const splitClip = (clipList: ClipItem[], item: ClipItem, trimmedItem: ClipItem) => {
    let newClipState: ClipItem[] = []
    const clipIndex = clipList.findIndex(clip => clip.id === item.id);
    newClipState = clipList.map(clip => clip.id === item.id ? { ...item } : clip);
    newClipState.splice(clipIndex, 0, trimmedItem);

    return newClipState;
}

export const reasignParent = (clip: ClipItem, items: Item[]) => {
    const children = getClipChildItems(clip, items);
    const newItemsState: Item[] = [...items];
    children.forEach(item => {
        const newItem: Item = { ...item, clipParentId: clip.id };
        const newItemIndex = items.findIndex(el => el.id === item.id);
        newItemsState.splice(newItemIndex, 1, newItem);
    });

    return newItemsState;
}

export const resizeItem = (props: ResizeItemProps) => {
    const { items, itemId, width, x, zoom, right } = props;

    return items.map(
        item => {
            if (item.id === itemId) {

                const headCutted = item.x !== x / zoom;
                const tailCutted = item.x === x / zoom && width !== item.width;

                let cutFrom = item.cutFrom || 0;
                let cutTo = item.cutTo || item.maxWidth;
                let prevHeadWidth = item.prevHeadWidth || item.maxWidth;
                let prevTailWidth = item.prevTailWidth || item.maxWidth;

                if (headCutted) {
                    const deltaX = (x / zoom) - item.x;
                    cutFrom = (item.maxWidth - (item.prevHeadWidth - deltaX));
                    prevHeadWidth = item.maxWidth - (deltaX + (item.cutFrom));
                }


                if (tailCutted) {
                    const deltaW = (item.prevTailWidth + right / zoom) - item.prevTailWidth;
                    cutTo = item.cutTo + deltaW;
                    prevTailWidth = cutTo
                }

                return {
                    ...item,
                    cutFrom,
                    cutTo,
                    width: Math.round(width),
                    x: x / zoom,
                    prevHeadWidth,
                    prevTailWidth
                }
            }

            return item;
        }
    );
}

export const resizeClip = (props: ResizeClipProps) => {
    const { clips, clipId, width, x, zoom, right } = props;

    return clips.map(
        item => {

            if (item.id === clipId) {
                const headCutted = item.x !== x / zoom;
                const tailCutted = item.x === x / zoom && width !== item.width;

                let cutFrom = item.cutFrom || 0;
                let cutTo = item.cutTo || item.maxWidth;
                let prevHeadWidth = item.prevHeadWidth || item.maxWidth;
                let prevTailWidth = item.prevTailWidth || item.maxWidth;

                if (headCutted) {
                    const deltaX = (x / zoom) - item.x;
                    cutFrom = (item.maxWidth - (item.prevHeadWidth - deltaX));
                    prevHeadWidth = item.maxWidth - (deltaX + (item.cutFrom));
                }


                if (tailCutted) {
                    const deltaW = (item.prevTailWidth + right / zoom) - item.prevTailWidth;
                    cutTo = item.cutTo + deltaW;
                    prevTailWidth = cutTo
                }

                return {
                    ...item,
                    width: Math.round(width),
                    x,
                    cutFrom,
                    cutTo,
                    prevHeadWidth,
                    prevTailWidth
                }
            }

            return item;
        }
    );
}

export const setNewClipX = (clip: ClipItem, clips: ClipItem[]): SetNewClipXResponse => {
    const overlapedClip = [...clips].sort((a, b) => a.x - b.x).find(clipItem => {

        const isNotCurrentClip = clipItem.id !== clip.id;
        const overlaps = clip.x >= clipItem.x && clip.x <= clipItem.x + clipItem.width;

        return isNotCurrentClip && overlaps;
    });


    if (overlapedClip) return {
        newX: overlapedClip.x,
        boundingClip: overlapedClip
    }

    const unmovedClip = clips.find(clipItem => clipItem.id === clip.id);

    if (!overlapedClip) {
        const sortedClips = clips.filter(clipItem => clipItem.id !== clip.id).sort((a, b) => a.x - b.x);

        const prevClips = sortedClips
            .filter(clipItem =>
                clipItem.x + clipItem.width < clip.x
            ).map(clipItem => ({
                ...clipItem,
                distance: clip.x - (clipItem.x + clipItem.width)
            }));

        const minPrevDistance = Math.min(...prevClips.map(clipItem => clipItem.distance));

        const prevClip = prevClips.find(clipItem => clipItem.distance === minPrevDistance);

        const nextClips = sortedClips
            .filter(clipItem =>
                clipItem.x > clip.x
            )
            .map(clipItem => ({
                ...clipItem,
                distance: clipItem.x - clip.x
            }));


        const minNextDistance = Math.min(...nextClips.map(clipItem => clipItem.distance));

        const nextClip = prevClips.find(clipItem => clipItem.distance === minNextDistance);

        if (!prevClip && !nextClip) return { newX: unmovedClip.x > 0 ? clip.x : unmovedClip.x }

        if (prevClip && !nextClip) return { newX: prevClip.x + prevClip.width }

        if (!prevClip && nextClip) return {
            newX: nextClip.x - clip.width >= 0 ? nextClip.x - clip.width : unmovedClip.x
        }
    }

    return { newX: clip.x }
}

export const getClipChildItems = (selectedClip: ClipItem, items: Item[]) => {
    const clipOffset = selectedClip.x + selectedClip.width

    return items.filter(item => {

        const itemOffset = item.x + item.width
        const rightOverlap = item.x <= clipOffset && item.x >= selectedClip.x;
        const isWithinItemRange = clipOffset >= item.x && clipOffset <= itemOffset

        return rightOverlap || isWithinItemRange;
    })
}

export const dropItem = (props: DropItemProps) => {

    const { selectedItem, x, items, wrapperHeight, clips, zoom = 1 } = props;

    let newPosition = x + (selectedItem?.x * zoom || 0);
    newPosition = newPosition < 0 ? 0 : newPosition;


    const newItemsState = [...items]
    const newItem = { ...selectedItem, x: newPosition / zoom } as Item;

    const { newX, parentClipId } = calculateNewX(clips, newItem);
    newItem.x = newX;
    newItem.clipParentId = parentClipId;

    removeTargetArea();
    clearDistanceCache();
    clearPrevX();
    celarLastStickPosition();
    clearClientXFlag();

    return calculateY([...newItemsState], { ...newItem }, zoom, false);
}

export const dropClip = (props: DropClipProps) => {
    let { selectedItem, newPosition, clipList, items, deltaY, clips, wrapperHeight, zoom = 1 } = props;

    let positionBackup = newPosition / zoom;

    const { newX, boundingClip } = setNewClipX({ ...selectedItem, x: newPosition / zoom } as ClipItem, clipList);
    let bounding: ClipItem | null | undefined;
    newPosition = newX;
    bounding = boundingClip;
    let newItemsState: Item[] = [];

    let newClipsState = clipList.filter(clip => clip.id !== selectedItem.id);
    const clipIndex = clipList.findIndex(clip => clip.id === selectedItem.id);
    const newClip = { ...selectedItem as ClipItem, x: newPosition, y: 0 };

    if (deltaY < -64) {

        if (clips.length <= 1) return {
            newClipsState: clips,
            newItemsState: items
        }

        const { newClipsState: clipsState, newItemsState: itemsState } = convertClipToElement({
            clips,
            items,
            newPosition: positionBackup,
            wrapperHeight,
            clipId: selectedItem.id,
            itemType: selectedItem.subType,
            clipWidth: selectedItem.width
        });

        newClipsState = clipsState;
        newItemsState = itemsState;

        clipCache = newClip;

        const { newClipList, newItemList } = reasignClipPositions(newClipsState, newItemsState, wrapperHeight);

        newClipsState = newClipList;
        newItemsState = newItemList;

    } else {

        newClipsState.splice(clipIndex, 0, newClip);

        newItemsState = onClipDropped({
            selectedClip: selectedItem as ClipItem,
            deltaX: newClip.x - selectedItem.x,
            items
        });

        if (bounding) {
            if (newPosition < selectedItem.x) {
                newClipsState = newClipsState.map(
                    (clipItem) => {
                        if (clipItem.x >= newPosition && clipItem.x < selectedItem.x && clipItem.id !== newClip.id) {
                            newItemsState = onClipDropped({
                                selectedClip: clipItem,
                                deltaX: selectedItem.width,
                                items: newItemsState
                            });
                            return ({ ...clipItem, x: clipItem.x + selectedItem.width })
                        }

                        return clipItem
                    }
                );
            }
            if (newPosition > selectedItem.x) {
                newClipsState = newClipsState.map(
                    (clipItem) => {
                        if (clipItem.x <= newPosition && clipItem.x > selectedItem.x && clipItem.id !== newClip.id) {
                            newItemsState = onClipDropped({
                                selectedClip: clipItem,
                                deltaX: -selectedItem.width,
                                items: newItemsState
                            });
                            return ({ ...clipItem, x: clipItem.x - selectedItem.width });
                        }

                        if (clipItem.id === newClip.id) {
                            newItemsState = onClipDropped({
                                selectedClip: clipItem,
                                deltaX: -(selectedItem.width - bounding.width),
                                items: newItemsState
                            });
                            return { ...clipItem, x: newPosition - (selectedItem.width - bounding.width) }
                        }
                        return clipItem;
                    }
                );
            }
        }
    }

    removeTargetArea();
    clearItemsBackup();
    clearClipsBackup()
    clearDistanceCache();
    clearClipCache();
    clearDistanceCache();
    clearPrevX();
    celarLastStickPosition();

    return {
        newClipsState,
        newItemsState
    }
}

export const convertClipToElement = (props: ConvertClipToElementProps) => {
    const { clips, items, newPosition, wrapperHeight, clipId, itemType, clipWidth } = props;
    let newItemsState: Item[] = [];
    let newClipsState: ClipItem[] = [];

    let newItem: Item = {
        id: clipId,
        name: '',
        type: itemType,
        width: clipWidth,
        x: newPosition,
        y: 0,
    }

    if (clips.length <= 1) return { newItemsState: items, newClipsState: clips }

    newItem = setNewItemPosition(newItem, clips, items, true);

    const childItems = items.filter(item => item.clipParentId === clipId);

    const itemsState = [...items];

    const currentClip = clips.find(cl => cl.id === clipId);

    const diference = currentClip.x - newItem.x;


    childItems.forEach(item => {
        const newChildItem = { ...item, x: item.x - diference, y: newItem.y + item.y + 24 };
        const newChildItemIndex = itemsState.findIndex(it => it.id === newChildItem.id);
        itemsState.splice(newChildItemIndex, 1, newChildItem);
    });


    newItemsState = [...itemsState, newItem];

    newClipsState = clips.filter(clip => clip.id !== clipId);

    return { newItemsState, newClipsState }
}

export const setNewItemPosition = (newItem: Item, clips: ClipItem[], items: Item[], fromClip = false) => {
    clips = !fromClip ? clips : clips.filter(clip => clip.id !== newItem.clipParentId);

    const { newX, parentClipId } = calculateNewX(clips, newItem)
    newItem.x = newX;
    newItem.clipParentId = parentClipId;

    itemCache = newItem;

    newItem.y = calculateNewY(items.filter(item => item.clipParentId !== newItem.id), newItem)

    itemCache = null;
    return newItem;
}

export const onClipDropped = (props: OnCLipDroppedProps) => {
    const { items, selectedClip, deltaX } = props;

    const childrenItem = items.filter(item => item.clipParentId === selectedClip.id);

    const newItemsState: Item[] = [...items];

    childrenItem.map(item => {
        const itemX = item.x + deltaX;

        const newItem = { ...item, x: itemX >= 0 ? itemX : 0 };

        const itemIndex = items.findIndex(el => el.id === item.id);
        newItemsState.splice(itemIndex, 1, newItem);
    });

    return newItemsState;
}

export const reDropItems = (props: ReDropItems) => {
    const { items, clipId, clips, wrapperHeight } = props;
    let newItemsState = [...items];
    const children = items.filter(item => item.clipParentId === clipId);

    children.forEach(item => {
        newItemsState = dropItem({
            selectedItem: item,
            clips,
            items: newItemsState,
            wrapperHeight,
            x: 0
        })
    });

    return newItemsState;
}

export const reDropItemList = (props: ReDropItemList) => {

    const { items, clips, wrapperHeight, zoom } = props;

    let newItemsState = [...items];

    items.forEach(item => {
        newItemsState = dropItem({
            items,
            selectedItem: item,
            wrapperHeight,
            clips,
            x: 0,
            zoom
        })
    });

    return newItemsState
}

export const getChildrenItems = (clipId: string, items: Item[]) => {
    return items.filter(item => item.clipParentId === clipId);
}

export const reasignClipPositions = (clips: ClipItem[], items: Item[], wrapperHeight: number) => {
    let newClipList: ClipItem[] = [...clips];
    let newItemList: Item[] = [];

    const sortedClips = [...clips].sort((a, b) => a.x - b.x);

    const [firstClip] = sortedClips;

    if (firstClip.x > 0) {
        const distance = firstClip.x;
        newClipList = clips.map(clip => {
            const newClip = { ...clip, x: clip.x - distance };

            getChildrenItems(newClip.id, items).map(item => {
                // const newItem = item.id !== clipCache.id ? { ...item, x: item.x - distance } : item;
                newItemList.push(item.id !== clipCache.id ? { ...item, x: item.x - distance } : item);
            });

            return newClip
        });


        const oldClipChildren = getChildrenItems(clipCache.id, items);
        const itemsToDrop = [...oldClipChildren, items.find(it => it.id === clipCache.id)].sort((a, b) => a.y - b.y);

        itemsToDrop.forEach(item => {
            newItemList = dropItem({
                selectedItem: item,
                clips: newClipList,
                items: newItemList,
                wrapperHeight,
                x: 0
            })
        });


        return { newClipList, newItemList };
    }

    newItemList = [...items];

    sortedClips.map((clip, i) => {
        const prevClip = sortedClips[i - 1];
        if (prevClip) {
            const prevClipOffset = prevClip.x + prevClip.width;
            const clipOffset = clip.x + clip.width;

            const areSeparated = clip.x > prevClipOffset;
            const areOverlaped = prevClipOffset > clip.x

            if (areSeparated) {

                const distance = clip.x - prevClipOffset;

                const newClip = { ...clip, x: clip.x - distance };
                const clipIndex = newClipList.findIndex(el => el.id === clip.id);
                newClipList.splice(clipIndex, 1, newClip)

                getChildrenItems(newClip.id, items).map(item => {
                    const newItem = item.id !== clipCache.id ? { ...item, x: item.x - distance } : item;
                    const itemIndex = items.findIndex(el => el.id === item.id);
                    newItemList.splice(itemIndex, 1, newItem);
                });

                sortedClips.splice(i, 1, newClip);

            } else if (areOverlaped) {
                const distance = prevClipOffset - clip.x;

                const newClip = { ...clip, x: clip.x + distance };
                const clipIndex = newClipList.findIndex(el => el.id === clip.id);
                newClipList.splice(clipIndex, 1, newClip);

                getChildrenItems(newClip.id, items).map(item => {
                    const newItem = { ...item, x: item.x + distance };
                    const itemIndex = items.findIndex(el => el.id === item.id);
                    newItemList.splice(itemIndex, 1, newItem);
                });

                sortedClips.splice(i, 1, newClip);
            }
        }

    })

    newItemList = newItemList.filter(it => it.clipParentId !== clipCache.id && it.id !== clipCache.id);


    const oldClipChildren = getChildrenItems(clipCache.id, items);
    const itemsToDrop = [...oldClipChildren, items.find(it => it.id === clipCache.id)].sort((a, b) => a.y - b.y);

    itemsToDrop.forEach(item => {
        newItemList = dropItem({
            selectedItem: item,
            clips: newClipList,
            items: newItemList,
            wrapperHeight,
            x: 0
        })
    });

    return { newClipList, newItemList };
}

export const displaceBoundingClips = (clips: ClipItem[], items: Item[], selectedClip: ClipItem, x: number, zoom: number) => {
    const toRight = x > 0;
    const toLeft = x < 0;
    const clipX = (selectedClip.x * zoom) + x;

    const sortedClips = [...clips].sort((a, b) => a.x - b.x);
    const clipIds = sortedClips.map(clipItem => clipItem.id);
    let overlapedClip: ClipItem;

    const clipsDomRef = clipIds.map(clipId =>
        document.getElementById(clipId) as HTMLDivElement
    );

    // console.log({ clipsDomRef, clipIds });

    const overlapedClips = sortedClips.filter(clipItem => {
        const clipItemOffset = (clipItem.x + clipItem.width) * zoom;
        const selectedClipOffset = (clipX + selectedClip.width) * zoom;
        const isNotCurrentClip = clipItem.id !== selectedClip.id

        const isWider = selectedClip.width > clipItem.width;

        if (toRight) {
            return (
                selectedClipOffset >= (clipItem.x * zoom) && clipX <= (clipItem.x * zoom) + ((clipItem.x * zoom) * (isWider ? 0.25 : 0.5))

            )
                && isNotCurrentClip && (clipItem.x * zoom) > (selectedClip.x * zoom);
        }
        if (toLeft) {
            return (
                (clipX >= (clipItem.x * zoom) && clipX <= clipItemOffset && isNotCurrentClip)
            )
        }
    });

    overlapedClip = overlapedClips[0];
    if (!overlapedClip) {
        let shapeX = 0;
        const wrapperRef = document.getElementById(`outlineClip-${selectedClip.id}`);

        if (clipX < sortedClips.filter(clipItem => clipItem.id !== selectedClip.id)[0]?.x) {
            shapeX = 0;
            wrapperRef.style.display = "block";
            wrapperRef.style.left = `${shapeX}px`;
            wrapperRef.style.width = `${(selectedClip.width) * zoom}px`
            return;
        }

        const lastClip = sortedClips[sortedClips.length - 1];

        if (lastClip.id === selectedClip.id) {
            wrapperRef.style.display = "block";
            wrapperRef.style.left = `${lastClip.x}px`;
            wrapperRef.style.width = `${(selectedClip.width) * zoom}px`
            return;
        }

        return
    };

    document.getElementById(`outlineClip-${selectedClip.id}`).style.display = "none";

    const overlapedClipRef = clipsDomRef.find(
        clipRef => {
            console.log({ clipRef, firstChild: clipRef.firstElementChild })
            return clipRef.firstElementChild.firstElementChild.className.split('item-')[1] === overlapedClip.id
        }
    )

    if (!overlapedClipRef) return;

    let newX: number;
    const overlapedMiddlePoint = (overlapedClip.x * zoom) + ((overlapedClip.width * zoom) / 2);

    const isGtMiddle = clipX >= overlapedMiddlePoint;
    const isGtHead = clipX >= (overlapedClip.x * zoom);

    const childrenItems = getChildrenItems(overlapedClip.id, items);
    const childrenItemsRef = childrenItems.map(
        ({ id }) => document.getElementById(id) as HTMLDivElement
    );

    if (toLeft) {
        newX = (overlapedClip.x * zoom) + (selectedClip.width * zoom);
        childrenItemsRef.forEach(childItem => {
            const currentItem = items.find(item => item.id === childItem.id);
            const newItemX = (currentItem.x * zoom) + (selectedClip.width * zoom);
            childItem.style.transition = "0.15s";
            childItem.style.left = `${!isGtMiddle ? newItemX : (currentItem.x * zoom)}px`;
        });

        overlapedClipRef.style.transition = "0.15s";
        overlapedClipRef.style.left = `${!isGtMiddle ? newX : (overlapedClip.x * zoom)}px`;

        // const outlineRef = document.getElementById(`outlineClip-${overlapedClip.id}`);
        // outlineRef.style.left = !isGtMiddle ? `${newX - (selectedClip.width * zoom)}px` : outlineRef.style.left;
        // outlineRef.style.width = !isGtMiddle ? `${(selectedClip.width * zoom)}px` : outlineRef.style.width
        // outlineRef.style.display = !isGtMiddle && clipX < (overlapedClip.x * zoom) + (overlapedClip.width * zoom) ? "block" : 'none';

        const selectedOutlineRef = document.getElementById(`outlineClip-${selectedClip.id}`);
        selectedOutlineRef.style.display = "block";
        selectedOutlineRef.style.left = !isGtMiddle ? `${newX - (selectedClip.width * zoom)}px` : `${overlapedClip.x * zoom + overlapedClip.width * zoom}px`;

    }

    if (toRight) {
        newX = (overlapedClip.x * zoom) - (selectedClip.width * zoom);
        childrenItemsRef.forEach(childItem => {
            const currentItem = items.find(item => item.id === childItem.id);
            const newItemX = (currentItem.x * zoom) - (selectedClip.width * zoom);
            childItem.style.transition = "0.15s";
            childItem.style.left = `${isGtHead ? newItemX : (currentItem.x * zoom)}px`;
        });
        overlapedClipRef.style.transition = "0.15s";

        overlapedClipRef.style.left = `${isGtHead ? newX : (overlapedClip.x * zoom)}px`;

        const selectedOutlineRef = document.getElementById(`outlineClip-${selectedClip.id}`);
        selectedOutlineRef.style.display = "block";
        selectedOutlineRef.style.left = isGtHead ? `${newX + (overlapedClip.width * zoom)}px` : `${newX}px`;

    }


    clips.map(clipItem => {
        if (clipItem.id !== overlapedClip.id && clipItem.id !== selectedClip.id) {
            document.getElementById(`outlineClip-${clipItem.id}`).style.display = "none"
        }
    })

    return overlapedClip;

}

export const displaceClips = (props: DisplaceClipsPrpos) => {

    const { clips, item, items, x, y, zoom = 1 } = props;

    const itemX = (item.x * zoom) + x
    const itemWidth = item.width * zoom;

    const nextClips = clips.filter(clipItem => {
        const clipItemX = clipItem.x * zoom;
        const clipItemWidth = clipItem.width * zoom;
        const nextClip = (clipItemX >= itemX) || (clipItemX <= itemX && clipItemX + clipItemWidth >= itemX);
        const clipDomRef = document.getElementById(clipItem.id);
        clipDomRef.style.transition = '0.15s';

        const children = getChildrenItems(clipItem.id, items).filter(el => el.id !== item.id)

        if (nextClip && y - item.y >= 12) {
            clipDomRef.style.left = `${clipItemX + itemWidth}px`;
            children.forEach(child => {
                const childId = child.type !== ItemType.video ? child.id : `video-${child.id}`
                const childDomRef = document.getElementById(childId);
                childDomRef.style.transition = '0.15s';
                childDomRef.style.left = `${child.x * zoom + itemWidth}px`
            })
        } else {
            clipDomRef.style.left = `${clipItemX}px`;
            children.forEach(child => {
                const childId = child.type !== ItemType.video ? child.id : `video-${child.id}`
                const childDomRef = document.getElementById(childId);
                childDomRef.style.transition = '0.15s';
                childDomRef.style.left = `${child.x * zoom}px`
            });
            if (clipCache && item.y - item.y < 12) {
                hideClipOutlineShape(clipCache, zoom);
            }
        }

        return nextClip;
    });

    if (!nextClips.length) {
        clips.forEach(clipItem => hideClipOutlineShape(clipItem, zoom));
        if (y - item.y >= 12) {
            const sortedClips = [...clips].sort((a, b) => a.x - b.x);
            const lastClip = sortedClips[sortedClips.length - 1];
            const lastClipOutlinedShape = document.getElementById(`outlineClip-${lastClip.id}`);
            lastClipOutlinedShape.style.width = `${itemWidth}px`;
            lastClipOutlinedShape.style.transform = `translateX(${lastClip.width * zoom}px)`;
            lastClipOutlinedShape.style.left = `${(lastClip.x) * zoom}px`;
            lastClipOutlinedShape.style.display = `block`;
            clipCache = { ...lastClip };
        }
        return;
    };

    const [firstClip] = nextClips.sort((a, b) => a.x - b.x);

    const outlineShapeRef = document.getElementById(`outlineClip-${firstClip.id}`) as HTMLDivElement;
    outlineShapeRef.style.width = `${itemWidth}px`;
    outlineShapeRef.style.transform = `translateX(0px)`;
    outlineShapeRef.style.left = `${(firstClip.x) * zoom}px`;
    outlineShapeRef.style.display = 'block';

    nextClips.slice(1).forEach(clipItem => hideClipOutlineShape(clipItem, zoom));

}

const hideClipOutlineShape = (clipItem: ClipItem, zoom: number) => {
    const clipShapeDomRef = document.getElementById(`outlineClip-${clipItem.id}`) as HTMLDivElement;
    if (!clipShapeDomRef) return;
    clipShapeDomRef.style.display = "none";
    clipShapeDomRef.style.width = `${clipItem.width * zoom}px`
    clipShapeDomRef.style.transform = `translateX(0px)`;
    clipShapeDomRef.style.left = `${clipItem.x * zoom}px`
}

export const hideClipsShapes = (clips: ClipItem[], zoom: number) => {
    clips.map(clipItem => hideClipOutlineShape(clipItem, zoom));
}

export const convertItemToClip = (props: ConvertItemToClipProps) => {
    const { clips, item, items, x, editorObjects, wrapperHeight } = props;

    const itemX = item.x + x;

    const newClipsState = [...clips];
    let newItemsState = items.filter(el => el.id !== item.id);

    const clipsToMove = clips.filter(clipItem =>
        clipItem.x >= itemX || (clipItem.x <= itemX && clipItem.x + clipItem.width >= itemX)
    );

    if (clipsToMove.length) {
        clipsToMove.forEach(clipItem => {
            const children = getChildrenItems(clipItem.id, items).filter(el => el.id !== item.id);
            children.forEach(child => {
                const itemIndex = items.findIndex(el => el.id === child.id);
                newItemsState.splice(itemIndex, 1, { ...child, x: child.x + item.width });
            });

            const clipIndex = clips.findIndex(el => el.id === clipItem.id);
            newClipsState.splice(clipIndex, 1, { ...clipItem, x: clipItem.x + item.width });
        });
    };

    const sortedNextClips = [...clipsToMove].sort((a, b) => a.x - b.x);
    const sortedClips = [...newClipsState].sort((a, b) => a.x - b.x);;
    const [firstClip] = sortedNextClips;
    const lastClip = sortedClips[sortedClips.length - 1]
    const newClipWidth = firstClip ? firstClip.x : lastClip.x + lastClip.width;

    const editorObject = editorObjects?.find(obj => obj.id === item.id);

    const newClip: ClipItem = {
        id: item.type !== ItemType.video ? item.id : `video-${item.id}`,
        type: ItemType.clip,
        width: item.width,
        x: newClipWidth,
        src: editorObject?.metadata?.src || '',
        subType: item.type,
        maxWidth: item.maxWidth,
        cutFrom: item.cutFrom,
        cutTo: item.cutTo,
        prevHeadWidth: item.prevHeadWidth,
        prevTailWidth: item.prevTailWidth
    }

    newClipsState.push(newClip);

    const itemsToDrop = getOverlapedItems(items, item).filter(it => it.y > item.y).sort((a, b) => a.y - b.y);

    itemsToDrop.forEach(it => {
        const itemIndex = newItemsState.findIndex(el => el.id === it.id);
        newItemsState.splice(itemIndex, 1);
    });

    itemsToDrop.forEach(it => {
        newItemsState = dropItem({
            clips: newClipsState,
            items: newItemsState,
            selectedItem: it,
            wrapperHeight,
            x: 0
        })
    })

    return { newClipsState, newItemsState };
}

const getTargetLeftPosition = (clips: ClipItem[], currentX: number, clip: ClipItem, zoom: number) => {
    const item = clips.find(el => el.x * zoom + el.width * zoom >= currentX && el.id !== clip.id);

    if (item) {
        const itemDomRef = document.getElementById(item?.id);
        const itemDomX = itemDomRef ? getXfromDomElement(itemDomRef) : null;
        const itemW = itemDomRef?.getBoundingClientRect()?.width;

        const greaterThanX = itemDomX + itemW >= currentX;

        if (itemDomRef && greaterThanX) return currentX >= 0 ? currentX + distanceCache : 0;
    }


    const lastItem = clips.filter(el => el.id !== clip.id).sort((a, b) => b.x - a.x)[0];

    const lastItemDomRef = document.getElementById(lastItem.id);

    const lastItemDomRefX = getXfromDomElement(lastItemDomRef);
    const lastItemDomRefWidth = lastItemDomRef.getBoundingClientRect().width;

    return lastItemDomRefX + lastItemDomRefWidth;

}

export const removeEmptySpaceBetweenClips = (clips: ClipItem[], items: Item[], clip: ClipItem, zoom: number) => {
    const clipsSorted = [...clips].sort((a, b) => a.x - b.x);
    const otherClips = clips.filter(el => el.id !== clip.id);
    const sortedClips = [...otherClips].sort((a, b) => a.x - b.x);
    const clipsDomRef = sortedClips.map(clipItem => document.getElementById(clipItem.id));

    const newClipsState = [...sortedClips];
    const newItemsState = [...items];

    clipsDomRef.map((clipDomRef, index) => {
        const nextClipRef = clipsDomRef[index + 1];

        let clipDiference = 0;

        if (nextClipRef) {
            const nextClipX = Number(nextClipRef.style.left.split('px')[0]);
            const clipX = Number(clipDomRef.style.left.split('px')[0]);
            const clipWidth = clipDomRef.getBoundingClientRect().width;

            const diference = nextClipX - (clipX + clipWidth);
            clipDiference = nextClipX / zoom - (clipX / zoom + clipWidth / zoom);

            nextClipRef.style.transition = "0.15s";

            if (diference) {
                movedClipsIds.push(nextClipRef.id)
                prevDistances.push({ id: sortedClips[index].id, x: sortedClips[index].x })
                nextClipRef.style.left = `${nextClipX - diference}px`;

                items.filter(item => item.clipParentId === nextClipRef.id).map(item => {
                    const itemId = item.type !== ItemType.video ? item.id : `video-${item.id}`
                    const itemDomRef = document.getElementById(itemId);
                    const itemX = Number(itemDomRef.style.left.split('px')[0]);
                    itemDomRef.style.transition = "0.15s";
                    itemDomRef.style.left = `${itemX - diference}px`
                    const newItem: Item = { ...item, x: item.x - clipDiference };
                    const newItemIndex = newItemsState.findIndex(it => it.id === item.id);
                    newItemsState.splice(newItemIndex, 1, newItem);
                })
            }

            const newClip: ClipItem = { ...sortedClips[index], x: sortedClips[index].x - clipDiference };
            newClipsState.splice(index, 1, newClip);
        }
    });

    const [firstClip] = clipsDomRef;
    const firstClipX = Number(firstClip.style.left.split('px')[0]);
    if (firstClipX > 0) {
        const isNotFirstClip = firstClip.id !== clipsSorted[0].id;
        const distance = !isNotFirstClip ? clip.width * zoom : clipsSorted[0].width * zoom;
        const clipDistance = !isNotFirstClip ? clip.width : clipsSorted[0].width;
        clipsDomRef.map((clipDomRef, index) => {

            const clipX = Number(clipDomRef.style.left.split('px')[0]);
            clipDomRef.style.transition = "0.15s";
            clipDomRef.style.left = `${clipX - (distance)}px`;

            const newClip: ClipItem = { ...sortedClips[index], x: sortedClips[index].x - clipDistance };
            newClipsState.splice(index, 1, newClip);

            movedClipsIds.push(clipDomRef.id);

            items.filter(item => item.clipParentId === clipDomRef.id).map(item => {
                const itemId = item.type !== ItemType.video ? item.id : `video-${item.id}`
                const itemDomRef = document.getElementById(itemId);
                const itemX = Number(itemDomRef.style.left.split('px')[0]);
                // itemDomRef.style.transition = "0.15s";
                itemDomRef.style.left = `${itemX - distance}px`

                let newItem: Item = newItemsState.find(it => it.id === item.id);
                const newItemIndex = newItemsState.findIndex(it => it.id === item.id);
                newItem = { ...newItem, x: newItem.x - clipDistance }
                newItemsState.splice(newItemIndex, 1, newItem);
            });

        })
    }

    return { newClipsState, newItemsState };
}

export const restartClipsAndItemPositions = (clips: ClipItem[], items: Item[], clip: ClipItem, zoom: number) => {
    if (!movedClipsIds.length) return;

    movedClipsIds.forEach((id, index) => {
        const movedClip = clips.find(clipItem => clipItem.id === id);

        const clipDomRef = document.getElementById(movedClip.id);
        clipDomRef.style.transition = '0.15s';
        clipDomRef.style.left = `${movedClip.x * zoom}px`;

        const children = getChildrenItems(movedClip.id, items);

        children.forEach(child => {
            const childRef = document.getElementById(child.id);
            childRef.style.transition = '0.15s';
            childRef.style.left = `${child.x * zoom}px`;
        });

        movedClipsIds.splice(index, 1);
    })
}

export const showItemTargetArea = (props: ShowItemTargetAreaProps) => {
    const { item, items, wrapperHeight, x, zoom } = props;

    const itemList = items.filter(it => it.id !== item.id);

    const currentX = x + (item.x * zoom);
    const currentXWithoutZoom = x + item.x;

    const targetArea = document.getElementById("clipTargetArea");
    if (targetArea) {
        const newItem = { ...item, x: currentX }

        itemCache = newItem;

        newItem.y = calculateNewY(itemList, newItem, zoom, true);

        const top = getCurrentY(newItem.y, wrapperHeight);

        targetArea.style.left = `${currentX + distanceCache}px`;
        targetArea.style.top = `${top}px`;
        targetArea.style.width = `${item.width * zoom}px`;
        itemCache = null;
        return;
    }


    const newTargetArea = document.createElement("div");
    newTargetArea.style.position = "absolute";
    newTargetArea.style.left = `${currentX}px`;
    newTargetArea.style.display = "block";
    newTargetArea.style.width = `${item.width * zoom}px`;
    newTargetArea.style.height = `24px`;
    newTargetArea.style.borderRadius = '4px';
    newTargetArea.style.border = "1px solid #3782f7";

    const newItem = { ...item, x: currentXWithoutZoom }

    newItem.y = calculateNewY(itemList, newItem, zoom, true);
    const top = getCurrentY(newItem.y, wrapperHeight);

    newTargetArea.style.top = `${top}px`;
    newTargetArea.id = "clipTargetArea";

    const itemsWrapperRef = document.getElementById("itemsContainer");
    itemsWrapperRef.appendChild(newTargetArea);

}

export const showTargetArea = (props: ShowTargetAreaProps) => {

    const { clip, clips, items, wrapperHeight, zoom, x } = props;

    if (!clipsBackup || !clipsBackup.length) {
        clipsBackup = [...clips];
    }

    if (!itemsBackup || !itemsBackup.length) {
        itemsBackup = [...items];
    }

    if (!movedClipsIds.length) {
        const { newClipsState, newItemsState } = removeEmptySpaceBetweenClips(clips, items, clip, zoom);
        clipsBackup = newClipsState;
        itemsBackup = newItemsState;
    }

    const currentX = x + (clip.x * zoom);
    const currentXWithoutZoom = x + clip.x;

    const targetArea = document.getElementById("clipTargetArea");
    if (targetArea) {
        const newItem = createNewItem(currentXWithoutZoom);
        const notChildrenItems = itemsBackup.filter(el => el.clipParentId !== clip.id);

        newItem.width = clip.width;

        itemCache = newItem;

        newItem.y = calculateNewY(notChildrenItems, { ...newItem, x: currentX }, zoom, true);

        const top = getCurrentY(newItem.y, wrapperHeight);
        const left = getTargetLeftPosition(clipsBackup, currentX, clip, zoom)

        targetArea.style.left = `${left}px`;
        targetArea.style.top = `${top}px`;

        clips.forEach(clipItem => hideClipOutlineShape(clipItem, zoom));

        itemCache = null;

        return;
    }

    const newTargetArea = document.createElement("div");
    newTargetArea.style.position = "absolute";
    newTargetArea.style.left = `${currentX}px`;
    newTargetArea.style.display = "block";
    newTargetArea.style.width = `${clip.width * zoom}px`;
    newTargetArea.style.height = `24px`;
    newTargetArea.style.borderRadius = '4px';
    newTargetArea.style.border = "1px solid #3782f7";

    const newItem = createNewItem(currentXWithoutZoom);
    const notChildrenItems = itemsBackup.filter(el => el.clipParentId !== clip.id);
    newItem.width = clip.width * zoom;
    newItem.y = calculateNewY(notChildrenItems, newItem);
    const top = getCurrentY(newItem.y, wrapperHeight);

    newTargetArea.style.top = `${top}px`;
    newTargetArea.id = "clipTargetArea";

    const itemsWrapperRef = document.getElementById("itemsContainer");
    itemsWrapperRef.appendChild(newTargetArea);

    clips.forEach(clipItem => hideClipOutlineShape(clipItem, zoom));
}

export const removeTargetArea = () => {
    const targetArea = document.getElementById("clipTargetArea");
    const itemsWrapperRef = document.getElementById("itemsContainer");

    if (targetArea) {
        itemsWrapperRef.removeChild(targetArea);
    }
}

const createNewItem = (left: number) => ({
    id: uuid4(),
    name: "",
    type: [ItemType.audio, ItemType.element, ItemType.text, ItemType.video][Math.floor(Math.random() * 5)],
    width: 202,
    x: left,
    y: 0,
})

export const getXfromDomElement = (domRef: HTMLElement) => {
    return Number(domRef.style.left.split('px')[0]);
}

export const setItemsCache = (items: Item[]) => {
    items.forEach(item => itemsCache[item.id] = { ...item });
}

export const setClipsCache = (clips: SideClip[]) => {
    clips.forEach(clipItem => clipsCache[clipItem.id] = { ...clipItem });
}


export const adaptItemsToRightClipResize = (clip: ClipItem, items: Item[], clipOffset: number, zoom: number) => {
    let childItems = items.filter(item => item.clipParentId === clip.id);

    childItems.forEach((item, i) => {
        if ((item.x * zoom) >= clipOffset) {

            const newX = clipOffset - 1

            childItems[i] = { ...item, x: clipOffset / zoom - 1 };

            const itemId = item.type !== ItemType.video ? item.id : `video-${item.id}`
            const itemRef = document.getElementById(itemId);
            itemRef.style.left = `${newX}px`;
        }
    });

    setItemsCache(childItems)
}

// export const

export const adapItemsToLeftClipResize = (props: AdapItemsToLeftClipResizeProps) => {
    const { clip, clipX, clips, items, startX, zoom } = props;
    let childItems = items.filter(item => item.clipParentId === clip.id);

    const space = clipX - startX;

    const newXWithZoom = (clip.x * zoom) + (clip.width * zoom) - space + 1;

    childItems.forEach((item, i) => {
        if ((item.x * zoom) >= (clip.x * zoom) + (clip.width * zoom) - space) {

            childItems[i] = { ...item, x: newXWithZoom / zoom };

            const itemId = item.type !== ItemType.video ? item.id : `video-${item.id}`
            const itemRef = document.getElementById(itemId);
            itemRef.style.left = `${newXWithZoom}px`;
        }

    });

    setItemsCache(childItems);
}

export const adaptWrapperAndNextClips = (props: AdaptWrapperAndNextClipsProps) => {
    const { clip, clipX, clips, items, startX } = props;

    const space = clipX - startX;

    const nextClips = clips.filter(clipItem => clipItem.x > clip.x);

    nextClips.forEach(clipItem => {
        const itemDomRef = document.getElementById(clipItem.id);
        itemDomRef.style.transform = `translateX(${-space}px)`;


        const children = getChildrenItems(clipItem.id, items);

        children.forEach(child => {
            const childDomRef = document.getElementById(child.id);
            childDomRef.style.transform = `translateX(${-space}px)`;
        });
    });

    const itemsWrapper = document.getElementById("timelineWrapper");
    itemsWrapper.style.transform = `translateX(${space}px)`;
}

export const updateClipChildItemPosition = (items: Item[]) => {
    const newState = [...items];
    // console.log(itemsCache)
    for (let id in itemsCache) {
        const itemIndex = items.findIndex(item => item.id === id);
        newState.splice(itemIndex, 1, itemsCache[id]);
    };

    clearItemsCache();

    return newState;
}

export const reasignPosition = (props: ReasignPositionProps) => {
    const { clips, newClipList, selectedClip, items } = props;

    const newClipsState = [...newClipList]
    const newItemsState = [...items];

    const newClip = newClipList.find(clipItem => clipItem.id === selectedClip.id);
    if (newClip.id !== selectedClip.id) return { newClipsState, newItemsState };
    if (parseInt(newClip.x.toFixed()) === parseInt(selectedClip.x.toFixed())) {
        return { newClipsState, newItemsState };
    }

    const itemsWrapper = document.getElementById("timelineWrapper");
    itemsWrapper.style.marginLeft = `0px`;

    const prevClips = clips.filter(clipItem =>
        clipItem.x < selectedClip.x
    ).map(clipItem => ({
        ...clipItem,
        distance: selectedClip.x - (clipItem.x + clipItem.width)
    })).sort((a, b) => a.distance - b.distance);

    const nextClips = clips.filter(
        clipItem => clipItem.x > selectedClip.x && clipItem.id !== selectedClip.id
    ).map(clipItem => ({
        ...clipItem,
        distance: clipItem.x - (selectedClip.x + selectedClip.width)
    })).sort((a, b) => a.distance - b.distance);

    const prevClip = prevClips[0];

    const newClipX = prevClip ? prevClip.x + prevClip.width : 0;

    const newClipIndex = newClipList.findIndex(clipItem => clipItem.id === selectedClip.id);
    newClipsState.splice(newClipIndex, 1, { ...newClip, x: newClipX });

    if (nextClips) {
        nextClips.forEach(clipItem => {
            delete clipItem.distance;
            const newItemClip = { ...clipItem, x: clipItem.x - (selectedClip.width - newClip.width) };
            const newItemClipIndex = newClipsState.findIndex(el => el.id === clipItem.id);
            newClipsState.splice(newItemClipIndex, 1, newItemClip);

            items.forEach((item, index) => {
                if (item.clipParentId === clipItem.id) {
                    const newItem = { ...item, x: item.x - (selectedClip.width - newClip.width) };
                    newItemsState.splice(index, 1, newItem);
                }
            });
        });
    }

    return { newClipsState, newItemsState };

}

export const moveRightClips = (props: MoveSideClips) => {
    const { clips, currentWidth, items, selectedClip, scaleFactor } = props;

    const zoom = getZoom(scaleFactor);

    const rightClips: SideClip[] = clips.filter(
        clipItem => clipItem.x > selectedClip.x
    ).map(
        c => ({ ...c, childrenItems: [] })
    );

    const diference = currentWidth - selectedClip.width;
    const diferenceWithZoom = (currentWidth * zoom) - (selectedClip.width * zoom);

    rightClips.forEach((clipItem, i) => {
        const clipItemDomRef = document.getElementById(clipItem.id);
        clipItemDomRef.style.left = `${(zoom !== 0 ? (clipItem.x * zoom) : clipItem.x) + diferenceWithZoom}px`;
        clipItemDomRef.style.transition = "0s";

        let children = getChildrenItems(clipItem.id, items);

        children.map((child, index) => {
            const childRef = document.getElementById(child.id);
            const childX = zoom !== 0 ? child.x * zoom : child.x;
            childRef.style.left = `${childX + diferenceWithZoom}px`;
            childRef.style.transition = "0s";
            children[index] = { ...child, x: child.x + diference };
        })

        rightClips[i] = { ...clipItem, x: clipItem.x + diference, childrenItems: children };

    })

    setClipsCache(rightClips);
}

export const moveLeftClips = (props: MoveSideClips) => {
    const { clips, currentWidth, items, selectedClip } = props;

    const leftClips = clips.filter(clipItem => clipItem.x < selectedClip.x);

    const diference = selectedClip.width - currentWidth;

    leftClips.forEach((clipItem, i) => {
        const clipItemDomRef = document.getElementById(clipItem.id);
        clipItemDomRef.style.left = `${clipItem.x - diference}px`;
        clipItemDomRef.style.transition = "0s";
        leftClips[i] = { ...clipItem, x: clipItem.x - diference };

        const children = getChildrenItems(clipItem.id, items);

        children.forEach(child => {
            const childRef = document.getElementById(child.id);
            childRef.style.left = `${child.x - diference}px`;
            childRef.style.transition = "0s";
        })

    })

    // setClipsCache(leftClips);
}

export const updateSideClipsPosition = (clips: ClipItem[], items: Item[]) => {
    const newClipsState = [...clips];
    const newItemsState = [...items];

    for (let id in clipsCache) {
        const clipIndex = clips.findIndex(clipItem => clipItem.id === id);
        const newClip = { ...clipsCache[id] };
        delete newClip.childrenItems;
        newClipsState.splice(clipIndex, 1, newClip);

        clipsCache[id].childrenItems.forEach(item => {
            const itemIndex = items.findIndex(el => el.id === item.id);
            newItemsState.splice(itemIndex, 1, item);
        });
    }

    return { newClipsState, newItemsState };
}

export const handleCollidingRightItems = (props: HandleCollidingItemsProps) => {
    const { itemId, items, wrapperHeight, zoom } = props;
    const sortedItems = [...items].sort((a, b) => a.x - b.x);
    const selectedItem = sortedItems.find(el => el.id === itemId);
    const itemIndex = sortedItems.findIndex(el => el.id === itemId);
    const nextItems = sortedItems.slice(itemIndex + 1).filter(it => it.y >= selectedItem.y);

    const itemRef = document.getElementById(selectedItem.type !== ItemType.video ? itemId : `video-${itemId}`);
    const itemRefX = getXfromDomElement(itemRef);
    const itemRefWidth = itemRef.getBoundingClientRect().width;

    const itemRefOffset = itemRefX + itemRefWidth;

    nextItems.forEach(item => {
        const collides = item.x * zoom < itemRefOffset;
        const greater = item.x > selectedItem.x + selectedItem.width;
        const overlapedItems = getOverlapedItems(items, item).filter(it => it.y >= selectedItem.y);;
        const firstItem = overlapedItems.find(el => el.y === selectedItem.y);

        if (collides && greater && !itemsCache[item.id]) {
            const newItem = { ...item, y: item.y + 24 };


            if ((!firstItem && item.y >= selectedItem.y) || (firstItem && (firstItem.x < itemRefOffset && item.x < firstItem.x))) {
                const itemId = item.type !== ItemType.video ? item.id : `video-${item.id}`
                const itemDomRef = document.getElementById(itemId);
                const itemDomTop = Number(itemDomRef.style.top.split('px')[0]);
                itemDomRef.style.transition = "0.15s";
                itemDomRef.style.top = `${itemDomTop - 24}px`;
                itemsCache[item.id] = newItem;

            }

            if (item.y === selectedItem.y) {
                overlapedItems.forEach(el => {
                    const isNotCurrentItem = el.id !== item.id;
                    const isToRight = el.x >= item.x;

                    if (isNotCurrentItem && (isToRight || (!isToRight && selectedItem.x + selectedItem.width >= el.x))) {
                        const elRef = document.getElementById(el.id);
                        const elRefTop = Number(elRef.style.top.split('px')[0]);
                        elRef.style.top = `${elRefTop - 24}px`

                        itemsCache[el.id] = { ...el, y: el.y + 24 };

                    }
                })
            }
        }



        if (!collides && itemsCache[item.id]) {

            if (!firstItem) {
                const itemId = item.type !== ItemType.video ? item.id : `video-${item.id}`
                const itemDomRef = document.getElementById(itemId);
                const itemDomTop = Number(itemDomRef.style.top.split('px')[0]);

                const currentTop = wrapperHeight - itemDomTop;

                itemsCache[item.id] = { ...item, y: currentTop - 24 };
                itemDomRef.style.top = `${itemDomTop + 24}px`;

                delete itemsCache[item.id];

                overlapedItems.forEach(el => {
                    const isNotCurrentItem = el.id !== item.id;
                    const isToRight = el.x >= item.x;

                    if (isNotCurrentItem && isToRight) {
                        const elRef = document.getElementById(el.id);
                        const elRefTop = Number(elRef.style.top.split('px')[0]);
                        elRef.style.top = `${elRefTop + 24}px`

                        delete itemsCache[el.id];
                    } else if (isNotCurrentItem && !isToRight) {
                        const bottomItems = getOverlapedItems(items, el).filter(
                            it => it.y === selectedItem.y && it.id !== selectedItem.id
                        );

                        if (bottomItems.length === 1) {
                            const elRef = document.getElementById(el.id);
                            const elRefTop = Number(elRef.style.top.split('px')[0]);
                            elRef.style.top = `${elRefTop + 24}px`

                            delete itemsCache[el.id];
                        }
                    }

                });
            }
        }
    })
}

export const handleCollidingLeftItems = (props: HandleCollidingItemsProps) => {
    const { itemId, items, wrapperHeight, zoom } = props;

    const sortedItems = [...items].sort((a, b) => b.x - a.x);
    const selectedItem = sortedItems.find(el => el.id === itemId);
    const itemIndex = sortedItems.findIndex(el => el.id === itemId);
    const prevItems = sortedItems.slice(itemIndex + 1).filter(it => it.y >= selectedItem.y);

    const itemRef = document.getElementById(selectedItem.type !== ItemType.video ? itemId : `video-${itemId}`);
    const itemRefX = getXfromDomElement(itemRef);
    const itemRefWidth = itemRef.getBoundingClientRect().width;

    prevItems.forEach(item => {
        const collides = item.x * zoom + item.width * zoom > itemRefX;
        const isBefore = item.x + item.width <= selectedItem.x;
        const overlapedItems = getOverlapedItems(items, item).filter(it => it.y >= selectedItem.y);
        const firstItem = overlapedItems.find(el => el.y === selectedItem.y);

        if (collides && isBefore && !itemsCache[item.id]) {
            const newItem = { ...item, y: item.y + 24 };

            if ((!firstItem && item.y >= selectedItem.y) || (firstItem && (firstItem.x + firstItem.width > itemRefX && item.x > firstItem.x))) {
                const itemId = item.type !== ItemType.video ? item.id : `video-${item.id}`
                const itemDomRef = document.getElementById(itemId);
                const itemDomTop = Number(itemDomRef.style.top.split('px')[0]);
                itemDomRef.style.transition = "0.15s";
                itemDomRef.style.top = `${itemDomTop - 24}px`;
                itemsCache[item.id] = newItem;

                if (item.y === selectedItem.y) {
                    overlapedItems.forEach(el => {
                        const isNotCurrentItem = el.id !== item.id;
                        const isToLeft = item.x >= el.x

                        if (isNotCurrentItem && (isToLeft || (!isToLeft && selectedItem.x <= el.x + el.width))) {
                            const elRef = document.getElementById(el.id);
                            const elRefTop = Number(elRef.style.top.split('px')[0]);
                            elRef.style.top = `${elRefTop - 24}px`

                            itemsCache[el.id] = { ...el, y: + 24 };
                        }
                    })
                }

            }
        }

        if (!collides && itemsCache[item.id]) {
            if (!firstItem) {
                const itemId = item.type !== ItemType.video ? item.id : `video-${item.id}`
                const itemDomRef = document.getElementById(itemId);
                const itemDomTop = Number(itemDomRef.style.top.split('px')[0]);

                const currentTop = wrapperHeight - itemDomTop;

                itemsCache[item.id] = { ...item, y: currentTop - 24 };
                itemDomRef.style.top = `${itemDomTop + 24}px`;

                delete itemsCache[item.id];


                overlapedItems.forEach(el => {
                    const isNotCurrentItem = el.id !== item.id;
                    const isToLeft = item.x >= el.x;

                    if (isNotCurrentItem && isToLeft) {
                        const elRef = document.getElementById(el.id);
                        const elRefTop = Number(elRef.style.top.split('px')[0]);
                        elRef.style.top = `${elRefTop + 24}px`

                        delete itemsCache[el.id];
                    } else if (isNotCurrentItem && !isToLeft) {
                        const bottomItems = getOverlapedItems(items, el).filter(
                            it => it.y === selectedItem.y && it.id !== selectedItem.id
                        );

                        if (bottomItems.length === 1) {
                            const elRef = document.getElementById(el.id);
                            const elRefTop = Number(elRef.style.top.split('px')[0]);
                            elRef.style.top = `${elRefTop + 24}px`

                            delete itemsCache[el.id];
                        }
                    }

                });
            }
        }
    })
}

export const setBluePlayhead = () => {
    const playhead = document.getElementById('playHead');
    const head = playhead.children[0] as HTMLDivElement;
    const line = playhead.children[1] as HTMLDivElement;

    head.style.borderTop = "15px solid #3782F7";
    line.style.backgroundColor = "#3782F7";
}

export const setRedPlayhead = () => {
    const playhead = document.getElementById('playHead');
    const head = playhead.children[0] as HTMLDivElement;
    const line = playhead.children[1] as HTMLDivElement;

    head.style.borderTop = "15px solid #D30000";
    line.style.backgroundColor = "#D30000";
}

export const magneticEffect = (props: MagneticEffectProps) => {
    const { item, items, x, zoom, setPosition, y, showGuide, hideGuide, setGuideLeft, fromClipShape = false, clipDeltaX = 0, clientX } = props;

    const currentX = !fromClipShape ? item.x * zoom + x : item.x;

    const overlaped = items.filter(el => {
        const currentItemOffset = currentX + item.width * zoom;
        const elOffset = el.x * zoom + el.width * zoom;

        const isNotCurrentItem = item.id !== el.id;
        // const isNotInTheSameY = el.y !== item.y
        const rightOverlap = el.x * zoom < currentItemOffset && el.x * zoom > currentX;
        const lefOverlap = elOffset > currentX && elOffset < currentItemOffset;
        const isWhithinELRange = currentItemOffset - 1 >= el.x * zoom && currentItemOffset <= elOffset;

        return (isNotCurrentItem && (rightOverlap || lefOverlap || isWhithinELRange));
    });

    const sortedOverlaps = overlaped.sort((a, b) => b.y - a.y);

    const lastStackItem = sortedOverlaps[0];

    if (!lastStackItem) {
        magneticPlayhead({ ...props });
        return;
    };

    const toLeft = !fromClipShape ? currentX < item.x * zoom : true;
    const toRight = !fromClipShape ? currentX > item.x * zoom : true;
    const itemOffset = currentX + item.width * zoom;

    const lastStackItemX = lastStackItem.x * zoom;
    const lastStackItemOffset = lastStackItem.x * zoom + lastStackItem.width * zoom

    const currentXPosition = isDraggingToLeft && currentX > lastStackItemX + 5 && lastStickPosition === lastStackItemX ? currentX - Math.abs(distanceCache) : currentX;
    const currentItemOffset = !isDraggingToLeft && itemOffset < lastStackItemOffset - 5 && lastStickPosition === lastStackItemOffset ? itemOffset + Math.abs(distanceCache) : itemOffset

    if (currentXPosition >= lastStackItemX - 5 && currentXPosition <= lastStackItemX + 5 && toLeft) {

        const diference = currentX - lastStackItem.x * zoom;
        const positionX = !fromClipShape ? x - diference : clipDeltaX - diference;

        distanceCache = diference * -1;

        const itemDomX = getXfromDomElement(getDomElementRef(item));
        const magneticItemRef = getDomElementRef(lastStackItem);
        const magneticItemX = getXfromDomElement(magneticItemRef);

        let clientXDiference = Math.abs(clientX - (clientXFlag || 0));

        setPosition(positionX + clientXDiference, y, diference - clientXDiference, 'head');

        if (Math.round(itemDomX + x - diference) === Math.round(magneticItemX)) {
            clientXFlag = clientX;
        }

        // setPosition(positionX, y, diference, 'head');
        showGuide();
        setGuideLeft(currentX - diference);

        lastStickPosition = lastStackItemX;

    } else if (currentItemOffset >= lastStackItemOffset - 5 && currentItemOffset <= lastStackItemOffset + 5 && toRight) {

        const diference = lastStackItemOffset - itemOffset;
        const positionX = !fromClipShape ? x + diference : clipDeltaX + diference;

        distanceCache = diference;

        const itemDomX = getXfromDomElement(getDomElementRef(item));
        const itemDomWidth = getDomElementRef(item).getBoundingClientRect().width;
        const magneticItemRef = document.getElementById(lastStackItem.id);
        const magneticItemX = getXfromDomElement(magneticItemRef);
        const magneticItemWidth = magneticItemRef.getBoundingClientRect().width

        const itemDomOffset = itemDomX + itemDomWidth;
        const magneticItemOffset = magneticItemX + magneticItemWidth;

        let clientXDiference = Math.abs(clientX - (clientXFlag || 0));

        setPosition(positionX - clientXDiference, y, diference + clientXDiference, 'tail');

        if (Math.round(itemDomOffset + x + diference) === Math.round(magneticItemOffset)) {
            clientXFlag = clientX;
        }
        showGuide();
        setGuideLeft(currentX + diference + item.width * zoom);

        lastStickPosition = lastStackItemOffset;
    } else {
        hideGuide();
        magneticPlayhead({ ...props });
    }
}


const magneticPlayhead = (props: MagneticEffectProps) => {
    const { item, x, zoom, setPosition, y, hideGuide, fromClipShape = false, clipDeltaX = 0, clientX } = props;

    const currentX = !fromClipShape ? item.x * zoom + x : item.x;

    const toLeft = !fromClipShape ? currentX < item.x * zoom : true;
    const toRight = !fromClipShape ? currentX > item.x * zoom : true;
    const itemOffset = currentX + item.width * zoom;

    const playHeadRef = document.getElementById('playheadWrapper');
    const playHeadX = getXfromDomElement(playHeadRef)

    const headDistance = Math.abs(playHeadX - currentX);
    const tailDistance = Math.abs(playHeadX - itemOffset);

    const isHeadCloser = headDistance < tailDistance;

    const currentXPosition = isDraggingToLeft && currentX > playHeadX + 10 && lastStickPosition === playHeadX ? currentX - Math.abs(distanceCache) : currentX;
    const currentItemOffset = !isDraggingToLeft && itemOffset < playHeadX - 10 && lastStickPosition === playHeadX ? itemOffset + Math.abs(distanceCache) : itemOffset

    if (currentXPosition >= playHeadX - 10 && currentXPosition <= playHeadX + 10 && toLeft) {

        const diference = currentX - playHeadX;
        const positionX = !fromClipShape ? x - diference : clipDeltaX - diference;

        distanceCache = diference * -1;

        const itemDomX = getDomElementRef(item).getBoundingClientRect().x
        const magneticPlayheadX = playHeadRef.getBoundingClientRect().x;

        let clientXDiference = Math.abs(clientX - (clientXFlag || 0));

        setPosition(positionX + clientXDiference, y, diference - clientXDiference, 'head');


        if (Math.round(itemDomX + x - diference) === (Math.round(magneticPlayheadX))) {
            clientXFlag = clientX;
        }

        setBluePlayhead();
        lastStickPosition = playHeadX
    } else if (currentItemOffset >= playHeadX - 10 && currentItemOffset <= playHeadX + 10 && toRight) {

        const diference = playHeadX - itemOffset;
        const positionX = !fromClipShape ? x + diference : clipDeltaX + diference;

        distanceCache = diference;



        const itemDomX = getDomElementRef(item).getBoundingClientRect().x;
        const itemDomWidth = getDomElementRef(item).getBoundingClientRect().width;
        const magneticPlayheadX = playHeadRef.getBoundingClientRect().x;

        const itemDomOffset = itemDomX + itemDomWidth;

        let clientXDiference = Math.abs(clientX - (clientXFlag || 0));

        setPosition(positionX - clientXDiference, y, diference + clientXDiference, 'tail');

        if (Math.round(itemDomOffset + x + diference) === Math.round(magneticPlayheadX)) {
            clientXFlag = clientX;
        }

        setBluePlayhead();
        lastStickPosition = playHeadX
    } else {
        hideGuide();
        setRedPlayhead();
        magneticClip({ ...props });
    }

}


export const magneticClip = (props: MagneticEffectProps) => {
    const { item, x, zoom, clips, setPosition, y, showGuide, hideGuide, setGuideLeft, fromClipShape = false, clipDeltaX = 0, clientX } = props;

    const currentX = !fromClipShape ? item.x * zoom + x : item.x;

    if (!lastItemX) {
        lastItemX = item.x * zoom;
    }

    const itemOffset = currentX + item.width * zoom;

    lastItemX = currentX;

    let clip: ClipItem

    let compareWithNext = false;

    const prevClip = [...clips].sort((a, b) => b.x - a.x).find(clipItem => clipItem.x * zoom <= currentX);
    const nextClip = [...clips].sort((a, b) => a.x - b.x).find(
        clipItem => clipItem.x * zoom + clipItem.width * zoom >= itemOffset
    );


    if (prevClip && nextClip) {
        const prevClipDistance = currentX - (prevClip?.x || 0) * zoom;
        const nextClipDistance = ((nextClip.x || 0) * zoom + (nextClip.width || 0) * zoom) - itemOffset;

        clip = nextClipDistance < prevClipDistance ? nextClip : prevClip;
        compareWithNext = nextClipDistance < prevClipDistance

    } else if (!prevClip && nextClip) {
        clip = nextClip
        compareWithNext = true;

    } else if (prevClip && !nextClip) {
        clip = prevClip;
        compareWithNext = false
    } else {
        hideGuide();
        return
    }


    if (!compareWithNext) {

        const clipX = clip.x * zoom;

        const currentXPosition = isDraggingToLeft && currentX > clipX + 10 && lastStickPosition === clipX ? currentX - Math.abs(distanceCache) : currentX;

        if (currentXPosition >= clipX - 10 && currentXPosition <= clipX + 10) {
            const diference = currentX - clipX;
            const positionX = !fromClipShape ? x - diference : clipDeltaX - diference;

            distanceCache = diference * -1;

            const itemDomX = getXfromDomElement(getDomElementRef(item));
            const clipDomRef = document.getElementById(clip.id);
            const clipDomX = getXfromDomElement(clipDomRef);

            let clientXDiference = Math.abs(clientX - (clientXFlag || 0));

            setPosition(positionX + clientXDiference, y, diference - clientXDiference, 'head');

            if (Math.round(itemDomX + x - diference) === Math.round(clipDomX)) {
                clientXFlag = clientX;
            }

            showGuide();
            setGuideLeft(currentX - diference);
            lastStickPosition = clipX;
            return
        }
    } else {

        const clipOffset = clip.x * zoom + clip.width * zoom;

        const currentItemOffset = !isDraggingToLeft && itemOffset < clipOffset - 10 && lastStickPosition === clipOffset ? itemOffset + Math.abs(distanceCache) : itemOffset

        if (currentItemOffset >= clipOffset - 10 && currentItemOffset <= clipOffset + 10) {
            const diference = clipOffset - itemOffset;
            const positionX = !fromClipShape ? x + diference : clipDeltaX + diference;

            distanceCache = diference;

            const itemDomX = getXfromDomElement(getDomElementRef(item));
            const itemDomWidth = getDomElementRef(item).getBoundingClientRect().width;
            const clipDomRef = document.getElementById(clip.id);
            const clipDomX = getXfromDomElement(clipDomRef);
            const clipDomWidth = clipDomRef.getBoundingClientRect().width

            const itemDomOffset = itemDomX + itemDomWidth;
            const clipDomOffset = clipDomX + clipDomWidth;

            let clientXDiference = Math.abs(clientX - (clientXFlag || 0));

            setPosition(positionX - clientXDiference, y, diference + clientXDiference, 'tail');

            if (Math.round(itemDomOffset + x + diference) === (Math.round(clipDomOffset))) {
                clientXFlag = clientX;
            }
            showGuide();
            setGuideLeft(currentX + diference + item.width * zoom);
            lastStickPosition = clipOffset;
            return
        }
    }

    hideGuide();
}

export const getTrimmingOverlaps = (item: Item, items: Item[], zoom: number) => {
    const itemId = item.type !== ItemType.video ? item.id : `video-${item.id}`
    const itemDomRef = document.getElementById(itemId);
    const itemX = getXfromDomElement(itemDomRef);
    const itemW = itemDomRef.getBoundingClientRect().width;
    const currentItemOffset = itemX + itemW;

    const overlaped = items.filter(el => {
        const elOffset = el.x * zoom + el.width * zoom;
        const elX = el.x * zoom;

        const isNotCurrentItem = item.id !== el.id;
        // const isNotInTheSameY = el.y !== item.y
        const rightOverlap = elX < currentItemOffset && elX > itemX;
        const lefOverlap = elOffset > itemX && elOffset < currentItemOffset;
        const isWhithinELRange = currentItemOffset - 1 >= elX && currentItemOffset <= elOffset;

        return (isNotCurrentItem && (rightOverlap || lefOverlap || isWhithinELRange));
    });

    return overlaped;
}

export const rightTrimmingMagnetic = (props: TrimmingMagneticProps) => {
    const { item, items, setGuideLeft, showGuide, zoom, hideGuide } = props;
    const overlaped = getTrimmingOverlaps(item, items, zoom);

    const itemId = item.type !== ItemType.video ? item.id : `video-${item.id}`
    const itemDomRef = document.getElementById(itemId);
    const itemX = getXfromDomElement(itemDomRef);
    const itemW = itemDomRef.getBoundingClientRect().width;
    const currentItemOffset = itemX + itemW;

    const sortedOverlaps = overlaped.sort((a, b) => b.y - a.y);
    const lastStackItem = sortedOverlaps[0];

    if (!lastStackItem) {
        hideGuide();
        return { diference: 0 };
    }

    const lastStackItemOffset = lastStackItem.x * zoom + lastStackItem.width * zoom

    if (currentItemOffset >= lastStackItemOffset - 10 && currentItemOffset <= lastStackItemOffset + 5) {

        const diference = lastStackItemOffset - currentItemOffset;

        const itemRef = document.querySelector(`.item-${item.id}`) as HTMLDivElement;
        itemRef.style.width = `${itemW + diference}px`

        showGuide();
        setGuideLeft(lastStackItemOffset);

        return { diference }
    } else {
        hideGuide();

        return { diference: 0 }
    }
}

export const leftTrimmingMagnetic = (props: TrimmingMagneticProps) => {
    const { item, items, setGuideLeft, showGuide, zoom, hideGuide } = props;
    const overlaped = getTrimmingOverlaps(item, items, zoom);

    const itemId = item.type !== ItemType.video ? item.id : `video-${item.id}`
    const itemDomRef = document.getElementById(itemId);
    const itemX = getXfromDomElement(itemDomRef);
    const itemRef = document.querySelector(`.item-${item.id}`) as HTMLDivElement;
    const itemW = itemRef.getBoundingClientRect().width;

    const sortedOverlaps = overlaped.sort((a, b) => b.y - a.y);
    const lastStackItem = sortedOverlaps[0];

    if (!lastStackItem) {
        hideGuide();
        return { diference: 0 };
    }

    const lastStackItemX = lastStackItem.x * zoom;

    if (itemX >= lastStackItemX - 5 && itemX <= lastStackItemX + 10) {

        const diference = itemX - lastStackItemX;

        itemDomRef.style.left = `${itemX - diference}px`

        itemRef.style.width = `${itemW + diference}px`;

        showGuide();
        setGuideLeft(itemX - diference);


        return { diference };
    } else {
        hideGuide();
        return { diference: 0 };
    }
}

export const playHeadMagnetic = (props: PlayHeadMagneticProps) => {
    const { item, showGuide, setGuideLeft, hideGuide, toRight } = props;

    const playHeadRef = document.getElementById('playheadWrapper');
    const playHeadX = getXfromDomElement(playHeadRef)

    let distance = 0;


    const itemId = item.type !== ItemType.video ? item.id : `video-${item.id}`
    const itemWrapperRef = document.getElementById(itemId) as HTMLDivElement;
    const itemDomRef = document.querySelector(`.item-${item.id}`) as HTMLDivElement;
    const itemWidth = itemDomRef.getBoundingClientRect().width;
    const itemX = getXfromDomElement(itemWrapperRef);

    if (toRight) {
        const itemOffset = itemX + itemWidth;

        if (itemOffset >= playHeadX - 10 && itemOffset <= playHeadX + 5) {
            distance = playHeadX - itemOffset;

            itemDomRef.style.width = `${itemWidth + distance}px`;

            setBluePlayhead()
            setGuideLeft(playHeadX);
            return { distance }

        }

    } else {
        if (itemX >= playHeadX - 5 && itemX <= playHeadX + 10) {
            distance = itemX - playHeadX;

            itemWrapperRef.style.left = `${itemX - distance}px`

            itemDomRef.style.width = `${itemWidth + distance}px`;

            setBluePlayhead();
            setGuideLeft(itemX - distance);

            return { distance }
        }
    }

    setRedPlayhead();
    hideGuide();
    return { distance }

};

export const clipMagnetic = (props: ClipMagneticProps): { clipDistance: number } => {

    const { item, clips, toRight, zoom, hideGuide, setGuideLeft, showGuide } = props;

    const itemId = item.type !== ItemType.video ? item.id : `video-${item.id}`
    const itemWrapperRef = document.getElementById(itemId) as HTMLDivElement;
    const itemDomRef = document.querySelector(`.item-${item.id}`) as HTMLDivElement;
    const itemWidth = itemDomRef.getBoundingClientRect().width;
    const itemX = getXfromDomElement(itemWrapperRef);

    const itemOffset = itemX + itemWidth;

    let clipDistance = 0;

    if (toRight) {
        const sortedClips = [...clips].sort((a, b) => a.x - b.x);
        const nextClip = sortedClips.find(clipItem =>
            clipItem.x * zoom + clipItem.width * zoom > itemOffset
        );

        if (!nextClip) {
            hideGuide();
            return { clipDistance }
        }

        const nextClipOffset = nextClip.x * zoom + nextClip.width * zoom;


        if (itemOffset >= nextClipOffset - 10 && itemOffset <= nextClipOffset + 5) {
            clipDistance = nextClipOffset - itemOffset;

            itemDomRef.style.width = `${itemWidth + clipDistance}px`;

            showGuide();
            setGuideLeft(nextClipOffset);
            return { clipDistance }

        }

    } else {

        const sortedClips = [...clips].sort((a, b) => b.x - a.x);
        const clip = sortedClips.find(clipItem => clipItem.x * zoom <= itemX);

        if (!clip) {
            hideGuide();
            return { clipDistance }
        }

        const clipX = clip.x * zoom;

        if (itemX >= clipX - 5 && itemX <= clipX + 10) {
            clipDistance = itemX - clipX;

            itemWrapperRef.style.left = `${itemX - clipDistance}px`

            itemDomRef.style.width = `${itemWidth + clipDistance}px`;

            showGuide();
            setGuideLeft(itemX - clipDistance);

            return { clipDistance }
        }
    }

    hideGuide();
    return { clipDistance };
}


export const getHoveredItemOrClip = (ev: React.MouseEvent, items: Item[], clips) => {
    const clientX = ev.clientX;
    const clientY = ev.clientY;

    let itemOvered: HTMLDivElement;
    let itemIndex: number;
    let itemId: string;
    let hoveredItem: Item | ClipItem;

    items.forEach((item, index) => {

        const itemDomRef = document.querySelector(`.item-${item.id}`) as HTMLDivElement;
        const { x, y, width, height } = itemDomRef.getBoundingClientRect();

        const isOverXAxe = clientX >= x && clientX <= x + width;
        const isOverYAxe = clientY >= y && clientY <= y + height;
        if (isOverXAxe && isOverYAxe) {
            itemOvered = itemDomRef;
            itemId = item.id;
            itemIndex = index;
            hoveredItem = item;
        }
    });

    clips.forEach((clip, index) => {

        const clipDomRef = document.querySelector(`.item-${clip.id}`) as HTMLDivElement;
        const { x, y, width, height } = clipDomRef.getBoundingClientRect();

        const isOverXAxe = clientX >= x && clientX <= x + width;
        const isOverYAxe = clientY >= y && clientY <= y + height;

        if (isOverXAxe && isOverYAxe) {
            itemOvered = clipDomRef;
            itemId = clip.id;
            itemIndex = index;
            hoveredItem = clip
        }
    });

    return {
        itemOvered,
        itemIndex,
        itemId,
        hoveredItem
    }
}

export const setIsToLeft = (x: number) => {
    isDraggingToLeft = x < prevX;
    prevX = x
}

// export const getZoom = (scaleFactor) => ((scaleFactor - minScaleValue) / scaleUnit) / 100;
export const getZoom = (scaleFactor: number) => scaleFactor * 10

export const getXfromClientX = (item: Item | ClipItem, clientX: number, zoom: number) => {
    const itemRef = document.querySelector(`.item-${item.id}`);
    const { left } = itemRef.getBoundingClientRect();

    const cursorPosition = clientX - left;
    const positionWithoutZoom = zoom !== 0 ? cursorPosition / zoom : cursorPosition;

    return item.x + positionWithoutZoom;
};

export const getProjectDuration = (clips: ClipItem[], items: Item[], zoom: number) => {
    const lastClip = [...clips].sort((a, b) => b.x - a.x)[0];
    const lastClipTailX = (lastClip?.x * zoom + lastClip?.width * zoom) || 0;

    const maxItemX = items.filter(
        item => item.x * zoom + item.width * zoom > lastClipTailX
    ).map(item => item.x * zoom + item.width * zoom)[0] || 0;

    return Math.max(lastClipTailX, maxItemX);
}


const getDomElementRef = (item: Item | ClipItem) => {
    const id = item.type !== ItemType.video ? item.id : `video-${item.id}`;
    return document.getElementById(id);
}

export const getPlayheadX = (zoom: number) =>
    getXfromDomElement(document.getElementById("playheadWrapper")) / zoom

export const setTransitionToZero = (items: Item[], clips: ClipItem[]) => {
    clips.forEach(el => {
        const elDomRef = getDomElementRef(el);
        if (elDomRef) {
            elDomRef.style.transition = "0s"
        }
    })
}

export const setItemType = (fabricObject: any): ItemType => {
    if (fabricObject.type === 'StaticAudio') {
        return ItemType.audio;
    }

    if (fabricObject.type === 'StaticGIF') {
        return ItemType.gif
    }

    if (fabricObject.type === 'StaticText') {
        return ItemType.text
    }

    return ItemType.element;
}

export const setItemName = (
    obj: any,
    audiosNumber: number,
    textNumber: number,
    elementsNumber: number
): string => {

    if (obj.type === 'StaticAudio') {
        return `Audio ${audiosNumber}`;
    }

    if (obj.type === 'StaticText') {
        return `Text ${textNumber}`;
    }

    return `Element ${elementsNumber}`;
}

export const setItemWidth = (obj: any, scaleFactor: number) => {

    if (obj.totalDuration) {
        if (obj.type !== 'StaticGIF') {
            return obj.totalDuration * 100
        }
        return obj.totalDuration * scaleFactor
    }


    return 300;
}

export const setItemMaxWidth = (item: Item) => {
    return item.type !== ItemType.element && item.type !== ItemType.text ? item.width : Infinity
}