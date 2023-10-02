import '../styles/SetCard.css'
import React, { useState, useRef } from "react";
import SetCardExerciseDetails from './SetCardExeriseDetails';
import SetCardRestDetails from './SetCardRestDetails';

function SetCard({ type, data, options }) {
    const { title, target, setNumber } = data;
    const [ nextIsDisabled, setNextIsDisabled ] = useState(true)
    

    function handleNextButtonClick(){
        options.changeActiveSetCardIndex()
        
        // Send currentSession to MongoDB
        
    }

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
                {type === "exercise" ? 
                
                <SetCardExerciseDetails data={data} options={cardDetailOptions} /> :
                <SetCardRestDetails data={data} options={cardDetailOptions}/>}
            </div>

            <button disabled={nextIsDisabled} onClick={handleNextButtonClick}> Next </button>
        </section>
    )


}

export default SetCard