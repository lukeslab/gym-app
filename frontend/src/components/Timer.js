import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useStopwatch } from 'react-timer-hook';

function MyStopwatch() {
    const location = useLocation();
    let display = 'none';
    
    if (location.pathname === "/current_session") display = 'block'

    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        reset,
    } = useStopwatch();
    
    
    return (
        <div style={{textAlign: 'center', display: display}}>
            <h1>react-timer-hook</h1>
            <p>Stopwatch Demo</p>
            <div style={{fontSize: '100px'}}>
            <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
            </div>
            <p>{isRunning ? 'Running' : 'Not running'}</p>
            <button onClick={start}>Start</button>
            <button onClick={pause}>Pause</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
}

export default MyStopwatch