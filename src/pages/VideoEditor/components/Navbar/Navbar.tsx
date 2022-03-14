import { Button } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { useEditor } from '@sdk'
import { useEffect, useState } from 'react'
import Icons from '@components/Icons'
import File from './File'
import { useParams } from 'react-router-dom'
import api from '@services/api'
import { useAppDispatch } from '@/store/store'
import { updateCreationsList } from '@/store/slices/creations/actions'
import formatSizes from '@/constants/format-sizes'
import Download from './Download'
import { Popover, PopoverTrigger, PopoverContent, Center, Divider } from '@chakra-ui/react'

function useParamId() {
  const params: { id: string | undefined } = useParams()
  const [id, setId] = useState('')
  useEffect(() => {
    const id = params.id ? params.id : ''
    setId(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])
  return id
}

function Navbar() {
  const [changeStatus, setChangeStatus] = useState('All changes saved')
  const [lastSaved, setLastSaved] = useState<any>(null)
  const [historyStatus, setHistoryStatus] = useState({ hasUndo: false, hasRedo: false })
  const editor = useEditor()
  const id = useParamId()
  const dispatch = useAppDispatch()
  const [name] = useState('Untitled design')

  useEffect(() => {
    const handleHistoryChange = (data: any) => {
      setHistoryStatus({ ...historyStatus, hasUndo: data.hasUndo, hasRedo: data.hasRedo })
    }
    if (editor) {
      editor.on('history:changed', handleHistoryChange)
    }
    return () => {
      if (editor) {
        editor.off('history:changed', handleHistoryChange)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor])

  const handleSave = async () => {
    if (editor) {
      const exportedTemplate = editor.design.exportToJSON()
      const reference = lastSaved ? lastSaved : {}
      if (JSON.stringify(exportedTemplate) !== JSON.stringify(reference)) {
        setChangeStatus('Saving changes')
        const savedTemplate = await api.updateCreation(id, { ...exportedTemplate, name })
        dispatch(updateCreationsList(savedTemplate))
        setChangeStatus('Saved changes')
        setLastSaved(exportedTemplate)
        setTimeout(() => {
          setChangeStatus('All changes saved')
        }, 1000)
      }
    }
  }

  const updateFormatSize = (value: any) => {
    // setValue(value)
    const size = value.size
    editor.frame.resize({
      width: size.width,
      height: size.height,
    })
  }

  useEffect(() => {
    let saveInterval: any
    if (editor && id) {
      saveInterval = setInterval(() => {
        handleSave()
      }, 5000)
    }
    return () => {
      if (saveInterval) {
        clearInterval(saveInterval)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, lastSaved, id])

  const downloadImage = async () => {
    if (editor) {
      const data = await editor.design.toPNG()
      if (data) {
        const a = document.createElement('a')
        a.href = data
        a.download = 'drawing.png'
        a.click()
      }
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
        padding: '0 2rem',
        borderBottom: '1px solid rgba(37,40,47,0.1)',
        flex: 'none',
        background: '#ffffff',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ paddingRight: '1.5rem' }}>
          <Icons.Logo size={24} />
        </Box>

        <File />

        <Popover placement="bottom-start">
          <PopoverTrigger>
            <Button sx={{ color: '#7D7D7D', fontWeight: 400 }} variant="ghost">
              1024x1024
            </Button>
          </PopoverTrigger>
          <PopoverContent sx={{ width: '120px' }}>
            <Box>
              {formatSizes.map((frameSize, index) => (
                <Box
                  sx={{
                    height: '42px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 1rem',
                  }}
                  _hover={{ backgroundColor: 'rgba(0,0,0,0.05)', cursor: 'pointer' }}
                  onClick={() => updateFormatSize(frameSize)}
                  key={index}
                >
                  <Box>{frameSize.description}</Box>
                </Box>
              ))}
            </Box>
          </PopoverContent>
        </Popover>
        <Center sx={{ padding: '0 1rem' }} height="20px">
          <Divider orientation="vertical" />
        </Center>
        <Box sx={{ color: '#ffffff', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Box
            onClick={() => editor.history.undo()}
            sx={{ color: historyStatus.hasUndo ? '#333333' : 'rgba(0,0,0,0.1)', cursor: 'pointer' }}
          >
            <Icons.Undo size={24} />
          </Box>
          <Box
            onClick={() => editor.history.redo()}
            sx={{ color: historyStatus.hasRedo ? '#333333' : 'rgba(0,0,0,0.1)', cursor: 'pointer' }}
          >
            <Icons.Redo size={24} />
          </Box>
        </Box>
        <Center sx={{ padding: '0 1rem' }} height="20px">
          <Divider orientation="vertical" />
        </Center>
        <Box>
          <Box sx={{ color: '#AFAFAF', fontStyle: 'italic' }}>{changeStatus}</Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Button variant="ghost">Share</Button>
        <Download />
      </Box>
    </Box>
  )
}

export default Navbar
