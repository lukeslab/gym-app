import React from 'react';
import WorkoutsData from '../data/workouts';
import ExerciseData from '../data/exercises';
import { useState, useEffect } from 'react';


function Timer(){
    const [ timer, setTimer ] = useState('00:58:55');
    let [ hours, minutes, seconds ] = timer.split(':');
    const [ timerIsPaused, setTimerIsPaused ] = useState(true);

    useEffect(() => {
        let intervalId;
        if(!timerIsPaused){
            intervalId = setInterval(() => {
                +seconds < 9 ? seconds = `0${+seconds+1}` : seconds++
                if (seconds === 60) {
                    +minutes <= 9 ? minutes = `0${+minutes+1}` : minutes++
                    seconds = '00';
                }   
        
                if (minutes === 60) {
                    +hours < 9 ? hours = `0${+hours+1}` : hours++
                    minutes = '00';
                }
                
                setTimer(`${hours}:${minutes}:${seconds}`)
            }, 1000)
        }
    
        return () => clearInterval(intervalId);
    }, [timerIsPaused])

    function handleOnClick(){
        setTimerIsPaused(!timerIsPaused);
        console.log(timerIsPaused)
    }

    return( 
        <div>
            {timer}
            <button onClick={handleOnClick}>{timerIsPaused ? 'Start' : 'Pause'}</button>
        </div>
    )
}

function SetList(){

}

export default function CurrentSession() {
    return (
        <>
            <h1>Current session view</h1>
            <Timer />
            <SetList />
        </>
    )
}