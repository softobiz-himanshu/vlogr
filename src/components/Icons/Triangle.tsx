import React from 'react';

type TriangleProps = {
    size: number;
    styles?: React.CSSProperties
}

export default function Triangle({ size, styles = {} }: TriangleProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={size}
            fill="none"
            viewBox="0 0 14 13"
            style={{ ...styles }}
        >
            <path
                stroke="#999"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.52 2.2v8.362a.414.414 0 01-.115.288.387.387 0 01-.277.118H2.042a.384.384 0 01-.218-.068.404.404 0 01-.145-.182.42.42 0 01.085-.443L9.85 1.912a.38.38 0 01.428-.088c.072.03.133.083.176.15a.416.416 0 01.066.225z"
            ></path>
        </svg>
    )
}
