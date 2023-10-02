import React, { useState, useRef } from 'react'
import SetCard from './SetCard'
import { useEffect } from 'react'

function SetCardList({ data }){
    const { setCardsData } = data
    const [ activeSetCardIndex, setActiveSetCardIndex ] = useState(0)
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
    console.log(setCardsToDisplay)

    useEffect(()=> {
        (async () => {
            // When the activeIndex changes, save the localStorage session to MongoDB.
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
        })()
    }, [activeSetCardIndex])

    return setCardsToDisplay[activeSetCardIndex]
}

export default SetCardList