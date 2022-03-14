function Duplicate({ size }: { size: number }) {
  return (
    <svg height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.75 15.7493H20.25V3.74927H8.25V8.24927"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.75 8.24951H3.75V20.2495H15.75V8.24951Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Duplicate
