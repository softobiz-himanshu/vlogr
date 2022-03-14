import { useContext } from 'react'
import { EditorTimerContext } from '.'

export function useEditorTimerStatus() {
  const { status } = useContext(EditorTimerContext)
  return status
}
