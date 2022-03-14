import { useActiveObject, useEditor } from '@sdk'
import { IconButton } from '@chakra-ui/react'
import Icons from '@/components/Icons'
import { useEffect, useState } from 'react'

function Delete() {
  const [locked, setLocked] = useState(false)
  const editor = useEditor()
  const activeObject = useActiveObject()

  useEffect(() => {
    if (activeObject) {
      // @ts-ignore
      setLocked(activeObject.locked)
    } else {
      setLocked(false)
    }
  }, [activeObject])
  useEffect(() => {
    const handleHistoryChange = () => {
      if (activeObject) {
        // @ts-ignore
        setLocked(activeObject.locked)
      }
    }
    if (editor) {
      editor.on('history:changed', handleHistoryChange)
    }
    return () => {
      if (editor) {
        editor.off('history:changed', handleHistoryChange)
      }
    }
  }, [editor, activeObject])
  return (
    <IconButton
      size="sm"
      sx={{
        opacity: locked ? 0.4 : 1,
        pointerEvents: locked ? 'none' : 'auto',
      }}
      variant="unstyled"
      aria-label="delete"
      icon={<Icons.Delete size={22} />}
      onClick={() => editor.objects.remove()}
    />
  )
}

export default Delete
