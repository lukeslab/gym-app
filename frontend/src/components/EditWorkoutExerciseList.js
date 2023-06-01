import React, { useState, useEffect} from "react";
import { useFetcher } from "react-router-dom";

import MainCardList from "./MainCardList";
import EditExerciseCard from "./EditExerciseCard";

export function EditWorkoutExerciseList(props){
    const { workoutId, exercisesToList, setExercisesToList } = props
    console.log("[debug]: EditWorkoutExerciseList exercisesToList: ", exercisesToList, "setExercisesToList:", setExercisesToList)
    const [ isAddingExercise, setIsAddingExercise ] = useState(false);
    
    const fetcher = useFetcher()
    let addExerciseList = [];

    function removeExercise(e){
        const id = e.target.parentElement.getAttribute("data-id")
        console.log(id)
        const newExercisesToList = exercisesToList.filter( exercise => exercise._id !== id)
        setExercisesToList([ ...newExercisesToList ])
    }

    function addExercise(){
        setIsAddingExercise(!isAddingExercise)
    }

    //dont show exercises in the add list if they are already in the workout.
    if(fetcher?.data?.exercises){
        console.log(fetcher.data)
        addExerciseList = fetcher.data.exercises.filter
        ( ({id: id1}) => {
            return !exercisesToList.some(({_id: id2}) => id2 === id1)
        })
        console.log('addExerciseList: ', addExerciseList)
    }

    useEffect(() => {
        if (fetcher.state === "idle" && !fetcher.data) {
            fetcher.load("/exercises")
        }
    }, [fetcher])

    return (
        <section className="exercise-list">
            <h2>Exercises</h2>
            <ul>
                {exercisesToList.map( (exercise, index) => {
                    return (
                        <li key={index} data-id={exercise._id}>
                            <EditExerciseCard exercise={exercise}/>
                            <button onClick={removeExercise}>Delete</button>
                        </li>
                    )
                })}
                <li className="add-exercise">
                    {isAddingExercise ? 

                    <MainCardList   type="exercise"
                                    data={addExerciseList}
                                    options={{
                                        workoutId,
                                        exercisesToList,
                                        setExercisesToList
                                    }}   
                    /> : <a onClick={addExercise}>Add Exercise <span>+</span></a>}
                </li>
            </ul>
        </section>
    )
}

export default EditWorkoutExerciseList