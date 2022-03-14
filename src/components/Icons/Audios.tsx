import React from 'react';

type AudiosProps = {
    size: number
    style?: React.CSSProperties
}

export default function Audios({ size, style = {} }: AudiosProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={size}
            fill="none"
            viewBox="0 0 25 24"
            style={{ ...style }}
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M8.254 21a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
            ></path>
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12.004 17.25V3.75l7.5 2.25v4.5l-7.5-2.25"
            ></path>
        </svg>
    );
}
