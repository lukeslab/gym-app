import "../styles/routes/edit-workout.css"
import React, { useState, useEffect } from 'react';
import { useLoaderData, Link } from 'react-router-dom';

import WorkoutDetails from '../components/WorkoutDetails';
import ExerciseDeckCardFront from "../components/ExerciseDeckCardFront";

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
    const [ exerciseDeck, setExercisesDeck ] = useState()
    const [ isEditable, setIsEditable ] = useState(false)
    const [ isIntervalsByExercise, setIsIntervalsByExercise ] = useState(false)

    console.log(exercises)

    const exerciseDeckCards = []
    for (const exercise of exercises) {
        exerciseDeckCards.push(<ExerciseDeckCardFront key={exercise.title} exercise={exercise} />)
    }   

    useEffect( () => {
        setExercisesDeck(exerciseDeckCards)
    }, [])

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
                <p className="route-subheader">Rest Interval (seconds): </p>
                <label className={isEditable || "disabled"}>
                    <input disabled={!isEditable} type="checkbox" />
                    Set Interval by Exercise
                </label>
            </div>
            <div className="exercise-deck">
                <p className="route-subheader">Exercise Deck</p>
                <div className="row-container">
                    {exerciseDeck}
                </div>
            </div>
            { isEditable ? 
                <div>
                    <button className="save" onClick={() => saveChanges()}>Save</button>

                    {/* the canel button needs to reset the checkbox to empty. */}
                    <button className="cancel" onClick={() => setIsEditable(false)}>Cancel</button>
                </div> : <button className="edit-button" onClick={() => setIsEditable(true)}>Edit Workout</button>}
            {/* <WorkoutDetails     type="edit" 
                                data={{workout, exercises}} 
                                options={{setExercises}} 
            /> */}

        </div>
    )
}



