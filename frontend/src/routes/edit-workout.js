import React, { useEffect, useState } from 'react';
import { redirect, useLoaderData, useFetcher, useActionData, Link } from 'react-router-dom';
import { ExerciseList as AllExercises } from './exercises';

export async function action({ request }){
    console.log('firing edit workouta ction')
    const { exerciseId, workoutId } = Object.fromEntries(await request.formData())

    const response = await fetch(`/exercises/${exerciseId}`)
    const addedExercise = await response.json()
    console.log('From edit workout action', addedExercise)
    // redirect(`/edit-workout/${workoutId}`)
    return addedExercise;
}

export async function loader({ params }){
    const { id } = params;
    // I think we need to use local storage. Fetch from db if localstorage is not set for workout details. If is set, then pull from it. This way we can update it with added workouts. Save button should then update it on the db. 
    const response = await fetch(`/workouts/${id}`)
    const workout = await response.json()

    // console.log('workout', workout)
    if (!workout) console.error('Unable to fetch workout')
    else return {id, workout}
}

export default function EditWorkout() {
    const workoutData = {
        loader: useLoaderData(),
        action: useActionData()
    }
    
    const {id, workout: { title, exercises }} = workoutData.loader

    let exercisesToList = [ ...exercises ]
    
    const addedExercise = workoutData?.action;
    if ( addedExercise ) {    
        console.log('addedExercise', addedExercise)
        exercisesToList.push(addedExercise)
    }

    console.log('Exercises to list', exercisesToList)

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
            <ExerciseList exercises={exercisesToList} workoutId={id}/>
            <Link to="../">Cancel</Link>
            <Link to="../">Save</Link>
        </div>
    )
}

function ExerciseList({ exercises, workoutId }){
    const [ isAddingExercise, setIsAddingExercise ] = useState(false);
    const fetcher = useFetcher()
    
    console.log('in exerclist list', exercises)
    useEffect(() => {
        if (fetcher.state === "idle" && !fetcher.data) {
            fetcher.load("/exercises")
        }
    }, [fetcher])

    // let fetcherData;
    // if (fetcher.data) {
    //     fetcherData = fetcher.data;
    // }
    // console.log('All exercises:', allExercises)
    
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
                    {isAddingExercise ? <AllExercises exercisesData={fetcher?.data?.exercises} workoutId={workoutId} /> : <a onClick={addExercise}>Add Exercise <span>+</span></a>}
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