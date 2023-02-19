import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { useState } from 'react';

function Exercise({exercise}){

    return(
        <section>
            <div className="exercise-name">
                <span>{exercise?.title}</span>
            </div>
            <div className="exercise-sets">
                <span>Sets</span>
                <input type="text" defaultValue={exercise?.sets}/>
            </div>
            <div className="exercise-reps">
                <span>Reps</span>
                <input type="text" defaultValue={exercise?.reps}/>
            </div>
            <div className="exercise-weight">
                <span>Weight</span>
                <input type="text" defaultValue={exercise?.weight}/>
            </div>
        </section>
    )
}

export async function loader({ params }){
    const { id } = params;

    const exercise = await fetch(`/exercises/${id}`)
    if (!exercise) console.error('Unable to fetch exercise')
    else return exercise
}

export default function EditExercise () {
    const exercise = useLoaderData()
    const { title } = exercise
    const [ newTitle, setTitle ] = useState(title);   
    
    function handleOnChange(e){
        setTitle(e.target.value);
    }

    return (
        <div className="edit-exercise">
            <h1>Edit Exercise</h1>
            <label>
                Title:
                <input type="text" value={title} onChange={handleOnChange}></input>
            </label>
            <Exercise exercise={exercise}/>
            <Link to="../">Cancel</Link>
            <Link to="../">Save</Link>
        </div>
    )
}