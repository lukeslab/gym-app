import React from 'react';
import Timer from './components/Timer';
import workoutsData from '../data/workouts';
import exerciseData from '../data/exercises';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function SetList(){
    const location = useLocation();
    const title = location.state?.title || JSON.parse(localStorage.getItem('current-session'));

    useEffect(()=> {
        localStorage.setItem('current-session', JSON.stringify(title))
    }, [title])
    
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
                <li style={{
                    border: '1px solid black',
                    padding: '10px',
                    marginTop: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }} key={exercise.name+set}>
                    <span style={{
                        flex: '1'
                    }}>
                        {`${exercise.name} Set ${set}: ${exercise.reps} reps @ ${exercise.weight} lbs`} 
                    </span>
                    <div>
                        <button style={{
                            backgroundColor: 'limegreen',
                            border: 'none',
                            padding: '5px 10px',
                        }}>Pass</button>
                        <button style={{
                            backgroundColor: 'red',
                            border: 'none',
                            padding: '5px 10px',
                           
                        }}>Fail</button>
                    </div>
                </li>
            )
        }
    })
    
    return (
        <ul style={{
            margin: '60px auto 100px auto',
            width: '90%',
            maxWidth: '500px',    
            minWidth: '400px',
        }}>
            {setList}
        </ul>
    )
}

export default function CurrentSession({timer, setTimer}) {

    // useEffect(()=>{
    //     setTimer({
    //         ...timer,
    //         display: 'flex'
    //     })
    // }, [timer.display])

    const toDisplay = document.querySelector('.timer')
    if (toDisplay) toDisplay.style.display = 'flex';

    return (
        <section style={{
            textAlign: 'center',
            position: 'absolute',
            top: '181px',
            left: '0',
            right: '0'
        }}>
            <SetList />
        </section>
    )
}