import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

import NoSessionMessage from '../components/NoSessionMessage';
import SetCardList from '../components/SetCardList';

export async function loader(){
    const currentSession = JSON.parse(localStorage.getItem('currentSession'));
    const { workout: { id }} = currentSession

    const response = await fetch(`/workouts/${id}`)
    const workout = await response.json()
    
    return [ currentSession, workout ];
}

export default function CurrentSession() {    
    const [ currentSession, workout ] = useLoaderData();
    const { title, exercises } = workout
    const setCardsData = []

    exercises.forEach( (exercise) => {
        for (let i = 1; i <= exercise.target.sets; i++) {
            setCardsData.push({
                type:"exercise",
                title: exercise.title,
                setNumber: i,
                target: exercise.target,
                actual: null,
            })
            setCardsData.push({
                type: "rest",
                title: "Rest",
                target: exercise.restInterval,
                actual: null,
            })
        }
    })

    const data = {
        setCardsData,
        currentSession
    }

    useEffect( () => {
        currentSession.workout.setCardsData = setCardsData
        
        localStorage.setItem('currentSession', JSON.stringify(currentSession))

    }, [])

    // Maybe set the current session in localStorage here, then pass the session's setList into the setCardList component.

    return (
        <section className="app-component current-session container">
            {title ? <SetCardList data={data} /> : <NoSessionMessage />}
        </section>
    )
}