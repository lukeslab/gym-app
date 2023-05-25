import React, { useRef } from "react";
import SetRepBubble from "./SetRepBubble";

function SetCard(props){
    console.log(`[debug] SetCardProps: `, props)
    const bubblesContainer = useRef()
    const bubblesConfirmed = useRef(false)
    const { exercise, setNumber, setSetList, setList, status } = props
    const { _id, title, target } = exercise //apparently you cannot use this variable if you deconstruct them all together, I.E. exercise: { _ id, title, target }, ...  = props
    
    function recordSet(e,) {
        console.log(`[debug] Recording set...`, e)
           
        try {

            // The updated setlist will need to shift everything up 1 stage. Current becomes completed, next[0] becomes current, next[1] moves to next[0]
            let indexOfCurrent;
            const newSetList = setList.map( (set, index) => {
                // If the set is completed, then do not edit
                if (set?.status === "completed") return set

                // Update current to completed
                if (set?.status === "current") {
                    indexOfCurrent = index
                    return { ...set, status:"completed" }
                } 
                
                // The new Current Set will be the index directly after it
                if (set?.status === "next" && 
                    (index - indexOfCurrent) === 1) {
                    return { ...set, status: "current" }

                // If it is not directly after the current, set as "next"
                } else return { ...set, status: "next" }

            })
            console.log("New set list: ", newSetList)
            setSetList(newSetList)
            
            
        } catch (e) {
            console.error(e)
        }
    }

    function resetRepBubbles(){
        if (bubblesConfirmed.current) return
        const repBubbles = Object.values(bubblesContainer.current.children)
        console.log(repBubbles)
        repBubbles.forEach( bubble => bubble.style.background = "red")
    }

    const repBubbles = []
    for (let rep = 0; rep < target.reps; rep++){
        repBubbles.push(
            <SetRepBubble   rep={rep} 
                            bubblesContainer={bubblesContainer}
                            resetRepBubbles={resetRepBubbles}
                            bubblesConfirmed={bubblesConfirmed}
            />)
    }

    return (
        <li key={exercise+setNumber} className="set-card">
            <p>Exercise: {title}</p>
            <ul className="set-card-details">
                <li> Set: {setNumber} </li>
                <li> Reps: {target.reps} </li>
                <li> Weight: {target.weight} </li>
            </ul>
            <ul ref={bubblesContainer} 
                onMouseLeave={resetRepBubbles}
                className="rep-bubbles-container">
                {repBubbles}
            </ul>
            {status === "completed" ? (<span>Completed on {new Date(Date.now()).toLocaleDateString()}</span>) : (<button onClick={e => recordSet(e)} className="record-set">Record set</button>)}
        </li>
    )
}

export default SetCard