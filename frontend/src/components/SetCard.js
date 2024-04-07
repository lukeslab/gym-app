import '../styles/SetCard.css'
import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { getCurrentUserId } from '../functions';
import SetCardExerciseDetails from './SetCardExeriseDetails';
import SetCardRestDetails from './SetCardRestDetails';

function SetCard({ type, data, options }) {
    const { title, target, setNumber } = data;
    const [ nextIsDisabled, setNextIsDisabled ] = useState(true)
    const navigate = useNavigate()

    const cardDetailOptions = {
        setNextIsDisabled
    }

    function completeSession(){
        navigate("/")
        // saveExerciseHistoryToDatabase()
        // localStorage.removeItem('currentSession')

        // function saveExerciseHistoryToDatabase(){
        //     const userId = getCurrentUserId()
        //     const { workout: { setCardsData } } = JSON.parse(localStorage.getItem('currentSession'))


        //     const options = {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify(currentSession.workout)
        //     }

            // fetch(`/user/exercise-history/${userId}`, options)
        // }
    }

    if (type === 'last') {
        return (
            <section className={`setCard last`}>
                <h2>You're done! Congrats!!</h2>
                <button onClick={completeSession}>Finish</button>
            </section>
        )
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

            <button className="w-200" disabled={nextIsDisabled} onClick={() => options.goToNextSetCard()}> Next </button>
        </section>
    )


}

export default SetCard