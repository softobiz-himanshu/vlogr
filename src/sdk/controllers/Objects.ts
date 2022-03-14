import { fabric } from 'fabric'
import { copyStyleProps, getCopyStyleCursor, ObjectType } from '../common/constants'
import { GradientOptions, ShadowOptions } from '../common/interfaces'
import ObjectToFabric from '../utils/objectToFabric'
import pick from 'lodash/pick'
import Controller from './Base'
import setObjectGradient, { setObjectShadow } from '../utils/fabric'
import { v4 as uuid4 } from 'uuid'

/**
 * Handles Fabric Objects
 * @class Objects
 */
class Objects extends Controller {
  /**
   * Clipboard to store copied object
   * @private
   */
  private clipboard

  /**
   * Wheter the object has been cut
   * @public
   */
  public isCut
  private copyStyleClipboard;

  private animFrameActivated = false;


  /**
   * Add a new object to the object list
   * @param {Any} item item to be added
   * @returns
   * @public
   */
  public add = async item => {
    const { canvas } = this
    const options = this.editor.frame.options
    const objectToFabric = new ObjectToFabric(this.editor)

    const object: fabric.Object = await objectToFabric.run(item, options)
    if (!object.id) {
      object.id = uuid4()
    }

    if (this.config.clipToFrame) {
      const frame = this.editor.frame.frame
      object.clipPath = frame
    }
    canvas.add(object)
    if (object.type !== 'StaticAudio') {
      object.center()
      canvas.setActiveObject(object)
    } else {
      this.setAudioVolume(object.id, 100);
    }
    this.context.setActiveObject(object)

    this.updateContextObjects();

    if (object.type === 'StaticGIF') {
      if (!this.animFrameActivated) {
        this.animFrameActivated = true;
        fabric.util.requestAnimFrame(function render() {
          canvas.renderAll();
          fabric.util.requestAnimFrame(render);
        });
      }
      (object as any)?.pause()
    }
  }

  /**
   * Update selected fabric object
   * @param {Any} options properties to set
   * @param {Any} meta metadata 
   * @returns
   */
  public update = (options, meta?) => {
    const activeObject = this.canvas.getActiveObject()
    const canvas = this.canvas

    if (activeObject) {
      for (const property in options) {

        if (property === 'angle' || property === 'top' || property === 'left' || 'clipPath') {
          if (property === 'angle') {
            activeObject.rotate(options['angle'])
            canvas.requestRenderAll()
          } else if (property === 'clipPath') {
            activeObject.set(property, options[property]);
            if (meta) {
              // @ts-ignore
              activeObject.set('metadata', { ...activeObject.metadata, radius: meta });
            }
          } else {
            activeObject.set(property as "top" | "left", options[property])
            canvas.requestRenderAll()
          }
        } else {
          // @ts-ignore
          if (activeObject._objects) {
            // @ts-ignore
            activeObject._objects.forEach(object => {
              if (property === 'metadata') {
                // @ts-ignore
                object.set('metadata', { ...object.metadata, ...options['metadata'] })
              } else {
                // @ts-ignore
                object.set(property, options[property])
              }
              object.setCoords()
            })
          } else {
            if (property === 'metadata') {
              // @ts-ignore
              activeObject.set('metadata', { ...activeObject.metadata, ...options[property] })
            } else {
              // @ts-ignore
              activeObject.set(property, options[property])
            }
            activeObject.setCoords()
          }
        }
        activeObject.set(property as keyof fabric.Object, options[property])
        canvas.requestRenderAll()
      }
      this.editor.history.save()
    }
  }

  /**
   * Get a Fabric Object by id and update it
   * @param {String} id fabric object id
   * @param {Any} options options to set
   * @returns
   * @public
   */
  public updateById = (id: string, options) => {
    const object = this.findOneById(id);
    if (object) {
      for (const property in options) {
        if (property === 'volume') {
          //@ts-ignore
          object.set('metadata', { ...object.metadata, volume: options[property] });
        }
      }
      this.canvas.requestRenderAll();
      this.canvas.renderAll();
    }
    this.editor.history.save()
  }

  /**
   * Clear Canvas Frame
   * @returns
   * @public
   */
  public clear = () => {
    const frame = this.editor.frame.frame
    this.canvas.getObjects().forEach(object => {
      if (object.type !== ObjectType.FRAME) {
        this.canvas.remove(object)
      }
    })
    frame.set({
      fill: '#ffffff',
    })
    this.canvas.renderAll()
  }

