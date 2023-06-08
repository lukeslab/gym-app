import React, { useState, useEffect} from "react";
import { useFetcher } from "react-router-dom";

import MainCardList from "./MainCardList";
import ExerciseDetails from "./ExerciseDetails";

export function WorkoutDetails(props){
    const { type, data, options } = props
    console.log("[debug]: WorkoutDetails props:", props)

    const [ isAddingExercise, setIsAddingExercise ] = useState(false);
    const fetcher = useFetcher()
    
    let exercisesNotInWorkout = [];

    function removeExercise(e){
        const id = e.target.parentElement.getAttribute("data-id")
        console.log(id)
        const newExercisesToList = data.exercisesToList.filter( exercise => exercise._id !== id)
        options.setExercisesToList([ ...newExercisesToList ])
    }

    function addExercise(){
        setIsAddingExercise(!isAddingExercise)
    }

    //dont show exercises in the add list if they are already in the workout.
    if(fetcher?.data?.exercises){
        console.log(fetcher.data)
        exercisesNotInWorkout = fetcher.data.exercises.filter
        ( ({id: id1}) => {
            return !data.exercises.some(({_id: id2}) => id2 === id1)
        })
        console.log('exercisesNotInWorkout: ', exercisesNotInWorkout)
    }

    useEffect(() => {
        if (fetcher.state === "idle" && !fetcher.data) {
            fetcher.load("/exercises")
        }
    }, [fetcher])

    return (
        <section className="workout-details">
            <label>
                Title:
                <input ref={type === "create" ? options.titleInputElem : null}    className="title" type="text" defaultValue={type === "edit" && data.workout.title}></input>
            </label>
            <section className="exercise-list">
                <h2>Exercises</h2>
                <ul>
                    {data.exercises.map( (exercise, index) => {
                        return (
                            <li key={index} data-id={exercise._id}>
                                <ExerciseDetails    type="edit" 
                                                    data={exercise} 
                                                    options={{}} 
                                />
                                <button onClick={removeExercise}>Delete</button>
                            </li>
                        )
                    })}
                    <li className="add-exercise">
                        {isAddingExercise ? 

                        <MainCardList   type="exercise"
                                        data={exercisesNotInWorkout}
                                        options={{
                                            enableAddButton: true,
                                            exercises: data.exercises,
                                            setExercises: options.setExercises
                                        }}   
                        /> : <a onClick={addExercise}>Add Exercise <span> + </span></a>}
                    </li>
                </ul>
            </section>
        </section>
    )
}

export default WorkoutDetails