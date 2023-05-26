import React from 'react';
import {
    useNavigate, 
    useLoaderData,
} from 'react-router-dom';
import { setCurrentSession } from '../functions'

export function loader({request}) {
    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams)
    console.log('from overwrite loader:', params)
    return params
}

export default function OverwriteAlert(){
    const navigate = useNavigate()
    const params = useLoaderData()
    
    function overwriteCurrentSession(){
        setCurrentSession(params)
        navigate('../current_session')
        // reset the clock to 00:00:00 and pause it. Do this on this file or in current-session??    
    }

    function returnToWorkouts(){
        navigate(-1);
    }

    return (
        <section className="overwrite-alert">
            <h2>Session is already active.</h2> 
            <p>Would you like to start a new one?</p>
            <div>
                <button onClick={overwriteCurrentSession}>Yes</button>
                <button onClick={returnToWorkouts}>No</button> 
            </div>
        </section> 
    )
}