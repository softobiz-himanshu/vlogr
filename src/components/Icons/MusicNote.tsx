import React from 'react'

type MusicNoteProps = {
    style: React.CSSProperties
}

export default function MusicNote({ style }: MusicNoteProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 16 16"
            style={{...style}}
        >
            <path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M11.25 12.5a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5zM3.25 14.5a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5z"
            ></path>
            <path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M5 12.75V4l8-2v8.75"
            ></path>
        </svg>
    )
}
