import React from 'react';

type PlayTrackProps = {
    size: number;
    styles?: React.CSSProperties
}

export default function PlayTrack({ size, styles = {} }: PlayTrackProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            // width="8"
            height={size}
            fill="none"
            viewBox="0 0 8 9"
            style={{...styles}}
        >
            <path
                fill="#BBBCBD"
                d="M7.174 3.529L1.551.092A.625.625 0 00.6.625v6.874a.625.625 0 00.95.533l5.624-3.436a.625.625 0 000-1.067z"
            ></path>
        </svg>
    )
}
