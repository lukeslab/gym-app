import React from "react";

function ExerciseDetails(props) {
    const { type, data, options } = props
    console.log("[debug]: ExerciseDetails type:", type, "data: ", data, "options:", options)

    return   ( 
        <section className="exercise-details">
            <div className="exercise-title">
                {type === "create" && 
                
                <label>
                    Title:
                    <input type="text" name="title"></input>
                </label>}
                
                {type === "edit" && 
                
                <label>
                    Title:
                    <input type="text" name="title" defaultValue={data.title}></input>
                </label>
                }
            </div>
            <div className="exercise-sets">
                <span>Sets:</span>
                <input type="number" name="sets"/>
            </div>
            <div className="exercise-reps">
                <span>Reps:</span>
                <input type="number" name="reps"/>
            </div>
            <div className="exercise-weight">
                <span>Weight:</span>
                <input type="number" name="weight"/>
            </div>
        </section>
    )
}

export default ExerciseDetails