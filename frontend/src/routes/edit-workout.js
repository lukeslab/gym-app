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
    const { title } = workout
    console.log(workout)
    const [ exercises, setExercises ] = useState(workout.exercises)
    
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
                updatedExercises: exercises
            })
        }
        const response = await fetch('/workouts', options)
        const message = await response.json()
        console.log(message)
    }

    return (
        <div className="edit-workout">
            <h1>Edit Workout</h1>
            <WorkoutDetails     type="edit" 
                                data={{workout, exercises}} 
                                options={{setExercises, setTitle}} 
            />
            <Link to="../">Cancel</Link>
            <Link to="../" onClick={saveChanges}>Save</Link>
        </div>
    )
}



