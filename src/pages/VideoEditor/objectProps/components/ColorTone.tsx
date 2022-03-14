import { useActiveObject, useEditor } from '@/sdk';
import { Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from '@chakra-ui/react';
import React from 'react';

export default function ColorTone() {
    const editor = useEditor()
    const activeObject = useActiveObject()
    const [colorTone, setColorTone] = React.useState(0)

    React.useEffect(() => {
        if (activeObject) {
            // updateOptions(activeObject)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeObject])

    const updateOptions = (object: any) => {
        const { colorTone } = object
        // setColorTone(colorTone)
    }

    const handlecolorToneChange = (value: number) => {
        if (editor) {
            setColorTone(value)
            // editor.objects.update({
            //     opacity: value / 100,
            // })
        }
    }
    return (

        <Flex direction="column" padding="1.25rem">
            <Flex justify="space-between" align="center">
                <Text color="#7D7D7D" fontSize="14px">
                    colorTone
                </Text>
                {/* <Icons.Diamond size={12} styles={{ transform: "translateY(3px)" }} /> */}
            </Flex>
            <Flex align="center">
                <Slider
                    aria-label='volume'
                    margin="1.25rem"
                    onChange={value => handlecolorToneChange(value)}
                    value={colorTone}
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
                    {Math.round(colorTone)}%
                </Text>
            </Flex>
        </Flex>
    )
}
