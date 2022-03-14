import React from 'react'
import Editor from '@sdk'
import { useEditorTimerStatus, useShouldStart } from '../EditorTimer'
import Playback from './Playback'

function Editing() {
  const timerStatus = useEditorTimerStatus()
  const shouldStart = useShouldStart()
  React.useEffect(() => {
    console.log(timerStatus)
  }, [timerStatus])

  return (
    <>
      {shouldStart && <Playback />}
      <Editor config={{ clipToFrame: true, scrollLimit: 400 }} />
    </>
  )
}

export default Editing
