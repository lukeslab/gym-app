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

function ExerciseList({ id }){
    const [ exercises, setExercises ] = useState(workoutsData[id].exercises);
    const [ isAddingExercise, setIsAddingExercise ] = useState(false);

    function addExercise(){
        setIsAddingExercise(!isAddingExercise)
    }

    return (
        <section className="exercise-list">
            <h2>Exercises</h2>
            <ul>
                {exercises.map( (exercise, index) => {
                    return (
                        <li key={index}>
                            <Exercise name={exercise}/>
                        </li>
                    )
                })}
                <li className="add-exercise">
                    {isAddingExercise ? <><input></input><button onClick={addExercise}>Add</button></> : <><a onClick={addExercise}>Add Exercise <span>+</span></a></>}
                </li>
            </ul>
        </section>
    )
}

export default function EditWorkout () {
    const { id } = useParams();
    const [ title, setTitle ] = useState(workoutsData[id].title);
    
    
    function handleOnChange(e){
        setTitle(e.target.value);
    }

  

    return (
        <div className="edit-workout">
            <h1>Edit Workout</h1>
            <label>
                Title:
                <input type="text" value={title} onChange={handleOnChange}></input>
            </label>
            <ExerciseList id={id}/>
            <Link to="../">Cancel</Link>
            <Link to="../">Save</Link>
        </div>
    )
}