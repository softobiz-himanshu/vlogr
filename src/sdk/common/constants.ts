import { EditorConfig } from './interfaces'

export const PROPERTIES_TO_INCLUDE = [
  'id',
  'name',
  'description',
  'src',
  'keys',
  'keyValues',
  'animation',
  'metadata',
  'cut',
  'duration',
  'startAt',
  'endAt',
  'originalURL',
]

export enum ObjectType {
  STATIC_VECTOR = 'StaticVector',
  STATIC_GROUP = 'StaticGroup',
  DYNAMIC_GROUP = 'DynamicGroup',
  STATIC_PATH = 'StaticPath',
  DYNAMIC_PATH = 'DynamicPath',
  STATIC_IMAGE = 'StaticImage',
  STATIC_GIF = 'StaticGIF',
  STATIC_VIDEO = 'StaticVideo',
  STATIC_AUDIO = 'StaticAudio',
  DYNAMIC_IMAGE = 'DynamicImage',
  STATIC_TEXT = 'StaticText',
  DYNAMIC_TEXT = 'DynamicText',
  ACTIVE_SELECTION = 'activeSelection',
  BACKGROUND = 'Background',
  GROUP = 'group',
  FRAME = 'Frame',
}

export enum ObjectTypeAlt {
  STATIC_IMAGE = 'image:static',
  DYNAMIC_IMAGE = 'image:dynamic',
  TEXTAREA = 'Textarea',
}

export const defaultEditorConfig: EditorConfig = {
  clipToFrame: true,
  scrollLimit: 200,
  propertiesToInclude: PROPERTIES_TO_INCLUDE,
  guidelines: true,
  shortcuts: true,
}

export const defaultFrameOptions = {
  width: 1920,
  height: 1080,
  id: 'frame',
  name: 'Initial Frame',
  fill: '#ffffff',
  hoverCursor: 'default',
}

export const defaultBackgroundOptions = {
  width: 1920,
  height: 1080,
  fill: '#ffffff',
  id: 'background',
  name: 'Initial Frame',
}

export const commonParams = {
  backgroundColor: '',
  fillRule: 'nonzero',
  globalCompositeOperation: 'source-over',
  strokeDashArray: null,
  strokeDashOffset: 0,
  strokeLineCap: 'butt',
  strokeLineJoin: 'miter',
  strokeMiterLimit: 4,
  strokeUniform: false,
}

const getCopyStyleVector = () => {
  const copyStyleVector = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 3.5H5a.5.5 0 0 0-.5.5v1.5A.5.5 0 0 0 5 6h11a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5zM5 2a2 2 0 0 0-2 2v1.5a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-.25h.5a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-.75.75h-5.75a2.25 2.25 0 0 0-2.25 2.25v1.563A2 2 0 0 0 9 15v5a2 2 0 0 0 2 2h.5a2 2 0 0 0 2-2v-5a2 2 0 0 0-1.5-1.937V11.5a.75.75 0 0 1 .75-.75h5.75a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25h-.515A2 2 0 0 0 16 2H5zm7 13a.5.5 0 0 0-.5-.5H11a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h.5a.5.5 0 0 0 .5-.5v-5z" fill="currentColor"></path></svg>
	`
  return `data:image/svg+xml;base64,${window.btoa(copyStyleVector)}`
}

export const getCopyStyleCursor = () => {
  return `url(${getCopyStyleVector()}), crosshair`
}

export const copyStyleProps = {
  StaticText: [
    'fill',
    'opacity',
    'stroke',
    'strokeWidth',
    'textAlign',
    'fontWeight',
    'fontFamily',
    'fontSize',
    'underline',
    'shadow',
    'angle',
  ],
  DynamicText: [
    'fill',
    'opacity',
    'stroke',
    'strokeWidth',
    'textAlign',
    'fontWeight',
    'fontFamily',
    'fontSize',
    'underline',
    'shadow',
    'angle',
  ],
  StaticImage: ['opacity', 'stroke', 'strokeWidth', 'shadow', 'angle'],
  DynamicImage: ['opacity', 'stroke', 'strokeWidth', 'shadow', 'angle'],
  StaticPath: ['fill', 'opacity', 'stroke', 'strokeWidth', 'shadow', 'angle'],
}
