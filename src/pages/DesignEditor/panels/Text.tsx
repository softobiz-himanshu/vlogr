import { Box } from '@chakra-ui/react'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import Icons from '@/components/Icons'
import { useEditor } from '@sdk'

function Text() {
  const editor = useEditor()
  const addHeading = () => {
    const options = {
      type: 'StaticText',
      width: 160,
      metadata: {
        fontWeight: 700,
        fontFamily: 'Noto Sans KR',
        textAlign: 'center',
        fontSize: 28,
        text: 'Add heading',
      },
    }
    editor.objects.add(options)
  }

  const addSubheading = () => {
    const options = {
      type: 'StaticText',
      width: 160,
      metadata: {
        text: 'Add subheading',
        fontSize: 20,
        fontWeight: 700,
        fontFamily: 'Noto Sans KR',
        textAlign: 'center',
      },
    }
    editor.objects.add(options)
  }

  const addTextBody = () => {
    const options = {
      type: 'StaticText',
      width: 160,
      metadata: {
        text: 'Some body text',
        fontSize: 14,
        fontWeight: 300,
        fontFamily: 'Noto Sans KR',
        textAlign: 'center',
      },
    }
    editor.objects.add(options)
  }

  return (
    <Box>
      <Box sx={{ padding: '1.5rem' }}>
        <InputGroup>
          <Input
            sx={{
              borderColor: 'rgb(0, 0 ,0, 0.15)',
              fontSize: '14px',
              ':focus': {
                borderColor: 'rgb(0, 0 ,0, 0.2)',
                boxShadow: '0 3px 6px 0 rgb(0, 0 ,0, 0.16)',
              },
            }}
            placeholder="Text search"
          />
          <InputLeftElement color="#afafaf">
            <Icons.Search size={16} />
          </InputLeftElement>
        </InputGroup>
      </Box>
      <Box sx={{ padding: '0 1.5rem', fontSize: '14px' }}>
        <Box mb="0.5rem">Add text</Box>
        <Box sx={{ display: 'grid', gridTemplateRows: '56px 50px 46px', gap: '1rem' }}>
          <Box
            onClick={addHeading}
            sx={{
              background: 'rgba(37,40,47,0.05)',
              display: 'flex',
              alignItems: 'center',
              fontSize: '28px',
              fontWeight: 700,
              paddingLeft: '1rem',
              cursor: 'pointer',
            }}
          >
            Title text
          </Box>
          <Box
            onClick={addSubheading}
            sx={{
              background: 'rgba(37,40,47,0.05)',
              display: 'flex',
              alignItems: 'center',
              fontSize: '20px',
              fontWeight: 700,
              paddingLeft: '1rem',
              cursor: 'pointer',
            }}
          >
            Subtitle text
          </Box>
          <Box
            onClick={addTextBody}
            sx={{
              background: 'rgba(37,40,47,0.05)',
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
              fontWeight: 400,
              paddingLeft: '1rem',
              cursor: 'pointer',
            }}
          >
            Some body text
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Text
