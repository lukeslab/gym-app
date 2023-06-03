import React from 'react';
import {redirect, Form, Link } from 'react-router-dom';
import { createExercise } from '../functions';

import ExerciseDetails from '../components/ExerciseDetails';

export async function action({ request }) {
    const formData = Object.fromEntries(await request.formData());
    console.log(formData)
    const message = await createExercise(formData)
    console.log(message)
    return redirect("/exercises")
}

export default function CreateExercise () {

    return (
        <div className="edit-exercise">
            <h1>Create Exercise</h1>
            <Form action="." method="post"> 
                <ExerciseDetails type="create" />
                <Link to="/exercises">Cancel</Link>
                <button type="submit">Create</button>
            </Form>
        </div>
    )
}