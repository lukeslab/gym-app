import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { useState } from 'react';
import { getWorkoutById } from '../functions.js'

function Exercise({exercise}){
    return(
        <section>
            <div className="exercise-name">
                <span>{exercise?.title}</span>
            </div>
            <div className="exercise-sets">
                <span>Sets</span>
                <input type="text" defaultValue={exercise?.sets}/>
            </div>
            <div className="exercise-reps">
                <span>Reps</span>
                <input type="text" defaultValue={exercise?.reps}/>
            </div>
            <div className="exercise-weight">
                <span>Weight</span>
                <input type="text" defaultValue={exercise?.weight}/>
            </div>
        </section>
    )
}

function ExerciseList({ exercises }){
    const [ isAddingExercise, setIsAddingExercise ] = useState(false);

    function addExercise(){
        setIsAddingExercise(!isAddingExercise)
    }

    return (
        <section className="exercise-list">
            <h2>Exercises</h2>
            <ul>
                {exercises.map( (exercise, index) => {
                    return (
                        <li key={index } data-id={exercise._id}>
                            <Exercise exercise={exercise}/>
                        </li>
                    )
                })}
                <li className="add-exercise">
                    {isAddingExercise ? <><input></input><button onClick={addExercise}>Add</button></> : <><a onClick={addExercise}>Add Exercise <span>+</span></a></>}
                </li>
            </ul>
        </section>
    )
}

export async function loader({ params }){
    const { id } = params;

    const workout = await fetch(`/workouts/${id}`)
    if (!workout) console.error('Unable to fetch workout')
    else return workout

}

export default function EditWorkout() {
    const { title, exercises } = useLoaderData()
    const [ newTitle, setTitle ] = useState(title);
        
    function handleOnChange(e){
        setTitle(e.target.value);
    }

    return (
        <div className="edit-workout">
            <h1>Edit Workout</h1>
            <label>
                Title:
                <input type="text" value={title} onChange={handleOnChange}></input>
            </label>
            <ExerciseList exercises={exercises}/>
            <Link to="../">Cancel</Link>
            <Link to="../">Save</Link>
        </div>
    )
}