import React from 'react';

function ExerciseDeckCardBack({ exercise, isEditable, setCardIsFaceup }) {
    const { title } = exercise


    function toggleCardSide() {
        setCardIsFaceup(true)
    }

    return (
        <div className="w-72 rounded overflow-hidden shadow-lg bg-white p-4 shrink-0">
            <div className="flex flex-row space-between">
                <h2 className="text-lg font-bold mb-4">{title}</h2>
                {isEditable && <button class="flex items-center justify-center bg-transparent border-2 border-red-500 text-red-500 rounded-full w-6 h-6 hover:bg-red-500 hover:text-white transition-colors">
                    <span class="text-s">&times;</span>
                </button>}
            </div>
            <div className="mb-4 bg-gray-300 h-32 flex items-center justify-center">
                <span>Graph of targets placeholder</span>
            </div>
            <div className="flex p-2 justify-around">
                <div className="mb-4">
                    <h3 class="font-semibold mb-2">Other stats</h3>
                    <p class="mb-1">Times performed:</p>
                    <p class="mb-1">Highest weight:</p>
                    <p class="mb-1">Targets hit:</p>
                    <p class="mb-1">Targets Missed:</p>
                    <p class="mb-1">Success rate:</p>
                </div>
                <button onClick={toggleCardSide} className="bg-blue-500 text-white px-4 py-2 flex self-start">
                    Back
                </button>
            </div>
        </div>
    )
}

export default ExerciseDeckCardBack