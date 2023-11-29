import React from "react"
import { Form, Link } from "react-router-dom"

// This is a menu card, fix it
export function MainCard({ type, data, options }){
    const { currentSession, setWorkoutSessionStarted } = options

    async function addExerciseToWorkout(e){
        console.log('addExerciseToWorkout event: ', e)
        const exerciseId = e.target.getAttribute('data-id')
        const response = await fetch(`/exercises/${exerciseId}`)
        const exercise = await response.json()
        console.log('Excercise to add: ', exercise)

        options.setExercises([
            ...options.workout.exercises,
            exercise
        ])
    }

    function startWorkout() {
        
        setWorkoutSessionStarted(true)

    }

    return (
        <li className="flex justify-between items-center bg-white p-4 border border-gray-200">
            <span>{data.listItem.title}</span>
            <div>
                {type === 'workout' && <button onClick={startWorkout} className="bg-blue-500 text-white px-4 py-2 mr-2">Start</button>}
                <Link to={`/edit-${type}/${data.listItem.id}`}> 
                    <button className="bg-green-500 text-white px-4 py-2"> View </button>
                </Link>
            </div>
        </li>
    )
}

export default MainCard