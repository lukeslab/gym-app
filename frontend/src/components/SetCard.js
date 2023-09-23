import '../styles/SetCard.css'
import React, { useState, useRef } from "react";

function SetCard({ type, data, options }) {
    const { exercise, i } = data;
    const [ nextIsDisabled, setNextIsDisabled ] = useState(true)
    const [ userFailedSet, setUserFailedSet ] = useState('')
    const [ resultField, setResultField ] = useState('')
    const actualInputElement = useRef()
    const targetReps = useRef()

    console.log(nextIsDisabled)

    function handleNextButtonClick(){
        options.changeActiveSetCardIndex()
    }

    function handleActualInputElement(){
        function displaySetResult(targetReps, actualReps) {
            const difference = actualReps - targetReps;
            console.log(targetReps, actualReps, difference)
            let result; 
            if (difference < 0) result = `Fail (${difference})` 
            else if (difference === 0) result = `Pass`
            else result = `Pass (+${difference})`
            setResultField(result)
        }

        if (actualInputElement.current.value === "") setNextIsDisabled(true)
        else {
            setNextIsDisabled(false)
            displaySetResult(targetReps.current.innerText, actualInputElement.current.value)
        }
    }

    return (
        <section className={`setCard ${type}`}>
            {type === "exercise" && <h1>{`${exercise.title}: ${i} of ${exercise.target.sets} @ ${exercise.target.weight}lbs`}</h1>}
            {type === "rest" && <h1>Rest</h1>}

            <div className={`setCardArt ${type}`}>
                {/* Artwork should go here */}
            </div>

            <div className={`setCardDetails ${type}`}>
                {type === "exercise" && <><div></div>
                <div><span>Target</span></div>
                <div><span>Actual</span></div>
                <div><span>Result</span></div>
                <div><span>Reps</span></div>
                <div ref={targetReps} className={"target-reps"}>{exercise.target.reps}</div>
                <div><input ref={actualInputElement} onChange={handleActualInputElement} /></div>
                <div className={'results'}>{resultField}</div></>}
                {type === "rest" && <>
                <div></div>
                <div>Target</div>
                <div>Actual</div>
                <div>Rest Interval</div>
                <div ref={targetReps}>{exercise.restInterval}</div>
                <div><input ref={actualInputElement} onChange={handleActualInputElement} /></div></>}
            </div>

            <button disabled={nextIsDisabled} onClick={handleNextButtonClick}> Next </button>
        </section>
    )


}

export default SetCard