  /**
   * Select a Object By Id in the React context
   * @param {String} id Object id
   * @returns
   */
  public selectById = (id: string) => {
    const [object] = this.findById(id);
    if (object) {
      this.context.setActiveObject(object);
    }
  }

  /**
   * Select a Canvas Object By Id
   * @param {String} id Object id
   * @returns
   */
  public selectOnCanvasById = (id: string) => {
    const object = this.findOneById(id);
    if (object) {
      this.canvas.setActiveObject(object);
      this.canvas.requestRenderAll();
    }
  }

  /**
   * Deselect the active object from React context
   * @returns
   */
  public deselectActiveObject = () => {
    this.context.setActiveObject(null);
  }

  /**
   * Deselect the active object from Canvas
   * @returns
   */
  public deselect = () => {
    this.canvas.discardActiveObject()
    this.canvas.requestRenderAll()
  }

  /**
   * Move a Fabric Object vertically
   * @param {Number} value top position
   * @returns
   */
  public moveVertical = value => {
    const activeObject = this.canvas.getActiveObject()
    const top = activeObject.top + value
    this.update({
      top: top,
    })
  }

  /**
   * Move a Fabric Object horizontally
   * @param {Number} value top position
   * @returns
   */
  public moveHorizontal = value => {
    const activeObject = this.canvas.getActiveObject()
    const left = activeObject.left + value
    this.update({
      left: left,
    })
  }

  /**
   * Changes Object X position
   * @param {Number} value new X position
   * @returns 
   */
  public setLeftPosition = value => {
    this.update({ left: value })
  }

  /**
   * Changes Object Y position
   * @param {Number} value new Y position 
   * @returns
   */
  public setTopPosition = value => {
    this.update({ top: value });
  }

  /**
   * Changes Object Width
   * @param {Number} value new width 
   * @returns
   */
  public setWidth = value => {
    const activeObject = this.canvas.getActiveObject();
    this.update({ scaleX: value / activeObject.width })

  }
  /**
     * Changes Object Height
     * @param {Number} value new height 
     * @returns
     */
  public setHeight = value => {
    const activeObject = this.canvas.getActiveObject();
    this.update({ scaleY: value / activeObject.height });

  }

  /**
   * Fit object to canvas height 
   * @returns
   */
  public fitCanvas = () => {
    const height = this.editor.frame.frame.height;
    const width = this.editor.frame.frame.width;

    const activeObject = this.canvas.getActiveObject();
    this.update({
      scaleX: width / activeObject.width,
      scaleY: height / activeObject.height
    });
    activeObject.center();
    this.setTopPosition(this.editor.frame.frame.top);
    this.update({ top: this.editor.frame.frame.top, left: this.editor.frame.frame.left })
  }

  /**
   * Fill Fabric Object based on canvas width and height
   * @returns
   */
  public fillCanvas = () => {
    const activeObject = this.canvas.getActiveObject();
    const height = this.editor.frame.frame.height;

    const proportion = height / activeObject.height;

    this.update({
      scaleY: height / activeObject.height,
      scaleX: activeObject.width * proportion / activeObject.width
    });
    activeObject.center();

    this.setTopPosition(this.editor.frame.frame.top);

  }

  /**
   * Set Fabric Object Skew 
   * @param {Number} value skwe value
   * @returns
   */
  public setSkew = (value: number) => {
    this.update({ skewX: value });
  }

