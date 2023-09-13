import React, { useState } from 'react'
import SetCard from './SetCard'

function SetCardList({ exercises }){
    let setCardList = []
    const [ activeSetCardIndex, setActiveSetCardIndex ] = useState(0)

    function changeActiveSetCardIndex() {
        if (activeSetCardIndex < setCardList.length) setActiveSetCardIndex(activeSetCardIndex+1)
        // else user should see the complete screen?
    }

    // Iterate through the exercise list
    exercises.forEach( (exercise) => {
        for (let i=1; i <= exercise.target.sets; i++) {
            const data = {
                exercise,
                i
            }

            const options =  {
                "changeActiveSetCardIndex": changeActiveSetCardIndex
            }
             
            setCardList.push(<SetCard  type="exercise" data={data} changeActiveSetCardIndex={changeActiveSetCardIndex} />)        
            setCardList.push(<SetCard  type="rest" data={data} options={options} changeActiveSetCardIndex={changeActiveSetCardIndex} />)
        } 
    })
    
    return setCardList[activeSetCardIndex]
}

export default SetCardList