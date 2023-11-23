import "../styles/components/ExerciseDeckCardFront.css"

import React from "react"

function ExerciseDeckCardFront({ exercise }) {
    const { title, target: { sets, reps, weight }, restInterval } = exercise
    
    return (
        <div className="exercise-card column-container">
            <p className="title">{title}</p>
            <div className="artwork">
                <span>Artwork or gif placeholder</span>
            </div>
            <div className="exercise-stats column-container">
                {/* <div className="left-column"> */}
                    {/* <div className="targets"> */}
                        <p>Targets</p>
                        <p>Sets: {sets}</p>
                        <p>Reps: {reps}</p>
                        <p>Weight: {weight}</p>
                    {/* </div> */}
                {/* </div> */}
                {/* <div className="right-column"> */}
                    <button>View</button>
                    <p>Rest Interval</p>
                    <p>{restInterval}</p>
                {/* </div> */}
            </div>
        </div>
    )
}

export default ExerciseDeckCardFront