  /**
   * Set border radius to an image object
   * @param {Number} topLeft topLeft radius 
   * @param {Number} topRight topRight radius 
   * @param {Number} bottomRight bottomRight radius 
   * @param {Number} bottomLeft bottomLeft radius 
   * @returns 
   */
  public setRoundedCorners = (topLeft: number, topRight: number, bottomRight: number, bottomLeft: number) => {
    const activeObject = this.canvas.getActiveObject();


    const RoundedRect = new (fabric.util.createClass as any)(fabric.Rect, {

      _render: function (ctx) {

        // 1x1 case (used in spray brush) optimization was removed because
        // with caching and higher zoom level this makes more damage than help

        const w = this.width,
          h = this.height,
          x = -this.width / 2,
          y = -this.height / 2,
          /* "magic number" for bezier approximations of arcs (http://itc.ktu.lt/itc354/Riskus354.pdf) */
          k = 1 - 0.5522847498;

        const topLeftX = topLeft ? Math.min(topLeft, this.width / 2) : 0,
          topLeftY = topLeft ? Math.min(topLeft, this.height / 2) : 0,
          topRightX = topRight ? Math.min(topRight, this.width / 2) : 0,
          topRightY = topRight ? Math.min(topRight, this.height / 2) : 0,
          bottomRightX = bottomRight ? Math.min(bottomRight, this.width / 2) : 0,
          bottomRightY = bottomRight ? Math.min(bottomRight, this.height / 2) : 0,
          bottomLeftX = bottomLeft ? Math.min(bottomLeft, this.width / 2) : 0,
          bottomLeftY = bottomLeft ? Math.min(bottomLeft, this.height / 2) : 0;

        ctx.beginPath();

        // top left corner
        ctx.moveTo(x + topLeftX, y);

        // moving to top right
        if (topRight) {
          ctx.lineTo(x + w - topRightX, y);
        } else {
          ctx.lineTo(x + w, y);
        }
        if (topRight) {
          ctx.bezierCurveTo(x + w - k * topRightX, y, x + w, y + k * topRightY, x + w, y + topRightY);
        }

        // bottom right corner
        if (bottomRight) {
          ctx.lineTo(x + w, y + h - bottomRightY);
        } else {
          ctx.lineTo(x + w, y + h);
        }

        if (bottomRight) {
          ctx.bezierCurveTo(x + w, y + h - k * bottomRightY, x + w - k * bottomRightX, y + h, x + w - bottomRightX, y + h);
        }

        // bottom left corner
        if (bottomLeft) {
          ctx.lineTo(x + bottomLeftX, y + h);
        } else {
          ctx.lineTo(x, y + h);

        }
        if (bottomLeft) {
          ctx.bezierCurveTo(x + k * bottomLeftX, y + h, x, y + h - k * bottomLeftY, x, y + h - bottomLeftY);
        }

        if (topLeft) {
          ctx.lineTo(x, y + topLeftY);
        } else {
          ctx.lineTo(x, y);
        }
        if (topLeft) {
          ctx.bezierCurveTo(x, y + k * topLeftY, x + k * topLeftX, y, x + topLeftX, y);
        }

        ctx.closePath();

        this._renderPaintInOrder(ctx);
      },
    })

    if (!activeObject) return;
    const clip = new RoundedRect({
      left: 0,
      top: 0,
      width: activeObject.width,
      height: activeObject.height,
      fill: '#000000',
      originX: 'center',
      originY: 'center',
    })

    this.update({ clipPath: clip }, { topLeft, topRight, bottomRight, bottomLeft });
  }


  /**
   * Rotate Fabric Object
   * @param {Number} value angle 
   * @returns
   */
  public rotate = (value) => {
    this.update({ angle: value });
  }

  /**
   * Changes volume of an audio object
   * @param {Number} value volume value
   * @returns
   */
  public setAudioVolume = (id: string, volume: number) => {
    this.updateById(id, { volume });
  }

  /**
   * Changes Frabic Text Object Line-height
   * @param {Number} value line-height value 
   * @returns
   */
  public updateLineHeight = value => {
    const activeObject = this.canvas.getActiveObject() as fabric.ITextOptions
    if (activeObject.type === ObjectType.DYNAMIC_TEXT) {
      const lineHeight = activeObject.lineHeight + value
      this.update({
        lineHeight: lineHeight,
      })
    }
  }

  /**
   * Changes space between characters
   * @param {Number} value character spacing
   * @returns
   */
  public updateCharSpacing = value => {
    const activeObject = this.canvas.getActiveObject() as fabric.ITextOptions
    if (activeObject.type === ObjectType.DYNAMIC_TEXT) {
      const charSpacing = activeObject.charSpacing + value
      this.update({
        charSpacing: charSpacing,
      })
    }
  }

  /**
   * Cut Object
   * @returns
   */
  public cut = () => {
    this.copy()
    this.isCut = true
    this.remove()
  }

