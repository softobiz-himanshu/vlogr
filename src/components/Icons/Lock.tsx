import React from 'react'

type LockProps = {
    styles?: React.CSSProperties
}

export default function Lock({ styles }: LockProps) {
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
                d="M19.5 8.25h-15a.75.75 0 00-.75.75v10.5c0 .414.336.75.75.75h15a.75.75 0 00.75-.75V9a.75.75 0 00-.75-.75zM8.625 8.25V4.875a3.375 3.375 0 016.75 0V8.25"
            ></path>
            <path
                fill="#24282F"
                d="M12 15.188a.937.937 0 100-1.875.937.937 0 000 1.874z"
            ></path>
        </svg>
    )
}
