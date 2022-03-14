import React from 'react';

type MagnifyingGlassProps = {
    size: number
}

export default function MagnifyingGlass({ size }: MagnifyingGlassProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height={size}
            fill="none"
            viewBox="0 0 24 24"
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M10.875 18.75a7.875 7.875 0 100-15.75 7.875 7.875 0 000 15.75zM16.443 16.443L20.999 21"
            ></path>
        </svg>
    )
}
