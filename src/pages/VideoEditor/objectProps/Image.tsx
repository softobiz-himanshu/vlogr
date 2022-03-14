import { Box, Button } from '@chakra-ui/react'
import Opacity from './components/Opacity'
import Shadow from './components/Shadow'
import { Scrollbars } from 'react-custom-scrollbars'
import { Divider } from '@chakra-ui/react'
import Alignment from './components/Alignment'
import Position from './components/Position'
import Flip from './components/Flip'
import Lock from './components/Lock'
import Delete from './components/Delete'
import Duplicate from './components/Duplicate'
import Group from './components/Group'
import { useEffect, useState } from 'react'
import { useActiveObject, useEditor } from '@sdk'
import CopyStyle from './components/CopyStyle'
import Transform from './components/Transform'
import Round from './components/Round'
import Adjuts from './components/Adjuts'

function ImageProps() {
  const [locked, setLocked] = useState(false)
  const editor = useEditor()
  const activeObject = useActiveObject()

  useEffect(() => {
    if (activeObject) {
      // @ts-ignore
      setLocked(activeObject.locked)
    } else {
      setLocked(false)
    }
  }, [activeObject])
  useEffect(() => {
    const handleHistoryChange = () => {
      if (activeObject) {
        // @ts-ignore
        setLocked(activeObject.locked)
      }
    }
    if (editor) {
      editor.on('history:changed', handleHistoryChange)
    }
    return () => {
      if (editor) {
        editor.off('history:changed', handleHistoryChange)
      }
    }
  }, [editor, activeObject])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(37,40,47,0.05)',
          height: '52px',
          alignItems: 'center',
          padding: '0 1rem',
          fontSize: '14px',
        }}
      >
        <Box>Image</Box>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <CopyStyle />
          <Lock />
          <Duplicate />
          <Delete />
        </Box>
      </Box>
      <Box sx={{ flex: 1, opacity: locked ? 0.4 : 1, pointerEvents: locked ? 'none' : 'auto' }}>
        <Scrollbars autoHide>
          <Box p="1rem">
            <Alignment />
            <Position />
            <Flip />
            {/* <Button
              color="#636363"
              size="sm"
              style={{ fontWeight: 400 }}
              variant="ghost"
              onClick={() => editor.objects.enableCropFrame()}
            >
              Crop
            </Button> */}
          </Box>

          <Transform />
          <Divider />
          {
            !(activeObject as any)?.metadata?.src?.includes('.gif') &&
            <Round />
          }
          <Divider />
          <Opacity />
          <Shadow />
          <Group />
          {(activeObject as any)?.type !== 'StaticGIF' &&
            <Adjuts />
          }
        </Scrollbars>
      </Box>
    </Box>
  )
}

export default ImageProps
