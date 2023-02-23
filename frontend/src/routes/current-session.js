import React, { useState, useEffect, useRef } from 'react';
import { 
    Link, 
    useLocation,
    useLoaderData
} from 'react-router-dom';
import workoutsData from '../data/workouts';
import exerciseData from '../data/exercises';

export function loader(){
    return localStorage.getItem('currentSession');
}

export default function CurrentSession() {    
    const { title, id } = JSON.parse(useLoaderData());
    
    useEffect( () =>{
        const timerElement = document.querySelector('.timer')
        if (title && timerElement) timerElement.style.display = 'flex';
    })

    return (
        <section style={{
            textAlign: 'center',
            position: 'absolute',
            top: '181px',
            left: '0',
            right: '0'
        }}>
            {title ? <SetList title={title}/> : 
            <NoSessionMessage />}
        </section>
    )
}

function SetList({title}){ 
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
                    <span style={{flex: '1'}}>
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

function NoSessionMessage(){
    return (
        <section>
            <p style={{marginTop: "100px"}}>Session is not active</p>
            <button style={{
                backgroundColor: 'white',
                alignSelf: 'center',
                border: '1px solid black',
                padding: '20px 50px',
                marginTop: '25px',
                fontSize: '20px',
                cursor: 'pointer'
            }}><Link style={{textDecoration: "none", color: 'black'}} to="/">Go to workouts</Link></button>
        </section>
    )
}