  /**
   * Copy Object
   * @returns
   */
  public copy = () => {
    const activeObject = this.canvas.getActiveObject()
    if (activeObject) {
      this.clipboard = activeObject
    }
  }

  /**
   * Get object by id an copy to clipboard
   * @returns
   */
  public copyById = (id: string) => {
    const object = this.findOneById(id)
    if (object) {
      this.clipboard = object
    }
  }

  /**
   * Clone Object
   * @returns
   */
  public clone = () => {
    if (this.canvas) {
      const activeObject = this.canvas.getActiveObject()
      const frame = this.editor.frame.frame

      this.canvas.discardActiveObject()

      this.duplicate(activeObject, frame, duplicates => {
        const selection = new fabric.ActiveSelection(duplicates, { canvas: this.canvas })
        this.canvas.setActiveObject(selection)
        this.canvas.requestRenderAll()
      })
    }
  }

  /**
   * Clone Audio Object Given an object id
   * @param {String} id audio id
   * @returns
   */
  public cloneAudio = (id) => {
    const object = this.findOneById(id);
    const frame = this.editor.frame.frame;

    this.deselectActiveObject();

    this.duplicate(object, frame, duplicates => {
      // const selection = new fabric.ActiveSelection(duplicates, { canvas: this.canvas })
      // this.canvas.setActiveObject(selection)
      this.canvas.requestRenderAll();
      this.updateContextObjects();
    })
  }

  /**
   * Duplicate (clone) object
   * @param object Fabric Object
   * @param frame Canvas Frame
   * @param callback function to select duplicated objects and update the react context object list
   * @returns 
   */
  private duplicate(
    object: fabric.Object,
    frame: fabric.Object,
    callback: (clones: fabric.Object[]) => void
  ): void {
    if (object instanceof fabric.Group) {
      const objects: fabric.Object[] = (object as fabric.Group).getObjects()
      const duplicates: fabric.Object[] = []
      for (let i = 0; i < objects.length; i++) {
        this.duplicate(objects[i], frame, clones => {
          duplicates.push(...clones)
          if (i === objects.length - 1) {
            callback(duplicates)
          }
        })
      }
    } else {
      object.clone(
        (clone: fabric.Object) => {
          clone.clipPath = null
          clone.id = uuid4()
          clone.set({
            left: object.left! + 10,
            top: object.top! + 10,
          })
          if (this.config.clipToFrame) {
            const frame = this.editor.frame.frame
            clone.clipPath = frame
          }
          this.canvas.add(clone)
          callback([clone])
        },
        ['keyValues', 'src']
      )
    }
  }

  /**
   * Paste Object
   * @returns
   */
  public paste = () => {
    const object = this.clipboard
    if (object) {
      const frame = this.editor.frame.frame
      this.canvas.discardActiveObject()
      this.duplicate(object, frame, duplicates => {
        const selection = new fabric.ActiveSelection(duplicates, { canvas: this.canvas })
        this.canvas.setActiveObject(selection)
        this.canvas.requestRenderAll()
        const objects = this.canvas.getObjects()
        const filteredObjects = objects.filter(o => {
          return o.type !== ObjectType.FRAME && o.type !== ObjectType.BACKGROUND
        })
        this.context.setObjects(filteredObjects)
      })
    }
  }

  /**
   * Remove active object
   * @returns
   */
  public remove = () => {
    this.canvas.getActiveObjects().forEach(obj => {
      this.canvas.remove(obj)
    })
    this.canvas.discardActiveObject().renderAll()
    this.editor.history.save()
    this.updateContextObjects()
  }

  /**
   * Get object list
   * @returns
   */
  public list = () => {
    const objects = this.canvas.getObjects()
    const filteredObjects = objects.filter(o => {
      return o.type !== ObjectType.FRAME && o.type !== ObjectType.BACKGROUND
    })
    return filteredObjects
  }

  /**
   * Select all Fabric Objects
   * @returns
   */
  public selectAll = () => {
    this.canvas.discardActiveObject()
    const filteredObjects = this.canvas.getObjects().filter(object => {
      if (object.type === ObjectType.FRAME) {
        return false
      } else if (!object.evented) {
        return false
      } else if (object.locked) {
        return false
      }
      return true
    })
    if (!filteredObjects.length) {
      return
    }
    if (filteredObjects.length === 1) {
      this.canvas.setActiveObject(filteredObjects[0])
      this.canvas.renderAll()
      this.context.setActiveObject(filteredObjects[0])
      return
    }
    const activeSelection = new fabric.ActiveSelection(filteredObjects, {
      canvas: this.canvas,
    })
    this.canvas.setActiveObject(activeSelection)
    this.canvas.renderAll()
    this.context.setActiveObject(activeSelection)
  }

