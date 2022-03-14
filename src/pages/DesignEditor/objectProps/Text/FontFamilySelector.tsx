import { Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import Icons from '@/components/Icons'
import { useActiveObject, useEditor } from '@sdk'
import { useSelector } from 'react-redux'
import { selectFonts } from '@/store/slices/fonts/selectors'
import { Scrollbars } from 'react-custom-scrollbars'
import { IFontFamily } from '@/interfaces/editor'

interface Options {
  fontFamily: string
}
function FontFamilySelector() {
  const editor = useEditor()
  const fonts = useSelector(selectFonts)
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<Options>({ fontFamily: 'Open Sans' })
  const activeObject = useActiveObject()
  useEffect(() => {
    if (activeObject) {
      updateOptions(activeObject)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeObject])

  const updateOptions = (object: any) => {
    const { fontFamily } = object
    setOptions({ ...options, fontFamily })
  }

  const handleFontFamilyChange = async (fontFamily: IFontFamily) => {
    if (editor) {
      const fontFile = fontFamily.files['regular' as any]
      const font = {
        name: fontFamily.family,
        url: fontFile,
        options: { style: 'normal', weight: 400 },
      }
      // @ts-ignore
      const fontFace = new FontFace(font.name, `url(${font.url})`, font.options)
      fontFace
        .load()
        .then(font => {
          document.fonts.add(font)
          fontFace.loaded.then(() => {
            editor.objects.update({ fontFamily: fontFamily.family })
            setOptions({ ...options, fontFamily: fontFamily.family })
          })
        })
        .catch(err => console.log(err))

      setOpen(false)
    }
  }
  return (
    <Box sx={{ padding: '1rem 1.5rem 1rem' }}>
      <Box
        sx={{
          ...(open && { boxShadow: '0 3px 6px 0 rgb(0, 0 ,0, 0.16)' }),
        }}
      >
        <InputGroup onClick={() => setOpen(!open)}>
          <Input
            onChange={() => {}}
            value={options.fontFamily}
            sx={{
              borderColor: 'rgb(0, 0 ,0, 0.16)',
              fontSize: '14px',
              borderRadius: '4px',
              ':focus': {
                borderColor: 'rgb(0, 0 ,0, 0)',
                boxShadow: '0 3px 6px 0 rgb(0, 0 ,0, 0)',
              },
            }}
            placeholder="Text search"
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
                height: '480px',
              }}
            >
              <Scrollbars autoHide>
                <Box>
                  {fonts.map(font => {
                    return (
                      <Box
                        onClick={() => handleFontFamilyChange(font)}
                        sx={{
                          padding: '0.5rem 0.5rem',
                          // fontFamily: editorFont.name,
                          ':hover': {
                            backgroundColor: 'rgba(0,0,0,0.05)',
                            cursor: 'pointer',
                          },
                        }}
                      >
                        {font.family}
                      </Box>
                    )
                  })}
                </Box>
                {/* {editorFonts.map(editorFont => {
                return (
                  <Box
                    key={editorFont.name}
                    onClick={() => handleFontFamilyChange(editorFont.name)}
                    sx={{
                      padding: '0.5rem 0.5rem',
                      fontFamily: editorFont.name,
                      ':hover': {
                        backgroundColor: 'rgba(0,0,0,0.05)',
                      },
                    }}
                  >
                    <img src={editorFont.preview} alt="font preview" />
                  </Box>
                )
              })} */}
              </Scrollbars>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default FontFamilySelector
