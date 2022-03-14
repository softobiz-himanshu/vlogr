import React from 'react';

type ArrowSquareRightProps = {
    size: number;
    styles?: React.CSSProperties;
}

export default function ArrowSquareRight({ size, styles = {} }: ArrowSquareRightProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={size}
            fill="none"
            viewBox="0 0 13 14"
            style={{ ...styles }}
        >
            <path
                stroke="#999"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.15 12.05l2.6-6.5a.325.325 0 00-.325-.325h-6.5a.325.325 0 00-.325.325L1 12.05c0 .18.146.325.325.325h6.5c.18 0 .325-.146.325-.325zM9.471 1l1.379 1.379-1.379 1.379M4 2.379h6.85"
            ></path>
        </svg>
    )
}
