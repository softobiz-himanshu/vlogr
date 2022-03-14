import React from 'react'
import { useRef, useState } from 'react'
import Icons from '@/components/Icons'
import { useAppDispatch } from '@/store/store'
import { deleteUpload, uploadFile } from '@/store/slices/uploads/actions'
import { Button, Box, Input, InputGroup, InputLeftElement, Progress, InputRightElement, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import DropArea from './DropArea'
import { selectUploading, selectUploads } from '@/store/slices/uploads/selectors'
import { useSelector } from 'react-redux'
import UploadList from './UploadList'
import mime from "mime/lite"
import DialogModal from '@/components/DialogModal/DialogModal'
import { fromDataUrlToFile } from '@/utils/fromDataUrlToFile'
import api from '@services/api'

export enum TabTypes {
  videos = 'videos',
  images = 'images',
  GIF = 'GIF',
  Audios = 'Audios',
}

function Uploads() {
  const dispatch = useAppDispatch()
  const [currentFile, setCurrentFile] = useState<any>(null)
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [tabType, setTabType] = React.useState<TabTypes>(TabTypes.videos);
  const uploads = useSelector(selectUploads);
  const uploading = useSelector(selectUploading);
  const [modalState, setModalState] = React.useState({ isOpen: false, title: '', description: '' })


  const getAvailableTypes = () => {
    const formats = {
      [TabTypes.Audios]: ['mp3', 'wav', 'mpeg'],
      [TabTypes.videos]: ['mp4', 'mov', 'webm'],
      [TabTypes.images]: ['jpg', 'png'],
      [TabTypes.GIF]: ['gif'],
    }

    return formats[tabType]
  }

  // console.log({ tabType, types: getAvailableTypes() });

  const handleDropFiles = (files: FileList) => {
    const file = files[0];

    const mimeType = mime.getType(file.name) as string;
    const validFormats = getAvailableTypes();

    if (!mimeType || !validFormats.includes(mimeType.split('/')[1])) {
      setModalState({
        isOpen: true,
        title: "Upload Failed",
        description:
          `it only ${validFormats.map(format => '.' + format).join(' and ')} support ${validFormats.length > 1 ? "formats" : "format"}`
      });

      return
    }

    if (!file.type.includes('video')) {
      handleUploadFile(file);
    }

    if (file.type.includes('image')) {
      const reader = new FileReader()
      reader.addEventListener(
        'load',
        function () {
          setCurrentFile(reader.result)
        },
        false
      )
      if (file) {
        reader.readAsDataURL(file)
      }
    } else if (file.type.includes('video')) {
      const video = document.createElement('video');

      video.width = 800;
      video.height = 450;


      video.addEventListener('seeked', async () => {

        const canvas = document.createElement("canvas");
        canvas.width = video.width;
        canvas.height = video.height;

        const ctx = canvas.getContext("2d");

        ctx.drawImage(video, 0, 0, video.width, video.height);
        const snapshoot = canvas.toDataURL('image/png');

        setCurrentFile(snapshoot);

        const newFile = fromDataUrlToFile(snapshoot, 'newImage.png')

        const response = await api.uploadPreview(newFile);

        await handleUploadFile(file, response.name);
        document.body.removeChild(video);

      });

      const reader = new FileReader();
      reader.onload = (ev) => {
        const buffer = ev.target.result as ArrayBuffer;
        let videoBlob = new Blob([new Uint8Array(buffer)], { type: 'video/mp4' });

        let url = window.URL.createObjectURL(videoBlob);

        video.src = url;
        document.body.appendChild(video);
        video.currentTime = 1
      }

      reader.readAsArrayBuffer(file);
    }
  }

  const handleUploadFile = async (file: File, previewName?: string) => {
    try {
      dispatch(uploadFile({ file, previewName }))
    } catch (err) {
      console.log({ err })
    }
  }


  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleDropFiles(e.target.files)
    }
  }

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click()
  }


  const renderVideos = () => uploads.filter(upload => upload.url.includes(".webm") || upload.url.includes(".mp4"));
  const renderImages = () => uploads.filter(upload => upload.url.includes(".jpg") || upload.url.includes(".png") || upload.url.includes(".jpeg"));
  const renderGift = () => uploads.filter(upload => upload.url.includes(".gif"));
  const renderAudios = () => uploads.filter(upload => upload.url.includes(".mp3"));

  const getUploads = () => {

    const categories = {
      [TabTypes.Audios]: () => renderAudios(),
      [TabTypes.videos]: () => renderVideos(),
      [TabTypes.images]: () => renderImages(),
      [TabTypes.GIF]: () => renderGift(),
    }

    return categories[tabType]();

  }

  // console.log({uploads: getUploads()})

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
      <div style={{ padding: '20px 1.5rem 0', display: 'flex' }}>
        <Button
          isFullWidth={true}
          onClick={handleInputFileRefClick}
          bgColor="#3782F7"
          borderRadius="10px"
          fontWeight="bold"
          fontSize='16px'
          height="40px"
        >
          Upload file
        </Button>
        <input
          onChange={handleFileInput}
          type="file"
          id="file"
          ref={inputFileRef}
          style={{ display: 'none' }}
        />
      </div>



      <Tabs sx={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '1rem 1.5rem 0' }}>
        <TabList display="flex">
          <Tab onClick={() => setTabType(TabTypes.videos)} sx={{ fontSize: '14px', color: "#636363", flex: 1 }}>Video</Tab>
          <Tab onClick={() => setTabType(TabTypes.images)} sx={{ fontSize: '14px', color: "#636363", flex: 1 }}>Image</Tab>
          <Tab onClick={() => setTabType(TabTypes.GIF)} sx={{ fontSize: '14px', color: "#636363", flex: 1 }}>Gif</Tab>
          <Tab onClick={() => setTabType(TabTypes.Audios)} sx={{ fontSize: '14px', color: "#636363", flex: 1 }}>Audio</Tab>
        </TabList>
      </Tabs>

      {
        !getUploads().length && !uploading
          ?

          <DropArea
            handleDropFiles={handleDropFiles}
            tabType={tabType}
          />
          :
          <UploadList
            currentFile={currentFile}
            uploads={getUploads()}
            tabType={tabType}
          />
      }

      <DialogModal
        isOpen={modalState.isOpen}
        description={modalState.description}
        title={modalState.title}
        onClose={() => setModalState({ ...modalState, isOpen: false, title: '', description: '' })}
      />
    </div>

  )
}

export default Uploads
