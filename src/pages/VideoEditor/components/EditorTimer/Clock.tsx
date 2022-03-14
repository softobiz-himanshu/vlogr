import React, { useEffect } from 'react'
import { EditorTimerContext } from '.'
import Timer from './Timer'

function Clock() {
    const context = React.useContext(EditorTimerContext)
    useEffect(() => {
        const timer = new Timer(context)
        context.setTimer(timer)
    }, [])
    return <></>
}

export default Clock
