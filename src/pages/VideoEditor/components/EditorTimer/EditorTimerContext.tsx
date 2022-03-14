import React, { useState } from 'react'
import Timer from './Timer'

type Status = 'RUNNING' | 'PAUSED' | 'STOPPED'

/**
 * Editor Timer State
 */
export interface EditorTimerState {
  /**
   * Current time
   */
  time: number

  /**
   * React function to change the time state value
   */
  setTime: (time: number) => void

  /**
   * Interval to enable the timer
   */
  timer: Timer | null

  /**
   * React function to change the state and initialize the timer
   */
  setTimer: (timer: Timer) => void

  /**
   * Whether the timer is running or paused or stopped
   */
  status: Status
  setStatus: (v: Status) => void

  /**
   * Whether the timer should start to run
   */
  shouldStart: boolean
  setShouldStart: (v: boolean) => void
}

export const EditorTimerContext = React.createContext<EditorTimerState>({
  time: 0,
  setTime: () => {},
  timer: null,
  setTimer: () => {},
  status: 'STOPPED',
  setStatus: () => {},
  shouldStart: false,
  setShouldStart: () => {},
})

export const EditorTimerProvider: React.FC = ({ children }) => {
  const [time, setTime] = useState<number>(0)
  const [timer, setTimer] = useState<Timer | null>(null)
  const [status, setStatus] = useState<Status>('STOPPED')
  const [shouldStart, setShouldStart] = useState<boolean>(false)
  return (
    <EditorTimerContext.Provider
      value={{ time, setTime, timer, setTimer, status, setStatus, shouldStart, setShouldStart }}
    >
      {children}
    </EditorTimerContext.Provider>
  )
}
