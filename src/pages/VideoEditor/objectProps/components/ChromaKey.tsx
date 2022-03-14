import Icons from '@/components/Icons';
import { Box, Checkbox, Flex, Icon, IconButton, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from '@chakra-ui/react';
import React from 'react';

export default function ChromaKey() {

    const [sensivity, setSensivity] = React.useState(0);

    return (
        <Box>
            <Flex direction="column" padding="1.25rem">
                <Flex justify="space-between" align="center">
                    <Checkbox defaultIsChecked color="#7D7D7D" fontSize="14px">
                        chroma key
                    </Checkbox>
                    <Flex>
                        <Text>#####</Text>
                        <IconButton
                            aria-label='Eye Dropper'
                            icon={<Icons.EyeDropper size={18} />}
                            w="30px"
                            h="30px"
                            bgColor="#F0F1F2"
                            borderRadius="4px"
                            ml="20px"
                            _hover={{ background: '#F0F1F2' }}
                        />
                    </Flex>
                </Flex>
                <Flex align="center">
                    <Slider
                        aria-label='volume'
                        defaultValue={sensivity}
                        margin="1.25rem"
                        onChange={value => setSensivity(value)}
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
                        {sensivity}%
                    </Text>
                </Flex>
            </Flex>
        </Box>
    )
}
