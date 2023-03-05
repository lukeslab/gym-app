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
        <section className="" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '50px'
        }}>
            <h1 style={{
                fontSize: '30px', 
                textTransform: 'uppercase', 
                fontFamily:'sans-serif'
            }}>
                My Exercises
            </h1>
            <ExerciseList exercisesData={exercises}/>   
        </section>
    )
}

export function ExerciseList({exercisesData, workoutId, exercisesToList, setExercisesToList}){

    // manipulate the exercisesData here to exclude those already showing in edit workout, but should show all when on the /exercises route
    
    return (
        <>
            <ul style={{ marginTop: '50px', padding: 0}}>
                {exercisesData.length ? exercisesData.map((exercise, index) => {
                    return(
                        <li style={{
                            border: '1px solid black',
                            padding: '10px 30px',
                            marginTop: '10px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }} key={index}>
                            <Exercise 
                                exerciseId={exercise.id} 
                                title={exercise.title}
                                workoutId={workoutId}
                                exercisesToList={exercisesToList}
                                setExercisesToList={setExercisesToList}
                                />
                        </li>
                    )
                }): <p>You have no exercises! Add some!</p>}
                <li style={{
                    border: '1px solid black',
                    padding: '10px 30px',
                    marginTop: '10px',
                    backgroundColor: 'limegreen',
                    textAlign: 'center'
                }}>
                    <Link style={{textDecoration:'none', color: 'black'}}to="./create-exercise">
                        new exercise 
                        <span style={{marginLeft: '10px', padding: '2px 5px', borderRadius: '50px', border: '1px solid black'}}>+</span>
                    </Link>
                </li>
            </ul>
        </>
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
           // fuckin A
        ])
    }

    return (
        <>
            <span>{title}</span>
            <div style={{marginLeft: '20px'}}>
                <button style={{
                    marginLeft: '20px',
                    backgroundColor: 'white',
                    border: 'none',
                    cursor: 'pointer',
                }}>
                    <Link style={{textDecoration: 'none'}}to={`/exercises/edit-exercise/${exerciseId}`}>Edit</Link>
                </button>
                {
                    location.pathname.includes('/edit-workout/') && 
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