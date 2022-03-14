function ChevronLeft({ size }: { size: number }) {
  return (
    <svg height={size} viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 16.5L1.5 9L9 1.5"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ChevronLeft
