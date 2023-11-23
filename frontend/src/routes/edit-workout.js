import "../styles/routes/edit-workout.css"
import React, { useState } from 'react';
import { useLoaderData, Link } from 'react-router-dom';

import WorkoutDetails from '../components/WorkoutDetails';

export async function loader({ params }){
    const { id } = params;
    // Think about using local storage. Fetch from db if localstorage is not set for workout details. If is set, then pull from it. This way we can update it with added workouts. Save button should then update it on the db. 
    const response = await fetch(`/workouts/${id}`)
    const workout = await response.json()

    // console.log('workout', workout)
    if (!workout) console.error('Unable to fetch workout')
    else return { id, workout }
}

export default function EditWorkout() {
    const { id, workout } = useLoaderData()
    const { title, exercises } = workout
    console.log(workout)
    const [ exerciseDeck, setExercisesDeck ] = useState(exercises)
    const [ isEditable, setIsEditable ] = useState(false)
    const [ isIntervalsByExercise, setIsIntervalsByExercise ] = useState(false)

    async function saveChanges(e) {
        const options = {
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                id: id,
                updatedExercises: exercises
            })
        }
        const response = await fetch('/workouts', options)
        const message = await response.json()
        console.log(message)
        setIsEditable(false)
    }

    return (
        <div className="view-container edit-workout">
            <div className="header">
                <p>My Workouts</p>
                <h1>{title}</h1>
            </div>
            <div className="rest-interval">
                <p>Rest Interval (seconds): </p>
                <label class={isEditable || "disabled"}>
                    <input disabled={!isEditable} type="checkbox" />
                    Set Interval by Exercise
                </label>
            </div>
            <div classname="exercise-deck">

            </div>
            { isEditable ? 
                <div>
                    <button class="save" onClick={() => saveChanges()}>Save</button>

                    {/* the canel button needs to reset the checkbox to empty. */}
                    <button class="cancel" onClick={() => setIsEditable(false)}>Cancel</button>
                </div> : <button onClick={() => setIsEditable(true)}>Edit Exercise</button>}
            {/* <WorkoutDetails     type="edit" 
                                data={{workout, exercises}} 
                                options={{setExercises}} 
            /> */}

        </div>
    )
}



