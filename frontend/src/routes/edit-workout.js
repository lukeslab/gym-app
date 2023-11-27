import React, { useState, useEffect, useRef } from 'react';
import { useLoaderData, Link } from 'react-router-dom';

import ExerciseDeckCardFront from '../components/ExerciseDeckCardFront';
import WorkoutDetails from '../components/WorkoutDetails';

export async function loader({ params }) {
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
    const checkboxElem = useRef()
    const [ exerciseDeck, setExercisesDeck ] = useState()
    const [ isEditable, setIsEditable ] = useState(false)
    const [ isIntervalsByExercise, setIsIntervalsByExercise ] = useState(false)

    console.log(exercises)

    const exerciseDeckCards = []
    for (const exercise of exercises) {
        exerciseDeckCards.push(<ExerciseDeckCardFront key={exercise.title} exercise={exercise} isEditable={isEditable} />)
    }   

    useEffect( () => {
        setExercisesDeck(exerciseDeckCards)
    }, [isEditable])

    function cancelChanges(){
        setIsEditable(false)
        checkboxElem.current.checked = false
    }

    async function saveChanges(e) {
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
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
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">My Workouts</h1>
            <h2 className="text-xl font-semibold mb-4">Arm Day</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                    Rest Interval (seconds): 90
                </label>
                <label className="flex items-center space-x-2 mb-4">
                    <input ref={checkboxElem} type="checkbox" disabled={!isEditable} className="form-checkbox" />
                    <span className={!isEditable && "opacity-50"}>Set intervals by exercise</span>
                </label>
            </div>
            <h3 className="text-lg font-bold mb-4">Exercise Deck</h3>
            <div className="flex overflow-x-scroll mb-4">
                {exerciseDeck}
            </div>
            { isEditable ? 
            <div>
                <button className="bg-green-500 text-white px-6 py-2 rounded" onClick={saveChanges}>Save</button>
                <button className="bg-red-500 text-white px-6 py-2 rounded"onClick={cancelChanges}>Cancel</button>
            </div> : <button className="bg-orange-500 text-white px-6 py-2 rounded" onClick={() => setIsEditable(true)}>Edit Workout</button>}
        </div>
    )
}



