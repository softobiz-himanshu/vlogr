import React from 'react'
import { EditorContext } from '..'

export function useEditorObjects() {
  const { objects } = React.useContext(EditorContext)
  return objects
}
