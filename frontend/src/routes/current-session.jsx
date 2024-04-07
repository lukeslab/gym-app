import { getCurrentSession } from '../functions';
import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

import NoSessionMessage from '../components/NoSessionMessage';
import SetCardList from '../components/SetCardList';

export async function loader(){
    const currentSession = await getCurrentSession();
    // Null or { workout: { id }}

    if (currentSession) {
        const { workout: { id }} = currentSession
        console.log('fetching workout')
        const response = await fetch(`/workouts/${id}`)
        const workout = await response.json()
        console.log('got workout', workout)
        return [ currentSession, workout ]
    } else {
        console.log('no workout')
        return [ null, null ];
    }
}

export default function CurrentSession() {    

    const [ currentSession, workout ] = useLoaderData();
    const setCardsData = currentSession?.workout.setCardsData || []

    // If there is a current session and that session is just started
    if (currentSession?.status === "started") generateSetCards(workout)

    console.log('current session is:', currentSession)
    console.log('setCardsData is', setCardsData)
    
    useEffect( () => {
        if (currentSession) {
            if (currentSession.status === "started") currentSession.status = "in progress"
            currentSession.workout.setCardsData = setCardsData
            localStorage.setItem('currentSession', JSON.stringify(currentSession))
        }
    }, [])

    const data = {
        setCardsData,
        currentSession
    }

    return (
        <section className="flex justify-center m-10">
            {currentSession ? <SetCardList data={data} /> : <NoSessionMessage />}
        </section>
    )

    function generateSetCards(workout){
        if (workout === null) return
        const { exercises } = workout

        exercises.forEach( (exercise, i, arr) => {
            for (let j = 1; j <= exercise.target.sets; j++) {
                setCardsData.push({
                    type:"exercise",
                    id: exercise._id,
                    title: exercise.title,
                    setNumber: j,
                    target: exercise.target,
                    actual: null,
                    isComplete: false
                })
                if (i !== arr.length && j !== exercise.target.sets) setCardsData.push({
                    type: "rest",
                    title: "Rest",
                    target: exercise.restInterval,
                    actual: null,
                    isComplete: false
                })
                else setCardsData.push({
                    type: "last",
                    isComplete: false
                })
            }
        })
    }
}