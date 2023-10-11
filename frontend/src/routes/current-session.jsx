import { getCurrentSession } from '../functions';
import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

import NoSessionMessage from '../components/NoSessionMessage';
import SetCardList from '../components/SetCardList';

export async function loader(){
    const currentSession = getCurrentSession();
    const { workout: { id }} = currentSession

    const response = await fetch(`/workouts/${id}`)
    const workout = await response.json()
    
    return [ currentSession, workout ];
}

export default function CurrentSession() {    
   
    const [ currentSession, workout ] = useLoaderData();
    const { title, exercises } = workout
    const setCardsData = []

    if (isANewSession()) initNewSession(exercises)
    else {
        setCardsData.push(...currentSession.workout.setCardsData)
    }

    useEffect( () => {
        currentSession.workout.setCardsData = setCardsData
        
        localStorage.setItem('currentSession', JSON.stringify(currentSession))
        
    }, [])

    const data = {
        setCardsData,
        currentSession
    }
    return (
        <section className="app-component current-session container">
            {title ? <SetCardList data={data} /> : <NoSessionMessage />}
        </section>
    )

    function isANewSession(){
        
        return !currentSession.workout?.setCardsData
    }

    function initNewSession(exercises){
        console.log('New Session created')
        generateSetCards()

        function generateSetCards(){
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
        }
    }
}