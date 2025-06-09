import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUserId } from '../functions';

import WorkoutDetails from '../components/WorkoutDetails';
import ExerciseDeckCard from '../components/ExerciseDeckCard';

export default function CreateWorkout () {
    const navigate = useNavigate()
    const [ exercisesToDisplay, setExercisesToDisplay ] = useState([])
    const [ selectedExercises, setSelectedExercises ] = useState([])
    const [ serverResponse, setServerResponse ] = useState({})
    const [ createButtonIsDisabled, setCreateButtonIsDisabled ] = useState(true)
    const titleRef = useRef('')

    useEffect( () => {
        if (selectedExercises.length === 0) setCreateButtonIsDisabled(true)
        else setCreateButtonIsDisabled(false)
    }, [selectedExercises])

    async function createWorkout(){
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: titleRef.current.value,
                exercises: selectedExercises,
                userId: await getCurrentUserId()
            })
        }    

        const response = await fetch('/workouts', options)
        if (response.ok) navigate('/')
        console.log(response)
    }

    async function getAvailableExercises(){
        let response = await fetch('/exercises')
        response = await response.json();
        console.log(response)
        
        if (response) setExercisesToDisplay([...response])
        else console.log('There was a problem getting avialble exercises')
    }
    
    // console.log("exercise deck is:",exerciseDeck)
    console.log(" Selected exercises are: ", selectedExercises)
    console.log("exercises to display: ", exercisesToDisplay)

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-4xl font-bold text-center mb-6">Create Workout</h1>
            <input ref={titleRef} className="w-full text-2xl font-bold text-center mb-6" placeholder="Enter Name: e.g. Arm Day"></input>
            <div className="mb-4">
                <h3 className="text-lg font-bold">Rest Interval (seconds): 90</h3>
                <label className="flex items-center space-x-2 mb-4">
                    <input type="checkbox" className="form-checkbox" />
                    <span>Set intervals by exercise</span>
                </label>
            </div>
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Exercise Deck</h3>
                <button className="bg-green-500 rounded-full p-2 flex items-center justify-center shadow-lg" onClick={getAvailableExercises}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                    </svg>
                </button>
            </div>
            <div className="flex overflow-x-scroll mb-4">
                {exercisesToDisplay.map( exercise => <ExerciseDeckCard key={exercise.id} exercise={exercise} selectedExercises={selectedExercises} setSelectedExercises={setSelectedExercises} /> )}
            </div>
            {serverResponse?.message && 

            <span className={serverResponse.ok ? "success-message" : "error-message"}>
                {serverResponse.message}
            </span>}

            <button className="bg-green-500 text-white px-6 py-2 rounded disabled:opacity-50" onClick={createWorkout} disabled={createButtonIsDisabled}>Create</button>
            <button className="bg-orange-500 text-white px-6 py-2 rounded" onClick={() => navigate(-1)}>Cancel</button>
        </div>
    )
}
