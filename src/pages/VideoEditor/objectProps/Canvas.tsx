import React, { useState } from 'react';
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Checkbox, Input, InputGroup, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react';
import Scrollbars from 'react-custom-scrollbars';
import ColorPicker from '@/components/ColorPicker';
import { useEditor } from '@/sdk';
import throttle from 'lodash/throttle'
import Editor from '@/sdk/Editor';

interface Options {
    fill: string;
    angle: number;
    colors: string[];
    enabled: boolean;
}

const getCanvasBgColor = (editor: Editor): string => {
    return typeof editor.frame.getBackgroundColor() === 'string'
        ? editor.frame.getBackgroundColor() as string
        : '#fffff'
}

export default function Canvas() {

    const editor = useEditor();
    const [openItems, setOpenItems] = useState([-1])
    const [options, setOptions] = useState<Options>({
        fill: getCanvasBgColor(editor),
        angle: 0,
        colors: ['#24C6DC', '#514A9D'],
        enabled: false,
    })

    const updateFillColor = throttle((color: string) => {
        if (editor) {
            setOptions({ ...options, fill: color })
            editor.frame.setBackgroundColor(color);
        }
    }, 200)

    const handleGradientChange = (key: any, value: any) => {
        setOptions({ ...options, [key]: value })

        if (key === 'enabled') {
            if (value) {
                editor.frame.setBackgroundGradient({ ...options, [key]: value })
            }
        } else {
            if (options.enabled) {
                editor.frame.setBackgroundGradient({ ...options, [key]: value })
            }
        }
    }

    const handleEnable = (idx: number) => {
        let enabled = false
        if (idx === 0) {
            enabled = true
        }
        handleGradientChange('enabled', enabled)
        setOpenItems([idx])
    }

    const handleGradientColorChange = (index: number, color: string) => {
        const updatedColors = [...options.colors]
        updatedColors[index] = color
        handleGradientChange('colors', updatedColors)
    }

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
                <Box>Background</Box>
            </Box>

            <Box sx={{ flex: 1, opacity: 1, pointerEvents: 'auto' }}>
                <Scrollbars autoHide>

                    {/* FILL COLOR */}
                    <Box sx={{ display: 'flex', alignItems: 'center', padding: '1rem 1.5rem' }}>
                        <Box
                            sx={{
                                flex: 1,
                                display: 'grid',
                                gridTemplateColumns: '1fr 40px',
                            }}
                        >

                            <Box sx={{
                                display: 'grid',
                                gridTemplateColumns: '30px 1fr',
                                width: '100%',
                            }} align="center">
                                <Checkbox isChecked={true} isDisabled mr="10px" />
                                <Box
                                    flex="1"
                                    textAlign="left"
                                    sx={{ color: '#7D7D7D', fontSize: '14px', padding: '0.5rem 0' }}
                                >
                                    fill color
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <ColorPicker onChange={updateFillColor} value={options.fill} />
                            </Box>
                        </Box>
                    </Box>

                    {/* GRADIENT */}

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
                                                    background: `linear-gradient(${options.angle + 90}deg, ${options.colors[0]}, ${options.colors[1]
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
                                                <Box>
                                                    <ColorPicker
                                                        value={options.colors[0]}
                                                        onChange={color => handleGradientColorChange(0, color)}
                                                    />
                                                </Box>
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
                                                background: `linear-gradient(${options.angle + 90}deg, ${options.colors[0]}, ${options.colors[1]
                                                    })`,
                                                height: '20px',
                                            }}
                                        ></Box>
                                    </Box>

                                    <Box mt="1rem">
                                        <Box sx={{ color: 'rgba(37,40,47,0.65)', fontSize: '14px' }}>
                                            angle
                                        </Box>
                                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 60px', gap: '2rem', marginTop: -2 }}>
                                            <Slider
                                                aria-label="slider-ex-1"
                                                value={options.angle}
                                                onChange={value => handleGradientChange('angle', value)}
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
                                                    onChange={() => { }}
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
                </Scrollbars>
            </Box>

        </Box>
    )
}