  /**
   * Copy Fabric object style
   * @returns
   */
  public copyStyle = () => {
    const activeObject = this.canvas.getActiveObject()
    if (activeObject) {
      const clonableProps = copyStyleProps[activeObject.type]
      const clonedProps = pick(activeObject.toJSON(), clonableProps)

      this.copyStyleClipboard = {
        objectType: activeObject.type,
        props: clonedProps,
      }

      this.editor.frame.setHoverCursor(getCopyStyleCursor())
      this.canvas.hoverCursor = getCopyStyleCursor()
      this.canvas.defaultCursor = getCopyStyleCursor()
    }
  }

  /**
   * Paste Fabric object style
   * @returns
   */
  public pasteStyle = () => {
    const activeObject = this.canvas.getActiveObject()
    if (activeObject && this.copyStyleClipboard) {
      if (activeObject.type === this.copyStyleClipboard.objectType) {
        const { fill, ...basicProps } = this.copyStyleClipboard.props
        activeObject.set(basicProps)

        if (fill) {
          if (fill.type) {
            activeObject.set({ fill: new fabric.Gradient(fill) })
          } else {
            activeObject.set({ fill })
          }
        }
      }
    }
    this.copyStyleClipboard = null
    this.editor.frame.setHoverCursor('default')
    this.canvas.hoverCursor = 'move'
    this.canvas.defaultCursor = 'default'
  }

  /**
   * Moves an object or a selection up in stack of drawn objects.
   * @returns
   */
  public bringForward = () => {
    const activeObject = this.canvas.getActiveObject()
    if (activeObject) {
      this.canvas.bringForward(activeObject)
    }
  }

  /**
   * Get and object by Id and move it up in stack of drawn objects.
   * @param {String} id object id
   * @returns
   */
  public bringForwardById = (id: string) => {
    this.canvas.getObjects().forEach(o => {
      if (o.id === id) {
        this.canvas.bringForward(o)
      }
    })
  }

  /**
   * Moves an object or the objects of a multiple selection to the top of the stack of drawn objects
   * @returns
   */
  public bringToFront = () => {
    const activeObject = this.canvas.getActiveObject()
    if (activeObject) {
      this.canvas.bringToFront(activeObject)
    }
  }

  /**
   * Moves an object with given id to the top of the stack of drawn objects
   * @param {String} id object id
   * @retunrs
   */
  public bringToFrontById = (id: string) => {
    const object = this.findOneById(id)
    if (object) {
      this.canvas.bringToFront(object)
    }
  }

  /**
   * Moves an object or a selection down in stack of drawn objects.
   * @retunrs
   */
  public sendBackwards = () => {
    const objects = this.canvas.getObjects()
    const activeObject = this.canvas.getActiveObject()
    const index = objects.findIndex(o => o === activeObject)
    if (activeObject && index > 1) {
      this.canvas.sendBackwards(activeObject)
    }
  }

  /**
   * Get and object by id and move it down in stack of drawn objects.
   * @param {String} id object id
   * @returns
   */
  public sendBackwardsById = (id: string) => {
    const object = this.findOneById(id)
    if (object) {
      this.canvas.sendBackwards(object)
    }
  }

  /**
   * Moves an object to specified level in stack of drawn objects.
   * @returns
   */
  public sendToBack = () => {
    const activeObject = this.canvas.getActiveObject()
    if (activeObject) {
      activeObject.moveTo(1)
    }
  }

  /**
   * get and object by id and move it to specified level in stack of drawn objects.
   * @param {String} id object id
   * @returns
   */
  public sendToBackById = (id: string) => {
    const object = this.findOneById(id)
    if (object) {
      this.canvas.sendToBack(object)
    }
  }

