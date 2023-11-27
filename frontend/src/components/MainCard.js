import React from "react"
import { Form, Link } from "react-router-dom"

// This is a menu card, fix it
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
        <li className="flex justify-between items-center bg-white p-4 border border-gray-200">
            <span>Arm Day</span>
            <div>
                <button className="bg-blue-500 text-white px-4 py-2 mr-2">Start</button>
                <button className="bg-green-500 text-white px-4 py-2">
                    <Link to={`/edit-${type}/${data.listItem.id}`}> View </Link>
                </button>
            </div>
        </li>
        // <li className={"border border-black p-2 flex justify-between items-center"} key={data.index}>
        //     <span>{data.listItem.title}</span>
        //     <div>
        //         {type === "workout" && 
                
        //         <Form action="." method="post">
        //             <input type="hidden" name="title" defaultValue={encodeURIComponent(data.listItem.title)} />
        //             <input type="hidden" name="id" defaultValue={data.listItem.id} />
        //             <button className="bg-blue-500 text-white px-2 py-1"> Start </button>
        //         </Form>}
                
        //         <button className="bg-gray-500 text-white px-2 py-1">
        //             <Link to={`/edit-${type}/${data.listItem.id}`}> Edit </Link>
        //         </button>
                
        //         {type === "exercise" &&
        //         options?.enableAddButton &&

        //         <button className="border border-black p-2 flex justify-between items-center bg-green-500" data-id={data.listItem.id} onClick={addExerciseToWorkout}>Add</button>}
        //     </div>
        // </li>
    )
}

export default MainCard