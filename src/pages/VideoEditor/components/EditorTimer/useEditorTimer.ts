import { useContext } from 'react'
import { EditorTimerContext } from '.'

export function useEditorTimer() {
  const { timer } = useContext(EditorTimerContext)
  return timer
}
