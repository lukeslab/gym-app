import React from 'react';
import workoutsData from '../data/workouts';
import exercisesData from'../data/exercises';
import { useState } from 'react';

export default function EditWorkout () {
    const [ isAddingExercise, setIsAddingExercise ] = useState(false);

    function addExercise(){
        setIsAddingExercise(!isAddingExercise)
    }

    return (
        <>
            <h1>Create Workout</h1>
            <label>
                Title:
                <input type="text"></input>
            </label>
            <ul>
                 <li>
                    {isAddingExercise ? <><input></input><button onClick={addExercise}>Done</button></> : <>Add exercise <span onClick={addExercise}>+</span></>}
                </li>
            </ul>
            <button>Done</button>
        </>
    )
}
