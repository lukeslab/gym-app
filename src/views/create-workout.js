import React from 'react';
import workoutsData from '../data/workouts';
import exercisesData from'../data/exercises';
import { useState } from 'react';

export default function EditWorkout () {


    return (
        <>
            <h1>Edit Workout</h1>
            <label>
                Title:
                <input type="text"></input>
            </label>
            <ul>
                <li>Add exercise <span>+</span></li>
            </ul>
            <button>Done</button>
        </>
    )
}
