import { fabric } from 'fabric'
import { defaultFrameOptions, ObjectType, defaultBackgroundOptions } from '../common/constants'
import { Dimension, GradientOptions } from '../common/interfaces'
import setObjectGradient from '../utils/fabric'
import Controller from './Base'

/**
 * Handles the canvas frame
 * @class Frame
 * @category Editor
 */
class Frame extends Controller {
  constructor(props) {
    super(props)
    this.initialize()
  }

  /**
   * Initialize frame
   */
  initialize() {
    const frame = new fabric.Frame({
      ...defaultFrameOptions,
      absolutePositioned: this.config.clipToFrame,
    })
    const background = new fabric.Background(defaultBackgroundOptions)

    this.canvas.add(frame, background)
    frame.center()
    background.center()

    setTimeout(() => {
      this.editor.zoom.zoomToFit()
    }, 100)
  }

  /**
   * Get Frame Object
   * @readonly
   */
  get frame() {
    return this.canvas.getObjects().find(object => object.type === ObjectType.FRAME)
  }

  /**
   * Get Frame Background
   * @readonly
   */
  get background() {
    return this.canvas.getObjects().find(object => object.type === ObjectType.BACKGROUND)
  }

  /**
   * Get Frame Options
   * @readonly
   */
  get options(): fabric.Frame {
    const frame = this.frame
    return frame.toJSON(this.editor.config.propertiesToInclude)
  }

  /**
   * Resize Frame
   * @param Dimenstion width and height to be set
   * @public
   */
  public resize({ height, width }: Dimension) {
    const frame = this.frame
    const background = this.background
    frame.set({ width, height })
    frame.center()
    if (background) {
      background.set({ width, height })
      background.center()
    }
    this.editor.zoom.zoomToFit()
  }

  /**
   * Change cursor style when hovering the frame
   * @param cursor cursor style
   */
  public setHoverCursor = (cursor: string) => {
    const background = this.background
    if (background) {
      background.set('hoverCursor', cursor)
    }
  }

  /**
   * Get Frame Background Color
   * @returns {string} frame background color
   */
  public getBackgroundColor = () => {
    return this.background.fill
  }

  /**
   * Changes Frame Background Color
   * @param {string} color new background color 
   */
  public setBackgroundColor = (color: string) => {
    const background = this.background
    if (background) {
      background.set({
        fill: color,
      })
      this.canvas.requestRenderAll()
      this.editor.history.save()
    }
  }

  /**
   * Set Gradiento to Frame Background
   * @param param0 gradient's angle and colors 
   */
  public setBackgroundGradient = ({ angle, colors }: GradientOptions) => {
    const background = this.background
    if (background) {
      setObjectGradient(background, angle, colors)
      this.canvas.requestRenderAll()
      this.editor.history.save()
    }
  }

  /**
   * Get frame DOM dimenstion an position
   * @returns Object with left, top, width, height properties
   */
  public getBoundingClientRect() {
    const frame = this.frame
    return frame.getBoundingRect()
  }

  /**
   * Fit Frame Ratio
   * @returns {number} new scaleX
   */
  get fitRatio() {
    const options = this.options
    const canvasWidth = this.canvas.getWidth() - 120
    const canvasHeight = this.canvas.getHeight() - 120
    let scaleX = canvasWidth / options.width
    let scaleY = canvasHeight / options.height
    if (options.height >= options.width) {
      scaleX = scaleY
      if (canvasWidth < options.width * scaleX) {
        scaleX = scaleX * (canvasWidth / (options.width * scaleX))
      }
    } else {
      if (canvasHeight < options.height * scaleX) {
        scaleX = scaleX * (canvasHeight / (options.height * scaleX))
      }
    }
    return scaleX
  }
}
export default Frame
