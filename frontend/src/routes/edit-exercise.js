import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { useState } from 'react';
import ExerciseDetails from '../components/ExerciseDetails';

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
            <ExerciseDetails type="edit" data={{title}} options={{}}/>
            <Link to="../exercises">Cancel</Link>
            <Link to="../">Save</Link>
        </div>
    )
}

