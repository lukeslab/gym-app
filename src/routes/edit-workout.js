import React from 'react';
import workoutsData from '../data/workouts';
import exercisesData from'../data/exercises';
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';


function Exercise({name}){
    const exercise = exercisesData.find( exercise => exercise.name === name )

    return(
        <section>
            <div className="exercise-name">
                <span>Exercise </span>
                <span>{exercise.name}</span>
            </div>
            <div className="exercise-sets">
                <span>Sets</span>
                <input type="text" value={exercise.sets}/>
            </div>
            <div className="exercise-reps">
                <span>Reps</span>
                <input type="text" value={exercise.reps}/>
            </div>
            <div className="exercise-weight">
                <span>Weight</span>
                <input type="text" value={exercise.weight}/>
            </div>
        </section>
    )
}

export default function EditWorkout () {
    const { id } = useParams();
    const [ title, setTitle ] = useState(workoutsData[id].title);
    const [ exercises, setExercises ] = useState(workoutsData[id].exercises);
    const [ isAddingExercise, setIsAddingExercise ] = useState(false);
    
    function handleOnChange(e){
        setTitle(e.target.value);
    }

    function addExercise(){
        setIsAddingExercise(!isAddingExercise)
    }

    return (
        <div className="edit-workout">
            <h1>Edit Workout</h1>
            <label>
                Title:
                <input type="text" value={title} onChange={handleOnChange}></input>
            </label>
            <ul>
                {exercises.map( (exercise, index) => {
                    return (
                        <li key={index}>
                            <Exercise name={exercise}/>
                        </li>
                    )
                })}

                <li>
                    {isAddingExercise ? <><input></input><button onClick={addExercise}>Done</button></> : <>Add exercise <span onClick={addExercise}>+</span></>}
                </li>
            </ul>
            <Link to="../">Done</Link>
        </div>
    )
}