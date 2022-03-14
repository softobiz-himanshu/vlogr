import { useActiveObject, useEditor } from '@sdk'
import { IconButton } from '@chakra-ui/react'
import Icons from '@/components/Icons'
import { useEffect, useState } from 'react'

function CopyStyle() {
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
      sx={{
        opacity: locked ? 0.4 : 1,
        pointerEvents: locked ? 'none' : 'auto',
      }}
      size="sm"
      variant="unstyled"
      aria-label="unlocked"
      icon={<Icons.CopyStyle size={22} />}
      onClick={() => {
        editor.objects.copyStyle()
      }}
    />
  )
}

export default CopyStyle
