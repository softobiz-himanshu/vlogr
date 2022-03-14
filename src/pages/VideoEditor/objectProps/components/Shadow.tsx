import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react'
import { Checkbox } from '@chakra-ui/react'
import ColorPicker from '@/components/ColorPicker'
import { useEffect, useState } from 'react'
import { useActiveObject, useEditor } from '@sdk'

interface Options {
  enabled: boolean
  offsetX: number
  offsetY: number
  blur: number
  color: string
}

function Shadow() {
  const editor = useEditor()
  const [openItems, setOpenItems] = useState([-1])
  const [options, setOptions] = useState<Options>({
    enabled: false,
    offsetX: 15,
    offsetY: 15,
    blur: 0,
    color: 'rgba(0,0,0,0.45)',
  })
  const activeObject = useActiveObject()

  useEffect(() => {
    if (activeObject) {
      updateOptions(activeObject)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeObject])

  const updateOptions = (object: any) => {
    if (object.shadow) {
      const { blur, color, enabled, offsetX, offsetY } = object.shadow
      setOptions({ ...options, blur, color, enabled, offsetX, offsetY })
      if (enabled) {
        setOpenItems([0])
      }
    }
  }

  const handleChange = (key: string, value: any) => {
    setOptions({ ...options, [key]: value })
    if (editor) {
      editor.objects.setShadow({ ...options, [key]: value })
    }
  }

  const handleEnable = (idx: number) => {
    let enabled = false
    if (idx === 0) {
      enabled = true
    }
    handleChange('enabled', enabled)
    setOpenItems([idx])
  }

  return (
    <Box sx={{ padding: '0 1.5rem' }}>
      <Accordion
        sx={{ border: '1px solid rgba(0,0,0,0)' }}
        allowToggle
        index={openItems}
        onChange={handleEnable}
      >
        <AccordionItem>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 40px',
            }}
          >
            <AccordionButton
              sx={{
                ':hover': {
                  backgroundColor: 'rgba(0,0,0,0)',
                },
              }}
              px={0}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '30px 1fr',
                  width: '100%',
                }}
              >
                <Checkbox isChecked={options.enabled} />

                <Box
                  flex="1"
                  textAlign="left"
                  sx={{ color: 'rgba(37,40,47,0.65)', fontSize: '14px', padding: '0.5rem 0' }}
                >
                  Shadow
                </Box>
              </Box>
            </AccordionButton>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ColorPicker value={options.color} onChange={value => handleChange('color', value)} />
            </Box>
          </Box>
          <AccordionPanel px={0} pt={4}>
            <Box pb={2}>
              <Box sx={{ color: 'rgba(37,40,47,0.65)', fontSize: '14px', paddingBottom: '1rem' }}>Blur</Box>
              <Slider onChange={value => handleChange('blur', value)} min={0} max={100} value={options.blur}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
            <Box pb={2}>
              <Box sx={{ color: 'rgba(37,40,47,0.65)', fontSize: '14px', paddingBottom: '1rem' }}>
                Offset X
              </Box>
              <Slider
                onChange={value => handleChange('offsetX', value)}
                min={-100}
                max={100}
                value={options.offsetX}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>

            <Box pb={2}>
              <Box sx={{ color: 'rgba(37,40,47,0.65)', fontSize: '14px', paddingBottom: '1rem' }}>
                Offset Y
              </Box>
              <Slider
                onChange={value => handleChange('offsetY', value)}
                min={-100}
                max={100}
                value={options.offsetY}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}

export default Shadow
