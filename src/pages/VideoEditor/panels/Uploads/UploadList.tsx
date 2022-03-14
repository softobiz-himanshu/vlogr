import React from 'react';
import { IUpload } from '@/interfaces/editor';
import Scrollbars from 'react-custom-scrollbars';
import { selectUploading } from '@/store/slices/uploads/selectors';
import { useSelector } from 'react-redux';
import { Box, Flex, Progress, IconButton, Text } from '@chakra-ui/react';
import { useEditor } from '@/sdk';
import UploadItemMenu from './UploadItemMenu';
import { TabTypes } from './Uploads';
import Icons from '@/components/Icons';

type UploadListProps = {
    uploads: IUpload[],
    currentFile: any,
    tabType: TabTypes
}

export default function UploadList({ uploads, currentFile, tabType }: UploadListProps) {
    const uploading = useSelector(selectUploading);
    const editor = useEditor();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [menuX, setMenuX] = React.useState(0);
    const [menuY, setMenuY] = React.useState(0);
    const [selectedUpload, setSelectedUpload] = React.useState<IUpload>(null);

    const [play, setPlay] = React.useState(false);
    const [audioControl, setAudioControl] = React.useState<HTMLAudioElement>(null);
    const [selectedAudioId, setSelectedAudioId] = React.useState<string>(null);

    const addImageToCanvas = (url: string) => {
        const options = {
            type: 'StaticImage',
            metadata: { src: url },
        }
        editor.objects.add(options)
    }

    const addVideoToCanvas = (url: string, previewURL: string) => {
        const options = {
            type: 'StaticVideo',
            metadata: {
                src: url,
                preview: previewURL,
            },
        }

        editor.objects.add(options);
    }

    const addGifToCanvas = (url: string) => {
        const options = {
            type: 'StaticGIF',
            metadata: { src: url }
        }

        editor.objects.add(options);
    }

    const handleAddObject = (url: string, previewUrl?: string) => {
        if (tabType === TabTypes.GIF) {
            addGifToCanvas(url);
        } else if (tabType === TabTypes.videos) {
            addVideoToCanvas(url, previewUrl)
        } else {
            addImageToCanvas(url)
        }
    }

    const onContextMenu = (ev: React.MouseEvent, upload: IUpload) => {

        ev.preventDefault();

        const elRef = document.getElementById(`upload-${upload.id}`);
        const x = (elRef.getBoundingClientRect().x + (ev.clientX - elRef.getBoundingClientRect().x));

        setMenuX(x);
        setMenuY(ev.clientY);
        setIsMenuOpen(true);
        setSelectedUpload(upload);
    }

    const getUploadsContainerStyles = (): React.CSSProperties => {
        if (tabType !== TabTypes.Audios) {
            return {
                display: 'grid',
                gap: '0.5rem',
                padding: '0 2rem 2rem',
                gridTemplateColumns: '1fr 1fr',
                marginTop: "10px",
                position: "relative"
            }
        } else {
            return {
                display: 'flex',
                flexDirection: 'column',
                padding: '0.65rem 1rem',
            }
        }
    }

    const playAudio = (upload: IUpload, play: boolean) => {

        if (upload.id !== selectedAudioId) {
            stopPlayer();
        }

        if (play) {

            if (audioControl) {
                audioControl.pause();
            }
            startPlayer(upload);
        } else {
            stopPlayer();
        }
    }

    const startPlayer = (upload: IUpload) => {
        const control = new Audio();
        control.crossOrigin = "anonymous";
        control.src = upload.url;
        const playPromise = control.play();
        if (playPromise !== undefined) {
            playPromise.then(console.log).catch(console.log)
        }
        setAudioControl(control)
    }

    const stopPlayer = () => {
        audioControl?.pause();
        setAudioControl(null);
    }

    const onPlayAudio = (upload: IUpload, playAudio: boolean) => {
        if (!!playAudio) {
            setSelectedAudioId(upload.id);
        }
        setTimeout(() => {
            setPlay(playAudio);
        }, 100);
    }

    React.useEffect(() => {
        const onEscape = (ev: KeyboardEvent) => {
            if (ev.key === 'Escape') {
                setIsMenuOpen(false);
            }
        }
        window.addEventListener('keyup', onEscape);

        return () => {
            audioControl?.pause();
            window.removeEventListener('keyup', onEscape);
        }
    }, [])

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



    return (
        <Scrollbars>
            <div style={{ flex: 1 }}>
                {
                    <div
                        style={{ ...getUploadsContainerStyles() }}
                        id="uploadsContainer"
                    >

                        {uploading &&
                            <Box sx={{ position: 'relative', padding: "10px", height: "165px", borderRadius: "10px" }}>
                                <img
                                    width="100%"
                                    src={currentFile}
                                    alt="uploaded"
                                    height={"100%"}
                                    style={{ height: "100%", objectFit: "cover", borderRadius: "10px" }}

                                />
                                <Box sx={{
                                    position: 'absolute',
                                    zIndex: 100,
                                    bottom: 0,
                                    width: '100%',
                                    padding: '1.5rem',
                                    left: 0
                                }}>
                                    <Progress
                                        // backgroundColor="#3782F7"
                                        size="md"
                                        value={uploading?.progress}
                                        borderRadius="5px"
                                        height="7px"
                                    />
                                </Box>
                            </Box>
                        }

                        {
                            tabType !== TabTypes.Audios
                                ?
                                uploads.map(upload => (
                                    <Box
                                        id={`upload-${upload.id}`}
                                        key={upload.id}
                                        sx={{ position: 'relative', padding: "10px", height: "165px", borderRadius: "10px" }}
                                        onContextMenu={ev => onContextMenu(ev, upload)}
                                    >

                                        <img
                                            onClick={() => handleAddObject(upload.url, upload.previewURL)}
                                            width="100%"
                                            src={tabType === TabTypes.videos ? upload.previewURL : upload.url}
                                            alt="preview"
                                            crossOrigin='anonymous'

                                            style={{ height: "100%", objectFit: "cover", borderRadius: "10px" }}
                                        />

                                    </Box>
                                ))

                                :

                                uploads.map(upload => (
                                    <Flex
                                        key={upload.id}
                                        id={`upload-${upload.id}`}
                                        onContextMenu={ev => onContextMenu(ev, upload)}
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
                                        onClick={() => {
                                            stopPlayer();
                                            editor.objects.add({
                                                id: upload.id,
                                                type: 'StaticAudio',
                                                metadata: {
                                                    src: upload.url,
                                                    preview: 'https://images.pexels.com/videos/3571264/pictures/preview-0.jpg',
                                                },
                                            })
                                        }}
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
                                            onClick={(ev) => {
                                                ev.preventDefault();
                                                ev.stopPropagation();
                                                playAudio(upload, upload.id === selectedAudioId ? !play : true);
                                                onPlayAudio(upload, upload.id === selectedAudioId ? !play : true);
                                            }}
                                        >
                                            {

                                                play && selectedAudioId === upload.id
                                                    ?
                                                    <Icons.Pause size={11} />
                                                    :
                                                    <Icons.PlayTrack size={11} styles={{ transform: 'translateX(1.5px)' }} />
                                            }
                                        </button>

                                        <Flex direction="column" justify="space-between" marginLeft={'1rem'}>
                                            <Text fontSize="14px" color="#636363">
                                                {upload.name}
                                            </Text>
                                            <Text color="#999999" fontSize="11px">
                                                3:20
                                            </Text>
                                        </Flex>

                                    </Flex>
                                ))
                        }

                    </div>
                }
            </div>

            <UploadItemMenu
                isMenuOpen={isMenuOpen}
                menuX={menuX}
                menuY={menuY}
                upload={selectedUpload}
                closeMenu={() => setIsMenuOpen(false)}
            />
        </Scrollbars>
    )
}
