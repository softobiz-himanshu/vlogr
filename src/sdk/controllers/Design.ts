import Controller from './Controller'
import { ObjectType } from '../common/constants'
import exportObject from '../utils/fabricToObject'
import ObjectToFabric from '../utils/objectToFabric'
import { base64ImageToFile } from '../utils/parser'

/**
 * Handles the canvas serialization
 * @class Design
 */
class Design extends Controller {

  /**
   * Serializes the  canvas data to Json
   * @returns Json Template
   */
  public exportToJSON = () => {
    let animated = false
    const canvasJSON: any = this.canvas.toJSON(this.editor.config.propertiesToInclude)
    const frameOptions = this.editor.frame.options
    const template = {
      name: 'Untitled design',
      objects: [],
      background: {
        type: 'color',
        value: frameOptions.fill ? frameOptions.fill : '#fff',
      },
      frame: {
        width: frameOptions.width,
        height: frameOptions.height,
      },
      metadata: {
        animated,
      },
    }

    const objects = canvasJSON.objects.filter(object => object.type !== ObjectType.FRAME)
    objects.forEach(object => {
      const exportedObject = exportObject.run(object, frameOptions)
      template.objects = template.objects.concat(exportedObject)
      if (object.animations && object.animations !== 'NONE') {
        animated = true
      }
    })
    template.metadata = {
      ...template.metadata,
      animated,
    }
    return template
  }

    /**
   * Deserializes JSON data
   * @returns Json Template
   */
  public importFromJSON = async template => {
    const frameParams = template.frame
    this.editor.objects.clear()
    this.editor.frame.resize({
      width: frameParams.width,
      height: frameParams.height,
    })

    const frameOptions = this.editor.frame.options
    const frame = this.editor.frame.frame
    const objectToFabric = new ObjectToFabric(this.editor)

    for (const object of template.objects) {
      const element = await objectToFabric.run(object, frameOptions)
      if (element) {
        if (this.config.clipToFrame) {
          element.clipPath = frame
        }
        this.canvas.add(element)
      } else {
        console.log('UNABLE TO LOAD OBJECT: ', object)
      }
    }

    this.editor.frame.setBackgroundColor(
      template.background && template.background.type === 'color' ? template.background.value : '#ffffff'
    )

    this.editor.zoom.zoomToFit()
  }

  /**
   * Export Canvas objects to be loaded as resources by PIXI loader
   * @returns 
   */
  public exportLayers = () => {
    const canvasObjects = this.canvas.getObjects()
    const frameBounding = this.editor.frame.getBoundingClientRect()
    const objects = canvasObjects.filter(object => object.type !== ObjectType.FRAME)
    let elements = []
    objects.forEach((object, index) => {
      // object.setCoords()
      const visibleStatus = object.visible
      object.set('visible', true)
      const preview = object.toDataURL({})
      object.set('visible', visibleStatus)

      const bounding = object.getBoundingRect()
      // console.log(object.duration)
      const duration = object.duration
      // @ts-ignore
      // console.log('SRC', object.src)
      if (object.type === 'StaticVideo') {
        elements = elements.concat({
          id: index.toString(),
          type: 'StaticVideo',
          // @ts-ignore
          url: object.src,
          startAt: duration ? duration.start : 0,
          endAt: duration ? duration.stop : 0,
          position: {
            x: bounding.left - frameBounding.left,
            y: bounding.top - frameBounding.top,
            zIndex: index,
            width: bounding.width,
            height: bounding.height,
          },
          objectId: object.id,
        })
      } else if (object.type === 'StaticAudio') {
        elements = elements.concat({
          id: index.toString(),
          type: 'StaticAudio',
          // @ts-ignore
          url: object.src,
          startAt: duration ? duration.start : 0,
          endAt: duration ? duration.stop : 0,
          position: {
            x: bounding.left - frameBounding.left,
            y: bounding.top - frameBounding.top,
            zIndex: index,
            width: bounding.width,
            height: bounding.height,
          },
          objectId: object.id,
        })
      } else if (object.type === 'StaticGIF') {
        elements = elements.concat({
          id: index.toString(),
          type: 'StaticGIF',
          // @ts-ignore
          url: object.src,
          startAt: duration ? duration.start : 0,
          endAt: duration ? duration.stop : 0,
          position: {
            x: bounding.left - frameBounding.left,
            y: bounding.top - frameBounding.top,
            zIndex: index,
            width: bounding.width,
            height: bounding.height,
          },
          objectId: object.id,
        })
      } else {
        const objectURL = base64ImageToFile(preview)
        elements = elements.concat({
          id: index.toString(),
          type: 'StaticImage',
          url: objectURL,
          startAt: duration ? duration.start : 0,
          endAt: duration ? duration.stop : 0,
          position: {
            x: bounding.left - frameBounding.left,
            y: bounding.top - frameBounding.top,
            zIndex: index,
            width: bounding.width,
            height: bounding.height,
          },
          objectId: object.id,
        })
      }
    })
    return elements
  }

  public toPNG = async () => {
    return ''
  }
}
export default Design
