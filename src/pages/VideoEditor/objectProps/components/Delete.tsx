import { useActiveObject, useEditor } from '@sdk'
import { IconButton } from '@chakra-ui/react'
import Icons from '@/components/Icons'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '@/store/store'
import { removeItem } from '@/store/slices/timeline/actions'

function Delete() {
  const [locked, setLocked] = useState(false)
  const editor = useEditor()
  const activeObject = useActiveObject()

  const dispatch = useAppDispatch();

  const onDelete = () => {
    if ((activeObject as any).type !== 'StaticAudio') {
      editor.objects.remove()

    } else {
      const itemId = (activeObject as any).id;
      editor.objects.removeById((activeObject as any).id);
      dispatch(removeItem({ itemId }));
      editor.objects.deselectActiveObject();
    }
  }

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
      onClick={onDelete}
    />
  )
}

export default Delete
