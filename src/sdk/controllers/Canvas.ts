import { fabric } from 'fabric'
import { CanvasOptions, Dimension, HandlerOptions } from '../common/interfaces'
import Controller from './Base'

/**
 * Handles the canvas
 * @class canvas
 * @category Editor
 */
class Canvas extends Controller {
  public options: CanvasOptions
  constructor(props: HandlerOptions) {
    super(props)
    this.options = {
      width: props.canvas.width,
      height: props.canvas.height,
    }
  }

  /**
   * Get the object position relative to the viewport
   * @returns {Object}
   */
  public getBoundingClientRect() {
    const canvasEl = document.getElementById('canvas')
    const position = {
      left: canvasEl?.getBoundingClientRect().left,
      top: canvasEl?.getBoundingClientRect().top,
    }
    return position
  }

  /**
   * Resizes the canvas to the given dimension
   * @returns
   */
  public resize({ width, height }: Dimension) {
    this.canvas.setWidth(width).setHeight(height)
    this.canvas.renderAll()
    const diffWidth = width / 2 - this.options.width / 2
    const diffHeight = height / 2 - this.options.height / 2

    this.options.width = width
    this.options.height = height

    const deltaPoint = new fabric.Point(diffWidth, diffHeight)
    this.canvas.relativePan(deltaPoint)
  }

  /**
   * Renders the canvas content
   * @returns 
   */
  public requestRenderAll = () => {
    this.canvas.requestRenderAll()
  }

  /**
   * Get The transformation which focuses the viewport
   * @returns 
   */
  public getTransformationMatrix = () => {
    return this.canvas.viewportTransform
  }
}

export default Canvas
