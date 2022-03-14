import { useActiveObject, useEditor } from '@/sdk';
import { Box, Divider } from '@chakra-ui/react';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import Alignment from './components/Alignment';
import ChromaKey from './components/ChromaKey';
import CopyStyle from './components/CopyStyle';
import Delete from './components/Delete';
import Duplicate from './components/Duplicate';
import Flip from './components/Flip';
import Group from './components/Group';
import Lock from './components/Lock';
import Opacity from './components/Opacity';
import Position from './components/Position';
import Round from './components/Round';
import Shadow from './components/Shadow';
import Speed from './components/Speed';
import Transform from './components/Transform';
import Volume from './components/Volume';

export default function VIdeo() {
  const [locked, setLocked] = React.useState(false)
  const editor = useEditor()
  const activeObject = useActiveObject()

  React.useEffect(() => {
    if (activeObject) {
      // @ts-ignore
      setLocked(activeObject.locked)
    } else {
      setLocked(false)
    }
  }, [activeObject])

  React.useEffect(() => {
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
        <Box>Video</Box>
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
          </Box>

          <Transform />
          <Divider />
          <Round />
          <Divider />
          <Opacity />
          <Divider />
          <Volume />
          <Divider />
          <Speed />
          <Divider />
          <ChromaKey/>
          <Divider />
          <Shadow />
          <Group />
        </Scrollbars>
      </Box>
    </Box>
  )
}
