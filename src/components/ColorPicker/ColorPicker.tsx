import { Box, Button, Flex, Grid, Input, Text } from '@chakra-ui/react'
import { HexColorPicker } from 'react-colorful'
import { Popover, PopoverTrigger, PopoverContent } from '@chakra-ui/react'
import React from 'react';

interface ColorPickerProps {
  onChange: (color: string) => void
  value: string | null
}

function ColorPicker({ onChange, value }: ColorPickerProps) {
  const currentColor = value ? value : '#ffffff'
  const [savedColors, setSavedColors] = React.useState<string[]>([]);

  const onAddColor = () => {
    if (!savedColors.find(color => color === currentColor)) {
      setSavedColors([...savedColors, currentColor])
    }
  }


  return (
    <Popover placement="top-start" >
      <PopoverTrigger>
        <Box
          sx={{
            border: '1px solid rgba(37,40,47,0.25)',
            padding: '0.25rem',
            display: 'flex',
            borderRadius: '4px',
          }}
        >
          <Box
            sx={{ height: '24px', width: '24px', backgroundColor: currentColor, borderRadius: '4px' }}
          ></Box>
        </Box>
      </PopoverTrigger>
      <PopoverContent
        sx={{
          width: 'inherit',
          padding: '1.5rem',
          '& .react-colorful__last-control': {
            borderRadius: '100px !important',
            marginTop: '16px !important',

            '& .react-colorful__pointer': {
              width: '10px',
              height: '10px'
            },
          },

          '& .react-colorful': {
            width: '232px !important',
            height: '131px !important',
          },

          '& .react-colorful__saturation': {

            borderRadius: '4px !important'
          },

          '& .react-colorful__alpha, .react-colorful__hue': {
            height: '8px !important'
          }
        }}
      >
        <Flex direction="column">
          <HexColorPicker color={currentColor} onChange={onChange} />
          <Input
            width="10.17rem"
            h="1.75rem"
            borderRadius="4px"
            border="1px solid #E5E7EB"
            boxShadow="0px 1px 2px rgba(31, 41, 55, 0.08)"
            color="#9CA3AF"
            mt="1rem"


            value={value}
            onChange={() => {}}
          />
        </Flex>

        <Flex direction="column" mt="1rem">
          <Flex justify="space-between" align="center">
            <Text color="#374151" fontSize="12px" fontWeight={500}>
              Saved Colors:
            </Text>

            <Button
              bgColor="transparent"
              fontWeight={500}
              fontSize="12px"
              color="#6B7280"
              _hover={{ backgroundColor: 'transparent' }}
              _active={{ backgroundColor: 'transparent' }}
              _focus={{ backgroundColor: 'transparent' }}

              onClick={onAddColor}
            >
              + ADD:
            </Button>
          </Flex>

          <Grid mt="1rem" templateColumns="repeat(auto-fit, 24px )" rowGap={'8px'} columnGap="11px">
            {savedColors.map(color => (
              <Box w="24px" h="24px" borderRadius="24px" bgColor={color}/>
            ))}
          </Grid>
        </Flex>
      </PopoverContent>
    </Popover>
  )
}

export default ColorPicker
