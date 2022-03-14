import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react'
import { Checkbox } from '@chakra-ui/react'
import { Input, InputGroup } from '@chakra-ui/react'
import ColorPicker from '@/components/ColorPicker'
import { useState } from 'react'
import { useEditor } from '@sdk'

interface Options {
  angle: number
  colors: string[]
  enabled: boolean
}

function Gradient() {
  const editor = useEditor()
  const [openItems, setOpenItems] = useState([-1])
  const [options, setOptions] = useState<Options>({
    angle: 0,
    colors: ['#24C6DC', '#514A9D'],
    enabled: false,
  })

  const handleChange = (key: any, value: any) => {
    setOptions({ ...options, [key]: value })

    if (key === 'enabled') {
      if (value) {
        editor.objects.setGradient({ ...options, [key]: value })
      }
    } else {
      if (options.enabled) {
        editor.objects.setGradient({ ...options, [key]: value })
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

  const handleGradientColorChange = (index: number, color: string) => {
    const updatedColors = [...options.colors]
    updatedColors[index] = color
    handleChange('colors', updatedColors)
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
                  Gradient
                </Box>
              </Box>
            </AccordionButton>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* <ColorPicker value={options.colors[0]} onChange={() => {}} /> */}
              <Box
                sx={{
                  border: '1px solid rgba(37,40,47,0.25)',
                  padding: '0.25rem',
                  display: 'flex',
                  borderRadius: '4px',
                }}
              >
                <Box
                  sx={{
                    height: '24px',
                    width: '24px',
                    background: `linear-gradient(${options.angle + 90}deg, ${options.colors[0]}, ${
                      options.colors[1]
                    })`,
                    borderRadius: '4px',
                  }}
                ></Box>
              </Box>
            </Box>
          </Box>
          <AccordionPanel px={0} pt={4}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ color: 'rgba(37,40,47,0.65)', fontSize: '14px', paddingBottom: '1rem' }}>Color</Box>
              <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ColorPicker
                    value={options.colors[0]}
                    onChange={color => handleGradientColorChange(0, color)}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ColorPicker
                    value={options.colors[1]}
                    onChange={color => handleGradientColorChange(1, color)}
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{ padding: '1rem 0' }}>
              <Box
                style={{
                  borderRadius: '4px',
                  background: `linear-gradient(${options.angle + 90}deg, ${options.colors[0]}, ${
                    options.colors[1]
                  })`,
                  height: '20px',
                }}
              ></Box>
            </Box>

            <Box>
              <Box sx={{ color: 'rgba(37,40,47,0.65)', fontSize: '14px', paddingBottom: '1rem' }}>
                Direction
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 60px', gap: '2rem' }}>
                <Slider
                  aria-label="slider-ex-1"
                  value={options.angle}
                  onChange={value => handleChange('angle', value)}
                  min={0}
                  max={360}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <InputGroup>
                  <Input
                    value={options.angle}
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
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}

export default Gradient
