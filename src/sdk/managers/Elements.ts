import { ClipItem } from '@/interfaces/ClipItem'
import { Item } from '@/interfaces/Item'
import Editor from '../Editor'

interface Element {
  id: string
  object: fabric.Object
  between: number[]
}
class Elements {
  public items: Map<string, Element>
  public videos: HTMLVideoElement[] = []

  constructor(public editor: Editor) {
    this.items = new Map()
  }

  public setTime = (time: number) => {
    const objects = this.editor.objects.list()
    objects.forEach(object => {
      if (object.duration) {
        if (object.duration.start < time && object.duration.stop > time) {
          object.visible = true
        } else {
          object.visible = false
        }
      }
      this.editor.canvas.requestRenderAll()
    })
  }
  public add = (object: fabric.Object) => {
    this.items.set(object.id, {
      id: object.id,
      object: object,
      between: [0, 100],
    })
  }

  public update = (timelineItems: Item[] | ClipItem[]) => {
    const objects = this.editor.objects.list()
    timelineItems.forEach(timelineItem => {
      const object = objects.find(object => object.id === timelineItem.id)
      const [start, stop] = [timelineItem.x / 0.1, (timelineItem.x + timelineItem.width) / 0.1]
      object?.set('duration', {
        start,
        stop,
      })
    })
  }

  public updateClips = (timelineItems: Item[] | ClipItem[]) => {
    const objects = this.editor.objects.list()
    timelineItems.forEach(timelineItem => {
      const object = objects.find(object => object.id === timelineItem.id)
      const [start, stop] = [timelineItem.x / 0.1, (timelineItem.x + timelineItem.width) / 0.1]
      object?.set('duration', {
        start,
        stop,
      })
    })
  }

  public unset = (id: string) => {}
}

export default Elements
