import React from "react";

function ExerciseDetails(props) {
    const { type, data, options } = props
    console.log("[debug]: ExerciseDetails props:", props)

    return ( 
        <section className="exercise-details">
            <div className="exercise-title">
                <label>
                    Title:
                    <input type="text" name="title" defaultValue={type === "edit" ? data.title : null}></input>
                </label>
            </div>
            <div className="exercise-sets">
                <span>Sets:</span>
                <input type="number" name="sets" defaultValue={type === 'edit' && data.target.sets}/>
            </div>
            <div className="exercise-reps">
                <span>Reps:</span>
                <input type="number" name="reps" defaultValue={type === 'edit' && data.target.reps} />
            </div>
            <div className="exercise-weight">
                <span>Weight:</span>
                <input type="number" name="weight" defaultValue={type === 'edit' && data.target.reps}/>
            </div>
        </section>
    )
}

export default ExerciseDetails