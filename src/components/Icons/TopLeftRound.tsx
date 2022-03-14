import React from 'react';

type TopLeftRoundProps = {
    size: number;
    styles?: React.CSSProperties
}

export default function TopLeftRound({ size, styles = {} }: TopLeftRoundProps) {
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
                d="M9.5 1A.5.5 0 009 .5H8A7.5 7.5 0 00.5 8v1a.5.5 0 00.5.5h8a.5.5 0 00.5-.5V1z"
            ></path>
        </svg>
    )
}
