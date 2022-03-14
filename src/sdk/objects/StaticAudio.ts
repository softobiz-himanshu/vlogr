import { fabric } from 'fabric'

export class StaticAudioObject extends fabric.Object {
  static type = 'StaticAudio'
  initialize(options: StaticAudioOptions) {
    super.initialize({
      width: 0,
      height: 0,
      selectable: false,
      evented: false,
      visible: false,
      ...options,
    })
    return this
  }

  static fromObject(options: StaticAudioOptions, callback) {
    return callback && callback(new fabric.StaticAudio(options))
  }

  toObject(propertiesToInclude = []) {
    return fabric.util.object.extend(super.toObject.call(this, propertiesToInclude), {})
  }
  toJSON(propertiesToInclude = []) {
    return fabric.util.object.extend(super.toObject.call(this, propertiesToInclude), {})
  }
}

fabric.StaticAudio = fabric.util.createClass(StaticAudioObject, {
  type: StaticAudioObject.type,
})
fabric.Background.fromObject = StaticAudioObject.fromObject

export interface StaticAudioOptions extends fabric.IObjectOptions {
  id: string
  name: string
  src: string
  totalDuration: number
}

declare module 'fabric' {
  namespace fabric {
    class StaticAudio extends StaticAudioObject {
      constructor(options: StaticAudioOptions)
    }
  }
}
