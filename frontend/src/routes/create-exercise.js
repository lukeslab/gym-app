import React from 'react';
import {redirect, Form, Link } from 'react-router-dom';
import { createExercise } from '../functions';

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
                <section>
                    <label>
                        Title:
                        <input type="text" name="title"></input>
                    </label>
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
                <Link to="/exercises">Cancel</Link>
                <button type="submit">Create</button>
            </Form>
        </div>
    )
}