  /**
   * Moves an object to the top of the frame. If multiple objects are selected,
   * will move all objects to the top of the selection.
   * @returns void value
   */
  public alignTop = () => {
    const activeObject = this.canvas.getActiveObject()
    const frame = this.editor.frame.frame

    if (activeObject) {
      if (activeObject instanceof fabric.Group) {
        const selectedObjects = activeObject._objects
        const refTop = activeObject.top
        this.canvas.discardActiveObject()
        selectedObjects.forEach(object => {
          const currentObject = object
          currentObject.set({
            top: refTop,
          })
        })
        const selection = new fabric.ActiveSelection(selectedObjects, { canvas: this.canvas })
        this.canvas.setActiveObject(selection)
      } else {
        const currentObject = activeObject
        currentObject.set({
          top: frame.top,
        })
      }
      this.canvas.requestRenderAll()
    }
  }
  /**
   * Moves an object to the middle of the frame. If multiple objects are selected,
   * will move all objects to the middle of the selection.
   * @returns
   */
  public alignMiddle = () => {
    const activeObject = this.canvas.getActiveObject()
    const frame = this.editor.frame.frame

    if (activeObject) {
      if (activeObject instanceof fabric.Group) {
        const selectedObjects = activeObject._objects
        const refTop = activeObject.top
        const refHeight = activeObject.height
        this.canvas.discardActiveObject()
        selectedObjects.forEach(object => {
          const currentObject = object
          const currentObjectHeight = currentObject.getScaledHeight()
          currentObject.set({
            top: refTop + refHeight / 2 - currentObjectHeight / 2,
          })
        })
        const selection = new fabric.ActiveSelection(selectedObjects, { canvas: this.canvas })
        this.canvas.setActiveObject(selection)
      } else {
        const currentObject = activeObject
        const currentObjectHeight = currentObject.getScaledHeight()
        currentObject.set({
          top: frame.top + frame.height / 2 - currentObjectHeight / 2,
        })
      }
      this.canvas.requestRenderAll()
    }
  }

  /**
   * Moves an object to the bottom of the frame. If multiple objects are selected,
   * will move all objects to the bottom of the selection.
   * @returns
   */
  public alignBottom = () => {
    const activeObject = this.canvas.getActiveObject()
    const frame = this.editor.frame.frame

    if (activeObject) {
      if (activeObject instanceof fabric.Group) {
        const selectedObjects = activeObject._objects
        const refTop = activeObject.top
        const refHeight = activeObject.height
        this.canvas.discardActiveObject()
        selectedObjects.forEach(object => {
          const currentObject = object
          const currentObjectHeight = currentObject.getScaledHeight()
          currentObject.set({
            top: refTop + refHeight - currentObjectHeight,
          })
        })
        const selection = new fabric.ActiveSelection(selectedObjects, { canvas: this.canvas })
        this.canvas.setActiveObject(selection)
      } else {
        const currentObject = activeObject
        const currentObjectHeight = currentObject.getScaledHeight()
        currentObject.set({
          top: frame.top + frame.height - currentObjectHeight,
        })
      }
      this.canvas.requestRenderAll()
    }
  }

  /**
   * Moves an object to the left of the frame. If multiple objects are selected,
   * will move all objects to the left of the selection.
   * @returns
   */
  public alignLeft = () => {
    const activeObject = this.canvas.getActiveObject()
    const frame = this.editor.frame.frame
    if (activeObject) {
      if (activeObject instanceof fabric.Group) {
        const selectedObjects = activeObject._objects
        const refLeft = activeObject.left
        this.canvas.discardActiveObject()
        selectedObjects.forEach(object => {
          const currentObject = object
          currentObject.set({
            left: refLeft,
          })
        })
        const selection = new fabric.ActiveSelection(selectedObjects, { canvas: this.canvas })
        this.canvas.setActiveObject(selection)
      } else {
        const currentObject = activeObject
        currentObject.set({
          left: frame.left,
        })
      }
      this.canvas.requestRenderAll()
    }
  }

