import Editor from '../Editor'
import Animations from './Animations'
import Elements from './Elements'
import Videos from './Videos'
class Managers {
  public animations: Animations
  public elements: Elements
  public videos: Videos
  constructor(editor: Editor) {
    // this.animations = new Animations(editor: Editor)
    this.elements = new Elements(editor)
    this.videos = new Videos(editor)
  }
}

export default Managers
