import { useMousseContext } from '@/contexts/MousseContext'
import { useScissorContext } from '@/contexts/ScissorProvider'
import { useEditor } from '@/sdk'
import { selectClips, selectLineItems, selectScaleFactor, selectWrapperHeight } from '@/store/slices/timeline/selectors'
import React from 'react'
import { useSelector } from 'react-redux'
import { useEditorTime, useEditorTimer } from '../../EditorTimer'
import scissor from '../../../../../assets/images/Scissors.svg'
import { Item } from '@/interfaces/Item'
import { ClipItem } from '@/interfaces/ClipItem'
import { getHoveredItemOrClip, getProjectDuration, getXfromDomElement, getZoom, reasignParent, recalculatePositions, splitClip, splitItem } from '@/utils/timelineHelper'
import { setPlayheadPosition, setTimelineClips, setTimelineItems } from '@/store/slices/timeline/actions'
import { useAppDispatch } from '@/store/store'

/**
 * Playhead component
 * @returns JSX.Element
 */
export default function TimeMarker() {
  const editor = useEditor()
  const time = useEditorTime()
  const timer = useEditorTimer()
  const [options, setOptions] = React.useState({
    position: {
      x: 0,
      y: 0,
    },
  })
  const [selectedItemId, setSelectedItemId] = React.useState<string>(null);
  const [scissorIsHovering, setScissorIsHovering] = React.useState(false);
  const [isScissorOverPlayhead, setIsScissorOverPlayhead] = React.useState(false);
  const [cursorX, setCursorX] = React.useState(0);
  const playHeadRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;

  const wrapperHeight = useSelector(selectWrapperHeight);
  const scaleFactor = useSelector(selectScaleFactor);
  const items = useSelector(selectLineItems);
  const clips = useSelector(selectClips);
  const { onScissorOver, onScissorLeave, cropElement, isHovering, itemId } = useScissorContext();
  const { cursor } = useMousseContext();
  const dispatch = useAppDispatch();
  const clientX = React.useRef(0);
  const prevClientX = React.useRef(0);

  const zoom = getZoom(scaleFactor);
  const maxWidth = getProjectDuration(clips, items, zoom);

  /**
   * Handles playhead moussedown event
   * @param ev Mousse Event
   */
  const onStart = (ev: React.MouseEvent) => {
    const playHeadDomRef = document.getElementById("playheadWrapper") as HTMLDivElement;

    const initialX = getXfromDomElement(playHeadDomRef)

    const panelItemsRef = document.getElementById("panelItemsWrapper");

    const panelItemsWidth = panelItemsRef.getBoundingClientRect().width

    const onDrag = (ev: MouseEvent) => {

      let x = ev.clientX - initialX - panelItemsWidth;

      let newX = initialX + x;

      if (newX + 2 <= 0 || newX >= maxWidth) return;

      timer.setTime(newX / scaleFactor)
    }


    /**
     * Remove event listeners to finish the dragging process
     */
    const onStop = () => {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', onStop);
    }


    /**
     * Add event listeners that allow the playhead to be dragged
     */
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', onStop);

  }


  const isScissorSelected = () => cursor.includes('url(' + scissor + ')');

  /**
   * Callback function to crop an item
   * @param item timeline item or clip that has been splitted
   * @param splittedItem splitted item
   */
  const split = (item: Item | ClipItem, splittedItem: Item | ClipItem) => {
    if ((item as any).type !== 'clip') {
      let newItemsState = splitItem(items, item as Item, splittedItem as Item);
      newItemsState = recalculatePositions(newItemsState);
      dispatch(setTimelineItems({ items: newItemsState }));

    } else {

      let newClipState = splitClip(clips, item as ClipItem, splittedItem as ClipItem)
      const newItemsState = reasignParent(splittedItem as ClipItem, items);
      dispatch(setTimelineItems({ items: [] }));
      dispatch(setTimelineItems({ items: newItemsState }));
      dispatch(setTimelineClips({ clips: newClipState }));
    }
  }

  /**
   * Determines whether the scissor is enabled and add corresponding styles to the overlaped item or clip
   * @param ev 
   * @returns 
   */
  const addScissorStylesToOverlapedItem = (ev: React.MouseEvent) => {

    if (!isScissorSelected()) return;

    const { itemId: hoveredItemId, itemIndex, itemOvered } = getHoveredItemOrClip(ev, items, clips);

    setSelectedItemId(hoveredItemId);

    const playHeadX = Math.floor(playHeadRef?.current?.getBoundingClientRect().x);

    const clientX = Math.floor(ev.clientX);

    if (clientX <= playHeadX + 1 && clientX >= playHeadX - 1) {
      setIsScissorOverPlayhead(true);
      setCursorX(ev.clientX)
    } else {
      setIsScissorOverPlayhead(false)
    }


    if (itemOvered) {
      onScissorOver(ev, hoveredItemId)
    }
  }
/**
 * Allos to split an overlaped item or clip
 * @param ev Mouse event
 * @returns 
 */
  const spliItem = (ev: React.MouseEvent) => {

    if (!isScissorSelected()) return;

    const { hoveredItem, itemOvered } = getHoveredItemOrClip(ev, items, clips);

    if (hoveredItem && itemOvered) {
      cropElement(ev, hoveredItem, split);
    }
  }

  const isScissorOver = () =>
    isScissorSelected() && itemId == selectedItemId && isHovering && isScissorOverPlayhead && scissorIsHovering;

  const onMouseEnter = () => {
    if (isScissorSelected())
      setScissorIsHovering(true);
  }

  React.useEffect(() => {
    if (time * scaleFactor <= maxWidth) {
      setOptions({ ...options, position: { x: time * scaleFactor, y: 0 } })
    }
  }, [time])

  React.useEffect(() => {
    if (editor && time) {
      editor.manager.elements.setTime(time)
      editor.objects.deselect()
    }
  }, [time, editor])

  React.useEffect(() => {
    setOptions({ ...options, position: { x: time * scaleFactor, y: 0 } })
  }, [scaleFactor])

  React.useEffect(() => {
    const { x } = document.getElementById("playheadWrapper").getBoundingClientRect();
    dispatch(setPlayheadPosition({ position: x }))
  }, [options.position.x])

  React.useEffect(() => {
    const onMouseMove = (ev: MouseEvent) => {
      prevClientX.current = clientX.current;
      clientX.current = ev.clientX;
    }
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [])

  return (
    <div
      style={{
        width: 'fit-content',
        position: 'absolute',
        top: '-33px',
        left: options.position.x,
        // zIndex: 1
      }}
      id="playheadWrapper"

      onMouseDown={onStart}
    >
      <div
        style={{ position: 'relative', zIndex: 2 }}
        id='playHead'
        onMouseMove={addScissorStylesToOverlapedItem}
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => { onScissorLeave(); setScissorIsHovering(false) }}
        onClick={spliItem}
        ref={playHeadRef}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: '15px solid transparent',
            borderRight: '15px solid transparent',
            borderTop: '15px solid #D30000',
            borderRadius: '5px',
            transform: 'translate(-14px, -1px)',
          }}
        />

        <div
          id="markerLine"
          style={{
            height: wrapperHeight + 73,
            width: 2,
            backgroundColor: '#D30000',
            transform: 'translate(0, -2px)',
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: playHeadRef?.current?.getBoundingClientRect()?.x ? cursorX - playHeadRef?.current?.getBoundingClientRect()?.x : 0,
            height: "100%",
            width: 1,
            borderRight: "2px dashed #3782f7",
            display: isScissorOver() ? 'block' : 'none',
          }}
        />
      </div>
    </div>
  )
}
