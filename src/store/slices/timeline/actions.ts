import { ClipItem } from "@/interfaces/ClipItem";
import { Item } from "@/interfaces/Item";
import { createAction } from "@reduxjs/toolkit";

export const setTimelineItems = createAction<{ items: Item[] }>('timeline/setElements');
export const removeItem = createAction<{ itemId: string }>('timeline/removeItem');
export const setWrapperHeight = createAction<{ height: number }>('timeline/setWrapperHeight');
export const setTimelineClips = createAction<{ clips: ClipItem[] }>('timeline/setClips');
export const setScaleFactor = createAction<{ scale: number }>('timeline/setScaleFactor');
export const setTimelineDimensions = createAction<{ top: number, height: number, width: number }>('timeline/setTimelineDimensions');
export const showGuide = createAction<{ visible: boolean }>('timeline/showGuide');
export const setGuideLeft = createAction<{ left: number }>('timeline/setGuideLeft');
export const setPlayheadPosition = createAction<{ position: number }>('timeline/playheadPosition');