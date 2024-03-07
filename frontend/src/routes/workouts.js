import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getCurrentSession, getUserWorkouts } from '../functions'

import MainCardList from '../components/MainCardList';
import OverwriteSessionModal from '../components/OverwriteSession';

export async function loader() {
    const currentSession = getCurrentSession()
    const workouts = await getUserWorkouts();

    // why is workouts a promise if a.) it is put into an array, and b.) workouts is not awaited?
    const loaderData = [workouts, currentSession]
    console.log("routes/workouts.js Loader data: ", loaderData)

    return loaderData;
}

export default function Workouts() {
    const [workouts, currentSession] = useLoaderData();
    const [showOverwriteSessionModal, setShowOverwriteSessionModal] = useState(false)
    const [overwriteSessionWith, setOverwriteSessionWith] = useState()

    console.log('overwriteSessionWith is: ', overwriteSessionWith)

    const options = {
        currentSession,
        setShowOverwriteSessionModal,
        setOverwriteSessionWith
    }

    const overwriteSessionModalProps = {
        overwriteSessionWith,
        setShowOverwriteSessionModal
    }

    return (
        <>
            {showOverwriteSessionModal && <OverwriteSessionModal {...overwriteSessionModalProps} />}
            <section className="max-w-md mx-auto">
                <h1 className="text-4xl font-bold text-center mb-6"> My Workouts </h1>

                <MainCardList type="workout"
                    data={workouts}
                    options={options}
                />
            </section>
        </>
    )
}