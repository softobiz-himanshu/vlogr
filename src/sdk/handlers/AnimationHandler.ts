import gsap, { Linear } from 'gsap'
import { HandlerOptions } from '../common/interfaces'
import BaseHandler from './BaseHandler'

enum AnimationsType {
  NONE = 'NONE',
  STOMP = 'STOMP',
  TUMBLE = 'TUMBLE',
  RISE = 'RISE',
  PAN = 'PAN',
  FADE = 'FADE',
  BREATHE = 'BREATHE',
}
type AnimationType = keyof typeof AnimationsType

class Animations extends BaseHandler {
  private anim: gsap.core.Timeline
  constructor(props: HandlerOptions) {
    super(props)
    this.anim = gsap.timeline()
  }

  public animate = (animation: AnimationType) => {
    const activeObject = this.canvas.getActiveObject()
    const animations = {
      [AnimationsType.NONE]: {},
      [AnimationsType.TUMBLE]: {
        duration: 0.5,
        left: 0 - activeObject.width,
        angle: 45,
        ease: Linear.easeInOut,
      },
      [AnimationsType.STOMP]: {
        duration: 1,
        ease: 'slow(0.7, 0.7, false)',
        scaleX: 1.5 * activeObject.scaleX,
        scaleY: 1.5 * activeObject.scaleY,
      },
      [AnimationsType.RISE]: {
        duration: 0.5,
        top: activeObject.top + activeObject.height * 2,
        opacity: 0,
        ease: 'pexpo.out',
      },
      [AnimationsType.PAN]: {
        duration: 0.5,
        left: activeObject.left - (activeObject.width * activeObject.scaleX) / 2,
        opacity: 0,
        ease: 'pexpo.out',
      },
      [AnimationsType.FADE]: {
        duration: 1,
        opacity: 0,
        ease: 'slow(0.7, 0.7, false)',
      },
      [AnimationsType.BREATHE]: {
        duration: 1,
        scaleX: activeObject.scaleX + activeObject.scaleX / 2,
        scaleY: activeObject.scaleY + activeObject.scaleY / 2,
        ease: 'slow(0.7, 0.7, false)',
      },
    }
    if (activeObject) {
      activeObject.set('animation', animation)
      this.anim.from(activeObject, {
        ...animations[animation],
        onUpdate: () => {
          this.canvas.requestRenderAll()
        },
        onComplete: () => {
          activeObject.setCoords()
        },
      })
    }
  }

  setTemplateAnimations = () => {
    this.anim = gsap.timeline({ paused: true })
    const objects = this.canvas.getObjects()
    objects.forEach(object => {
      if (object.animation) {
        this.animateObject(object, object.animation)
      }
    })
  }

  animateObject = (object: fabric.Object, animation: AnimationType) => {
    const animations = {
      [AnimationsType.NONE]: {},
      [AnimationsType.TUMBLE]: {
        duration: 0.5,
        left: 0 - object.width,
        angle: 45,
        ease: Linear.easeInOut,
      },
      [AnimationsType.STOMP]: {
        duration: 1,
        ease: 'slow(0.7, 0.7, false)',
        scaleX: 1.5 * object.scaleX,
        scaleY: 1.5 * object.scaleY,
      },
      [AnimationsType.RISE]: {
        duration: 0.5,
        top: object.top + object.height * 2,
        opacity: 0,
        ease: 'pexpo.out',
      },
      [AnimationsType.PAN]: {
        duration: 0.5,
        left: object.left - (object.width * object.scaleX) / 2,
        opacity: 0,
        ease: 'pexpo.out',
      },
      [AnimationsType.FADE]: {
        duration: 1,
        opacity: 0,
        ease: 'slow(0.7, 0.7, false)',
      },
      [AnimationsType.BREATHE]: {
        duration: 1,
        scaleX: object.scaleX + object.scaleX / 2,
        scaleY: object.scaleY + object.scaleY / 2,
        ease: 'slow(0.7, 0.7, false)',
      },
    }
    if (object && animations[animation]) {
      this.anim.from(
        object,
        {
          ...animations[animation],
          onUpdate: () => {
            this.canvas.requestRenderAll()
          },
          onComplete: () => {
            object.setCoords()
          },
        },
        0
      )
    }
    this.anim.play()
  }
}

export default Animations
