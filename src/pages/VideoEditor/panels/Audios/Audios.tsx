import React from 'react';
import Icons from '@/components/Icons';
import { Box, Input, InputGroup, InputRightElement, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import AudioList from './AudioList';
import { getMusicList, getSoundEffectList, getSoundEffects } from '@/services/parse';
import { MusicCategory, SoundEffectCategory } from '@/interfaces/Music';

export enum AudioTabTypes {
    Music = "Music",
    SoundEffect = "SoundEffect"
}


export default function Audios() {
    const [tabType, setTabType] = React.useState(AudioTabTypes.Music);
    const [musicList, setMusicList] = React.useState<MusicCategory[]>([]);
    const [soundEffectList, setSoundEffectList] = React.useState<SoundEffectCategory[]>([]);

    
    React.useEffect(() => {
        getMusicList().then(list => setMusicList(list));
        getSoundEffectList().then(list => setSoundEffectList(list));
    }, [])

    return (
        <div style={{ display: 'flex', height: '100%', flexDirection: 'column', width: '100%' }}>
            <Box sx={{ padding: '1.5rem 1.5rem 0' }}>
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

            <Tabs sx={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '1rem 1.5rem 0' }}>
                <TabList display="flex">
                    <Tab onClick={() => setTabType(AudioTabTypes.Music)} sx={{ fontSize: '14px', color: "#636363", flex: 1 }}>
                        Music
                    </Tab>
                    <Tab onClick={() => setTabType(AudioTabTypes.SoundEffect)} sx={{ fontSize: '14px', color: "#636363", flex: 1 }}>
                        Sound Effect
                    </Tab>
                </TabList>

                <TabPanels sx={{ flex: 1 }}>
                    <TabPanel sx={{ height: '100%', padding: 0 }}>
                        <AudioList audioList={musicList} tabType={tabType} />
                    </TabPanel>
                    <TabPanel sx={{ height: '100%', padding: 0 }}>
                        <AudioList audioList={soundEffectList} tabType={tabType} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
}
