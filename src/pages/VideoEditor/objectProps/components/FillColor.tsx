import { useEffect, useState } from 'react'
import { Box, Checkbox, Flex, Text } from '@chakra-ui/react'
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
    <Box sx={{ display: 'flex', alignItems: 'center', padding: '1rem 1.5rem' }}>
      <Box
        sx={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 40px',
        }}
      >

        <Box sx={{
          display: 'grid',
          gridTemplateColumns: '30px 1fr',
          width: '100%',
        }} align="center">
          <Checkbox isChecked={true}  isDisabled mr="10px" />
          <Box
            flex="1"
            textAlign="left"
            sx={{ color: '#7D7D7D', fontSize: '14px', padding: '0.5rem 0' }}
          >
            fill color
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ColorPicker onChange={updateFillColor} value={options.fill} />
        </Box>
      </Box>
    </Box>
  )
}

export default FillColor
