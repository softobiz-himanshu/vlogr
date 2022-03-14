import { Box } from '@chakra-ui/react'
import Navbar from './components/Navbar'
import PanelItem from './PanelItem'
import PanelItems from './PanelItems'
import Editor, { useEditor } from '@sdk'
import { useAppDispatch } from '@/store/store'
import { useEffect } from 'react'
import { getElements } from '@store/slices/elements/actions'
import { getUploads } from '@store/slices/uploads/actions'
import { getFonts } from '@store/slices/fonts/actions'
import ContextMenu from './components/ContextMenu'
import { useParams } from 'react-router'
import { getCreations } from '@/store/slices/creations/actions'
import api from '@/services/api'

function DesignEditor({ location }: any) {
  const { id } = useParams()
  const dispath = useAppDispatch()
  const editor = useEditor()
  // const cropMenu = useCropMenu()
  useEffect(() => {
    dispath(getElements())
    dispath(getUploads())
    dispath(getFonts())
    dispath(getCreations())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (id && editor) {
      api.getCreationById(id).then(data => {
        if (data && data.object !== 'error') {
          editor.design.importFromJSON(data)
        } else {
          editor.objects.clear()
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, editor])

  return (
    <Box
      style={{
        height: '100vh',
        width: '100vw',
        background: '#ecf0f1',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F1F1F1',
        position: 'relative',
      }}
    >
      {/* {cropMenu.visible && (
        <div
          style={{
            position: 'absolute',
            background: '#ffffff',
            top: cropMenu.top,
            left: cropMenu.left - 60,
            zIndex: 1,
            marginTop: '1rem',
            display: 'flex',
            gap: '0.5rem',
            cursor: 'pointer',
          }}
        >
          <div onClick={() => editor.applyCrop()} style={{ padding: '0.5rem' }}>
            Apply
          </div>
          <div onClick={() => editor.cancelCrop()} style={{ padding: '0.5rem' }}>
            Cancel
          </div>
        </div>
      )} */}

      <Navbar />
      <Box style={{ flex: 1, display: 'flex' }}>
        <PanelItems />
        <PanelItem />
        <Box sx={{ flex: 1, display: 'flex', position: 'relative' }}>
          <ContextMenu />
          <Editor config={{ clipToFrame: true, scrollLimit: 0 }} />
        </Box>
      </Box>
    </Box>
  )
}

export default DesignEditor
