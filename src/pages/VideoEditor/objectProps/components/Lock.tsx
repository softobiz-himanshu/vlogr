import { useActiveObject, useEditor } from '@sdk'
import { useEffect, useState } from 'react'
import { IconButton } from '@chakra-ui/react'
import Icons from '@/components/Icons'

interface Options {
  locked: boolean
}

function Lock() {
  const [options, setOptions] = useState<Options>({ locked: false })
  const editor = useEditor()
  const activeObject = useActiveObject()

  useEffect(() => {
    if (activeObject) {
      updateOptions(activeObject)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeObject])

  const updateOptions = (object: any) => {
    const { locked } = object
    setOptions({ ...options, locked: !!locked })
  }

  return (
    <>
      {options.locked ? (
        <IconButton
          size="sm"
          variant="unstyled"
          aria-label="locked"
          icon={<Icons.Unlocked size={22} />}
          onClick={() => {
            editor.objects.unlock()
            setOptions({ ...options, locked: false })
          }}
        />
      ) : (
        <IconButton
          size="sm"
          variant="unstyled"
          aria-label="unlocked"
          icon={<Icons.Locked size={22} />}
          onClick={() => {
            if ((activeObject as any)?.type !== 'StaticAudio') {
              editor.objects.lock()
              setOptions({ ...options, locked: true })
            }
          }}
        />
      )}
    </>
  )
}

export default Lock
