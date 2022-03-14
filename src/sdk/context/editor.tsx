import React from 'react'
import { FC, createContext, useState } from 'react'
import { fabric } from 'fabric'
import Editor from '../Editor'

export interface ContextMenuRequest {

  /** Fabric Object target */
  target: any

  /** X position */
  left: number

  /** Y position */
  top: number
}

/**
 * React context value interface
 */
export interface IEditorContext {
  /** Fabric canvas instance */
  canvas: fabric.Canvas | null
  setCanvas: (canvas: fabric.Canvas) => void

  /** Selected canvas object */
  activeObject: fabric.Object | null
  setActiveObject: (object: fabric.Object | null) => void

  /** Editor instance */
  editor: Editor | null
  setEditor: (handlers: Editor) => void

  /** Canvas zoom ratio */
  zoomRatio: number
  setZoomRatio: (value: number) => void

  /** Context Menu Options */
  contextMenuRequest: ContextMenuRequest
  setContextMenuRequest: (value: ContextMenuRequest) => void

  /** Fabric objects list */
  objects: any[]
  setObjects: any
}

export const EditorContext = createContext<IEditorContext>({
  canvas: null,
  setCanvas: () => {},
  activeObject: null,
  setActiveObject: () => {},
  editor: null,
  setEditor: () => {},
  zoomRatio: 1,
  setZoomRatio: () => {},
  contextMenuRequest: null,
  setContextMenuRequest: () => {},
  objects: [],
  setObjects: () => {},
})

/**
 * Provider used to share editor data between components
 */
export const EditorProvider: FC = ({ children }) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
  const [activeObject, setActiveObject] = useState<fabric.Object | null>(null)
  const [editor, setEditor] = useState<Editor | null>(null)
  const [zoomRatio, setZoomRatio] = useState(1)
  const [contextMenuRequest, setContextMenuRequest] = useState<ContextMenuRequest>(null)
  const [objects, setObjects] = React.useState()
  const context = {
    canvas,
    setCanvas,
    activeObject,
    setActiveObject,
    editor,
    setEditor,
    zoomRatio,
    setZoomRatio,
    contextMenuRequest,
    setContextMenuRequest,
    objects,
    setObjects,
  }

  return <EditorContext.Provider value={context}>{children}</EditorContext.Provider>
}
