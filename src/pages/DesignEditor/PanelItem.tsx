import useDesignEditorContext from '@/hooks/useDesignEditorContext'
import { Box } from '@chakra-ui/react'
import PanelItems from './panels'
import { useEditorContext } from '@sdk'
import { useEffect } from 'react'
import ObjectProps from './objectProps'
import isArray from 'lodash/isArray'

const activeObjectPropsOptions = {
  Default: 'Default',
  StaticText: 'Text',
  StaticPath: 'Element',
  StaticImage: 'Image',
  MultiElement: 'MultiElement',
}

export const getContextMenuType = (selection: any) => {
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

function PanelItem() {
  const { activePanel, activeObjectProps, setActiveObjectProps } = useDesignEditorContext()
  const { activeObject } = useEditorContext()

  useEffect(() => {
    if (!activeObject) {
      setActiveObjectProps(null)
    } else {
      const activeObjectType = getContextMenuType(activeObject)
      if (isArray(activeObjectType)) {
        // @ts-ignore
        setActiveObjectProps(activeObjectPropsOptions['MultiElement'])
      } else {
        // @ts-ignore
        setActiveObjectProps(activeObjectPropsOptions[activeObjectType])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeObject])
  const Component = activeObjectProps ? ObjectProps[activeObjectProps] : PanelItems[activePanel]

  return (
    <Box sx={{ width: '360px', background: '#ffffff', borderRight: '1px solid rgba(37,40,47,0.1)' }}>
      <Component />
    </Box>
  )
}

export default PanelItem
