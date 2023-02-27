import React, { useEffect, useState } from 'react';
import { useLoaderData, useFetcher, useLocation, Link } from 'react-router-dom';
import {ExerciseList as AllExercises} from './exercises';

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

function ExerciseList({ exercises }){
    const [ isAddingExercise, setIsAddingExercise ] = useState(false);
    const fetcher = useFetcher()
    
    useEffect(() => {
        if (fetcher.state === "idle" && !fetcher.data) {
            fetcher.load("/exercises")
        }
    }, [fetcher])

    let allExercises, currentSession
    if (fetcher.data) {
        // Deconstruction must happen after the useEffect, when fetcher.data is true.
        [ allExercises, currentSession ] = fetcher.data;
    }
    console.log('All exercises:', allExercises)
    
    function addExercise(){
        setIsAddingExercise(!isAddingExercise)
    }

    return (
        <section className="exercise-list">
            <h2>Exercises</h2>
            <ul>
                {exercises.map( (exercise, index) => {
                    return (
                        <li key={index} data-id={exercise._id}>
                            <Exercise exercise={exercise}/>
                        </li>
                    )
                })}
                <li className="add-exercise">
                    {isAddingExercise ? <AllExercises exercisesData={allExercises} /> : <a onClick={addExercise}>Add Exercise <span>+</span></a>}
                </li>
            </ul>
        </section>
    )
}

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