import React, { useState, useRef, useEffect } from "react";

function SetCardRestDetails({data, options}){
    const { activeSetCardIndex } = data;
    const { setNextIsDisabled } = options;
    
    const target = useRef()
    let actual = 0;
    console.log(data)
    function updateCurrentSessionSetCardDataActual() {
        const currentSession = JSON.parse(localStorage.getItem('currentSession'))
        currentSession.workout.setCardsData[activeSetCardIndex].actual = actual
        console.log(currentSession)
        localStorage.setItem('currentSession', JSON.stringify(currentSession))
    }

    useEffect( () => {
        const intervalId = setInterval( () => {
            if (parseInt(target.current.innerText) > 0){
                const stepSize = 10
                target.current.innerText -= stepSize
                actual += stepSize
                updateCurrentSessionSetCardDataActual()
            } else {
                setNextIsDisabled(false)
                clearInterval(intervalId)
            }
        }, 1000)

        return () => clearInterval(intervalId)
    }, [])

    return (
        <>
            <div>Rest Interval</div>
            <div ref={target}>{data.target}</div>
        </>
    )
}

export default SetCardRestDetails