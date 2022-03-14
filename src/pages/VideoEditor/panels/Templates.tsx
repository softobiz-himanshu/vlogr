import { Box } from '@chakra-ui/react'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import Icons from '@components/Icons'
import { Scrollbars } from 'react-custom-scrollbars'
import { useSelector } from 'react-redux'
import { selectCreations } from '@/store/slices/creations/selectors'
import { Link } from 'react-router-dom'

function Panel() {
  const creations = useSelector(selectCreations)

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
            placeholder="Search creations"
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
            {creations.map(creation => (
              <Link key={creation.id} to={`/${creation.id}`} style={{ textDecoration: 'none' }}>
                <Box
                  sx={{
                    alignItems: 'center',
                    cursor: 'pointer',
                    padding: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    ':hover': {
                      background: 'rgba(0,0,0,0.05)',
                    },
                  }}
                >
                  <img src={`${creation.preview}?tr=w-480`} alt="preview" height="80px" />
                </Box>
              </Link>
            ))}
          </div>
        </Scrollbars>
      </div>
    </div>
  )
}

export default Panel
