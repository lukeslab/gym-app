import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUserId } from '../functions';

import WorkoutDetails from '../components/WorkoutDetails';

export default function CreateWorkout () {
    const titleInputElem = useRef()
    
    const [ serverResponse, setServerResponse ] = useState({})
    const [ exercises, setExercises ] = useState([])
    const [ createButtonIsDisabled, setCreateButtonIsDisabled ] = useState(true)


    function addExercise(){
        if (createButtonIsDisabled) {
            setCreateButtonIsDisabled(false)
        }
        const inputField = document.querySelector('.add-exercise input')
        const exercise = inputField.value

        setExercises([...exercises, exercise])

        inputField.value = ''
    }

    async function createWorkout(){
        if (!exercises || !exercises.length) throw new Error("Exercise list is empty")

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: titleInputElem.current.value,
                exercises,
                userId: await getCurrentUserId()
            })
        }

        let response = await fetch('/workouts', options)
        response = await response.json();
        
        if(response.ok) {
            setServerResponse({
                ok: true,
                message: response.message
            })
        } else {
            setServerResponse({
                ok: false,
                message: response.message
            })
        }
    }

    return (
        <div className="create-workout">
            <h1>Create Workout</h1>
            {serverResponse?.message && 

            <span className={serverResponse.ok ? "success-message" : "error-message"}>
                {serverResponse.message}
            </span>}
            
            <WorkoutDetails     type="create" 
                                data={{exercises}} 
                                options={{setExercises, titleInputElem}} 
            />

            <button onClick={createWorkout} disabled={createButtonIsDisabled}>Create</button>
            <Link to="/">
                <button>Cancel</button>
            </Link>
        </div>
    )
}
