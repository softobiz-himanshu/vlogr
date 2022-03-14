import { Box } from '@chakra-ui/react'
import { Input, InputGroup, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react'
import { useActiveObject, useEditor } from '@sdk'
import { useEffect, useState } from 'react'

interface Options {
  opacity: number
}
function Opacity() {
  const editor = useEditor()
  const activeObject = useActiveObject()
  const [options, setOptions] = useState<Options>({ opacity: 1 })

  useEffect(() => {
    if (activeObject) {
      updateOptions(activeObject)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeObject])

  const updateOptions = (object: any) => {
    const { opacity } = object
    setOptions({ ...options, opacity })
  }

  const handleOpacityChange = (value: number) => {
    if (editor) {
      setOptions({ ...options, opacity: value / 100 })
      editor.objects.update({
        opacity: value / 100,
      })
    }
  }
  return (
    <Box sx={{ padding: '1.2rem 1.5rem' }}>
      <Box sx={{ fontSize: '14px', color: 'rgba(37,40,47,0.65)' }}>Opacity</Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 60px', gap: '2rem' }}>
        <Slider
          onChange={value => handleOpacityChange(value)}
          min={0}
          max={100}
          aria-label="slider-ex-1"
          value={options.opacity * 100}
        >
          <SliderTrack bg="rgba(0,0,0,0.075)">
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <InputGroup>
          <Input
            value={Math.round(options.opacity * 100)}
            onChange={() => {}}
            sx={{
              fontSize: '14px',
              border: 'none',
              color: 'rgba(37,40,47,0.65)',
              borderRadius: '3px',
              ':focus': {
                border: '1px solid rgba(0, 0 ,0, 0.2)',
                boxShadow: 'none',
              },
            }}
            placeholder="30"
          />
        </InputGroup>
      </Box>
    </Box>
  )
}

export default Opacity
