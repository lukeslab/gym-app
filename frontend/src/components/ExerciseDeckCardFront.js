import React from 'react';

function ExerciseDeckCardFront({ exercise, isEditable }) {
    const { title, target: { sets, reps, weight }, restInterval } = exercise
    return (
        <div className="w-72 rounded overflow-hidden shadow-lg bg-white p-4 shrink-0">
            <div className="flex flex-row space-between">
                <h2 className="text-lg font-bold mb-4">{title}</h2>
                {isEditable && <button class="flex items-center justify-center bg-transparent border-2 border-red-500 text-red-500 rounded-full w-6 h-6 hover:bg-red-500 hover:text-white transition-colors">
                    <span class="text-s">&times;</span>
                </button>}
            </div>

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
                    <button className="bg-blue-500 text-white px-4 py-2">View stats</button>
                    <div>
                        <h3 className="font-semibold mb-2">Rest Interval</h3>
                        <p>{restInterval} seconds</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExerciseDeckCardFront