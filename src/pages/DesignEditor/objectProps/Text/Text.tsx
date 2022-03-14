import { useActiveObject, useEditor } from '@sdk'
import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import Icons from '@/components/Icons'
import { IconButton } from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import { Scrollbars } from 'react-custom-scrollbars'
import TextAlign from './TextAlign'
import FillColor from '../components/FillColor'
import BackgroundColor from '../components/BackgroundColor'

import FontFamilySelector from './FontFamilySelector'
import TextDecoration from './TextDecoration'
import FontSizeSelector from './FontSizeSelector'
import TextAdjustment from './TextAdjustment'
import Outline from '../components/Outline'
import Shadow from '../components/Shadow'
import Gradient from '../components/Gradient'
import Opacity from '../components/Opacity'
import Alignment from '../components/Alignment'
import Position from '../components/Position'
import Lock from '../components/Lock'
import Delete from '../components/Delete'
import Duplicate from '../components/Duplicate'
import Group from '../components/Group'
import CopyStyle from '../components/CopyStyle'

function Text() {
  const [locked, setLocked] = useState()
  const activeObject = useActiveObject()
  const editor = useEditor()

  useEffect(() => {
    if (activeObject) {
      // @ts-ignore
      setLocked(activeObject.locked)
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
        <Box>Text</Box>
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
          </Box>

          <Divider />

          {/* ff */}
          <FontFamilySelector />
          <Box sx={{ padding: '0rem 1.5rem 1rem', display: 'flex', gap: '1rem' }}>
            <FontSizeSelector />
            <TextDecoration />
          </Box>
          <Divider />
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', paddingLeft: '1.5rem' }}>
            <TextAlign />
            <Box sx={{ backgroundColor: '#afafaf', height: '60px', opacity: '0.6' }}></Box>
            <Box sx={{ display: 'flex', alignItems: 'center', margin: 'auto' }}>
              <IconButton
                color="#25282f"
                aria-label="strike-through"
                variant="ghost"
                icon={<Icons.VerticalAlignBottom size={24} />}
              />
              <IconButton
                color="#25282f"
                aria-label="strike-through"
                variant="ghost"
                icon={<Icons.VerticalAlignMiddle size={24} />}
              />
              <IconButton
                color="#25282f"
                aria-label="strike-through"
                variant="ghost"
                icon={<Icons.VerticalAlignTop size={24} />}
              />
            </Box>
          </Box>

          <Divider />

          <Opacity />

          <Divider />
          {/* TEXT AND BACKGROUND COLOR */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <FillColor />
            <BackgroundColor />
          </Box>
          <Divider />
          <TextAdjustment />
          <Divider />
          <Outline />
          <Divider />
          <Shadow />
          <Divider />
          <Gradient />
          <Group />
        </Scrollbars>
      </Box>
    </Box>
  )
}

export default Text
