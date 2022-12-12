import React, {useState, useEffect, useRef} from 'react';
import {
    Link,
    useLoaderData,
    Form,
    redirect,
} from 'react-router-dom';
import workoutsData from '../data/workouts';
import { getCurrentSession, setCurrentSession } from '../functions'

function Workout({id, title}){

    return (
        <>
            <span>{title}</span>
            <div style={{marginLeft: '20px'}}>
                <Form
                    action="/" 
                    method="post" 
                    style={{display: 'inline'}}
                >
                    <input 
                        type="hidden"
                        name="title"
                        defaultValue={encodeURIComponent(title)}
                    />
                    <input 
                        type="hidden"
                        name="id"
                        defaultValue={id}
                    />
                    <button 
                        type="submit" 
                        style={{
                            marginLeft: '20px',
                            backgroundColor: 'white',
                            border: 'none',
                            cursor: 'pointer'
                    }}>
                        Start
                    </button>
                </Form>
                <button style={{
                    marginLeft: '20px',
                    backgroundColor: 'white',
                    border: 'none',
                    cursor: 'pointer',
                }}>
                    <Link style={{textDecoration: 'none'}}to={`./edit-workout/${id}`}>Edit</Link>
                </button>
            </div>
        </>
    )
}

function WorkoutList({currentSession}){
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
                My Workouts
            </h1>
            <ul style={{ marginTop: '50px', padding: 0}}>
                {workoutsData.map((workout, index) => {
                    return(
                        <li style={{
                            border: '1px solid black',
                            padding: '10px 30px',
                            marginTop: '10px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }} key={index}>
                            <Workout 
                                id={index} 
                                title={workout.title} 
                                currentSession={currentSession} 
                             />
                        </li>
                    )
                })}
                <li style={{
                    border: '1px solid black',
                    padding: '10px 30px',
                    marginTop: '10px',
                    backgroundColor: 'limegreen',
                    textAlign: 'center'
                }}>
                    <Link style={{textDecoration:'none', color: 'black'}}to="./create">
                        new workout 
                        <span style={{marginLeft: '10px', padding: '5px 10px', borderRadius: '50px', border: '1px solid black'}}>+</span>
                    </Link>
                </li>
            </ul>
        </section>
    )
}

export async function action({request}){
    const formData = await request.formData();
    const {title, id} = getCurrentSession();

    const newSession = Object.fromEntries(formData)
    const {title:newTitle, id:newId} = newSession
    
    console.log('fired from workouts action:', newSession)
    if (title) {
        // prompt overwrite confirmation screen.
        console.log('overwrite')
        return redirect(`/overwrite-session?title=${newTitle}&id=${newId}`)
    } else {
        // set current session to selected workout
        setCurrentSession(Object.fromEntries(formData))
        return redirect('/current_session')
    }

}

export async function loader(){
    const currentSession = getCurrentSession();
    console.log('From workouts loader: ', currentSession)
    return currentSession;
}

export default function Workouts() {
    const currentSession = useLoaderData();

    // stop timer from displaying on this view, but continue the count.
    
    useEffect(() => {
        const toDisplay = document.querySelector('.timer')
        if (toDisplay) toDisplay.style.display = 'none';
    }, [])
    
   

    return <WorkoutList currentSession={currentSession} />
    
}