import React from 'react';
import workoutsData from '../data/workouts';
import exercisesData from'../data/exercises';
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';


function Exercise({name}){
    const exercise = exercisesData.find( exercise => exercise.name === name )

    return(
        <div>
            <div>
                <span>Exercise </span>
                <span>{exercise.name}</span>
            </div>
            <div>
                <span>Sets</span>
                <input type="text" value={exercise.sets}/>
            </div>
            <div>
                <span>Reps</span>
                <input type="text" value={exercise.reps}/>
            </div>
            <div>
                <span>Weight</span>
                <input type="text" value={exercise.weight}/>
            </div>
        </div>
    )
}

export default function EditWorkout () {
    const { id } = useParams();
    const [ title, setTitle ] = useState(workoutsData[id].title);
    const [ exercises, setExercises ] = useState(workoutsData[id].exercises);
    
    function handleOnChange(e){
        setTitle(e.target.value);
    }

    return (
        <>
            <h1>Edit Workout</h1>
            <label>
                Title:
                <input type="text" value={title} onChange={handleOnChange}></input>
            </label>
            <ul>
                {exercises.map( (exercise, index) => {
                
                    return (
                        <li key={index}>
                            <Exercise name={exercise}/>
                        </li>
                    )
                })}
                <li>Add exercise <span>+</span></li>
            </ul>
            <Link to="../workouts">Done</Link>
        </>
    )
}