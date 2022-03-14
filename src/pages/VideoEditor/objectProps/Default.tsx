import { Box } from '@chakra-ui/react'
import { Scrollbars } from 'react-custom-scrollbars'

function Default() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(37,40,47,0.05)',
          height: '52px',
          alignItems: 'center',
          padding: '0 1rem',
          fontSize: '14px',
        }}
      >
        <Box>Canvas</Box>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Scrollbars autoHide>
          {/* <Box p="1rem">
            <Alignment />
            <Position />
            <Flip />
          </Box>

          <Divider />
          <Opacity />
          <Shadow /> */}
        </Scrollbars>
      </Box>
    </Box>
  )
}

export default Default
