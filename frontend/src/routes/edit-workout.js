import React, { useEffect, useState } from 'react';
import { useLoaderData, useFetcher, Link } from 'react-router-dom';
import { ExerciseList as AllExercises } from './exercises';

export async function loader({ params }){
    const { id } = params;
    // Think about using local storage. Fetch from db if localstorage is not set for workout details. If is set, then pull from it. This way we can update it with added workouts. Save button should then update it on the db. 
    const response = await fetch(`/workouts/${id}`)
    const workout = await response.json()

    // console.log('workout', workout)
    if (!workout) console.error('Unable to fetch workout')
    else return {id, workout}
}

export default function EditWorkout() {
    async function saveChanges(e) {
        const options = {
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                id: id,
                updatedExercises: exercisesToList
            })
        }
        const response = await fetch('/workouts', options)
        const message = await response.json()
        console.log(message)
    }

    const {id, workout: { title, exercises }} = useLoaderData()
    const [ exercisesToList, setExercisesToList ] = useState([ ...exercises ])
    
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
            <ExerciseList
                exercisesToList={exercisesToList}
                setExercisesToList={setExercisesToList}
            />
            <Link to="../">Cancel</Link>
            <Link to="../" onClick={saveChanges}>Save</Link>
        </div>
    )
}

function ExerciseList({exercisesToList, setExercisesToList}){
    function addExercise(){
        setIsAddingExercise(!isAddingExercise)
    }
    
    const {id: workoutId} = useLoaderData()

    const [ isAddingExercise, setIsAddingExercise ] = useState(false);
    
    const fetcher = useFetcher()
    let addExerciseList = [];

    //dont show exercises in the add list if they are already in the workout.
    if(fetcher?.data?.exercises){
        addExerciseList = fetcher.data.exercises.filter( ({id: id1}) => {
            return !exercisesToList.some(({_id: id2}) => id2 === id1)
        })
    }

    useEffect(() => {
        if (fetcher.state === "idle" && !fetcher.data) {
            fetcher.load("/exercises")
        }
    }, [fetcher])

    return (
        <section className="exercise-list">
            <h2>Exercises</h2>
            <ul>
                {exercisesToList.map( (exercise, index) => {
                    return (
                        <li key={index} data-id={exercise._id}>
                            <Exercise exercise={exercise}/>
                        </li>
                    )
                })}
                <li className="add-exercise">
                    {isAddingExercise ? 
                    <AllExercises 
                        exercisesData={addExerciseList} 
                        workoutId={workoutId}
                        exercisesToList={exercisesToList}
                        setExercisesToList={setExercisesToList}    
                    /> : <a onClick={addExercise}>Add Exercise <span>+</span></a>}
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