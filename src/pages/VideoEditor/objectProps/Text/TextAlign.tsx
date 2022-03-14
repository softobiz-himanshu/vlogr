import { Box } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Icons from '@/components/Icons'
import { useActiveObject, useEditor } from '@sdk'
interface Options {
  textAlign: string
}
function TextAlign() {
  const editor = useEditor()
  const [options, setOptions] = useState<Options>({ textAlign: 'left' })
  const activeObject = useActiveObject()
  useEffect(() => {
    if (activeObject) {
      updateOptions(activeObject)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeObject])

  const updateOptions = (object: any) => {
    const { textAlign } = object
    setOptions({ ...options, textAlign })
  }

  const handleTextAlignChange = (textAlign: string) => {
    if (editor) {
      setOptions({ ...options, textAlign })
      editor.objects.update({
        textAlign: textAlign,
      })
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton
        color="#636363"
        aria-label="strike-through"
        variant="ghost"
        icon={<Icons.TextAlignLeft size={24} />}
        onClick={() => handleTextAlignChange('left')}
        _hover={{
          backgroundColor: "#F0F1F2",
          transition: '0.3s'
        }}
        transition='0.3s'
      />
      <IconButton
        color="#636363"
        aria-label="strike-through"
        variant="ghost"
        icon={<Icons.TextAlignCenter size={24} />}
        onClick={() => handleTextAlignChange('center')}
        _hover={{
          backgroundColor: "#F0F1F2",
          transition: '0.3s'
        }}
        transition='0.3s'
      />
      <IconButton
        color="#636363"
        aria-label="strike-through"
        variant="ghost"
        icon={<Icons.TextAlignJusity size={24} />}
        onClick={() => handleTextAlignChange('justify')}
        _hover={{
          backgroundColor: "#F0F1F2",
          transition: '0.3s'
        }}
        transition='0.3s'
      />
      <IconButton
        color="#636363"
        aria-label="strike-through"
        variant="ghost"
        icon={<Icons.TextAlignRight size={24} />}
        onClick={() => handleTextAlignChange('right')}
        _hover={{
          backgroundColor: "#F0F1F2",
          transition: '0.3s'
        }}
        transition='0.3s'
      />
    </Box>
  )
}

export default TextAlign
