import React from 'react'

type StacksProps = {
    styles?: React.CSSProperties
}


export default function Stacks({ styles = {} }: StacksProps) {
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
                d="M3 16.5l9 5.25 9-5.25"
            ></path>
            <path
                stroke="#24282F"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 12l9 5.25L21 12"
            ></path>
            <path
                stroke="#24282F"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 7.5l9 5.25 9-5.25-9-5.25L3 7.5z"
            ></path>
        </svg>
    )
}
