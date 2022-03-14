import { useContext } from 'react'
import { EditorTimerContext } from '.'

export function useSetShouldStart() {
  const { setShouldStart } = useContext(EditorTimerContext)
  return setShouldStart
}
