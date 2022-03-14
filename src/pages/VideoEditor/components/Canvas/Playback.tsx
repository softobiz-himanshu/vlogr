import React from 'react'
import PlaybackController from '@/playback/Controller'
import { useEditor } from '@/sdk'
import { setInterval } from 'timers'
import { useEditorTime, useEditorTimer, useShouldStart } from '../EditorTimer'
import { useSelector } from 'react-redux'
import { selectLineItems, selectPlayheadPosition, selectScaleFactor } from '@/store/slices/timeline/selectors'
import { ItemType } from '@/constants/itemTypes'

function Playback() {
  const controller = React.useRef<PlaybackController>()
  const shouldStart = useShouldStart()
  const editor = useEditor()
  const position = editor.frame.getBoundingClientRect()
  const [initialized, setInitialized] = React.useState(false)
  const time = useEditorTime()
  const initializationRef = React.useRef<NodeJS.Timeout>()
  const timer = useEditorTimer()
  const items = useSelector(selectLineItems);
  const playheadX = useSelector(selectPlayheadPosition);
  const scaleFactor = useSelector(selectScaleFactor);

  React.useEffect(() => {
    editor.manager.elements.setTime(time)
  }, [time])
  React.useEffect(() => {
    if (editor) {
      const layers = editor.design.exportLayers()
      const instance = new PlaybackController('pixi_container_me', {
        data: layers
      })
      controller.current = instance

      initializationRef.current = setInterval(() => {
        if (instance.initialized) {
          setInitialized(true)
        }
      }, 100)
    }
  }, [editor])

  React.useEffect(() => {
    if (initialized && controller.current) {
      clearInterval(initializationRef.current)
      controller.current.play()
      timer.start()
    }
  }, [initialized, controller])

  React.useEffect(() => {
    if (initialized && time && controller) {
      controller.current.render(time)
    }
  }, [time, initialized, controller])

  React.useEffect(() => {

    if(!initialized) return;

    items.map(item => {

      if (item.type !== ItemType.gif) return null

      const { x: itemX } = document.getElementById(item.id)?.getBoundingClientRect();
      const { width: itemW } = document.querySelector(`.item-${item.id}`)?.getBoundingClientRect();

      if (playheadX >= itemX && playheadX <= itemX + itemW) {
        const playheadPosition = playheadX - itemX;
        const { duration, totalFrames } = controller.current.getGifFramesData(item.id);
        const unit = duration / totalFrames;
        const frameIndex = Math.round(playheadPosition / (unit * scaleFactor));

        controller.current.updateGifFrameAndPlay(item.id, frameIndex);
      } else {
        controller.current.stopGIF(item.id);
      }

      return null
    })

    // controller.current.updateGifsFrame(playheadX, items, scaleFactor);
  }, [playheadX])

  return (
    <div
      style={{
        flex: 1,
        position: 'absolute',
        top: position.top,
        left: position.left,
        zIndex: 1000,
        height: position.height,
        width: position.width,
      }}
      id="pixi_container_me"
    ></div>
  )
}

export default Playback
