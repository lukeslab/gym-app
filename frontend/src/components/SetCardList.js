import React, { useState, useRef } from 'react'
import SetCard from './SetCard'
import { useEffect } from 'react'

function SetCardList({ data }){
    const { setCardsData, currentSession } = data
    const [ activeSetCardIndex, setActiveSetCardIndex ] = useState(findCurrentlyActiveCardIndex())
    
    let setCardsToDisplay = []

    function findCurrentlyActiveCardIndex(){
        let index;
        try {
            index = currentSession.workout?.setCardsData.findIndex((setCardData) => setCardData?.isComplete === false)
        } catch (e) {
            index = 0 
        }

        return index
    }

    function goToNextSetCard() {
        changeActiveSetCard()
        // spot reserved for sending db queries for every set card complete
        // updateUserExerciseHistory()

        // async function updateUserExerciseHistory(){
        //     console.log('this will update the histroy')
            
        // }

        function changeActiveSetCard() {
            const currentSession = JSON.parse(localStorage.getItem('currentSession'))
            currentSession.workout.setCardsData[activeSetCardIndex].isComplete = true
            localStorage.setItem('currentSession', JSON.stringify(currentSession))
            if (activeSetCardIndex < setCardsToDisplay.length) setActiveSetCardIndex(activeSetCardIndex+1)
        }
    }

    // Iterate through the exercise list
    // do we even need to tod this if we're only displaying a single card? It's good if you want a deck effect but thats currently not even being rendered.
    setCardsData.forEach( (setCard, index, array) => {
        const data = {
            ...setCard,
            activeSetCardIndex
        }
        const options =  {
            "goToNextSetCard": goToNextSetCard
        }
        setCardsToDisplay.push(<SetCard key={`${index}`} type={setCard.type} data={data} options={options}/>)
    })

    setCardsToDisplay.push(<SetCard key={`${setCardsToDisplay.length}`} type="setComplete" data={{title: "Set Complete"}} options={null} />)

    console.log(setCardsToDisplay)

    // Save the session to database if it is the last setCard
    useEffect(()=> {
        (async () => {
            if (isTheLastSetCard(activeSetCardIndex)) saveWorkoutSessionToDatabase()

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
                    body: JSON.stringify(currentSession)
                }

                const response = await fetch('/session', options )
                console.log(response)
            }
        })()
    }, [activeSetCardIndex])

    return setCardsToDisplay[activeSetCardIndex]

}

export default SetCardList