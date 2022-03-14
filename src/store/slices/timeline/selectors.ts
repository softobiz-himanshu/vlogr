import { RootState } from "@/store/rootReducer";

export const selectLineItems = (state: RootState) => state.timeline.items;
export const selectWrapperHeight = (state: RootState) => state.timeline.wrapperHeight;
export const selectClips = (state: RootState) => state.timeline.clips;
export const selectScaleFactor = (state: RootState) => state.timeline.scaleFactor;
export const selectTimelineTop = (state: RootState) => state.timeline.topPosition;
export const selectTimelineHeight = (state: RootState) => state.timeline.height;
export const selectShowGuide = (state: RootState) => state.timeline.showGuide;
export const selectGuideLeft = (state: RootState) => state.timeline.guideLeft;
export const selectTimelineWidth = (state: RootState) => state.timeline.width;
export const selectPlayheadPosition = (state: RootState) => state.timeline.playheadPosition;