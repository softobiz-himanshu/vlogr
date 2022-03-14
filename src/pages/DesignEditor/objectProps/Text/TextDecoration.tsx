import { Box } from '@chakra-ui/react'
import Icons from '@/components/Icons'
import { IconButton } from '@chakra-ui/react'
import { useActiveObject, useEditor } from '@sdk'
import { useEffect, useState } from 'react'

interface Options {
  fontWeight: number
  linethrough: any
  underline: boolean
  fontStyle: string
}

function TextDecoration() {
  const editor = useEditor()
  const activeObject = useActiveObject()
  const [options, setOptions] = useState<Options>({
    fontStyle: 'normal',
    fontWeight: 700,
    underline: false,
    linethrough: false,
  })

  useEffect(() => {
    if (activeObject) {
      updateOptions(activeObject)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeObject])

  const updateOptions = (object: any) => {
    const { fontStyle, fontWeight, linethrough, underline } = object
    // const { fill, backgroundColor } = object
    setOptions({ ...options, fontStyle, fontWeight, linethrough, underline })
  }

  const handleTextDecorationChange = (type: string, value: any) => {
    if (editor) {
      setOptions({ ...options, [type]: value })
      editor.objects.update({
        [type]: value,
      })
    }
  }
  return (
    <Box sx={{}}>
      <IconButton
        color="#25282f"
        aria-label="strike-through"
        variant="ghost"
        icon={<Icons.Bold size={24} />}
        onClick={() => handleTextDecorationChange('fontWeight', options.fontWeight === 700 ? 400 : 700)}
      />
      <IconButton
        color="#25282f"
        aria-label="strike-through"
        variant="ghost"
        icon={<Icons.Italic size={24} />}
        onClick={() =>
          handleTextDecorationChange('fontStyle', options.fontStyle === 'italic' ? 'normal' : 'italic')
        }
      />
      <IconButton
        color="#25282f"
        aria-label="strike-through"
        variant="ghost"
        icon={<Icons.Underline size={24} />}
        onClick={() => handleTextDecorationChange('underline', options.underline === true ? false : true)}
      />
      <IconButton
        color="#25282f"
        aria-label="strike-through"
        variant="ghost"
        icon={<Icons.StrikeThrough size={24} />}
        onClick={() => handleTextDecorationChange('linethrough', options.linethrough === true ? false : true)}
      />
    </Box>
  )
}

export default TextDecoration
