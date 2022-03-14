import React from 'react';
import Icons from '@/components/Icons';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useEditor } from '@/sdk';
import { Music, SoundEffect } from '@/interfaces/Music';

// Parse.initialize()

type AudioProps = {
    audio: Music | SoundEffect,
    selectedAudioId: string
    setSelectedAudioId: React.Dispatch<React.SetStateAction<string>>
}

export default function AudioComponent({ audio, selectedAudioId, setSelectedAudioId }: AudioProps) {

    const [play, setPlay] = React.useState(false);
    const [audioControl, setAudioControl] = React.useState<HTMLAudioElement>(null);

    const editor = useEditor();

    const addAudio = () => {
        const options = {
            id: audio.id,
            type: 'StaticAudio',
            metadata: {
                src: audio.src,
                preview: '',
                totalDuration: audioControl.duration
            },
        }
        editor.objects.add(options)
    }

    const handlePlayAudio = () => {
        const value = !play;
        if (!!value) {
            setSelectedAudioId(audio.id);
        }
        setTimeout(() => {
            setPlay(value);
        }, 100);
    }

    React.useEffect(() => {
        const control = new Audio();
        control.crossOrigin = "anonymous";
        control.src = audio.src;
        setAudioControl(control);
    }, [audio])

    React.useEffect(() => {

        if (!audioControl) return;
        if (play) {
            const playPromise = audioControl.play();
            if (playPromise !== undefined) {
                playPromise.then(console.log).catch(console.log)
            }
        } else {
            audioControl.pause();
            setSelectedAudioId(null);
        }
    }, [play, audioControl])

    React.useEffect(() => {
        let interval;
        if (!audioControl) return;
        if (!play) return;

        setInterval(() => {
            if (audioControl.currentTime >= audioControl.duration) {
                setPlay(false);
            }
        }, 100)
        return () => clearInterval(interval)
    }, [play])

    React.useEffect(() => {
        if (selectedAudioId !== audio.id && play) {
            setPlay(false)
        }
    }, [selectedAudioId])

    return (
        <Flex
            key={audio.id}
            id={`audio-${audio.id}`}
            // onContextMenu={ev => onContextMenu(ev, upload)}
            align="center"
            padding="1rem 0.69rem"
            height="62px"
            borderRadius="8px"
            transition="0.3s"
            w="100%"
            sx={{
                '&:hover': {
                    backgroundColor: "#F0F6FF",
                    transition: '0.3s',
                }
            }}
            onClick={addAudio}
        >

            <button
                style={{
                    backgroundColor: "white",
                    borderRadius: "100%",
                    border: "1px solid #BBBCBD",
                    padding: '0.66rem',
                    color: "#BBBCBD"
                }}
                aria-label='play audio'
                onClick={(ev) => { ev.preventDefault(); ev.stopPropagation(); handlePlayAudio() }}
            >
                {
                    !play
                        ?
                        <Icons.PlayTrack size={11} styles={{ transform: 'translateX(1.5px)' }} />
                        :
                        <Icons.Pause size={11} />
                }
            </button>

            <Flex direction="column" justify="space-between" marginLeft={'1rem'}>
                <Text fontSize="14px" color="#636363">
                    {audio.title}
                </Text>
                {
                    "duration" in audio && "artist" in audio &&
                    <Box>
                        <Text display="inline-block" color="#999999" fontSize="11px" marginRight="8px">
                            {audio.artist}
                        </Text>
                        <Text display="inline-block" color="#999999" fontSize="11px">
                            {audio.duration}
                        </Text>
                    </Box>
                }
            </Flex>

        </Flex>
    )
}