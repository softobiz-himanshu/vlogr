import { EditorConfig, EditorOptions } from './common/interfaces'
import EventManager from './EventManager'
import Zoom from './controllers/Zoom'
import { IEditorContext } from '.'
import Canvas from './controllers/Canvas'
import Objects from './controllers/Objects'
import Frame from './controllers/Frame'
import History from './controllers/History'
import Events from './handlers/Events'
import Personalization from './handlers/Personalization'
import Guidelines from './handlers/Guidelines'
import Scrollbar from './handlers/Scrollbar'
import Design from './controllers/Design'
import Manager from './managers'

/** 
 * Creates a canvas Editor instance
 * @class Editor
 * @category Editor
 */
class Editor extends EventManager {
  /**
   * Editor's React Context 
   */
  private context: IEditorContext

  /**
   * Editor configurations
   */
  public config: EditorConfig

  /**
   * Canvas zoom handler
   */
  public zoom: Zoom

  /**
   * Canvas controller instance
   */
  public canvas: Canvas

  /**
   * Frame controller instance
   */
  public frame: Frame

  /**
   * Fabric object list
   */
  public objects: Objects

  /**
   * Editor history controller
   */
  public history: History

  /**
   * Design controller
   */

  public design: Design

  /**
   * Design controller
   */
  public guidelines: Guidelines

  /**
   * Fabric events handlers
   */
  public events: Events

  /**
   * Fabric control handler instance
   */
  public personalization: Personalization

  
  /**
   * Scrollbar controller instance
   */
  public scrollbar: Scrollbar

  /**
   * Elements manager instance
   */
  public manager: Manager
  constructor(props: EditorOptions) {
    super()
    this.context = props.context
    this.config = props.config
    const options = {
      canvas: props.canvas,
      context: props.context,
      config: props.config,
      editor: this,
    }
    this.zoom = new Zoom(options)
    this.canvas = new Canvas(options)
    this.frame = new Frame(options)
    this.objects = new Objects(options)
    this.history = new History(options)
    this.design = new Design(options)
    this.events = new Events(options)
    this.personalization = new Personalization(options)
    this.guidelines = new Guidelines(options)
    this.scrollbar = new Scrollbar(options)
    this.manager = new Manager(this)
  }

  // CONTEXT MENU
  public cancelContextMenu = () => {
    this.context.setContextMenuRequest(null)
  }


  public destroy = () => { }
}

export default Editor
