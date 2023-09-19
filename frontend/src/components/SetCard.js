import '../styles/SetCard.css'
import React, { useState, useRef } from "react";

function SetCard({ type, data, options }) {
    const { exercise, i } = data;
    const [ nextIsDisabled, setNextIsDisabled ] = useState(true)
    const [ userFailedSet, setUserFailedSet ] = useState('')
    const inputElem = useRef()

    console.log(nextIsDisabled)

    function handleInputElement(){
        if (inputElem.current.value === "") setNextIsDisabled(true)
        else setNextIsDisabled(false)
    }

    return (
        <section class={`setCard ${type}  `}>
            {type === "exercise" && <h1>{`${exercise.title}: ${i} of ${exercise.target.sets} @ ${exercise.target.weight}lbs`}</h1>}
            {type === "rest" && <h1>Rest</h1>}

            <div class={`setCardArt ${type}`}>
                {/* Artwork should go here */}
            </div>

            <div class={`setCardDetails ${type}`}>
                {type === "exercise" && <><div></div>
                <div><span>Targets</span></div>
                <div><span>Actuals</span></div>
                <div><span>Results</span></div>
                <div><span>Reps</span></div>
                <div>{exercise.target.reps}</div>
                <div><input ref={inputElem} onChange={handleInputElement} /></div>
                <div></div></>}
                {type === "rest" && <>
                <div></div>
                <div>Target</div>
                <div>Actual</div>
                <div>Rest Interval</div>
                <div>{exercise.restInterval}</div>
                <div><input ref={inputElem} onChange={handleInputElement} /></div></>}
            </div>

            <button disabled={nextIsDisabled} onClick={options.changeActiveSetCardIndex}> Next </button>
        </section>
    )


}

export default SetCard