import { Box } from '@chakra-ui/react'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import Icons from '@/components/Icons'
import { Scrollbars } from 'react-custom-scrollbars'
import { useEditor } from '@sdk'
import { useSelector } from 'react-redux'
import { selectElements } from '@/store/slices/elements/selectors'

function Panel() {
  const elements = useSelector(selectElements)
  const editor = useEditor()

  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
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
      <div style={{ flex: 1 }}>
        <Scrollbars>
          <div
            style={{ display: 'grid', gap: '0.5rem', padding: '0 2rem 2rem', gridTemplateColumns: '1fr 1fr' }}
          >
            {elements.map(element => (
              <div
                key={element.id}
                style={{
                  alignItems: 'center',
                  cursor: 'pointer',
                  padding: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
                onClick={() => editor.objects.add(element)}
              >
                <img
                  width="80px"
                  src={element.metadata.preview || 'https://via.placeholder.com/150'}
                  alt="preview"
                  height="80px"
                />
              </div>
            ))}
          </div>
        </Scrollbars>
      </div>
    </div>
  )
}

export default Panel
