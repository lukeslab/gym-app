import React, { useState, useRef, useEffect } from "react";

function SetCardExerciseDetails({data, options}){
    const { exercise, activeSetCardIndex } = data;
    const { setNextIsDisabled } = options;

    const target = useRef(0)
    const actual = useRef(0)
    const resultField = useRef(0)
    console.log(target)

    function displayResultField(){
        function calculateResultField(target, actualReps) {
            const difference = actualReps - target;
            console.log(target, actualReps, difference)
            let result; 
            if (difference < 0) result = `Fail (${difference})` 
            else if (difference === 0) result = `Pass`
            else result = `Pass (+${difference})`
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
            calculateResultField(target.current.innerText, actual.current.value)
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
            <div ref={target} className={"target-reps"}>{exercise.target.reps}</div>
            <div><input ref={actual} onChange={displayResultField} /></div>
            <div ref={resultField} className={'results'}></div>
        </>
    )
}

export default SetCardExerciseDetails