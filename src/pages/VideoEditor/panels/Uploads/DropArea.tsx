import React from 'react';
import DropZone from '@/components/Dropzone';
import Icons from '@/components/Icons';
import { Box } from '@chakra-ui/react';
import Scrollbars from 'react-custom-scrollbars';
import { TabTypes } from './Uploads';

type DropAreaProps = {
    handleDropFiles: (files: FileList) => void,
    tabType: TabTypes
}

export default function DropArea({
    handleDropFiles,
    tabType
}: DropAreaProps) {

    const [isDragging, setIsDragging] = React.useState(false);

    const getFormats = () => {
        const formats = {
            [TabTypes.Audios]: "mp3",
            [TabTypes.videos]: "mp4",
            [TabTypes.images]: "jpg or png",
            [TabTypes.GIF]: "gif",
        }

        return formats[tabType];
    }

    return (
        <Scrollbars>
            <DropZone handleDropFiles={handleDropFiles} >
                <Box sx={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "11px",
                    display: "flex",
                    flexDir: "column",
                    alignItems: "center",
                    padding: "3.125rem 1.5rem",
                    margin: '1.5rem',
                    color: '#BDBDBD',
                    transition: '0.3s',
                    maxH: "743px",
                    
                    backgroundColor: !isDragging ? '#fff' : '#F0F6FF',
                    border: !isDragging ? '1px dashed #BDBDBD' : '1px dashed #3782F7',

                }}
                    onDragOver={() => setIsDragging(true)}
                    onDragEnter={() => setIsDragging(true)}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={() =>  setIsDragging(false)}
                >
                    <Icons.FilePlus size={24} />
                    <span
                        style={{
                            color: "#BBBCBD",
                            fontSize: "16px",
                            marginTop: "1.5rem",
                            textAlign: "center"
                        }}
                    >
                        Drag {getFormats()} file here to upload
                    </span>
                </Box>
            </DropZone >
        </Scrollbars>
    )
}
