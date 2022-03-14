import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react'
import { useActiveObject, useEditor } from '@sdk'
import { useEffect, useState } from 'react'
import { Input, InputGroup } from '@chakra-ui/react'

interface Options {
  charSpacing: number
  lineHeight: number
}
function TextAdjustment() {
  const editor = useEditor()
  const activeObject = useActiveObject()
  const [options, setOptions] = useState<Options>({ charSpacing: 0, lineHeight: 0 })

  useEffect(() => {
    if (activeObject) {
      updateOptions(activeObject)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeObject])

  const updateOptions = (object: any) => {
    const { charSpacing, lineHeight } = object
    setOptions({ ...options, charSpacing, lineHeight })
  }

  const handleChange = (type: string, value: any) => {
    if (editor) {
      setOptions({ ...options, [type]: value })
      editor.objects.update({
        [type]: value,
      })
    }
  }
  return (
    <Box sx={{ padding: '0 1.5rem' }}>
      <Accordion sx={{ border: '1px solid rgba(0,0,0,0)' }} allowMultiple>
        <AccordionItem>
          <AccordionButton
            sx={{
              ':hover': {
                backgroundColor: 'rgba(0,0,0,0)',
              },
            }}
            px={0}
          >
            <Box
              flex="1"
              textAlign="left"
              sx={{ color: 'rgba(37,40,47,0.65)', fontSize: '14px', padding: '0.5rem 0' }}
            >
              Text adjustment
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel px={0} pt={4}>
            <Box sx={{ paddingBottom: '1rem' }}>
              <Box sx={{ fontSize: '14px', color: 'rgba(37,40,47,0.65)' }}>Letter spacing</Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 60px', gap: '2rem' }}>
                <Slider
                  onChange={value => handleChange('charSpacing', value * 10)}
                  min={-50}
                  max={100}
                  aria-label="slider-ex-1"
                  value={options.charSpacing / 10}
                >
                  <SliderTrack bg="rgba(0,0,0,0.075)">
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <InputGroup>
                  <Input
                    value={options.charSpacing / 10}
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

            <Box sx={{ paddingBottom: '1rem' }}>
              <Box sx={{ fontSize: '14px', color: 'rgba(37,40,47,0.65)' }}>Line height</Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 60px', gap: '2rem' }}>
                <Slider
                  onChange={value => handleChange('lineHeight', value / 100)}
                  min={-500}
                  max={1000}
                  aria-label="slider-ex-1"
                  value={options.lineHeight * 100}
                >
                  <SliderTrack bg="rgba(0,0,0,0.075)">
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <InputGroup>
                  <Input
                    value={options.lineHeight * 10}
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

            <Box sx={{ paddingBottom: '1rem' }}>
              <Box sx={{ fontSize: '14px', color: 'rgba(37,40,47,0.65)' }}>Text stretch</Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 60px', gap: '2rem' }}>
                <Slider
                  // onChange={value => handleOpacityChange(value)}
                  min={0}
                  max={100}
                  aria-label="slider-ex-1"
                  value={0}
                >
                  <SliderTrack bg="rgba(0,0,0,0.075)">
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <InputGroup>
                  <Input
                    value={10}
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

export default TextAdjustment
