import React, {useEffect} from 'react';
import {
    Link,
    useLoaderData,
    useLocation,
    Form
} from 'react-router-dom';
import { getCurrentSession, getAllExercises } from '../functions'

export async function loader(){
    const loaderData = {
        currentSession: getCurrentSession(),
        exercises: await getAllExercises() 
    }

    return loaderData;
}

export default function Exercises() {
    const {currentSession, exercises} = useLoaderData();
    
    // stop timer from displaying on this view, but continue the count.
    useEffect(() => {
        const toDisplay = document.querySelector('.timer')
        if (toDisplay) toDisplay.style.display = 'none';
    }, [])
    
    return (
        <section className="my-exercises">
            <h1> My Exercises </h1>
            <ExerciseList exercisesData={exercises}/>   
        </section>
    )
}

export function ExerciseList({exercisesData, workoutId, exercisesToList, setExercisesToList}){

    // manipulate the exercisesData here to exclude those already showing in edit workout, but should show all when on the /exercises route
    
    return (
        <ul className="exercise-list">
            {exercisesData.length ? 
            
            exercisesData.map((exercise, index) => {
                return(
                    <li className={`exercise ${exercise}`}>
                        <Exercise   exerciseId={exercise.id} 
                                    title={exercise.title}
                                    workoutId={workoutId}
                                    exercisesToList={exercisesToList}
                                    setExercisesToList={setExercisesToList}
                        />
                    </li>
                )
            }) : <p className="no-exercises"> You have no exercises! Add some!</p>}
            <li className="create-exercise">
                <Link to="./create-exercise">
                    new exercise 
                    <span> + </span>
                </Link>
            </li>
        </ul>
    )
}

function Exercise({exerciseId, title, workoutId, exercisesToList, setExercisesToList}){
    //We need to pass location to AllExercises component in order to determine certain options, such as 'add to workout button'.
    const location = useLocation();
    console.log('In Exercise component:', workoutId)

    async function addExerciseToExercisesToList(e){
        const exerciseId = e.target.getAttribute('data-id')
        
        const response = await fetch(`/exercises/${exerciseId}`)
        const exercise = await response.json()

        setExercisesToList([
            ...exercisesToList,
            exercise
        ])
    }

    return (
        <>
            <span>{title}</span>
            <div>
                <button>
                    <Link>Edit</Link>
                </button>
                {location.pathname.includes('/edit-workout/') && 
                    // <Form method="post" action={`/edit-workout/${workoutId}`}>
                <>
                    <button data-id={exerciseId} onClick={addExerciseToExercisesToList}>Add</button>
                    {/* <input type="hidden" name="exerciseId" value={exerciseId} />
                    <input type="hidden" name="workoutId" value={workoutId} /> */}
                </>
                // </Form>
                }
            </div>
        </>
    )
}