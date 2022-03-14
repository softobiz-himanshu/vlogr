import { useEffect, useRef, useState } from 'react'

import Loading from './components/Loading'
import { appFonts } from './constants/fonts'

function Container({ children }: any) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    loadFonts()
    setTimeout(() => {
      setLoaded(true)
    }, 10)
  }, [])

  const loadFonts = () => {
    const promisesList = appFonts.map(font => {
      // @ts-ignore
      return new FontFace(font.name, `url(${font.url})`, font.options).load().catch(err => err)
    })
    Promise.all(promisesList)
      .then(res => {
        res.forEach(uniqueFont => {
          if (uniqueFont && uniqueFont.family) {
            document.fonts.add(uniqueFont)
          }
        })
      })
      .catch(err => console.log({ err }))
  }

  return (
    <div
      ref={containerRef}
      style={{
        flex: 1,
        display: 'flex',
        height: '100vh',
        width: '100vw',
      }}
    >
      {loaded ? <>{children} </> : <Loading />}
    </div>
  )
}

export default Container
