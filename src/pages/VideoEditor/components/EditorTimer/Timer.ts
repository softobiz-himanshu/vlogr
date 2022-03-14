import { EditorTimerState } from '.'

class Time {
  private time: number
  private interval: NodeJS.Timer
  private lastUpdatedTime: number
  constructor(private context: EditorTimerState) {
    this.time = 0
  }

  public start = () => {
    this.lastUpdatedTime = Date.now()
    this.interval = setInterval(() => {
      const now = Date.now()
      const deltaTime = now - this.lastUpdatedTime
      this.lastUpdatedTime = now
      this.time = this.time + deltaTime
      this.context.setTime(this.time)
      this.context.setStatus('RUNNING')
    }, 16)
  }

  public stop = () => {
    if (this.interval) {
      clearInterval(this.interval)
      this.context.setStatus('PAUSED')
    }
  }

  public reset = () => {
    if (this.interval) {
      clearInterval(this.interval)
      this.time = 0
      this.context.setStatus('STOPPED')
      this.context.setTime(0)
    }
  }
  public setTime = (time: number) => {
    this.time = time
    this.context.setTime(time)
  }

  public destroy = () => {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }
}

export default Time
