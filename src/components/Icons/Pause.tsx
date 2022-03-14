function Pause({ size, styles = {} }: { size: number, styles?: React.CSSProperties }) {
    return (
        <svg height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ ...styles }}>
            <path
                d="M13.6972 3H17.6055C17.8487 3 18.0458 3.19718 18.0458 3.44037V20.5596C18.0458 20.8028 17.8487 21 17.6055 21H13.6972C13.454 21 13.2568 20.8028 13.2568 20.5596V3.44037C13.2568 3.19718 13.454 3 13.6972 3Z"
                fill="currentColor"
            />
            <path
                d="M5.44037 3H9.34862C9.59181 3 9.78899 3.19718 9.78899 3.44037V20.5596C9.78899 20.8028 9.59181 21 9.34862 21H5.44037C5.19718 21 5 20.8028 5 20.5596V3.44037C5 3.19718 5.19718 3 5.44037 3Z"
                fill="currentColor"
            />
        </svg>
    )
}

export default Pause
