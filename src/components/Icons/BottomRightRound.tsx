import React from 'react';

type BottomRightRoundProps = {
    size: number;
    styles?: React.CSSProperties
}


export default function BottomRightRound({ size, styles }: BottomRightRoundProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={size}
            style={{ ...styles }}
            fill="none"
            viewBox="0 0 10 10"
        >
            <path
                stroke="#999"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M.5 9a.5.5 0 00.5.5h1A7.5 7.5 0 009.5 2V1A.5.5 0 009 .5H1a.5.5 0 00-.5.5v8z"
            ></path>
        </svg>
    )
}
