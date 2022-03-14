import React from 'react';
import { MusicCategory, SoundEffectCategory } from '@/interfaces/Music';
import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import Scrollbars from 'react-custom-scrollbars';
import Audio from './Audio';
import { AudioTabTypes } from './Audios';

type AudioListProps = {
    audioList: MusicCategory[] | SoundEffectCategory[];
    tabType: AudioTabTypes
}

export default function AudioList({ audioList }: AudioListProps) {

    const [selectedAudioId, setSelectedAudioId] = React.useState<string>(null);

    return (

        <>
            {
                !audioList || !audioList.length
                    ?
                    <Flex align="center" justify="center" h="100%">
                        <Spinner size="lg" color='black' />
                    </Flex>
                    :
                    <Scrollbars>
                        {
                            audioList.map(music => (
                                <Box key={music.category}>
                                    <Text
                                        sx={{
                                            color: '#7D7D7D',
                                            fontSize: "14px",
                                            margin: "15px 1rem"
                                        }}
                                    >
                                        {music.category}
                                    </Text>
                                    <Box>
                                        {music.audios.map(audio =>
                                            <Audio
                                                audio={audio}
                                                key={audio.id}
                                                selectedAudioId={selectedAudioId}
                                                setSelectedAudioId={setSelectedAudioId}
                                            />
                                        )}
                                    </Box>
                                </Box>
                            ))
                        }
                    </Scrollbars>
            }
        </>
    )
}
