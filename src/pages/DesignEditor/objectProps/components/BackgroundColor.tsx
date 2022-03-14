import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import throttle from 'lodash/throttle'
import ColorPicker from '@components/ColorPicker'
import { useActiveObject, useEditor } from '@sdk'

interface Options {
  backgroundColor: string | null
}

function BackgroundColor() {
  const [options, setOptions] = useState<Options>({
    backgroundColor: null,
  })
  const activeObject = useActiveObject()
  const editor = useEditor()

  useEffect(() => {
    if (activeObject) {
      updateOptions(activeObject)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeObject])

  const updateOptions = (object: any) => {
    const { backgroundColor } = object
    setOptions({ ...options, backgroundColor })
  }

  const updateBackgrounColor = throttle((color: string) => {
    if (editor) {
      setOptions({ ...options, backgroundColor: color })
      editor.objects.update({
        backgroundColor: color,
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
        <Box sx={{ fontSize: '14px', color: 'rgba(37,40,47,0.65)' }}>Background</Box>
        <ColorPicker onChange={updateBackgrounColor} value={options.backgroundColor} />
      </Box>
    </Box>
  )
}

export default BackgroundColor
