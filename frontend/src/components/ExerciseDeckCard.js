import React, { useState } from 'react';
import ExerciseDeckCardFront from './ExerciseDeckCardFront';
import ExerciseDeckCardBack from './ExerciseDeckCardBack';

function ExerciseDeckCard({ exercise, isEditable }) {
    const [ cardIsFaceup, setCardIsFaceup ] = useState(true)

    if (cardIsFaceup) return <ExerciseDeckCardFront exercise={exercise} isEditable={isEditable} setCardIsFaceup={setCardIsFaceup}/>
    else return <ExerciseDeckCardBack exercise={exercise} isEditable={isEditable} setCardIsFaceup={setCardIsFaceup}/>
}

export default ExerciseDeckCard