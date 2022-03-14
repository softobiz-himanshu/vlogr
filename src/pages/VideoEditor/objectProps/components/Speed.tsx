import { Box, Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from '@chakra-ui/react';
import React from 'react';

export default function Speed() {
    const [speed, setSpeed] = React.useState(0);
    return (
        <Box>
            <Flex direction="column" padding="1.25rem">
                <Flex justify="space-between" align="center">
                    <Text color="#7D7D7D" fontSize="14px">
                        speed
                    </Text>
                    {/* <Icons.Diamond size={12} styles={{ transform: "translateY(3px)" }} /> */}
                </Flex>
                <Flex align="center">
                    <Slider
                        aria-label='speed'
                        defaultValue={speed}
                        margin="1.25rem"
                        onChange={value => setSpeed(value)}
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
                        {speed}%
                    </Text>
                </Flex>
            </Flex>
        </Box>
    )
}
