import * as PIXI from 'pixi.js'
import { Element } from './data'
import { AnimatedGIF, AnimatedGIFLoader } from '../utils/AnimatedGif'

PIXI.Loader.registerPlugin(AnimatedGIFLoader)

PIXI.settings.SORTABLE_CHILDREN = true

interface Options {
  /**
   * Fabric Object list
   */
  data?: Element[]
}

interface ElementWithSprite extends Element {
  /**
   * Pixi animation sprite
   */
  sprite: PIXI.Sprite | AnimatedGIF

  /**
   * HTML Video Element
   */
  video: HTMLVideoElement
}

class PlaybackController {
  /**
   * Pixi container canvas id
   */
  private id: string

  /**
   * Pixi wrapper DOM Reference
   */
  private el: HTMLElement

  /**
   * Pixi app instance
   */
  private app: PIXI.Application

  /**
   * Resources map used to store the data needed to display the content
   */
  private resources: Map<string, ElementWithSprite>

  /**
   * Resources map for audio elements
   */
  private audioResources: Map<string, any>
  private clipResources: Map<string, any>

  /**
   * Required options used to hold the elements data
   */
  private options: Required<Options>
  private status: string = 'STOPPED'

  /**
   * Whether the pixi app has been initialized
   */
  public initialized: Boolean

  /**
   * Resource list that holds the data needed to display GIF elements
   */
  private gifsResourceData: { key: string; objectId: string }[] = []

  constructor(id: string, options?: Options) {
    this.id = id
    this.resources = new Map()
    this.audioResources = new Map()
    this.clipResources = new Map()
    this.initialized = false
    this.options = { ...this.options, data: options.data ? options.data : [] }
    this.initialize()
  }

  /**
   * renders the content in the webgl layer
   * @param progress Time Progress
   * @returns
   * @public 
   */
  public render = (progress: number) => {
    for (let [key, value] of this.audioResources) {
      if (progress > value.startAt && progress < value.endAt) {
        value.audio.play()
        if (value.audio.paused) {
          value.audio.play()
        }
      } else {
        value.audio.pause()
      }
    }
    for (let [key, value] of this.resources) {
      if (progress > value.startAt && progress < value.endAt) {
        this.applySpriteOptions(value.sprite, { visible: true })
      } else {
        this.applySpriteOptions(value.sprite, { visible: false })
      }
    }
  }

  /**
   * Show the resource content in the webgl layer
   * @public
   * @returns
   */
  public play = () => {
    for (let [key, value] of this.resources) {
      this.applySpriteOptions(value.sprite, value.position)
      if (value.type === 'StaticVideo') {
        value.video.muted = false
        value.video.currentTime = 0
      }

      value.sprite.visible = false
      this.app.stage.addChild(value.sprite)
    }
  }

  /**
   * Changes the sprite options
   * Used to show or hide elements
   * @param sprite Pixi Sprite
   * @param {Object} options Object that contains the option values 
   */
  private applySpriteOptions = (sprite: PIXI.Sprite, options: Record<string, any>) => {
    for (const property in options) {
      sprite[property] = options[property]
    }
  }

  /**
   * Initializes Pixi App
   * @returns
   * @private
   */
  private initialize = async () => {
    this.initializeContainer()
    this.initializeApplication()
    await this.initializeResources()
    this.initialized = true
  }

  /**
   * Get the container where the App wil be appended
   * @returns
   * @private
   */
  private initializeContainer = () => {
    const id = this.id
    const el = document.getElementById(id) as HTMLDivElement
    this.el = el
  }

  /**
   * Creates the Pixi app instance and appends it to the HTML Div container
   * @returns
   * @private
   */
  private initializeApplication = () => {
    let app = new PIXI.Application({
      width: 1920,
      height: 540,
      resizeTo: this.el,
      backgroundColor: 0xffffff,
      backgroundAlpha: 1,
    })
    this.el.appendChild(app.view)
    this.app = app
  }

  /**
   * Loads the files and stores the data 
   * @returns 
   * @private
   */
  private initializeResources = async () => {
    const data = this.options.data
    const loader = new PIXI.Loader()
    for (const item of data) {
      if (item.type === 'StaticVideo' || item.type === 'StaticGIF' || item.type === 'StaticAudio') {
        console.log({ item })
        loader.add(item.id, item.url)
      } else {
        // Handle if it is an image
        if (item.url.match(/blob/)) {
          loader.add(item.id, item.url, {
            loadType: PIXI.LoaderResource.LOAD_TYPE.IMAGE,
            xhrType: PIXI.LoaderResource.XHR_RESPONSE_TYPE.BLOB,
          })
        } else {
          loader.add(item.id, item.url)
        }
      }
    }
    return new Promise(resolve => {
      loader.load((loader, resources) => {
        for (const [key, resource] of Object.entries(resources)) {
          const element = this.options.data.find(i => i.id === key)
          if (element.type.includes('StaticAudio')) {
            const object = resource.data
            this.audioResources.set(element.id, {
              ...element,
              audio: object,
            })
          } else {
            const object = resource.data
            if (element.type === 'StaticVideo') {
              object.muted = true
            }

            let texture: PIXI.Texture<PIXI.Resource>

            if (element.type === 'StaticGIF') {
              texture = resource.animation.texture
            } else {
              texture = PIXI.Texture.from(object)
            }

            let sprite = new PIXI.Sprite(texture)
            this.resources.set(key, {
              ...element,
              sprite: element.type !== 'StaticGIF' ? sprite : resource.animation,
              video: object,
            })

            if (element.type === 'StaticGIF') {
              this.gifsResourceData.push({ key, objectId: element.objectId })
            }
          }
        }
        resolve(true)
      })
    })
  }

  /**
   * Get a GIF resource by id
   * @param gifId resource id
   * @returns AnimatedGif Sprite
   */
  getGifResource = (gifId: string) => {
    const { key } = this.gifsResourceData.find(({ objectId }) => objectId === gifId)
    return this.resources.get(key)
  }

  /**
   * Get the duration of the GIF and the total frames number
   * @param {String} gifId 
   * @returns {Object} duration and total frames
   */
  getGifFramesData = (gifId: string) => {
    const gifResource = this.getGifResource(gifId)
    const gifAnimationRef = gifResource.sprite as AnimatedGIF

    const totalFrames = gifAnimationRef.totalFrames
    const duration = gifAnimationRef.duration

    return { totalFrames, duration }
  }

  /**
   * Display the frame by index
   * @param {String} gifId 
   * @param {Number} frameIndex 
   */
  updateGifFrameAndPlay = (gifId: string, frameIndex: number) => {
    const gifResource = this.getGifResource(gifId)
    const gifAnimationRef = gifResource.sprite as AnimatedGIF

    gifAnimationRef.currentFrame = frameIndex === gifAnimationRef.totalFrames ? frameIndex - 1 : frameIndex
    if (!gifAnimationRef.playing) {
      gifAnimationRef.play()
    }
  }

  /**
   * Stop GIF animation
   * @param {String} gifId 
   */
  stopGIF = (gifId: string) => {
    const gifResource = this.getGifResource(gifId)
    const gifAnimationRef = gifResource.sprite as AnimatedGIF
    gifAnimationRef.stop()
  }
}
export default PlaybackController
