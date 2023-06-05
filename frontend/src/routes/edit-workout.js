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
    const [ exercisesToList, setExercisesToList ] = useState([ ...exercises ])
    
    const [ newTitle, setTitle ] = useState(title);

    function handleOnChange(e){
        setTitle(e.target.value);
    }

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

    return (
        <div className="edit-workout">
            <h1>Edit Workout</h1>
            <label>
                Title:
                <input type="text" value={title} onChange={handleOnChange}></input>
            </label>
            <WorkoutDetails     type="edit" 
                                data={{workout, exercisesToList}} 
                                options={{setExercisesToList, setTitle}} 
            />
            <Link to="../">Cancel</Link>
            <Link to="../" onClick={saveChanges}>Save</Link>
        </div>
    )
}



