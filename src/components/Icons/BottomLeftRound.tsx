import React from 'react';

type BottomLeftRoundProps = {
    size: number;
    styles?: React.CSSProperties
}


export default function BottomLeftRound({ size, styles }: BottomLeftRoundProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={size}
            fill="none"
            viewBox="0 0 10 10"
            style={{ ...styles }}
        >
            <path
                stroke="#999"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M1 .5a.5.5 0 00-.5.5v1A7.5 7.5 0 008 9.5h1a.5.5 0 00.5-.5V1A.5.5 0 009 .5H1z"
            ></path>
        </svg>

    )
}
