import React from 'react';

type FilePlusProps = {
    size: number
}

export default function FilePlus({ size }: FilePlusProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            fill="none"
            viewBox="0 0 32 32"
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M25 28H7a1 1 0 01-1-1V5a1 1 0 011-1h12l7 7v16a1 1 0 01-1 1z"
            ></path>
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M19 4v7h7M13 19h6M16 16v6"
            ></path>
        </svg>
    )
}
