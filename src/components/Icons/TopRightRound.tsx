import React from 'react';

type TopRightRoundProps = {
    size: number;
    styles?: React.CSSProperties
}

export default function TopRightRound({ size, styles }: TopRightRoundProps) {
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
                d="M9 9.5a.5.5 0 00.5-.5V8A7.5 7.5 0 002 .5H1a.5.5 0 00-.5.5v8a.5.5 0 00.5.5h8z"
            ></path>
        </svg>
    )
}
