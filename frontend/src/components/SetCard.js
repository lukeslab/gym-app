import '../styles/SetCard.css'
import React, { useState, useRef } from "react";
import SetCardExerciseDetails from './SetCardExeriseDetails';
import SetCardRestDetails from './SetCardRestDetails';

function SetCard({ type, data, options }) {
    const { title, target, setNumber } = data;
    const [ nextIsDisabled, setNextIsDisabled ] = useState(true)
    

    const cardDetailOptions = {
        setNextIsDisabled
    }

    return (
        <section className={`setCard ${type}`}>
            {type === "exercise" && <h1>{`${title}: ${setNumber} of ${target.sets} @ ${target.weight}lbs`}</h1>}
            {type === "rest" && <h1>Rest</h1>}

            <div className={`setCardArt ${type}`}>
                {/* Artwork should go here */}
            </div>

            <div className={`setCardDetails ${type}`}>
                {type === "exercise"  && <SetCardExerciseDetails data={data} options={cardDetailOptions} /> }

                {type === "rest" && <SetCardRestDetails data={data} options={cardDetailOptions}/> }
                {type === "setComplete" && <p>Congrats you did it! ``~~**Confetti``~~~`**</p>}
            </div>

            {type !== "setComplete" && <button disabled={nextIsDisabled} onClick={() => options.changeActiveSetCardIndex()}> Next </button>}
        </section>
    )


}

export default SetCard