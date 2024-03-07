import React from 'react';
import { redirect, Form, Link, useNavigate } from 'react-router-dom';
import { createExercise } from '../functions';

import ExerciseDetails from '../components/ExerciseDetails';

export async function action({ request }) {
    const formData = Object.fromEntries(await request.formData());
    console.log(formData)
    const message = await createExercise(formData)
    console.log(message)
    return redirect("/exercises")
}

export default function CreateExercise() {
    const navigate = useNavigate()

    function cancelChanges() {
        navigate(-1)
    }

    return (
        <div className="max-w-md mx-auto">
            <Form method="post" action=".">
                <div className="w-72 rounded overflow-hidden shadow-lg bg-white p-4 shrink-0">

                    <div className="flex flex-col space-between">
                        <h2 className="text-lg font-bold mb-4"> Give Your Exercise a Title </h2>
                        <input name="title" className="w-fit border-2 px-2 border-slate-200" type="text" placeholder="Enter a Title..." />
                    </div>

                    <div className="mb-4 bg-gray-300 h-32 flex items-center justify-center">
                        <h2>Choose artwork</h2>
                        <input name="artwork" className="" type="file" />
                    </div>
                    <div className="flex flex-row justify-around">
                        <div className="flex flex-col mb-4 gap-2">
                            <h3 className="font-semibold mb-2">Enter exercise details below:</h3>
                            <input name="sets" className="w-fit border-2 px-2 border-slate-200" type="number" placeholder="Number of Sets..." />
                            <input name="reps" className="w-fit border-2 px-2 border-slate-200" type="number" placeholder="Number of Reps..." />
                            <input name="weight" className="w-fit border-2 px-2 border-slate-200" type="number" placeholder="Total Weight..." />
                            <input name="restInterval" className="w-fit border-2 px-2 border-slate-200" type="number" placeholder="Total Rest Time..." />
                        </div>
                    </div>
                </div>
                <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded">Save</button>
                <button className="bg-red-500 text-white px-6 py-2 rounded" onClick={cancelChanges}>Cancel</button>
            </Form>
        </div >
    )
}