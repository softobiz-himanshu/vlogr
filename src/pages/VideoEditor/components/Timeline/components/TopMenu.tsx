import Icons from '@/components/Icons'
import { useMousseContext } from '@/contexts/MousseContext'
import { Box, IconButton, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react'
import scissor from '../../../../../assets/images/Scissors.svg'
import dayjs from 'dayjs'
import { useEditorTime, useEditorTimer, useEditorTimerStatus } from '../../EditorTimer'
import React, { useEffect } from 'react'
import { useAppDispatch } from '@/store/store'
import { useSelector } from 'react-redux'
import { selectScaleFactor } from '@/store/slices/timeline/selectors'
import { setScaleFactor } from '@/store/slices/timeline/actions'
import { initialScaleFactor, minScaleValue, scaleUnit, zoomSliderStep } from '@/constants/contants'
import { useEditor } from '@/sdk'
import { useSetShouldStart } from '../../EditorTimer'
import { getZoomSliderValue, handleZoom } from '@/utils/zoomHelper'
let d = new Date(2018, 8, 18)

export default function TopMenu() {
  const [options, setOptions] = React.useState({
    status: 'STOPPED',
  })

  const [scissorSelected, setScissorSelected] = React.useState(false)
  const [selectorBtnSelected, setSelectorBtnSelected] = React.useState(false)
  const [sliderValue, setSliderValue] = React.useState(100)
  const setShouldStart = useSetShouldStart()
  const timer = useEditorTimer()
  const time = useEditorTime()
  const editor = useEditor()
  const timerStatus = useEditorTimerStatus()
  const { cursor, setCursor } = useMousseContext()

  const scaleFactor = useSelector(selectScaleFactor)
  const dispatch = useAppDispatch()

  const [zoomScaleValue, setZoomScaleValue] = React.useState(100);

  /**
   * change timescale zoom
   * @param scaleValue new scaleFactor
   * @returns
   */
  const handleZoomScale = (scaleValue: number) => {
    handleZoom(scaleValue, dispatch);
    setZoomScaleValue(scaleValue);
  }


  /**
   * Handles click event on zoom buttons
   * @param {'zoomIn'|'zoomOut'} operation
   * @returns 
   */
  const onZoomInZoomOutClicked = (operation: 'zoomIn' | 'zoomOut') => {
    if (operation === 'zoomOut' && zoomScaleValue > 0) {
      handleZoomScale(zoomScaleValue - zoomSliderStep);
    } else if (operation === 'zoomIn' && zoomScaleValue < 100) {
      handleZoomScale(zoomScaleValue + zoomSliderStep);
    }
  }


  useEffect(() => {
    setOptions({ ...options, status: timerStatus })
  }, [timerStatus])

  const onScissorClicked = () => {
    setCursor('url(' + scissor + ') 0 20, move !important')
    setScissorSelected(true)
    setSelectorBtnSelected(false)
  }

  const onSelectorClicked = () => {
    setCursor('default')
  }

  React.useEffect(() => {
    if (cursor === 'default') {
      setSelectorBtnSelected(true)
      setScissorSelected(false)
      return
    }
  }, [cursor])

  React.useEffect(() => {
    setSliderValue(getZoomSliderValue(scaleFactor))
  }, [scaleFactor])

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 130px 1fr',
        padding: '1rem',
        cursor: cursor,
      }}
    >
      <Box>
        <IconButton
          color="#333333"
          variant="ghost"
          aria-label="Search database"
          style={{ backgroundColor: selectorBtnSelected ? '#DFF1FF' : 'transparent' }}
          icon={<Icons.Cursor size={24} />}
          onClick={onSelectorClicked}
        />
        <IconButton
          color="#333333"
          variant="ghost"
          style={{ backgroundColor: scissorSelected ? '#DFF1FF' : 'transparent' }}
          aria-label="Search database"
          icon={<Icons.Scissor size={24} />}
          onClick={onScissorClicked}
        />
        {/* <IconButton
          color="#333333"
          variant="ghost"
          aria-label="Search database"
          icon={<Icons.PlusCircle size={24} />}
        /> */}
      </Box>
      <Box>
        <IconButton
          onClick={() => {
            setShouldStart(false)
            timer.stop()
          }}
          color="#333333"
          variant="ghost"
          aria-label="Search database"
          icon={<Icons.FastBackward size={14} />}
        />
        {options.status === 'RUNNING' ? (
          <IconButton
            onClick={() => {
              setShouldStart(false)
              timer.stop()
            }}
            color="#333333"
            variant="ghost"
            aria-label="Search database"
            icon={<Icons.Pause size={30} />}
          />
        ) : (
          <IconButton
            onClick={() => {
              setShouldStart(true)
              // timer.start()
              // const layers = editor.design.exportLayers()
            }}
            color="#333333"
            variant="ghost"
            aria-label="Search database"
            icon={<Icons.Play size={30} />}
          />
        )}
        <IconButton
          color="#333333"
          variant="ghost"
          aria-label="Search database"
          icon={<Icons.FastForward size={14} />}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ color: '#BDBDBD' }}>{dayjs(d).millisecond(time).format('HH:mm:ss.SSS')}/00:30:00</Box>
        <Box sx={{ width: '220px', display: 'flex' }}>
          <IconButton
            onClick={() => onZoomInZoomOutClicked('zoomOut')}
            color="#333333"
            variant="ghost"
            aria-label="Search database"
            icon={<Icons.Minus size={18} />}
          />
          <Slider
            size="sm"
            colorScheme="gray"
            aria-label="slider-ex-1"
            defaultValue={getZoomSliderValue(scaleFactor)}
            onChange={value => handleZoomScale(value)}
            value={sliderValue}
            step={zoomSliderStep}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb backgroundColor="#333333" />
          </Slider>
          <IconButton
            onClick={() => onZoomInZoomOutClicked('zoomIn')}
            color="#333333"
            variant="ghost"
            aria-label="Search database"
            icon={<Icons.Plus size={18} />}
          />
        </Box>
      </Box>
    </Box>
  )
}
