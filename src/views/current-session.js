import React from 'react';
import workoutsData from '../data/workouts';
import exerciseData from '../data/exercises';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
        <section>
            {timer}
            <button onClick={handleOnClick}>{timerIsPaused ? 'Start' : 'Pause'}</button>
        </section>
    )
}

function SetList(){
    const {state : {title, id}} = useLocation();
    console.log(title, id);

    const workout = workoutsData.filter(workout => workout.title === title)[0];
    const exerciseList = workout.exercises.map(exerciseFromWorkout => {
       return exerciseData.filter(exerciseFromModel => {
            return exerciseFromWorkout === exerciseFromModel.name 
        })[0];
    }) 

    let setList = [];
    exerciseList.forEach(exercise => {
        for (let set = 1; set <= exercise.sets; set++){
            setList.push(
                <li key={exercise.name+set}>
                    {`${exercise.name} Set ${set}: ${exercise.reps} reps @ ${exercise.weight} lbs`} 
                </li>
            )
        }
    })

    console.log(workout, exerciseList, setList);

    return (
        <ul>
            {setList}
        </ul>
    )
}

export default function CurrentSession() {
    return (
        <section>
            <h1>Current session view</h1>
            <Timer />
            <SetList />
        </section>
    )
}