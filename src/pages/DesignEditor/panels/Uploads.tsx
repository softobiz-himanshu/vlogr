import { useRef, useState } from 'react'
import DropZone from '@components/Dropzone'
import { Scrollbars } from 'react-custom-scrollbars'
import { useEditor } from '@sdk'
import Icons from '@/components/Icons'
import { useSelector } from 'react-redux'
import { selectUploading, selectUploads } from '@/store/slices/uploads/selectors'
import { useAppDispatch } from '@/store/store'
import { deleteUpload, uploadFile } from '@/store/slices/uploads/actions'
import { Button, Box, Input, InputGroup, InputLeftElement, Progress } from '@chakra-ui/react'

function Uploads() {
  const editor = useEditor()
  const dispatch = useAppDispatch()
  const uploads = useSelector(selectUploads)
  const uploading = useSelector(selectUploading)
  const [currentFile, setCurrentFile] = useState<any>(null)
  const inputFileRef = useRef<HTMLInputElement>(null)
  const handleDropFiles = (files: FileList) => {
    const file = files[0]
    handleUploadFile(file)
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
  }

  const handleUploadFile = async (file: File) => {
    try {
      dispatch(uploadFile({ file }))
    } catch (err) {
      console.log({ err })
    }
  }

  const addImageToCanvas = (url: string) => {
    const options = {
      type: 'StaticImage',
      metadata: { src: url },
    }
    editor.objects.add(options)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleDropFiles(e.target.files)
    }
  }

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click()
  }

  const handleDeleteUpload = async (id: string) => {
    try {
      dispatch(deleteUpload({ id }))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <DropZone handleDropFiles={handleDropFiles}>
      <div style={{ display: 'flex', height: '100%', flexDirection: 'column', width: '100%' }}>
        <div style={{ padding: '1rem 2rem 0', display: 'flex' }}>
          <Button isFullWidth={true} onClick={handleInputFileRefClick}>
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
        <Box sx={{ padding: '1.5rem' }}>
          <InputGroup>
            <Input
              sx={{
                borderColor: 'rgb(0, 0 ,0, 0.15)',
                fontSize: '14px',
                ':focus': {
                  borderColor: 'rgb(0, 0 ,0, 0.2)',
                  boxShadow: '0 3px 6px 0 rgb(0, 0 ,0, 0.16)',
                },
              }}
              placeholder="Find your upload"
            />
            <InputLeftElement color="#afafaf">
              <Icons.Search size={16} />
            </InputLeftElement>
          </InputGroup>
        </Box>
        <div style={{ flex: 1 }}>
          <Scrollbars>
            <div
              style={{
                display: 'grid',
                gap: '0.5rem',
                padding: '0 2rem 2rem',
                gridTemplateColumns: '1fr 1fr',
              }}
            >
              {uploading && (
                <Box sx={{ position: 'relative' }}>
                  <img width="100%" src={currentFile} alt="uploaded" />
                  <Box sx={{ position: 'absolute', zIndex: 100, bottom: 0, width: '100%', padding: '1rem' }}>
                    <Progress colorScheme="green" size="md" value={uploading.progress} />
                  </Box>
                </Box>
              )}

              {uploads.map(upload => (
                <div
                  key={upload.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                >
                  <div
                    onClick={() => handleDeleteUpload(upload.id)}
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      padding: '0.25rem',
                      zIndex: 4,
                      display: 'flex',
                      alignItems: 'center',
                      background: 'rgba(255,255,255,0.9)',
                      borderRadius: '50%',
                      color: 'rgba(0,0,0,0.5)',
                    }}
                  >
                    <Icons.Delete size={18} />
                  </div>
                  <img
                    onClick={() => addImageToCanvas(upload.url)}
                    width="100%"
                    src={`${upload.url}?tr=w-320`}
                    alt="preview"
                  />
                </div>
              ))}
            </div>
          </Scrollbars>
        </div>
      </div>
    </DropZone>
  )
}

export default Uploads
