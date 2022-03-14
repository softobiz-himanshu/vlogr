import fabric from 'fabric/fabric-impl'
import { IEditorContext } from '../context/editor'
import Editor from '../Editor'

export interface FabricWheelEvent {
  e: WheelEvent
  target?: Object | undefined
  subTargets?: Object[] | undefined
  button?: number | undefined
  isClick?: boolean | undefined
  pointer?: fabric.IPoint | undefined
  absolutePointer?: fabric.IPoint | undefined
  transform?:
    | {
        corner: string
        original: Object
        originX: string
        originY: string
        width: number
      }
    | undefined
}

export interface Dimension {
  width: number
  height: number
}

// export interface RootHandlerOptions
export interface HandlerOptions {
  context: IEditorContext
  canvas: FabricCanvas
  config: EditorConfig
  editor: Editor
}

export interface ControllerOptions {
  context: IEditorContext
  canvas: FabricCanvas
  config: EditorConfig
  editor: Editor
}

export interface IHandler {
  context: IEditorContext
  canvas: FabricCanvas
  config: EditorConfig
  editor: Editor
}

export interface RootHandlerOptions {
  context: IEditorContext
  canvas: FabricCanvas
  config: EditorConfig
  editor: Editor
}

export interface EditorOptions {
  context: IEditorContext
  canvas: FabricCanvas
  config: EditorConfig
  // editor: Editor
}

export interface CanvasOptions {
  width: number
  height: number
}

export interface FabricCanvasOption {
  wrapperEl: HTMLElement
}

export type FabricCanvas<T extends any = fabric.Canvas> = T & FabricCanvasOption

//  Template

export interface Template {
  id: string
  name: string
  preview: string
  background: any
  frame: {
    width: number
    height: number
  }
  objects: any[]
  metadata: {
    animated: boolean
  }
}

/** 
 * Eidtor configuration interface
 */
export interface EditorConfig {
  /** 
   * Determines the position of the Frame [[Frame]]. 
   * If it's true the frame position is absolute
   */
  clipToFrame: boolean
  
  /**
   * Determines the X and Y scroll limit
   */
  scrollLimit: number

  /**
   * Properties to include when serializing an object
   */
  propertiesToInclude?: string[]
  shortcuts?: boolean
  guidelines?: boolean
}

export interface GradientOptions {
  angle: number
  colors: string[]
}

export interface ShadowOptions extends fabric.IShadowOptions {
  enabled: boolean
}

// ANIMATIONS

export enum Animations {
  NONE = 'NONE',
  STOMP = 'STOMP',
  TUMBLE = 'TUMBLE',
  RISE = 'RISE',
  PAN = 'PAN',
  FADE = 'FADE',
  BREATHE = 'BREATHE',
}
export type AnimationType = keyof typeof Animations

// GIF RENDERER

interface BaseConfig {
  silent?: boolean
}

type makeSceneFunction = (
  fabricInstance: typeof fabric,
  canvas: fabric.StaticCanvas,
  anim: gsap.core.Timeline,
  compose: () => void
) => void

interface RenderedConfig extends BaseConfig {
  width: number
  height: number
  fps: number
  makeScene: makeSceneFunction
}

export type Renderer = (config: RenderedConfig) => Promise<{ frames: string[]; frameDuration: number }>
