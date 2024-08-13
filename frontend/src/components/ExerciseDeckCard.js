import React, { useState } from 'react';
import ExerciseDeckCardFront from './ExerciseDeckCardFront';
import ExerciseDeckCardBack from './ExerciseDeckCardBack';

// Think of this as the card frame
function ExerciseDeckCard({ exercise, isEditable, selectedExercises, setSelectedExercises }) {
    const [ isFaceUp, setIsFaceUp ] = useState(true)
    const [ isSelected, setIsSelected ] = useState(false)

    const { title, id } = exercise

    function handleCardSelect(e) {
        const currentTarget = e.currentTarget
        const exerciseId = currentTarget.dataset.exercise_id
        console.log(exerciseId)

        setIsSelected(isSelected => !isSelected)

        if (selectedExercises.includes(exerciseId)) {
            console.log('1', selectedExercises)
            setSelectedExercises(selectedExercises.filter(selectedExercise => selectedExercise !== exerciseId))
        } else {
            console.log('2', selectedExercises)
            setSelectedExercises([...selectedExercises, exerciseId])
        }
        
    }

    return (
        <div className="w-72 rounded overflow-hidden shadow-lg bg-white p-4 shrink-0 border-black ml-2 border-2 hover:cursor-pointer hover:ring-4" onClick={handleCardSelect} data-is_selected={isSelected} data-exercise_id={id}>
            <div className="flex flex-row space-between">
                <h2 className="text-lg font-bold mb-4">{title}</h2>
                {isSelected && <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="25" cy="25" r="12.5" fill="#10B981" />
                    <path d="M 20 25 L 25 30 L 30 20" stroke="white" stroke-width="2.5" fill="none" />
                </svg>}
                {isEditable && <button className="flex items-center justify-center bg-transparent border-2 border-red-500 text-red-500 rounded-full w-6 h-6 hover:bg-red-500 hover:text-white transition-colors">
                    <span class="text-s">&times;</span>
                </button>}
            </div>
            { isFaceUp ? 
                <ExerciseDeckCardFront exercise={exercise} isEditable={isEditable} setIsFaceUp={setIsFaceUp}/> : <ExerciseDeckCardBack exercise={exercise} isEditable={isEditable} setIsFaceUp={setIsFaceUp}/> 
            }
        </div>
    )
}

export default ExerciseDeckCard