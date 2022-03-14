import { Box } from '@chakra-ui/react'
import Icons from '@/components/Icons'
import { IconButton } from '@chakra-ui/react'
import Opacity from './components/Opacity'
import Shadow from './components/Shadow'
import { Scrollbars } from 'react-custom-scrollbars'
import { Divider } from '@chakra-ui/react'
import Alignment from './components/Alignment'
import Position from './components/Position'
import Lock from './components/Lock'
import Delete from './components/Delete'
import Duplicate from './components/Duplicate'
import Group from './components/Group'
import { useActiveObject } from '@sdk'
import FillColor from './components/FillColor'
import Gradient from './components/Gradient'
import Outline from './components/Outline'

const getContextMenuType = (selection: any) => {
  const types = new Set()
  if (!selection) {
    return 'Default'
  }
  if (selection._objects) {
    for (const object of selection._objects) {
      types.add(object.type)
    }
  } else {
    types.add(selection.type)
  }

  const typesArray = Array.from(types)

  if (typesArray.length === 1) {
    if (typesArray[0] === 'Background') {
      return 'Default'
    } else {
      return typesArray[0]
    }
  } else {
    return typesArray
  }
}

const objectProps = {
  StaticPath: ['fill', 'opacity', 'shadow', 'gradient', 'outline'],
  StaticText: ['fill', 'opacity', 'shadow', 'gradient', 'outline'],
  StaticImage: ['outline', 'opacity', 'shadow'],
}

const hasProperty = (property: string, activeObjectTypes: string[]) => {
  let exists = false

  activeObjectTypes.forEach((objectType: any) => {
    const objectProperties = objectProps[objectType as 'StaticPath']
    const propertyExists = objectProperties.find(op => op === property)
    exists = !!propertyExists
    if (!exists) {
      return false
    }
  })
  return exists
}

function MultiElement() {
  const activeObject = useActiveObject()

  if (!activeObject) {
    return <></>
  }
  const activeObjectTypes = getContextMenuType(activeObject) as string[]

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
        <Box>Mutli Element</Box>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <IconButton
            size="sm"
            variant="unstyled"
            aria-label="unlocked"
            icon={<Icons.CopyStyle size={22} />}
          />
          <Lock />
          <Duplicate />
          <Delete />
        </Box>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Scrollbars autoHide>
          <Box p="1rem">
            <Alignment />
            <Position />
          </Box>
          <Divider />
          {hasProperty('fill', activeObjectTypes) && <FillColor />}
          {hasProperty('opacity', activeObjectTypes) && <Opacity />}
          {hasProperty('shadow', activeObjectTypes) && <Shadow />}
          {hasProperty('outline', activeObjectTypes) && <Outline />}
          {hasProperty('gradient', activeObjectTypes) && <Gradient />}
          <Group />
        </Scrollbars>
      </Box>
    </Box>
  )
}

export default MultiElement
