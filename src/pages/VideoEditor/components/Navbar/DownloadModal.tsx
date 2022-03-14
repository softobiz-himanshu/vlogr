import React from 'react'
import { Modal, ModalOverlay, ModalContent, Button, Box, Flex } from '@chakra-ui/react'
import Loader from 'react-spinners/FadeLoader'
import Icons from '@components/Icons'
import { useEditor } from '@/sdk'
import ReactPlayer from 'react-player'

interface Props {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}
function DownloadModal({ isOpen, onClose }: Props) {
  const editor = useEditor()
  const [video, setVideo] = React.useState<string | null>(null)

  React.useEffect(() => {
    const objects = editor.design.exportToJSON()
    // console.log({ objects })
    const options = {
      outPath: './position.mp4',
      verbose: false,
      duration: 5,
      fps: 25,
      dimension: {
        width: 1920,
        height: 1080,
      },
      clips: [
        {
          duration: 5,
          layers: objects.objects,
        },
      ],
    }
    // console.log({ objects })
    fetch('http://localhost:8080/render', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(options),
    })
      .then(res => {
        return res.blob()
      })
      .then(blob => {
        const element = window.URL.createObjectURL(blob)
        setVideo(element)
      })
      .catch(err => console.error(err))
  }, [])

  const handleDownload = () => {
    const a = document.createElement('a')
    // @ts-ignore
    a.href = video
    a.download = 'drawing.mp4'
    a.click()
  }
  return (
    <Modal onClose={onClose} size={'full'} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <Box
          sx={{
            height: '64px',
            padding: '0 1rem',
            display: 'grid',
            gridTemplateColumns: '200px 1fr 200px',
            alignItems: 'center',
          }}
        >
          <Box>
            <Flex
              onClick={() => onClose()}
              sx={{
                gap: '0.5rem',
                fontWeight: 500,
                cursor: 'pointer',
                padding: '10px 0',
                borderRadius: '11px',
              }}
              _hover={{
                background: 'rgba(9,92, 221, 0.1)',
              }}
              alignItems="center"
            >
              <Box>
                <Icons.ArrowLeft size={24} />
              </Box>
              <Box>Go back</Box>
            </Flex>
          </Box>
          <Box textAlign="center" fontWeight="600">
            Untitled 01
          </Box>
          <Flex sx={{ gap: '1rem' }}>
            <Button variant="ghost" background="rgba(9,92, 221, 0.1)" borderRadius="11px">
              Share
            </Button>
            <Button onClick={handleDownload} borderRadius="11px">
              Download
            </Button>
          </Flex>
        </Box>
        <Flex sx={{ flex: 1, padding: '5rem' }}>
          {video ? (
            <Box sx={{ padding: '5rem' }}>
              <ReactPlayer controls autoplay width="100%" height="100%" url={video} />
            </Box>
          ) : (
            <Flex
              sx={{
                background: '#F0F1F2',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <Loader color="#8E8E8E" />
              <Box color="#999999" mt="1rem">
                We are preparing your video...
              </Box>
            </Flex>
          )}
        </Flex>
      </ModalContent>
    </Modal>
  )
}

export default DownloadModal