  /**
   * Moves an object to the center of the frame. If multiple objects are selected,
   * will move all objects to the center of the selection.
   * @returns
   */
  public alignCenter = () => {
    const activeObject = this.canvas.getActiveObject()
    const frame = this.editor.frame.frame

    if (activeObject) {
      if (activeObject instanceof fabric.Group) {
        const selectedObjects = activeObject._objects
        const refLeft = activeObject.left
        const refWidth = activeObject.width
        this.canvas.discardActiveObject()
        selectedObjects.forEach(object => {
          const currentObject = object
          const currentObjectWidth = currentObject.getScaledWidth()
          currentObject.set({
            left: refLeft + refWidth / 2 - currentObjectWidth / 2,
          })
        })
        const selection = new fabric.ActiveSelection(selectedObjects, { canvas: this.canvas })
        this.canvas.setActiveObject(selection)
      } else {
        const currentObject = activeObject
        const currentObjectWidth = currentObject.getScaledWidth()
        currentObject.set({
          left: frame.left + frame.width / 2 - currentObjectWidth / 2,
        })
      }
      this.canvas.requestRenderAll()
    }
  }

  /**
   * Moves an object to the right of the frame. If multiple objects are selected,
   * will move all objects to the right of the selection.
   * @returns
   */
  public alignRight = () => {
    const activeObject = this.canvas.getActiveObject()
    const frame = this.editor.frame.frame

    if (activeObject) {
      if (activeObject instanceof fabric.Group) {
        const selectedObjects = activeObject._objects
        const refLeft = activeObject.left
        const refWidth = activeObject.width
        this.canvas.discardActiveObject()
        selectedObjects.forEach(object => {
          const currentObject = object
          const currentObjectWidth = currentObject.getScaledWidth()
          currentObject.set({
            left: refLeft + refWidth - currentObjectWidth,
          })
        })
        const selection = new fabric.ActiveSelection(selectedObjects, { canvas: this.canvas })
        this.canvas.setActiveObject(selection)
      } else {
        const currentObject = activeObject
        const currentObjectWidth = currentObject.getScaledWidth()
        currentObject.set({
          left: frame.left + frame.width - currentObjectWidth,
        })
      }
      this.canvas.requestRenderAll()
    }
  }

  /**
   * Set object shadow
   * @param options ShadowOptions
   * @param {Boolean} [options.enabled] enabled
   * @returns
   */
  public setShadow = (options: ShadowOptions) => {
    const activeObject = this.canvas.getActiveObject()
    if (activeObject instanceof fabric.Group) {
      activeObject._objects.forEach(object => {
        setObjectShadow(object, options)
      })
    } else {
      setObjectShadow(activeObject, options)
    }
    this.canvas.requestRenderAll()
    this.editor.history.save()
  }

  /**
   * Set object fill as gradient
   * @param param GradientOptions
   * @returns
   */
  public setGradient = ({ angle, colors }: GradientOptions) => {
    const activeObject = this.canvas.getActiveObject()
    if (activeObject instanceof fabric.Group) {
      activeObject._objects.forEach(object => {
        setObjectGradient(object, angle, colors)
      })
    } else {
      setObjectGradient(activeObject, angle, colors)
    }
    this.canvas.requestRenderAll()
    this.editor.history.save()
  }

  /**
   * Group selected objects
   * @returns
   */
  public group = () => {
    const frame = this.editor.frame.frame
    const activeObject = this.canvas.getActiveObject() as fabric.ActiveSelection
    if (!activeObject) {
      return
    }
    if (activeObject.type !== ObjectType.ACTIVE_SELECTION) {
      return
    }

    if (activeObject instanceof fabric.Group) {
      activeObject._objects.forEach(object => {
        object.clipPath = null
      })
    }
    const group = activeObject.toGroup()
    group.clipPath = frame
    this.canvas.requestRenderAll()
    this.editor.history.save()
  }

  /**
   * Ungroup selected objects
   * @returns
   */
  public ungroup = () => {
    const frame = this.editor.frame.frame
    const activeObject = this.canvas.getActiveObject() as fabric.ActiveSelection
    if (!activeObject) {
      return
    }
    if (activeObject.type !== ObjectType.GROUP) {
      return
    }
    const activeSelection = activeObject.toActiveSelection()
    activeSelection._objects.forEach(object => {
      object.clipPath = frame
    })
    this.context.setActiveObject(activeSelection)
    this.canvas.requestRenderAll()
    this.editor.history.save()
  }

