import { useContext } from 'react'
import { EditorTimerContext } from '.'

export function useEditorTime() {
    const { time } = useContext(EditorTimerContext)
    return time
}
