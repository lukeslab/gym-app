import React, { useState } from 'react'
import SetCard from './SetCard'

function SetCardList({ exercises }){
    let setCardList = []

    // Iterate through the exercise list
    exercises.forEach( (exercise) => {
        for (let i=1; i <= exercise.target.sets; i++) {
            const data = {
                exercise,
                i
            }
             
            setCardList.push(<SetCard  type="exercise" data={data} />)        
            setCardList.push(<SetCard  type="rest" data={data} />)
        } 
    })
    
    return setCardList
}

export default SetCardList