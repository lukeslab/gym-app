import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useLocation } from 'react-router-dom'
import { getCurrentSession, getAllExercises } from '../functions'

import MainCardList from '../components/MainCardList'
import ExerciseDeckCard from '../components/ExerciseDeckCard'

export async function loader() {
    const loaderData = {
        currentSession: getCurrentSession(),
        exercises: await getAllExercises()
    }
    console.log('exercises.js loader: ', loaderData)
    return loaderData;
}

export default function Exercises() {
    const { currentSession, exercises } = useLoaderData();

    const exerciseCards = exercises.map(exercise => <ExerciseDeckCard exercise={exercise} />)

    return (
        <section className="max-w-md mx-auto">
            <h1 className="text-4xl font-bold text-center mb-6"> My Exercises </h1>
            <div className="flex justify-around gap-5 flex-wrap">
                {exerciseCards}
                <li className="flex justify-center items-center bg-green-500">
                    <Link className="p-4 w-full flex justify-center align-middle" to={`./create-exercise`}>
                        <span className="text-white text-lg">New exercise</span>
                        <span className="text-white text-2xl ml-2 relative bottom-1">+</span>
                    </Link>
                </li>
            </div>
        </section>
    )
}