import React from 'react'

type VideoCameraProps = {
    styles: React.CSSProperties
}

export default function VideoCamera({ styles = {} }: VideoCameraProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="16"
            fill="none"
            viewBox="0 0 18 16"
            style={{ ...styles }}
        >
            <path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M1.597 3.75h8.518c.564 0 1.106.21 1.505.586.4.375.624.884.624 1.414v6c0 .133-.056.26-.156.354a.55.55 0 01-.377.146H3.194c-.565 0-1.107-.21-1.506-.586a1.94 1.94 0 01-.624-1.414v-6c0-.133.057-.26.156-.354a.55.55 0 01.377-.146v0z"
            ></path>
            <path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12.244 7l3.727-2v6l-3.727-2"
            ></path>
        </svg>
    )
}
