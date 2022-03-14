import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, Input, InputGroup } from '@chakra-ui/react'
import { Checkbox } from '@chakra-ui/react'
import { useActiveObject, useEditor } from '@sdk'
import { useEffect, useState } from 'react'
import ColorPicker from '@/components/ColorPicker'

interface Options {
  enabled: boolean
  stroke: string
  strokeWidth: number
}

function Outline() {
  const editor = useEditor()
  const [openItems, setOpenItems] = useState([-1])

  const [options, setOptions] = useState<Options>({
    enabled: true,
    stroke: '#000000',
    strokeWidth: 1,
  })
  const activeObject = useActiveObject()

  useEffect(() => {
    if (activeObject) {
      updateOptions(activeObject)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeObject])

  const updateOptions = (object: any) => {
    const { stroke, strokeWidth } = object
    const enabled = !!strokeWidth
    setOptions({ ...options, stroke, strokeWidth, enabled })
    if (enabled) {
      setOpenItems([0])
    }
  }

  const handleChange = (type: string, value: any) => {
    setOptions({ ...options, [type]: value })
    if (type === 'enabled') {
      if (value) {
        editor.objects.update(options)
      } else {
        editor.objects.update({ strokeWidth: 0 })
      }
    } else {
      if (editor && options.enabled) {
        editor.objects.update({ [type]: value })
      }
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
                  gridTemplateColumns: '40px 1fr',
                  width: '100%',
                }}
              >
                <Checkbox isChecked={options.enabled} />

                <Box
                  flex="1"
                  textAlign="left"
                  sx={{ color: 'rgba(37,40,47,0.65)', fontSize: '14px', padding: '0.5rem 0' }}
                >
                  Outline
                </Box>
              </Box>
            </AccordionButton>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ColorPicker value={options.stroke} onChange={value => handleChange('stroke', value)} />
            </Box>
          </Box>

          <AccordionPanel px={0} pt={4}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 60px', gap: '2rem' }}>
              <Slider
                onChange={value => handleChange('strokeWidth', value)}
                min={0}
                max={100}
                aria-label="slider-ex-1"
                value={options.strokeWidth}
              >
                <SliderTrack bg="rgba(0,0,0,0.075)">
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <InputGroup>
                <Input
                  value={options.strokeWidth}
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
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}

export default Outline
