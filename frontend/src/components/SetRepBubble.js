import React from "react";

function SetRepBubble(props) {
    console.log('[debug] SetRepBubble Props: ', props)
    const { rep, bubblesContainer, bubblesConfirmed } = props

    function toggleRepBubbles(repBubbleEnteredIndex) {
        if (bubblesConfirmed.current) return
        props.resetRepBubbles()
        
        // When I mouse over index 3, 1 2 and 3 should light green
        const repBubbles = bubblesContainer.current.children
        const bubblesToFill = Object.values(repBubbles).slice(0, repBubbleEnteredIndex + 1)

        bubblesToFill.forEach( bubble => bubble.style.background = "green" )
    }

    function confirmRepBubbles() {
        bubblesConfirmed.current = true
    }

    return (
        <li onMouseEnter={() => toggleRepBubbles(rep)}
            onClick={confirmRepBubbles} 
            key={"rep"+rep} 
            className="rep-bubble incomplete">
        </li>
    )
}

export default SetRepBubble