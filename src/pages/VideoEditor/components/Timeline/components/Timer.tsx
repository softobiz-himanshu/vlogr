import { initialScaleFactor, scaleUnits, zoomSliderStep } from '@/constants/contants'
import { useMousseContext } from '@/contexts/MousseContext'
import { useResizeContext } from '@/contexts/ResizeProvider'
import { selectClips, selectLineItems, selectScaleFactor, selectTimelineWidth } from '@/store/slices/timeline/selectors'
import { getProjectDuration, getZoom } from '@/utils/timelineHelper'
import React from 'react'
import { useSelector } from 'react-redux'
import { useEditorTimer } from '../../EditorTimer'

const positionCache: { [s: string]: (nativeOffsetX: number) => void } = {};

let scaleItemWidth: number;

const lerp = (start: number, end: number, t: number) => {
  return (end - start) * t + start
}

/**
 * Format a given time in seconds to hh:mm:ss format
 * @param time time in seconds
 * @returns {String} hh:mm:ss format
 */
const formatTime = (time: number) => {
  let s = parseFloat((time / 1000).toFixed(2))

  let currentMinute = Math.floor(s / 60)
  let currentSecond = Math.floor(s / 1) - currentMinute * 60
  let currentMillisecond = (s - Math.floor(s / 1)) * 60

  // currentSecond = currentSecond + Math.floor(currentMillisecond / 30)
  // currentMillisecond = currentMillisecond - 30 * Math.floor(currentMillisecond / 30)


  let minute = String(currentMinute)
  while (minute.length < (2 || 2)) {
    minute = '0' + minute
  }
  let second = String(currentSecond)
  while (second.length < (2 || 2)) {
    second = '0' + second
  }
  let millisecond = currentMillisecond.toFixed(0)
  while (millisecond.length < (2 || 2)) {
    millisecond = '0' + millisecond
  }

  return minute + ':' + second + ':' + millisecond
}

