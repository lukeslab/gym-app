import React from "react";

function ExerciseDeckCardFront({ exercise, isEditable, setIsFaceUp }) {
    const { target: { sets, reps, weight }, restInterval } = exercise

    function toggleCardSide(e) {
        e.stopPropagation()
        setIsFaceUp(false)
    }

    return (
       <>
            <div className="mb-4 bg-gray-300 h-32 flex items-center justify-center">
                <span>Artwork or gif placeholder</span>
            </div>
            <div className="flex flex-row justify-around">
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">Targets</h3>
                    <p>Sets: {sets}</p>
                    <p>Reps: {reps}</p>
                    <p>Weight: {weight}</p>
                </div>
                <div className="flex flex-col justify-between items-center mb-4">
                    <button onClick={toggleCardSide} className="bg-blue-500 text-white px-4 py-2">View stats</button>
                    <div>
                        <h3 className="font-semibold mb-2">Rest Interval</h3>
                        <p>{restInterval} seconds</p>
                    </div>
                </div>
            </div>
       </>
    )
}

export default ExerciseDeckCardFront