import { fontSizes } from '@/constants/editor'
import { useEffect, useState } from 'react'
import { Box, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import Icons from '@/components/Icons'
import { useActiveObject, useEditor } from '@sdk'

interface Options {
  fontSize: number
}
function FontSizeSelector() {
  const editor = useEditor()
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<Options>({ fontSize: 0 })
  const activeObject = useActiveObject()
  useEffect(() => {
    if (activeObject) {
      updateOptions(activeObject)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeObject])

  const updateOptions = (object: any) => {
    const { fontSize } = object
    setOptions({ ...options, fontSize })
  }

  const handleFontSizeChange = (fontSize: number) => {
    if (editor) {
      setOptions({ ...options, fontSize })
      editor.objects.update({
        fontSize,
      })
    }
  }
  return (
    <Box
      sx={{
        flex: 1,
        ...(open && { boxShadow: '0 3px 6px 0 rgb(0, 0 ,0, 0.16)' }),
      }}
    >
      <InputGroup onClick={() => setOpen(!open)}>
        <Input
          onChange={() => { }}
          value={options.fontSize}
          sx={{
            // borderColor: 'rgb(0, 0 ,0, 0.16)',
            // fontSize: '14px',
            // borderRadius: '4px',
            // ':focus': {
            //   borderColor: 'rgb(0, 0 ,0, 0)',
            //   boxShadow: '0 3px 6px 0 rgb(0, 0 ,0, 0)',
            // },
            // borderColor: 'rgb(0, 0 ,0, 0.16)',
            fontSize: '14px',
            backgroundColor: "#F0F1F2",
            borderRadius: "7px",
            height: "2.31rem",
            fontWeight: 500,
            lineHeight: "17px",
            color: "#636363",
            
          }}
          placeholder="Text search"
          variant="filled"
        />
        <InputRightElement color="#afafaf">
          <Icons.ArrowDown size={16} />
        </InputRightElement>
      </InputGroup>

      <Box sx={{ position: 'relative' }}>
        {open && (
          <Box
            sx={{
              padding: '0.5rem 0',
              position: 'absolute',
              background: '#ffffff',
              zIndex: 100,
              width: '100%',
              boxShadow: '0 3px 6px 0 rgb(0, 0 ,0, 0.16)',
            }}
          >
            {fontSizes.map(fontSize => {
              return (
                <Box
                  key={fontSize}
                  onClick={() => handleFontSizeChange(fontSize)}
                  sx={{
                    fontSize: '14px',
                    padding: '0.5rem 0.5rem',
                    ':hover': {
                      backgroundColor: 'rgba(0,0,0,0.05)',
                    },
                  }}
                >
                  {fontSize}
                </Box>
              )
            })}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default FontSizeSelector
