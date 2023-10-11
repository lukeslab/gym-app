import React, { useState, useRef } from 'react'
import SetCard from './SetCard'
import { useEffect } from 'react'

function SetCardList({ data }){
    const { setCardsData, currentSession } = data
    console.log(data)
    const [ activeSetCardIndex, setActiveSetCardIndex ] = useState(() => findCurrentlyActiveCardIndex())
    
    let setCardsToDisplay = []

    function changeActiveSetCardIndex() {
        if (activeSetCardIndex < setCardsToDisplay.length) setActiveSetCardIndex(activeSetCardIndex+1)
        // else user should see the complete screen?
    }

    // Iterate through the exercise list
    setCardsData.forEach( (setCard, index) => {
        const data = {
            ...setCard,
            activeSetCardIndex
        }
        const options =  {
            "changeActiveSetCardIndex": changeActiveSetCardIndex
        }
        setCardsToDisplay.push(<SetCard key={`${index}`} type={setCard.type} data={data} options={options}/>)

    })

    // Save the session to database if it is the last setCard
    useEffect(()=> {
        (async () => {
            if (isTheLastSetCard()) saveWorkoutSessionToDatabase()

            function isTheLastSetCard(){
                return activeSetCardIndex === setCardsToDisplay.length -1 ? true : false
            }

            async function saveWorkoutSessionToDatabase(){
                const currentSession = localStorage.getItem('currentSession')

                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body: currentSession
                }

                const response = await fetch('/session', options )
                console.log(response)
            }
        })()
    }, [activeSetCardIndex])

    return setCardsToDisplay[activeSetCardIndex]

    function findCurrentlyActiveCardIndex(){
        let index
        try {
            index = currentSession.workout?.setCardsData.findIndex((setCardData) => setCardData.actual === null)
        } catch(e) {
            index = 0
        } finally {
            return index
        }

    }
}

export default SetCardList