import React, { useState, useRef, useEffect } from "react";

function SetCardRestDetails({data, options}){
    const { exercise, activeSetCardIndex } = data;
    const { setNextIsDisabled } = options;
    
    const target = useRef()
    let actual = 0;

    function updateCurrentSessionSetCardDataActual() {
        const currentSession = JSON.parse(localStorage.getItem('currentSession'))
        currentSession.workout.setCardsData[activeSetCardIndex].actual = actual
        console.log(currentSession)
        localStorage.setItem('currentSession', JSON.stringify(currentSession))
    }

    useEffect( () => {
        const intervalId = setInterval( () => {
            const stepSize = 10
            target.current.innerText -= stepSize
            actual += stepSize
            updateCurrentSessionSetCardDataActual()
            
            if(parseInt(target.current.innerText) <= 0) setNextIsDisabled(false)
        }, 1000)

        return () => clearInterval(intervalId)
    }, [])

    return (
        <>
            <div>Rest Interval</div>
            <div ref={target}>{exercise.restInterval}</div>
        </>
    )
}

export default SetCardRestDetails