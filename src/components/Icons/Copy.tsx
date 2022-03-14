import React from 'react'

type CopyProps = {
    styles?: React.CSSProperties
}

export default function Copy({ styles = {} }: CopyProps) {
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
                d="M15.75 15.75h4.5v-12h-12v4.5"
            ></path>
            <path
                stroke="#24282F"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15.75 8.25h-12v12h12v-12z"
            ></path>
        </svg>
    )
}
