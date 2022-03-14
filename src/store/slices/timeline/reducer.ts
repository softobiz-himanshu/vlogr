import { initialScaleFactor } from "@/constants/contants";
import { ClipItem } from "@/interfaces/ClipItem";
import { Item } from "@/interfaces/Item";
import { createReducer } from "@reduxjs/toolkit";
import { setScaleFactor, setTimelineClips, setTimelineItems, setTimelineDimensions, setWrapperHeight, showGuide, setGuideLeft, removeItem, setPlayheadPosition } from "./actions";

interface LineItemsState {
    items: Item[]
    wrapperHeight: number
    clips: ClipItem[];
    scaleFactor: number;
    topPosition: number;
    height: number;
    showGuide: boolean;
    guideLeft: number;
    width: number;
    playheadPosition: number;
}

const initialState: LineItemsState = {
    items: [],
    wrapperHeight: 0,
    clips: [],
    scaleFactor: initialScaleFactor,
    topPosition: 0,
    height: 0,
    showGuide: false,
    guideLeft: 0,
    width: 0,
    playheadPosition: 0
}

export const timelineReducer = createReducer(initialState, builder => {
    builder.addCase(setTimelineItems, (state, { payload }) => {
        state.items = payload.items
    });

    builder.addCase(setWrapperHeight, (state, { payload }) => {
        state.wrapperHeight = payload.height
    });

    builder.addCase(setTimelineClips, (state, { payload }) => {
        state.clips = payload.clips;
    });

    builder.addCase(setScaleFactor, (state, { payload }) => {
        state.scaleFactor = payload.scale
    });

    builder.addCase(setTimelineDimensions, (state, { payload }) => {
        state.topPosition = payload.top;
        state.height = payload.height;
        state.width = payload.width
    });

    builder.addCase(showGuide, (state, { payload }) => {
        state.showGuide = payload.visible;
    });

    builder.addCase(setGuideLeft, (state, { payload }) => {
        state.guideLeft = payload.left
    });

    builder.addCase(removeItem, (state, { payload }) => {
        state.items = state.items.filter(item => item.id !== payload.itemId);
    });

    builder.addCase(setPlayheadPosition, (state, { payload }) => {
        state.playheadPosition = payload.position;
    })
})