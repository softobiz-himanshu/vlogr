import { fabric } from 'fabric'
import { AnimationType } from '../common/interfaces'

/**
 * Canvas frame
 * @class FrameObject
 * @category Editor
 */
// @ts-ignore
export class FrameObject extends fabric.Rect {
  static type = 'Frame'

  /**
   * Initializes the Frame Object
   * @param options [[Frame Options]]
   * @returns FrameObject reference
   */
  initialize(options: FrameOptions) {
    super.initialize({
      ...options,
      selectable: false,
      hasControls: false,
      lockMovementY: true,
      lockMovementX: true,
      strokeWidth: 0,
      padding: 0,
      evented: false,
    })
    return this
  }

  /**
   * Serialize to Object
   * @param propertiesToInclude  Any properties that you might want to additionally include in the output
   * @returns an object representation of an instance
   */
  toObject(propertiesToInclude: string[] = []) {
    return super.toObject(propertiesToInclude)
  }
  /**
   * Serialize to JSON
   * @param propertiesToInclude Any properties that you might want to additionally include in the output
   * @returns an object representation of an instance
   */
  toJSON(propertiesToInclude: string[] = []) {
    return super.toObject(propertiesToInclude)
  }

  /**
   * Allows the class to be cloned and saved/restore (Deserialization)
   * @param options [[Frame Options]]
   * @param callback 
   * @returns Deserialized object
   */
  static fromObject(options: FrameOptions, callback) {
    return callback && callback(new fabric.Frame(options))
  }
}

/**
 * Add Frame to fabric 
 */
fabric.Frame = fabric.util.createClass(FrameObject, {
  type: FrameObject.type,
})
fabric.Frame.fromObject = FrameObject.fromObject

/**
 * Frame Options
 */
export interface FrameOptions extends fabric.IRectOptions {
  id: string
  name: string
  description?: string
}

/**
 * Satsify the LoaderResource interface
 */
declare module 'fabric' {
  namespace fabric {
    class Frame extends FrameObject {
      constructor(options: FrameOptions)
    }
    interface Object {
      id: string
      name: string
      locked: boolean
      animation: AnimationType
      duration?: {
        start?: number
        stop?: number
      }
      _objects?: fabric.Object[]
    }
  }
}
