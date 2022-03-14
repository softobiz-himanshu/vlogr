import { Box } from '@chakra-ui/react'
import Navbar from './components/Navbar'
import PanelItem from './PanelItem'
import PanelItems from './PanelItems'
import Editor, { useEditor, useEditorObjects } from '@sdk'
import { useAppDispatch } from '@/store/store'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { getElements } from '@store/slices/elements/actions'
import { getUploads } from '@store/slices/uploads/actions'
import { getFonts } from '@store/slices/fonts/actions'
import ContextMenu from './components/ContextMenu'
import { useParams } from 'react-router'
import api from '@/services/api'
import { useMousseContext } from '@/contexts/MousseContext'
import { DndProvider } from '@/contexts/DndProvider'
import { ResizeProvider } from '@/contexts/ResizeProvider'
import Timeline from './components/Timeline/Timeline'
import { ItemType } from '@/constants/itemTypes'
import { setTimelineClips, setTimelineItems } from '@/store/slices/timeline/actions'
import { useSelector } from 'react-redux'
import { selectClips, selectLineItems, selectScaleFactor, selectWrapperHeight } from '@/store/slices/timeline/selectors'
import {
  calculateNewX,
  calculateY,
  clearIsClip,
  clearIsVideo,
  clearItemIds,
  clearXpositionFlag,
  getIsClip,
  getIsVideo,
  getPlayheadX,
  getXpositionFlag,
  getZoom,
  isPastedItem,
  setItemCache,
  setItemMaxWidth, 
  setItemName, 
  setItemType, 
  setItemWidth
} from '@/utils/timelineHelper'
import EditorTimer, { EditorTimerProvider } from './components/EditorTimer'
import { clipItems } from './components/Timeline/fakeData'
import { Item } from '@/interfaces/Item'
import scissor from '../../assets/images/Scissors.svg'
import useResizableTimeline from '@/hooks/useResizableTimeline'
import { ScissorProvider } from '@/contexts/ScissorProvider'
import Canvas from './components/Canvas'

function DesignEditor({ location }: any) {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const editor = useEditor()

  const editorObjects = useEditorObjects()

  const wrapperHeight = useSelector(selectWrapperHeight)
  const timelineItems = useSelector(selectLineItems)
  const clips = useSelector(selectClips)
  const scaleFactor = useSelector(selectScaleFactor);
  const { cursor, setCursor } = useMousseContext()

  const timelineWrapperRef = useRef() as MutableRefObject<HTMLDivElement>

  const isScissorSelected = () => cursor.includes('url(' + scissor + ')')

  const zoom = getZoom(scaleFactor);

  const { onMouseMove, onMouseDown, onMouseLeave } = useResizableTimeline({
    dispatch,
    timelineWrapperRef,
    wrapperHeight,
    timelineItems,
    isScissorSelected,
    setCursor,
    cursor,
  })

  // const cropMenu = useCropMenu()
  useEffect(() => {
    dispatch(getElements())
    dispatch(getUploads())
    dispatch(getFonts())
    // dispatch(getCreations())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (id && editor) {
      api.getCreationById(id).then(data => {
        if (data && data.object !== 'error') {
          editor.design.importFromJSON(data)
        } else {
          editor.objects.clear()
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, editor])

  useEffect(() => {
    console.log({ editorObjects })
    let textNumber = 0
    let elementsNumber = 0
    let audiosNumber = 0;

    if (!editorObjects || !wrapperHeight) return

    let lineItems: Item[] = [...timelineItems]

    editorObjects.map(obj => {
      const object = timelineItems?.find(item => item.id === obj.id)
      obj.type === 'StaticAudio' ? audiosNumber++ : obj.text ? textNumber++ : elementsNumber++

      const isClip = clips.find(clip => clip.id === obj.id)

      if (object || isClip) return object

      const newItem: Item = {
        id: obj.id as string,
        name: setItemName(obj, audiosNumber, textNumber, elementsNumber),
        type: setItemType(obj),
        width: setItemWidth(obj, scaleFactor),
        x: getPlayheadX(zoom) || 0,
        y: 0,
      }

      if (isPastedItem(newItem.id)) {
        newItem.x = getXpositionFlag()
        newItem.type = getIsClip() ? ItemType.video : newItem.type
      }

      if (getIsVideo()) {
        newItem.type = ItemType.video;
      }

      newItem.cutFrom = 0;
      newItem.cutTo = newItem.width
      newItem.maxWidth = setItemMaxWidth(newItem)
      newItem.prevHeadWidth = newItem.width;
      newItem.prevTailWidth = newItem.width

      const { newX, parentClipId } = calculateNewX(clips, newItem)
      newItem.x = newX;
      newItem.clipParentId = parentClipId;
      setItemCache(newItem);

      lineItems = calculateY(lineItems, newItem, 1, true);

      clearXpositionFlag();
      clearItemIds();
      clearIsClip();
      clearIsVideo();

      return newItem
    })

    if (!editorObjects || !editorObjects.length) {
      lineItems = [];
    }

    dispatch(setTimelineItems({ items: lineItems }))
  }, [editorObjects, wrapperHeight])

  useEffect(() => {
    if (dispatch) {
      dispatch(setTimelineClips({ clips: clipItems }))
    }
  }, [dispatch])

  useEffect(() => {
    if (editor) {
      editor.manager.elements.update(timelineItems)
      // console.log(timelineItems)
    }
  }, [timelineItems, editor])

  useEffect(() => {
    if (editor) {
      editor.manager.elements.update(clips)
    }
  }, [editor, clips])
  return (
    <EditorTimerProvider>
      <EditorTimer />
      <Box
        style={{
          height: '100vh',
          width: '100vw',
          background: '#ecf0f1',
          display: 'flex',
          flexDirection: 'column',
          // backgroundColor: '#F1F1F1',
          position: 'relative',
        }}
      >
        <Navbar />
        <Box style={{ flex: 1, display: 'flex' }}>
          <PanelItems />
          <Box
            sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}
            onMouseMove={onMouseMove}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
          >
            <Box sx={{ display: 'flex', flex: 1 }}>
              <PanelItem />
              <Box sx={{ flex: 1, display: 'flex', position: 'relative' }}>
                <ContextMenu />
                <Canvas />
              </Box>
            </Box>

            <DndProvider>
              <ResizeProvider>
                <ScissorProvider>
                  <Timeline wrapperRef={timelineWrapperRef} />
                </ScissorProvider>
              </ResizeProvider>
            </DndProvider>
          </Box>
        </Box>
      </Box>
    </EditorTimerProvider>
  )
}

export default DesignEditor
