import Opacity from './Opacity'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Divider, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import Exposure from './Exposure';
import Brightness from './Brightness';
import Contrast from './Contrast';
import Saturation from './Saturation';
import ColorTone from './ColorTone';
import Sharpness from './Sharpness';
import Vignette from './Vignette';

export default function Adjuts() {
    return (
        <Accordion allowToggle>
            <AccordionItem>
                <h2>
                    <AccordionButton p="1.5rem">
                        <Flex justify="space-between" w="100%">
                            <Text color="#7D7D7D" fontSize="14px">
                                Adjust
                            </Text>
                            <AccordionIcon />
                        </Flex>
                    </AccordionButton >
                </h2>

                <AccordionPanel p="0" sx={{
                    '& > div': { padding: '0.75rem 1.2rem !important' },
                    '& > div:first-of-type': {
                        padding: '0 1.2rem 0.75rem !important'
                    },
                    '& > div > div > div': {
                        margin: '0.75rem 1rem !important'
                    }
                }}
                >
                    {/* <Opacity /> */}
                    <Exposure />
                    <Brightness />
                    <Contrast />
                    <Saturation />
                    <ColorTone />
                    <Sharpness />
                    <Vignette />
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}