export default function Timer() {
  const editorTimer = useEditorTimer()
  const timerRef = React.useRef<HTMLDivElement>(null)
  const scaleFactor = useSelector(selectScaleFactor);
  let projectDuration = 1
  const [isDragging, setIsDragging] = React.useState(false);
  const [timerWidth, setTimerWidth] = React.useState(0);
  const timelineWidth = useSelector(selectTimelineWidth);
  const clips = useSelector(selectClips);
  const items = useSelector(selectLineItems);
  const [enabledArea, setEnabledArea] = React.useState(0);

  const { cursor } = useMousseContext();

  const zoom = getZoom(scaleFactor);

  const { itemWidth, selectedItemId, itemLeft } = useResizeContext();

  /**
   * Generate the timescale UI
   * @returns JSX.Element
   */
  const timer = () => {
    if (!timerRef.current) return null
    let rows: JSX.Element[] = []
    let length = Math.max(timerWidth / scaleFactor, projectDuration)

    let divisions = Math.floor((length * scaleFactor) / 100)


    scaleItemWidth = 100

    const getTimeTranslateX = () => {
      return -52;
      // return (52 * zoom) * -1;
    }

    for (let i = 0; i <= divisions; i++) {

      const positionX = (scaleItemWidth) * i;


      const rawTime = ((length / divisions) * i);
      const remainder = rawTime % (initialScaleFactor / scaleFactor * 1000 * i);

      let time = rawTime - remainder;


      const onMouseMove = (nativeOffsetX: number) => {
        editorTimer.setTime(
          lerp(
            time,
            (length / divisions) * (i + 1),
            Math.floor(nativeOffsetX) / (scaleItemWidth)
          )
        )
      }

      positionCache[positionX] = onMouseMove;

      rows.push(
        <div
          style={{
            textAlign: 'center',
            position: 'relative',
            padding: '10px 0px 9px',
            flex: `0 0 ${scaleItemWidth}px`,
            // borderBottom: '1px dashed #EBECED',
            cursor: cursor,
            background: 'white'
          }}
          key={time}
        >
          <div
            style={{
              borderRight: '2px solid #EBECED',
              bottom: 0,
              height: '6px',
              position: 'absolute',
              left: '20%',
            }}
          />
          <div
            style={{
              borderRight: '2px solid #EBECED',
              bottom: 0,
              height: '6px',
              position: 'absolute',
              left: '40%',
            }}
          />
          <div
            style={{
              borderRight: '2px solid #EBECED',
              bottom: 0,
              height: '6px',
              position: 'absolute',
              left: '60%',
            }}
          />
          <div
            style={{
              borderRight: '2px solid #EBECED',
              bottom: 0,
              height: '6px',
              position: 'absolute',
              left: '80%',
            }}
          />



          <div
            style={{
              borderRight: '2px solid #EBECED',
              bottom: 0,
              // height: '14px',
              height: '6px',
              position: 'absolute',
              right: 0,
            }}
          />

          {i === 0 ? (
            <div
              style={{
                borderRight: '2px solid #EBECED',
                bottom: 0,
                // height: '14px',
                height: '6px',
                position: 'absolute',
              }}
            />
          ) : (
            ''
          )}

          <p
            style={{
              fontSize: '12px',
              color: '#BBBCBD',

              // fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: '12px',
              paddingBottom: '3px',
              zIndex: 2,
              // textAlign: 'center',
              position: "relative",
              transform: `translateX(${getTimeTranslateX()}px)`,
              opacity: i > 0 ? 1 : 0

            }}
          >
            {
              formatTime(time)
              // (time / 1000).toFixed(0)
            }
          </p>
        </div >
      )
    }
    return rows;
  }

  /**
   * Moves playhead when draggin over the timescale
   * @param ev React mouse event
   * @returns 
   */
  const onMouseMove = (ev: MouseEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const clientX = ev.clientX;
    const wrapperX = timerRef.current.getBoundingClientRect().x;
    const positionX = clientX - wrapperX;

    const positionCacheArray = Object.keys(positionCache).sort((a, b) => Number(a) - Number(b));

    for (let index = 0; index < positionCacheArray.length; index++) {
      const position = Number(positionCacheArray[index]);

      if (positionX >= position && positionX <= position + scaleItemWidth) {

        const offfset = position + scaleItemWidth;
        const nativeX = scaleItemWidth - (offfset - positionX);

        positionCache[position](nativeX);

        break;
      }
    }
  }


  /**
   * Allows to move the playhead when the cursor drags over the timescale
   * @returns
   */
  const onMouseDown = () => {
    setIsDragging(true);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  /**
   * stop playhead motion when mouse is up
   * @returns
   */
  const onMouseUp = () => {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp)
  };


  React.useEffect(() => {
    const maxWidth = getProjectDuration(clips, items, zoom);
    const width = Math.max(maxWidth, timelineWidth);
    setTimerWidth(width);

  }, [scaleFactor, clips, items, timelineWidth])

  React.useEffect(() => {
    if (itemWidth === null || itemLeft === null || !selectedItemId) return () => { };

    const newClipsState = clips.map(clip => clip.id === selectedItemId ? { ...clip, width: itemWidth, x: itemLeft } : clip)
    const newItemsState = items.map(item => item.id === selectedItemId ? { ...item, width: itemWidth, x: itemLeft } : item)

    setEnabledArea(getProjectDuration(newClipsState, newItemsState, zoom));


  }, [itemWidth, selectedItemId])

  React.useEffect(() => {
    setEnabledArea(getProjectDuration(clips, items, zoom))
  }, [clips, items, zoom, timelineWidth])

  return (
    <div
      onMouseDown={onMouseDown}
      onClick={onMouseMove}
      onContextMenu={ev => { ev.preventDefault(); ev.stopPropagation() }}
      ref={timerRef}
      id='timmerWrapper'
      style={{
        display: "flex",
        // height: '40px',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        position: "relative",
        // zIndex: 1,
        alignItems: 'baseline',
        width: "fit-content",
        cursor: cursor,
        // borderBottom: '1px dashed #EBECED',
        minWidth: `100%`,
        background: "white",
        // zIndex: 1
      }}
    >
      {timer()}

      {
        enabledArea < timelineWidth &&
        <div
          style={{
            position: "absolute",
            left: enabledArea,
            width: timelineWidth - enabledArea,
            top: 0,
            height: "100%",
            // zIndex:2
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              backgroundImage: `repeating-linear-gradient(
                315deg,
                transparent,
                transparent 3px,
               #EBECED 3px,
               #EBECED 4px
              )`,
            }}
          ></div>
        </div>
      }
    </div>
  )
}
