import React from 'react'

type StackProps = {
    styles?: React.CSSProperties
}


export default function StackSImple({ styles }: StackProps) {
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
                d="M1.128 10.401l10.5 6a.75.75 0 00.744 0l10.5-6a.75.75 0 000-1.302l-10.5-6a.75.75 0 00-.744 0l-10.5 6a.75.75 0 000 1.302z"
            ></path>
            <path
                fill="#24282F"
                d="M22.128 12.849L12 18.636 1.872 12.85a.749.749 0 10-.744 1.302l10.5 6a.75.75 0 00.744 0l10.5-6a.75.75 0 10-.744-1.302z"
            ></path>
        </svg>
    )
}
