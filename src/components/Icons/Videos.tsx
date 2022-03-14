import React from 'react';

type VideosProps = {
    size: number
}
function Videos({size}: VideosProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height={size}
            fill="none"
            viewBox="0 0 24 24"
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M2.25 5.625h12a3 3 0 013 3v9a.75.75 0 01-.75.75h-12a3 3 0 01-3-3v-9a.75.75 0 01.75-.75v0zM17.25 10.5l5.25-3v9l-5.25-3"
            ></path>
        </svg>
    )
}

export default Videos;
