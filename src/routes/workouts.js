import React, {useState, useEffect, useRef} from 'react';
import {
    useNavigate, 
    Link,
    useLoaderData,
    Form,
    redirect,
} from 'react-router-dom';
import workoutsData from '../data/workouts';
import { getCurrentSession, setCurrentSession } from '../functions'

function Workout({id, title, setCurrentSession, currentSession, setAttemptedOverwrite}){
    const navigate = useNavigate();

    function onStart(){
        console.log(currentSession)
        if (currentSession?.title) setAttemptedOverwrite({id, title})
        else {
            localStorage.setItem('currentSession', JSON.stringify({title, id}))
            navigate('../session')
        }
    }

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
                        defaultValue={title}
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

function WorkoutList({currentSession, setCurrentSession, setAttemptedOverwrite}){
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
                                setCurrentSession={setCurrentSession} 
                                setAttemptedOverwrite={setAttemptedOverwrite}
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

function OverwriteAlert({setCurrentSession, setAttemptedOverwrite, attemptedOverwrite}){
    const navigate = useNavigate()

    function overwriteCurrentSession(){
        setCurrentSession(attemptedOverwrite)
        navigate('../session')
        // reset the clock to 00:00:00 and pause it. Do this on this file or in current-session??
        
    }

    function returnToWorkouts(){
        setAttemptedOverwrite(null)
    }

    return (
        <section className="overwrite-alert" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <h2 style={{fontSize: '30px', width: '90%', textAlign: 'center'}}>Session is already active.</h2> 
            <p style={{fontSize: '25px', marginTop: '20px'}}>Would you like to start a new one?</p>
            <div style={{
                marginTop: '40px',
                width: '300px',
                display: 'flex',
                justifyContent: 'space-around'
            }}>
                <button style={{
                    fontSize: '20px', 
                    backgroundColor: 'limegreen', 
                    border: 'none', 
                    padding: '10px 20px',
                    cursor: "pointer"
                }} onClick={overwriteCurrentSession}>Yes</button>
                <button style={{
                    fontSize: '20px', 
                    backgroundColor: 'red', 
                    border: 'none', 
                    padding: '10px 20px',
                    cursor: 'pointer'
                }} onClick={returnToWorkouts}>No</button> 
            </div>
        </section> 
    )
}

export async function action({request}){
    const formData = await request.formData();
    const currentSession = getCurrentSession();
    
    if (currentSession.title) {
        // prompt overwrite confirmation screen.
    } else {
        // set current session to selected workout
        setCurrentSession(Object.fromEntries(formData))
        return redirect('/session')
    }
    
    console.log('from workouts action: ', currentSession, formData)
    
}

export async function loader(){
    const currentSession = getCurrentSession();
    console.log('From workouts loader: ', currentSession)
    return currentSession;
}

export default function Workouts({setCurrentSession}) {
    const currentSession = useLoaderData();
    const [ attemptedOverwrite, setAttemptedOverwrite ] = useState(null)
    // stop timer from displaying on this view, but continue the count.
    
    useEffect(() => {
        const toDisplay = document.querySelector('.timer')
        if (toDisplay) toDisplay.style.display = 'none';
    }, [])
    
    const commonProps = {
        setCurrentSession,
        setAttemptedOverwrite,
    }

    return (
        <>
            {attemptedOverwrite ?
                <OverwriteAlert {...commonProps} attemptedOverwrite={attemptedOverwrite}/> :
                <WorkoutList {...commonProps} currentSession={currentSession} />
            }
        </>    
    )
}