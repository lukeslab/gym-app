import React from "react"
import { Form, Link } from "react-router-dom"

export function MainCard({ type, data, options }){

    async function addExerciseToWorkout(e){
        console.log('addExerciseToWorkout event: ', e)
        const exerciseId = e.target.getAttribute('data-id')
        const response = await fetch(`/exercises/${exerciseId}`)
        const exercise = await response.json()
        console.log('Excercise to add: ', exercise)

        options.setExercises([
            ...options.workout.exercises,
            exercise
        ])
    }

    return (
        <li className={`list-item ${type} ${data.listItem.title}`} key={data.index}>
            <span>{data.listItem.title}</span>
            <div>
                {type === "workout" && 
                
                <Form action="." method="post">
                    <input type="hidden" name="title" defaultValue={encodeURIComponent(data.listItem.title)} />
                    <input type="hidden" name="id" defaultValue={data.listItem.id} />
                    <button type="submit"> Start </button>
                </Form>}
                
                <button>
                    <Link to={`/edit-${type}/${data.listItem.id}`}> Edit </Link>
                </button>
                
                {type === "exercise" &&
                options?.enableAddButton &&

                <button data-id={data.listItem.id} onClick={addExerciseToWorkout}>Add</button>}
            </div>
        </li>
    )
}

export default MainCard