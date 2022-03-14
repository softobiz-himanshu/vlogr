import React from 'react';

type PauseButtonProps = {
    size: number;
    styles?: React.CSSProperties
}

export default function PauseButton({ size, styles = {} }: PauseButtonProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            // width="10"
            height={size}
            fill="none"
            viewBox="0 0 10 10"
            style={{...styles}}
        >
            <path
                fill="#BBBCBD"
                d="M8.2 2.037v6.367a.638.638 0 01-.636.636H6.132a.637.637 0 01-.637-.636V2.037a.638.638 0 01.637-.637h1.432a.637.637 0 01.636.637zM3.268 1.4H1.836a.637.637 0 00-.636.637v6.367a.638.638 0 00.636.636h1.432a.637.637 0 00.637-.636V2.037a.638.638 0 00-.637-.637z"
            ></path>
        </svg>
    )
}
