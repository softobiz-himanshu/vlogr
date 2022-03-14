import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import throttle from 'lodash/throttle'
import ColorPicker from '@components/ColorPicker'
import { useActiveObject, useEditor } from '@sdk'

interface Options {
  fill: string
}

function FillColor() {
  const editor = useEditor()
  const [options, setOptions] = useState<Options>({
    fill: '#000000',
  })
  const activeObject = useActiveObject()

  useEffect(() => {
    if (activeObject) {
      updateOptions(activeObject)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeObject])

  const updateOptions = (object: any) => {
    const { fill } = object
    if (typeof fill === 'string') {
      setOptions({ ...options, fill })
    } else {
      setOptions({ ...options, fill: '#ecf0f1' })
    }
  }

  const updateFillColor = throttle((color: string) => {
    if (editor) {
      setOptions({ ...options, fill: color })
      editor.objects.update({
        fill: color,
      })
    }
  }, 200)
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', padding: '1rem 1.5rem', gap: '1.5rem' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          gap: '1rem',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ fontSize: '14px', color: 'rgba(37,40,47,0.65)' }}>Color</Box>

        <ColorPicker onChange={updateFillColor} value={options.fill} />
      </Box>
    </Box>
  )
}

export default FillColor
