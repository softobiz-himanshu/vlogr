import { Flex, Text } from '@chakra-ui/react'
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react'
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

    <Flex direction="column" padding="1.25rem">
      <Flex justify="space-between" align="center">
        <Text color="#7D7D7D" fontSize="14px">
          opacity
        </Text>
        {/* <Icons.Diamond size={12} styles={{ transform: "translateY(3px)" }} /> */}
      </Flex>
      <Flex align="center">
        <Slider
          aria-label='volume'
          margin="1.25rem"
          onChange={value => handleOpacityChange(value)}
          value={options.opacity * 100}
        // isDisabled={locked}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>

        <Text sx={{
          color: "#7D7D7D",
          fontSize: '14px',
          display: "inline-block",
          marginLeft: "1.23rem",
          transform: 'translateY(-3px)'
        }}
        >
          {Math.round(options.opacity * 100)}%
        </Text>
      </Flex>
    </Flex>
  )
}

export default Opacity
