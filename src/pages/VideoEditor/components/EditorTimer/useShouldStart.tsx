import { useContext } from 'react'
import { EditorTimerContext } from '.'

export function useShouldStart() {
  const { shouldStart } = useContext(EditorTimerContext)
  return shouldStart
}
