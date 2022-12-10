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

export function action() {

}

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
        navigate('../session')
        // reset the clock to 00:00:00 and pause it. Do this on this file or in current-session??
        
    }

    function returnToWorkouts(){
        navigate(-1);
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