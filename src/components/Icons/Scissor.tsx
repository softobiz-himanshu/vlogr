type ScissorProps = {
  size: number;
  styles?: React.CSSProperties
};

function Scissor({ size, styles = {} }: ScissorProps) {
  return (
    <svg height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ ...styles }}>
      <path
        d="M18.375 14.251C16.9253 14.251 15.75 15.4262 15.75 16.876C15.75 18.3257 16.9253 19.501 18.375 19.501C19.8247 19.501 21 18.3257 21 16.876C21 15.4262 19.8247 14.251 18.375 14.251Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.375 4.50098C16.9253 4.50098 15.75 5.67623 15.75 7.12598C15.75 8.57572 16.9253 9.75098 18.375 9.75098C19.8247 9.75098 21 8.57572 21 7.12598C21 5.67623 19.8247 4.50098 18.375 4.50098Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.2499 12.001L16.2087 8.60815"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.25005 18.1592L8.59369 13.8188"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.25006 5.84279L16.2089 15.3936"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export default Scissor
