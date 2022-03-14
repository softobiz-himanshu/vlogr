import { Box } from '@chakra-ui/react'
import { Scrollbars } from 'react-custom-scrollbars'
import { useCallback, useEffect, useReducer, useRef } from 'react'
import { useEditor } from '@sdk'
import LoadMore from '@/components/Icons/LoadMore'

function Pexels() {
  const editor = useEditor()
  let bottomBoundaryRef = useRef(null)
  const imgReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'STACK_IMAGES':
        return { ...state, images: state.images.concat(action.images) }
      case 'FETCHING_IMAGES':
        return { ...state, fetching: action.fetching }
      default:
        return state
    }
  }

  const pageReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'ADVANCE_PAGE':
        return { ...state, page: state.page + 1 }
      default:
        return state
    }
  }

  const [pager, pagerDispatch] = useReducer(pageReducer, { page: 0 })
  const [imgData, imgDispatch] = useReducer(imgReducer, { images: [], fetching: true })

  useEffect(() => {
    imgDispatch({ type: 'FETCHING_IMAGES', fetching: true })
    fetch(`https://api.pexels.com/v1/search?query=nature&per_page=10&page=${pager.page}`, {
      headers: {
        Authorization: '563492ad6f9170000100000106a307bb7f744a0babfd5e7885d9a620',
      },
    })
      .then(data => data.json())
      .then(data => {
        imgDispatch({ type: 'STACK_IMAGES', images: data.photos })
        imgDispatch({ type: 'FETCHING_IMAGES', fetching: false })
      })
      .catch(e => {
        imgDispatch({ type: 'FETCHING_IMAGES', fetching: false })
        return e
      })
  }, [imgDispatch, pager.page])

  const scrollObserver = useCallback(
    node => {
      new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.intersectionRatio > 0) {
            pagerDispatch({ type: 'ADVANCE_PAGE' })
          }
        })
      }).observe(node)
    },
    [pagerDispatch]
  )

  useEffect(() => {
    if (bottomBoundaryRef.current) {
      scrollObserver(bottomBoundaryRef.current)
    }
  }, [scrollObserver, bottomBoundaryRef])

  const addImageToCanvas = (url: string) => {
    const options = {
      type: 'StaticImage',
      metadata: { src: url },
    }
    editor.objects.add(options)
  }

  return (
    <Box sx={{ height: '100%' }}>
      <Scrollbars>
        <div
          style={{
            display: 'grid',
            gap: '0.5rem',
            padding: '0.5rem 0',
            gridTemplateColumns: '1fr 1fr',
          }}
        >
          {imgData.images.map((image: any, index: number) => (
            <div
              key={index}
              style={{
                alignItems: 'center',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
              }}
              onClick={() => addImageToCanvas(image.src.medium)}
            >
              <img src={image.src.small} alt="preview" height="80px" />
            </div>
          ))}
        </div>

        <div
          id="page-bottom-boundary"
          style={{ border: '1px solid rgba(0,0,0,0.01)' }}
          ref={bottomBoundaryRef}
        ></div>
        <Box
          sx={{
            // color: 'blue',
            // background: 'blue',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LoadMore />
        </Box>
      </Scrollbars>
    </Box>
  )
}

export default Pexels
