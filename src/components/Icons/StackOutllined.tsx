import React from 'react'

type StackOutllinedProps = {
    styles?: React.CSSProperties
}

export default function StackOutllined({ styles = {} }: StackOutllinedProps) {
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
                d="M1.5 9.75l10.5 6 10.5-6-10.5-6-10.5 6z"
            ></path>
            <path
                stroke="#24282F"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M1.5 13.5l10.5 6 10.5-6"
            ></path>
        </svg>
    )
}
