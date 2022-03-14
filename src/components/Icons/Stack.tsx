import React from 'react'

type StackProps = {
    styles?: React.CSSProperties
}

export default function Stack({ styles = {} }: StackProps) {
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
                fill="#24282F"
                d="M20.622 15.852L12 20.882l-8.622-5.03a.75.75 0 10-.756 1.296l9 5.25a.75.75 0 00.756 0l9-5.25a.75.75 0 10-.756-1.296z"
            ></path>
            <path
                fill="#24282F"
                d="M20.622 11.352L12 16.382l-8.622-5.03a.75.75 0 10-.756 1.296l9 5.25a.75.75 0 00.756 0l9-5.25a.75.75 0 10-.756-1.296z"
            ></path>
            <path
                fill="#24282F"
                d="M2.622 8.148l9 5.25a.75.75 0 00.756 0l9-5.25a.75.75 0 000-1.296l-9-5.25a.75.75 0 00-.756 0l-9 5.25a.75.75 0 000 1.296z"
            ></path>
        </svg>
    )
}
