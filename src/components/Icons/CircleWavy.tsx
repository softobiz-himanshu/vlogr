import React from 'react'

type CircleWavyProps = {
    styles?: React.CSSProperties
}

export default function CircleWavy({ styles = {} }: CircleWavyProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 16 16"
            style={{ ...styles }}
        >
            <path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3.404 12.596c-.575-.575-.194-1.783-.487-2.49C2.614 9.372 1.5 8.782 1.5 8c0-.782 1.114-1.372 1.417-2.106.293-.707-.088-1.915.487-2.49.575-.575 1.783-.194 2.49-.487C6.628 2.614 7.218 1.5 8 1.5c.782 0 1.372 1.114 2.106 1.417.707.293 1.915-.088 2.49.487.575.575.194 1.783.487 2.49C13.386 6.628 14.5 7.218 14.5 8c0 .782-1.114 1.372-1.417 2.106-.293.707.088 1.915-.487 2.49-.575.575-1.783.194-2.49.487C9.372 13.386 8.782 14.5 8 14.5c-.782 0-1.372-1.114-2.106-1.417-.707-.293-1.915.088-2.49-.487z"
            ></path>
        </svg>
    )
}
