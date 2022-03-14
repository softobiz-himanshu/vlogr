import React from 'react'

type ReplaceProps = {
    styles?: React.CSSProperties
}

export default function Replace({ styles }: ReplaceProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            style={{ ...styles }}
        >
            <path
                stroke="#24282F"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M16.5 13.5l3 3-3 3M4.5 16.5h15M7.5 10.5l-3-3 3-3M19.5 7.5h-15"
            ></path>
        </svg>
    )
}
