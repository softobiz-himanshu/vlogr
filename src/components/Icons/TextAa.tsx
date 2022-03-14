import React from 'react'

type TextAaProps = {
    style: React.CSSProperties
}

export default function TextAa({ style }: TextAaProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="16"
            fill="none"
            viewBox="0 0 17 16"
            style={{ ...style }}
        >
            <path
                stroke="#999"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M10.5 12L6 3.5 1.5 12M14 12.181c1.105 0 2-.783 2-1.75 0-.966-.895-1.75-2-1.75s-2 .784-2 1.75c0 .967.895 1.75 2 1.75z"
            ></path>
            <path
                stroke="#999"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12.5 7.024c.402-.387.941-.6 1.5-.593 1.104 0 2 .784 2 1.75v3.82M9.176 9.5H2.823"
            ></path>
        </svg>
    )
}
