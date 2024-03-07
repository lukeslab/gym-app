import React from 'react';

function ExerciseDeckCardBack({ exercise, isEditable, setIsFaceUp }) {
    const { title, stats: { timesPerformed, highestWeight, targetsHit, targetsMissed, successRate } } = exercise
    console.log(exercise.stats)

    function toggleCardSide(e) {
        e.stopPropagation()
        setIsFaceUp(true)
    }

    return (
        <>
            <div className="mb-4 bg-gray-300 h-32 flex items-center justify-center">
                <span>Graph of targets placeholder</span>
            </div>
            <div className="flex p-2 justify-around">
                <div className="mb-4">
                    <h3 class="font-semibold mb-2">Other stats</h3>
                    <p class="mb-1">Times performed: {timesPerformed}</p>
                    <p class="mb-1">Highest weight: {highestWeight}</p>
                    <p class="mb-1">Targets hit: {targetsHit}</p>
                    <p class="mb-1">Targets Missed: {targetsMissed}</p>
                    <p class="mb-1">Success rate: {successRate}</p>
                </div>
                <button onClick={toggleCardSide} className="bg-blue-500 text-white px-4 py-2 flex self-start">
                    Back
                </button>
            </div>
        </>
    )
}

export default ExerciseDeckCardBack