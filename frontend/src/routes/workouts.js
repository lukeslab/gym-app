import React, {useEffect} from 'react';
import { useLoaderData, redirect } from 'react-router-dom';
import { getCurrentSession, setCurrentSession, getUserWorkouts } from '../functions'

import MainCardList from '../components/MainCardList';

export async function action({request}){
    const formData = await request.formData();
    const { title } = getCurrentSession();

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
    const currentSession = getCurrentSession()
    const workouts = await getUserWorkouts();
    
    // why is workouts a promise if a.) it is put into an array, and b.) workouts is not awaited?
    const loaderData = [workouts, currentSession]
    console.log("routes/workouts.js Loader data: ", loaderData)

    return loaderData;
}

export default function Workouts() {
    const [workouts, currentSession] = useLoaderData();

    // stop timer from displaying on this view, but continue the count.
    useEffect(() => {
        const toDisplay = document.querySelector('.timer')
        if (toDisplay) toDisplay.style.display = 'none';
    }, [])
    
    return (
        <section className="list-container my-workouts">
            <h1> My Workouts </h1>
            <MainCardList   type="workout" 
                            data={workouts}
                            options={currentSession} 
            />  
        </section>
    )
}