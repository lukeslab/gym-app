import React, { useState, useRef, useEffect } from "react";

function SetCardExerciseDetails({data, options}){
    const { activeSetCardIndex } = data;
    const { setNextIsDisabled } = options;

    const target = useRef(0)
    const actual = useRef(0)
    const resultField = useRef(0)
    console.log(target)

    function onActualFieldInputChange(){
        function calculateResultField(target, actualReps) {
            const difference = actualReps - target;
            console.log(target, actualReps, difference)
            let result; 
            if (difference < 0) result = `Fail (${difference})` 
            else if (difference === 0) result = `Pass`
            else result = `Pass (+${difference})`
            return result
        }

        function displayResultField(result) {
            resultField.current.innerText = result
        }

        function updateCurrentSessionSetCardDataActual() {
            const currentSession = JSON.parse(localStorage.getItem('currentSession'))
            currentSession.workout.setCardsData[activeSetCardIndex].actual = actual.current.value
            console.log(currentSession)
            localStorage.setItem('currentSession', JSON.stringify(currentSession))
        }

        if (actual.current.value === "") setNextIsDisabled(true)
        else {
            setNextIsDisabled(false)
            
            const result = calculateResultField(target.current.innerText, actual.current.value)
            displayResultField(result)
            
            updateCurrentSessionSetCardDataActual()
        }
    }

    return (
        <>
            <div></div>
            <div><span>Target</span></div>
            <div><span>Actual</span></div>
            <div><span>Result</span></div>
            <div><span>Reps</span></div>
            <div ref={target} className={"target-reps"}>{data.target.reps}</div>
            <div><input ref={actual} onChange={onActualFieldInputChange} /></div>
            <div ref={resultField} className={'results'}></div>
        </>
    )
}

export default SetCardExerciseDetails