import Controller from './Base'
import { fabric } from 'fabric'
import throttle from 'lodash/throttle'
import { ObjectType } from '../common/constants'
/**
 * Handles the editor history
 * @class History
 * @category Editor
 */
class History extends Controller {
  private redos = []
  private undos = []
  private state = []
  private isActive: boolean

  public undo = throttle(() => {
    if (this.undos.length > 1) {
      const undo = this.undos.pop()
      if (!undo) {
        return
      }
      this.redos.push({
        type: 'redo',
        json: this.state,
      })
      this.restore(undo)
    }
  }, 100)

  public redo = throttle(() => {
    const redo = this.redos.pop()
    if (!redo) {
      return
    }
    this.undos.push({
      type: 'undo',
      json: this.state,
    })
    this.restore(redo)
  }, 100)

  public save = () => {
    try {
      if (this.state) {
        const json = this.state
        this.undos.push({
          type: 'UPDATE',
          json,
        })
        const canvasJSON = this.canvas.toJSON(this.editor.config.propertiesToInclude) as any
        canvasJSON.objects.forEach(object => {
          if (object.clipPath) {
            fabric.util.enlivenObjects(
              [object.clipPath],
              function (arg1) {
                object.clipPath = arg1[0]
              },
              ''
            )
          }
        })
        this.state = canvasJSON.objects
      }
    } catch (err) {
      console.log(err)
    }
    this.editor.emit('history:changed', {
      hasUndo: this.undos.length > 1,
      hasRedo: this.redos.length > 0,
    })
  }

  private restore = transaction => {
    if (!this.isActive) {
      this.editor.objects.clear()
      const objects = transaction.json
      this.state = objects
      this.isActive = true
      fabric.util.enlivenObjects(
        objects,
        enlivenObjects => {
          enlivenObjects.forEach(enlivenObject => {
            if (enlivenObject.type !== ObjectType.FRAME) {
              this.canvas.add(enlivenObject)
            }
          })
          this.editor.emit('history:changed', {
            hasUndo: this.undos.length > 1,
            hasRedo: this.redos.length > 0,
          })
        },
        null
      )
      this.isActive = false
    }
  }

  public get status() {
    return {
      undos: this.undos,
      redos: this.redos,
      state: this.state,
    }
  }
}

export default History
