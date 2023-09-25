import React, { useState, useRef } from 'react'
import SetCard from './SetCard'
import { useEffect } from 'react'

function SetCardList({ exercises }){
    const [ activeSetCardIndex, setActiveSetCardIndex ] = useState(0)
    
    let setCardsToDisplay = []
    let setCardsData = []

    function changeActiveSetCardIndex() {
        if (activeSetCardIndex < setCardsToDisplay.length) setActiveSetCardIndex(activeSetCardIndex+1)
        // else user should see the complete screen?
    }

    // Iterate through the exercise list
    exercises.forEach( (exercise) => {
        for (let i=1; i <= exercise.target.sets; i++) {
            
            const data = {
                exercise,
                i,
                activeSetCardIndex
            }

            const options =  {
                "changeActiveSetCardIndex": changeActiveSetCardIndex
            }

            setCardsToDisplay.push(<SetCard key={`exercise-${exercise.title}-set-${i}`} type="exercise" data={data} options={options} />)
            setCardsToDisplay.push(<SetCard key={`rest-${exercise.title}-set-${i}`}type="rest" data={data} options={options} />)
            setCardsData.push({
                setName: exercise.title,
                setNumber: i,
                targets: exercise.target,
                actual: null,
            })
            setCardsData.push({
                setName: "rest",
                target: exercise.restInterval,
                actual: null,
            })
        } 
    })
    console.log(setCardsToDisplay)

    useEffect(()=> {
        // After rendering, if this is the initial render, save the list data to localStorage.

        const currentSession = JSON.parse(localStorage.getItem('currentSession'))
        currentSession.workout.setCardsData = setCardsData
        
        localStorage.setItem('currentSession', JSON.stringify(currentSession))

        // Save the session to mongoDB.
        (async () => {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: "test"
            }

            const response = await fetch('/session', options )
            console.log(response)
        })()
    }, [])

    return setCardsToDisplay[activeSetCardIndex]
}

export default SetCardList