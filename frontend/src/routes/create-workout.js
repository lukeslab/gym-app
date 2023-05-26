import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUserId } from '../functions';

export default function CreateWorkout () {
    const title = useRef()
    const [ serverResponse, setServerResponse ] = useState({})
    const [ exercises, setExercises ] = useState([])
    const [ isAddingExercise, setIsAddingExercise ] = useState(false);
    const [ createButtonIsDisabled, setCreateButtonIsDisabled ] = useState(true)

    function showTextInput(){
        setIsAddingExercise(!isAddingExercise)
    }

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
                title: title.current.value,
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
            {
            serverResponse?.message && 
                <span className={serverResponse.ok ? "success-message" : "error-message"}>
                    {serverResponse.message}
                </span>
            }
            <h1>Create Workout</h1>
            <label>
                Title:
                <input className="title" type="text" ref={title}></input>
            </label>
            <ul className="exercises">
                {exercises && exercises.map((exercise, index) => {
                    return (
                        <li key={index}>{exercise}</li>
                    )
                })}
                 <li className="add-exercise">
                    {isAddingExercise ? <><input></input><button onClick={addExercise}>Done</button></> : <span onClick={showTextInput}>Add exercise <span>+</span></span>}
                </li>
            </ul>
            <button 
                onClick={createWorkout}
                disabled={createButtonIsDisabled}
            >Create
            </button>
            <Link to="/">
                <button>Cancel</button>
            </Link>
        </div>
    )
}
