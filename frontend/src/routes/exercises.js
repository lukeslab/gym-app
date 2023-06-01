import React, { useEffect } from 'react'
import { Link, useLoaderData, useLocation } from 'react-router-dom'
import { getCurrentSession, getAllExercises } from '../functions'

import MainCardList from '../components/MainCardList'

export async function loader(){
    const loaderData = {
        currentSession: getCurrentSession(),
        exercises: await getAllExercises() 
    }
    console.log('exercises.js loader: ', loaderData)
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
        <section className="list-container my-exercises">
            <h1> My Exercises </h1>
            <MainCardList   type="exercise"
                            data={exercises}
                            options={{}}
            />   
        </section>
    )
}