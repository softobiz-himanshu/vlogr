import React from 'react';
import { Box, Divider, Flex, IconButton, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from '@chakra-ui/react';
import Delete from './components/Delete'
import Duplicate from './components/Duplicate'
import Icons from '@/components/Icons';
import { useActiveObject, useEditor } from '@/sdk';

export default function Audio() {

    const editor = useEditor();
    const activeObject = useActiveObject() as any

    const [options, setOptions] = React.useState({ volume: 30, speed: 80 });
    const [locked, setLocked] = React.useState(false);

    const onVolumeChange = (volume: number) => {
        if (editor && activeObject) {
            setOptions({ ...options, volume })
            editor.objects.setAudioVolume(activeObject.id, volume);
        }
    }

    React.useEffect(() => {
        if (activeObject) {
            setOptions({ ...options, volume: activeObject?.metadata?.volume || 0 })
        }
    }, [activeObject])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    backgroundColor: 'rgba(37,40,47,0.05)',
                    height: '52px',
                    alignItems: 'center',
                    padding: '0 1rem',
                    fontSize: '14px',
                }}
            >
                <Box style={{ color: "#7D7D7D", fontSize: "14px" }}>
                    Audio
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Duplicate />

                    {/* <Lock /> */}

                    <>
                        {
                            locked

                                ?
                                (
                                    <IconButton
                                        size="sm"
                                        variant="unstyled"
                                        aria-label="unlocked"
                                        icon={<Icons.Locked size={22} />}
                                        onClick={() => setLocked(false)}
                                    />
                                )
                                :
                                (
                                    <IconButton
                                        size="sm"
                                        variant="unstyled"
                                        aria-label="locked"
                                        icon={<Icons.Unlocked size={22} />}
                                        onClick={() => setLocked(true)}
                                    />
                                )
                        }
                    </>

                    <Delete />
                </Box>
            </Box>

            <Box>
                <Flex direction="column" padding="1.25rem">
                    <Flex justify="space-between" align="center">
                        <Text color="#7D7D7D" fontSize="14px">
                            volume
                        </Text>
                        <Icons.Diamond size={12} styles={{ transform: "translateY(3px)" }} />
                    </Flex>
                    <Flex align="center">
                        <Slider
                            aria-label='volume'
                            value={options.volume}
                            marginTop="1.25rem"
                            onChange={onVolumeChange}
                            isDisabled={locked}
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
                            transform: 'translateY(7px)'
                        }}
                        >
                            {(options.volume / 100).toFixed(2)}
                        </Text>
                    </Flex>
                </Flex>

                <Divider />

                <Flex direction="column" padding="1.25rem">
                    <Flex justify="space-between" align="center">
                        <Text color="#7D7D7D" fontSize="14px">
                            speed
                        </Text>
                        <Icons.Diamond size={12} styles={{ transform: "translateY(3px)" }} />
                    </Flex>

                    <Flex align="center">
                        <Slider
                            aria-label='speed'
                            defaultValue={options.speed}
                            marginTop="1.25rem"
                            step={20}
                            onChange={value => setOptions({ ...options, speed: value })}
                            isDisabled={locked}
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
                            transform: 'translateY(7px)'
                        }}
                        >
                            x{options.speed / 20}
                        </Text>
                    </Flex>
                </Flex>
            </Box>
        </Box>
    )
}
