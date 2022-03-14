import React from 'react';

type EyeDroppedProps = {
    size: number;
    styles?: React.CSSProperties
}

export default function EyeDropper({ size, styles = {} }: EyeDroppedProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={size}
            fill="none"
            viewBox="0 0 19 18"
            style={{...styles}}
        >
            <path
                stroke="#7D7D7D"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12.677 8.142l.343.344a1.127 1.127 0 010 1.59l-.493.495a.56.56 0 01-.793 0L7.48 6.304a.563.563 0 010-.796l.493-.494a1.121 1.121 0 011.586 0l.343.344 1.933-1.94c.756-.759 1.989-.805 2.765-.068a1.968 1.968 0 01.47 2.172 1.968 1.968 0 01-.43.651l-1.963 1.969zM11.193 10.03l-3.925 3.937a2.24 2.24 0 01-2.167.583l-1.64.718a.56.56 0 01-.62-.118v0a.404.404 0 01-.085-.447l.76-1.744a2.256 2.256 0 01.58-2.174L8.02 6.848"
            ></path>
        </svg>
    )
}
