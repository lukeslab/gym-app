import React from "react"
import { Form, Link } from "react-router-dom"

export function MainCard(props){
    const { type, data, options } = props
    console.log("[debug]: MainCard type:", type, "data: ", data, "options:", options)
    
    async function addExerciseToWorkoutExercises(e){
        const exerciseId = e.target.getAttribute('data-id')
        
        const response = await fetch(`/exercises/${exerciseId}`)
        const exercise = await response.json()

        options.setExercisesToList([
            ...options.exercisesToList,
            exercise
        ])
    }

    return (
        <>
            <span>{data.title}</span>
            <div>
                {type === "workout" && 
                
                <Form action="." method="post">
                    <input type="hidden" name="title" defaultValue={encodeURIComponent(data.title)} />
                    <input type="hidden" name="id" defaultValue={data.id} />
                    <button type="submit"> Start </button>
                </Form>}
                
                <button>
                    <Link to={`./edit-${type}/${data.id}`}> Edit </Link>
                </button>
                
                {type === "exercise" &&
                options?.enableAddButton &&

                <button data-id={data._id} onClick={addExerciseToWorkoutExercises}>Add</button>}
            </div>
        </>
    )
}

export default MainCard