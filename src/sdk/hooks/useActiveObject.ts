import { useContext } from 'react'
import { EditorContext } from '../context'

/**
 * Get the active canvas object
 * @returns the active canvas object
 */
export function useActiveObject<T>() {
  const { activeObject } = useContext(EditorContext)

  return (activeObject as unknown) as T
}
