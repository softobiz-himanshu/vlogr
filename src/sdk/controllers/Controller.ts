import { ControllerOptions, EditorConfig, FabricCanvas } from '../common/interfaces'
import { IEditorContext } from '../context'
import Editor from '../Editor'

class BaseHandler {
  protected canvas: FabricCanvas
  protected context: IEditorContext
  protected config: EditorConfig
  protected editor: Editor
  constructor({ canvas, context, config, editor }: ControllerOptions) {
    this.canvas = canvas
    this.context = context
    this.config = config
    this.editor = editor
  }
}
export default BaseHandler
