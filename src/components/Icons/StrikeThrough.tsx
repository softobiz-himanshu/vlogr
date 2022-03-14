function StrikeThrough({ size }: { size: number }) {
  return (
    <svg height={size} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.4375 11H18.5625"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.55999 8.25025C6.48854 8.02807 6.45306 7.79589 6.4549 7.5625C6.4549 5.66402 8.34217 4.125 11 4.125C13.0435 4.125 14.6315 5.03474 15.2564 6.31814"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.1875 14.4376C6.1875 16.336 8.34213 17.8751 11 17.8751C13.6579 17.8751 15.8125 16.336 15.8125 14.4376C15.8125 12.3951 13.9543 11.6042 11.894 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default StrikeThrough
