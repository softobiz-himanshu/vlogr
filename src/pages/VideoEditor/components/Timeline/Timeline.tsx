import { useMousseContext } from '@/contexts/MousseContext'
import { Box, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import TimeMarker from './components/TimeMarker'
import Timer from './components/Timer'
import TopMenu from './components/TopMenu'
import ClipLine from './components/ClipLine'
import Items from './components/Items'
import ItemMenu from './components/ItemMenu'
import { useSelector } from 'react-redux'
import { selectClips, selectLineItems, selectScaleFactor, selectWrapperHeight } from '@/store/slices/timeline/selectors'
import { useAppDispatch } from '@/store/store'
import { setTimelineDimensions } from '@/store/slices/timeline/actions'
import { openMenu } from '@/store/slices/item-menu/actions'
import { getCurrentY } from '@/utils/timelineHelper'

type TimelineProps = {
  /**
   * The timeline height
   */
  wrapperRef: React.MutableRefObject<HTMLDivElement>;
}

export default function Timeline({ wrapperRef }: TimelineProps) {
  const clips = useSelector(selectClips);
  const items = useSelector(selectLineItems)
  const { cursor, setCursor } = useMousseContext()
  const timelineRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;

  const dispatch = useAppDispatch();

  const scaleFactor = useSelector(selectScaleFactor);
  const wrapperHeight = useSelector(selectWrapperHeight);

  /**
   * Handles item context menu event and open the item menu
   * @param ev React mouse event
   * @returns
   */
  const onContextMenu = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // if (item.type !== ItemType.audios) return;

    ev.preventDefault();

    const { x, y } = timelineRef.current.getBoundingClientRect();

    const position = ev.clientX - x;
    const yPosition = ev.clientY - y

    dispatch(openMenu({ item: null, top: getCurrentY(yPosition, wrapperHeight), left: position, clientX: ev.clientX }));
  }

  React.useEffect(() => {
    const defaultCursor = (ev: any) => (ev.key === 'Escape' ? setCursor('default') : null)
    window.addEventListener('keyup', defaultCursor)
    return () => window.removeEventListener('keyup', defaultCursor)
  }, [])

  React.useEffect(() => {
    if (!timelineRef.current) return;

    /**
     * Set new timeline dimension values in Redux global state
     */
    const onResize = () => {
      const { top, height, width } = timelineRef.current.getBoundingClientRect();
      dispatch(setTimelineDimensions({ top, height, width }));
    }


    onResize();

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);

  }, [timelineRef, scaleFactor])

  return (
    <div style={{ cursor: cursor, position: "relative" }} ref={wrapperRef}>
      <div
        style={{
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          cursor: cursor,
          maxWidth: "calc(100vw - 73px)",
        }}

      >
        <TopMenu />
      </div>

      <div
        style={{ maxWidth: "calc(100vw - 73px)", overflowX: "auto", overflowY: "hidden", cursor: cursor }}
        id="timelineWrapper"
        ref={timelineRef}
        onContextMenu={onContextMenu}
      >
        <Timer />
        <Flex
          direction="column"
          position="relative"
          bgColor="#f0f1f2"
          cursor={cursor}
        >
          <TimeMarker />
          <Items items={items} />
          <ClipLine clipList={clips} />
        </Flex>

      </div>
      <ItemMenu />
      {/* <GuideBar /> */}
    </div>
  )
}