  /**
   * Lock object movement and disable controls
   * @returns
   */
  public lock = () => {
    const activeObject = this.canvas.getActiveObject() as fabric.Object | fabric.ActiveSelection
    if (activeObject) {
      if (activeObject._objects) {
        activeObject._objects.forEach(object => {
          object.set({
            hasControls: false,
            lockMovementY: true,
            lockMovementX: true,
            locked: true,
          })
        })
        activeObject.set({
          hasControls: false,
          lockMovementY: true,
          lockMovementX: true,
          locked: true,
        })
      } else {
        activeObject.set({
          hasControls: false,
          lockMovementY: true,
          lockMovementX: true,
          locked: true,
        })
      }
      this.canvas.requestRenderAll()
      this.editor.history.save()
    }
  }

  /**
   * Lock object movement and disable controls for given id
   * @param {String} id object id
   * @returns
   */
  public lockById = (id: string) => {
    const object = this.findOneById(id)
    if (object) {
      object.set({
        hasControls: false,
        lockMovementY: true,
        lockMovementX: true,
        locked: true,
      })
      this.canvas.requestRenderAll()
      this.editor.history.save()
    }
  }

  /**
   * Unlock active object
   * @returns
   */
  public unlock = () => {
    const activeObject = this.canvas.getActiveObject() as fabric.Object | fabric.ActiveSelection
    if (!activeObject) {
      if (activeObject?._objects) {
        activeObject._objects.forEach(object => {
          object.set({
            hasControls: true,
            lockMovementY: false,
            lockMovementX: false,
            locked: false,
          })
        })
        activeObject.set({
          hasControls: true,
          lockMovementY: false,
          lockMovementX: false,
          locked: false,
        })
      } else {
        activeObject.set({
          hasControls: true,
          lockMovementY: false,
          lockMovementX: false,
          locked: false,
        })
      }
      this.canvas.requestRenderAll()
      this.editor.history.save()
    }
  }

  /**
   * Unlock object with given id
   * @param {String} id object id
   * @returns 
   */
  public unlockById = (id: string) => {
    const object = this.findOneById(id)
    if (object) {
      object.set({
        hasControls: true,
        lockMovementY: false,
        lockMovementX: false,
        locked: false,
      })
      this.canvas.requestRenderAll()
      this.editor.history.save()
    }
  }

  /**
   * Finds Object by name
   * @param {String} name Object name
   * @returns 
   */
  public findByName = (name: string) => {
    return this.canvas.getObjects().filter(o => o.name === name)
  }

  public removeByName = (name: string) => {
    this.canvas.getObjects().forEach(o => {
      if (o.name === name) {
        this.canvas.remove(o)
        this.editor.history.save()
      }
    })
    this.canvas.requestRenderAll()
  }

  /**
   * Find objects by id
   * @param {String} id object id 
   * @returns object list
   */
  public findById = (id: string) => {
    return this.canvas.getObjects().filter(o => o.id === id)
  }

  /**
   * Find object by id
   * @param {String} id object id 
   * @returns object or undefined
   */
  public findOneById = (id: string) => {
    return this.canvas.getObjects().find(obj => obj.id === id)
  }

  /**
   * Remove object
   * @param {String} id object id 
   * @returns
   */
  public removeById = (id: string) => {

    this.canvas.getObjects().forEach(o => {
      if (o.id === id) {
        this.canvas.remove(o)
        this.editor.history.save()
        this.updateContextObjects();
      }
    })
    this.canvas.requestRenderAll()
  }

  /**
   * Set Filter to image
   * @param value filter value
   * @param filterType filter type
   * @returns
   */
  public setFilter = (value: number, filterType: string) => {
    const activeObject = this.canvas.getActiveObject() as fabric.Image;
    const filterIndex = activeObject.filters?.findIndex(filter => Object.keys(filter)[0] === filterType);
    filterType = filterType[0].toUpperCase() + filterType.slice(1).toLowerCase();
    const filter = new fabric.Image.filters[filterType]({ [filterType.toLowerCase()]: value });
    if (filterIndex === -1) {
      activeObject.filters.push(filter);
    } else {
      activeObject.filters[filterIndex] = filter;
    }


    activeObject.applyFilters();
    this.canvas.requestRenderAll();
    // this.editor.history.save()
  }

  /**
   * Set Updated Objects to React context
   * @returns
   */
  private updateContextObjects = () => {
    const objects = this.canvas.getObjects()
    const filteredObjects = objects.filter(o => {
      return o.type !== 'Frame' && o.type !== 'Background'
    })
    this.context.setObjects(filteredObjects)
  }
}

export default Objects
