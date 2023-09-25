import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

import NoSessionMessage from '../components/NoSessionMessage';
import SetCardList from '../components/SetCardList';

export async function loader(){
    const { workout: {id} } = JSON.parse(localStorage.getItem('currentSession'));
    const response = await fetch(`/workouts/${id}`)
    const workout = await response.json()
    console.log(workout)
    return workout;
}

export default function CurrentSession() {    
    const { title, exercises } = useLoaderData();

    return (
        <section className="app-component current-session container">
            {title ? <SetCardList exercises={exercises} /> : <NoSessionMessage />}
        </section>
    )
}