import React from 'react'
import preview from '@assets/images/reactangule.png'
import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Image,
  Button,
  Divider,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  useDisclosure,
} from '@chakra-ui/react'
import DownloadModal from './DownloadModal'

function Download() {
  const [sliderValue, setSliderValue] = React.useState(10)
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      {isOpen && <DownloadModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />}

      <Popover placement="bottom-end">
        <PopoverTrigger>
          <Button borderRadius="11px">Export</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Box fontWeight="500" p="1rem">
            Export options
          </Box>
          <Box p="0 1rem">
            <Image src={preview} />
          </Box>
          <Box p="1rem">
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '0.5fr 1fr',
              }}
            >
              <Box>Duration</Box>
              <Box>00:30:00</Box>
            </Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '0.5fr 1fr',
              }}
            >
              <Box>File size</Box>
              <Box>12.6 MiB</Box>
            </Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '0.5fr 1fr',
              }}
            >
              <Box>Resolution</Box>
              <Box>720p</Box>
            </Box>
            <Divider mt="1rem" />
          </Box>
          <Box p="0 1rem">
            <Box pb="1rem" fontWeight="500">
              Time rate
            </Box>

            <Slider aria-label="slider-ex-1" onChange={val => setSliderValue(val)} min={5} max={60}>
              <SliderMark value={5} mt="1" fontSize="sm">
                5
              </SliderMark>
              <SliderMark value={60} mt="1" fontSize="sm">
                60
              </SliderMark>
              <SliderMark value={sliderValue} mt="2" ml="-1">
                {sliderValue}
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
          <Box p="2rem 1rem">
            <Button onClick={() => onOpen()} isFullWidth>
              Export
            </Button>
          </Box>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default Download
