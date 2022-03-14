import { useActiveObject, useEditor } from '@/sdk';
import { Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from '@chakra-ui/react';
import React from 'react';

export default function Saturation() {
    const editor = useEditor()
    const activeObject = useActiveObject()
    const [saturation, setSaturation] = React.useState(0)

    React.useEffect(() => {
        if (activeObject) {
            // updateOptions(activeObject)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeObject])

    const updateOptions = (object: any) => {
        const { saturation } = object
        // setSaturation(saturation)
    }

    const handlesaturationChange = (value: number) => {
        if (editor) {
            setSaturation(value)
            editor.objects.setFilter(value / 100, 'saturation');
            // editor.objects.update({
            //     opacity: value / 100,
            // })
        }
    }
    return (

        <Flex direction="column" padding="1.25rem">
            <Flex justify="space-between" align="center">
                <Text color="#7D7D7D" fontSize="14px">
                    saturation
                </Text>
                {/* <Icons.Diamond size={12} styles={{ transform: "translateY(3px)" }} /> */}
            </Flex>
            <Flex align="center">
                <Slider
                    aria-label='volume'
                    margin="1.25rem"
                    onChange={value => handlesaturationChange(value)}
                    value={saturation}
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
                    {Math.round(saturation)}%
                </Text>
            </Flex>
        </Flex>
    )
}
