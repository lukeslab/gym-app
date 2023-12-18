import React, { useState, useEffect, useRef } from 'react';
import { useLoaderData, Link } from 'react-router-dom';

import ExerciseDeckCard from '../components/ExerciseDeckCard'
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
        exerciseDeckCards.push(<ExerciseDeckCard key={exercise.title} exercise={exercise} isEditable={isEditable} />)
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
            <p className="text-2xl font-bold text-center mb-4">My Workouts</p>
            <h1 className="text-4xl font-bold text-center mb-6">Arm Day</h1>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                    Rest Interval (seconds): 90
                </label>
                <label className="flex items-center space-x-2 mb-4">
                    <input ref={checkboxElem} type="checkbox" disabled={!isEditable} className="form-checkbox" />
                    <span className={!isEditable && "opacity-50"}>Set intervals by exercise</span>
                </label>
            </div>
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Exercise Deck</h3>
                {isEditable && <button class="bg-green-500 rounded-full p-2 flex items-center justify-center shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                </button>}
            </div>
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



