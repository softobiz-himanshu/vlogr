import React from 'react';
import Icons from '@/components/Icons';
import { Box, Input, InputGroup, InputLeftElement, InputRightElement, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Browse from './Browse';

export default function Videos() {
    return (
        <Box sx={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
            <Box sx={{ padding: '1.5rem 1.5rem 1rem' }}>
                <InputGroup sx={{ background: "#F0F1F2", borderRadius: '11px', height: '40px' }}>
                    <Input
                        sx={{
                            border: "none",
                            fontSize: '16px',
                            ':focus': {
                                border: '1px solid rgb(0, 0 ,0, 0.2)',
                                boxShadow: '0 3px 6px 0 rgb(0, 0 ,0, 0.16)',
                            },
                        }}
                        color="#BDBDBD"
                        placeholder="Search"
                    />
                    <InputRightElement color="#afafaf">
                        <Icons.MagnifyingGlass size={24} />
                    </InputRightElement>
                </InputGroup>
            </Box>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Tabs sx={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 1.5rem' }}>
                    <TabList display="flex">
                        <Tab sx={{ fontSize: '14px', color: "#636363", flex: 1 }}>Browse</Tab>
                        <Tab sx={{ fontSize: '14px', color: "#636363", flex: 1 }}>Favorites</Tab>
                    </TabList>

                    <TabPanels sx={{ flex: 1 }}>
                        <TabPanel sx={{ height: '100%', padding: 0 }}>
                            <Browse/>
                        </TabPanel>
                        <TabPanel sx={{ height: '100%', padding: 0 }}>
                            {/* <Pixabay /> */}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </Box>
    )
}
