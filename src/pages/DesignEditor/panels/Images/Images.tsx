import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react'
import Icons from '@/components/Icons'
import Pixabay from './Pixabay'
import Pexels from './Pexels'
function Images() {
  return (
    <Box sx={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <Box sx={{ padding: '1.5rem 1.5rem 1rem' }}>
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
            placeholder="Image search"
          />
          <InputLeftElement color="#afafaf">
            <Icons.Search size={16} />
          </InputLeftElement>
        </InputGroup>
      </Box>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Tabs sx={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 1.5rem' }}>
          <TabList>
            <Tab sx={{ fontSize: '14px' }}>Pexels</Tab>
            <Tab sx={{ fontSize: '14px' }}>Pixabay</Tab>
          </TabList>

          <TabPanels sx={{ flex: 1 }}>
            <TabPanel sx={{ height: '100%', padding: 0 }}>
              <Pexels />
            </TabPanel>
            <TabPanel sx={{ height: '100%', padding: 0 }}>
              <Pixabay />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </Box>
  )
}

export default Images
