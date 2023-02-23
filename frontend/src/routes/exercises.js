import React, {useEffect} from 'react';
import {
    Link,
    useLoaderData,
} from 'react-router-dom';
import { getCurrentSession, getAllExercises } from '../functions'

export async function loader(){
    const currentSession = getCurrentSession()
    const exercises = await getAllExercises()
    
    const loaderData = [exercises, currentSession]
    console.log(loaderData)

    return loaderData;
}

export default function Exercises() {
    const [exercises, currentSession] = useLoaderData();

    // stop timer from displaying on this view, but continue the count.
    useEffect(() => {
        const toDisplay = document.querySelector('.timer')
        if (toDisplay) toDisplay.style.display = 'none';
    }, [])
    
    return <ExerciseList currentSession={currentSession} exercisesData={exercises}/>   
}

function ExerciseList({exercisesData}){
    
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
                                id={exercise.id} 
                                title={exercise.title}
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
        </section>
    )
}

function Exercise({id, title}){

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
                    <Link style={{textDecoration: 'none'}}to={`./edit-exercise/${id}`}>Edit</Link>
                </button>
            </div>
        </>
    )
}