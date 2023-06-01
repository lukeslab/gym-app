import React from "react"

export function EditExerciseCard({exercise}){

    return(
        <section>
            <div className="exercise-name">
                <span>{exercise?.title}</span>
            </div>
            <div className="exercise-sets">
                <span>Sets</span>
                <input type="text" defaultValue={exercise?.target?.sets}/>
            </div>
            <div className="exercise-reps">
                <span>Reps</span>
                <input type="text" defaultValue={exercise?.target?.reps}/>
            </div>
            <div className="exercise-weight">
                <span>Weight</span>
                <input type="text" defaultValue={exercise?.target?.weight}/>
            </div>
        </section>
    )
}

export default EditExerciseCard