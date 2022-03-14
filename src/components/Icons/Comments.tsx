import React from 'react'

type CommentsProps = {
    styles?: React.CSSProperties;
}

export default function Comments({ styles }: CommentsProps) {
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
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M7.311 18.876l-3.078 2.588A.75.75 0 013 20.89V6a.75.75 0 01.75-.75h16.5A.75.75 0 0121 6v12a.75.75 0 01-.75.75H7.657l-.346.126zM9 10.5h6M9 13.5h6"
            ></path>
        </svg>
    )
}
