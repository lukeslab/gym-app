import React, { useState } from "react";
import '../styles/SetCard.css'

function SetCard({ type, data }) {
    const { exercise, i } = data;
    const [ nextIsDisabled, setNextIsDisabled ] = useState(true)

    return (
        <section class={`setCard ${type}`}>
            {type === "exercise" && <h1>{`${exercise.title}: ${i} of ${exercise.target.sets} @ ${exercise.target.weight}lbs`}</h1>}
            {type === "rest" && <h1>Rest</h1>}

            <div class={`setCardArt ${type}`}>
                {/* Artwork should go here */}
            </div>

            <div class={`setCardDetails ${type}`}>
                <div></div>
                <div><span>Targets</span></div>
                <div><span>Actuals</span></div>
                <div><span>Results</span></div>
                <div><span>Reps</span></div>
                <div>{exercise.target.reps}</div>
                <div></div>
                <div></div>
            </div>

            <button disabled={nextIsDisabled}> Next </button>
        </section>
    )


}

export default SetCard