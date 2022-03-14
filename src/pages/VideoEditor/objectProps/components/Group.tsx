import { Box } from '@chakra-ui/react'
import Icons from '@/components/Icons'
import { Button } from '@chakra-ui/react'
import { useActiveObject, useEditor } from '@sdk'
import { useEffect, useState } from 'react'

interface Options {
  isGroup: boolean
  multiple: boolean
}

function Group() {
  const [options, setOptions] = useState<Options>({ isGroup: false, multiple: false })
  const editor = useEditor()
  const activeObject = useActiveObject()

  useEffect(() => {
    if (activeObject) {
      updateOptions(activeObject)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeObject])

  const updateOptions = (object: any) => {
    const { type } = object
    // @ts-ignore
    setOptions({ ...options, isGroup: type === 'group', multiple: !!activeObject._objects })
  }

  return (
    <>
      {options.multiple && (
        <Box sx={{ padding: '2rem 1.5rem 0' }}>
          {options.isGroup ? (
            <Button
              sx={{ color: '#636363', ':hover': { backgroundColor: '#EDEDED' } }}
              onClick={() => editor.objects.ungroup()}
              variant="outline"
              isFullWidth={true}
              leftIcon={<Icons.Group size={24} />}
            >
              Ungroup
            </Button>
          ) : (
            <Button
              sx={{ color: '#636363', ':hover': { backgroundColor: '#EDEDED' } }}
              onClick={() => editor.objects.group()}
              variant="outline"
              isFullWidth={true}
              leftIcon={<Icons.Group size={24} />}
            >
              Group
            </Button>
          )}
        </Box>
      )}
    </>
  )
}

export default Group
