import React from 'react'
import { useSelector } from 'react-redux';
import { selectGuideLeft, selectShowGuide, selectTimelineHeight, selectTimelineTop } from '@/store/slices/timeline/selectors';

export default function GuideBar() {

    const show = useSelector(selectShowGuide);
    const guideX = useSelector(selectGuideLeft);


    const top = useSelector(selectTimelineTop);
    const height = useSelector(selectTimelineHeight);

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: `${guideX}px`,
                height: height,
                width: '1px',
                backgroundColor: "#3782F7",
                display: show ? "block" : "none",
                zIndex:99
            }}
        />
    )
}
