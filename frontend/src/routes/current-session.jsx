import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
    Link, 
    useLocation,
    useLoaderData
} from 'react-router-dom';

export async function loader(){
    const { id } = JSON.parse(localStorage.getItem('currentSession'));
    const response = await fetch(`/workouts/${id}`)
    const workout = await response.json()
    console.log(workout)
    return workout
}

export default function CurrentSession() {    
    const { title, exercises } = useLoaderData();
    
    useEffect( () =>{
        const timerElement = document.querySelector('.timer')
        if (title && timerElement) timerElement.style.display = 'flex';
    }, [])

    return (
        <section className="app-component current-session container">
            {title ? <SetCardList exercises={exercises} /> : <NoSessionMessage />}
        </section>
    )
}

function SetCardList(props){ 
    console.log("[debug on] SetCardList Props: ", props)
    const { exercises } = props

    const defaultSetList = []

    //create set list
    exercises.forEach( (exercise, index) => {
        const { _id, target:{ sets } } = exercise
        console.log(exercise)
        for (let setNumber = 1; setNumber <= sets; setNumber++) {
            if (setNumber === 1 && index === 0) {
                defaultSetList.push({exercise, setNumber, status:"current"})
            } else {
                defaultSetList.push({exercise, setNumber, status:"next"})
            }
        }
    })
    
    const [ setList, setSetList ] = useState(defaultSetList)
    

    // Create a library of easy-to-read functions such as isFirst() ... i'll come back

  

    const SetStatusBannerBucketProps = {
        setList,
        setSetList,
        ...props
    }

    console.log('this is setlist', setList)
    return (
        <section className="container set-list">
            <SetStatusBannerBucket key={'completed'} expandState="collapsed" {...SetStatusBannerBucketProps}>Completed</SetStatusBannerBucket>
            <SetStatusBannerBucket key={'current'} expandState="none" {...SetStatusBannerBucketProps}>Current</SetStatusBannerBucket>
            <SetStatusBannerBucket key={'next'} expandState="expanded" {...SetStatusBannerBucketProps}>Next</SetStatusBannerBucket>
        </section>
    )
}

function SetStatusBannerBucket (props){
    console.log("Set Status Banner Bucket Props: ", props)
    const { children, expandState } = props;
    const status = children[0].toLowerCase() + children.slice(1)

    const { setList, setSetList } = props;
    const setsByStatus = setList.filter( set => set.status === status)
   
    const setCardProps = {
        setList,
        setSetList
    }

    function toggleBannerState(e){
        if (e.target.classList.contains('expand-state')) return
        console.log('[debug on] Toggling banner state...', e)
        document?.querySelector('.error-message')?.remove()
        try {
            const targetClasses = e.target.classList
            const targetSibling = e.target.nextSibling
    
            // The banner arrow should change only if there are list items to display.
            if (targetSibling.children.length === 0) {
                const error = new Error(`${e.target.innerText} has nothing to display.`)
                error.source = e.target
                console.log(error.source)
                throw(error)
            }
            console.log("I should be saying t his now")
    
            // Alter the state of the set-list banners
            if (e.target.innerText !== "Current Set") {
                if (targetClasses.contains('expanded')) {
                    targetClasses.remove('expanded')
                    return targetSibling.style.display = "none";
                } else {
                    targetClasses.add('expanded')
                    return targetSibling.style.display = "block";
                }
            }
        } catch (error) {

            // Create the error message element and append it to the dom.
            const errorMessageElem = document.createElement('div')
            errorMessageElem.classList.add('error-message')
            errorMessageElem.innerText = error.message
            console.log(errorMessageElem)
            document.querySelector(`.container.${expandState}`).append(errorMessageElem)
            console.error(error, error.source)
        }
    }
    
    return(
        <div className={`container ${expandState}`}>
            {   
                <div onClick={e => toggleBannerState(e)} className="container banner">
                    <div className={`expand-state ${expandState}`} ></div>
                    <span className="status"> {children} </span>
                </div>
            }
            <ul>
                {setsByStatus.map( set => <SetCard {...set} {...setCardProps} />)}
            </ul>
        </div>
    )
}

function SetCard(props){
    console.log(`[debug] SetCardProps: `, props)
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

    const bubblesContainer = useRef()
    function toggleRepBubbles(repBubbleEnteredIndex) {
        if (bubblesConfirmed) return
        resetRepBubbles()
        
        // When I mouse over index 3, 1 2 and 3 should light green
        const repBubbles = bubblesContainer.current.children
        const bubblesToFill = Object.values(repBubbles).slice(0, repBubbleEnteredIndex + 1)

        bubblesToFill.forEach( bubble => bubble.style.background = "green" )
    }
    function resetRepBubbles(){
        if (bubblesConfirmed) return
        const repBubbles = Object.values(bubblesContainer.current.children)
        console.log(repBubbles)
        repBubbles.forEach( bubble => bubble.style.background = "red")
    }

    let bubblesConfirmed = false
    function confirmRepBubbles() {
        bubblesConfirmed = true
    }

    const repBubbles = []
    for (let x = 0; x < target.reps; x++){
        repBubbles.push(
            <li onMouseEnter={() => toggleRepBubbles(x)}
                onClick={confirmRepBubbles} 
                key={"rep"+x} 
                className="rep-bubble incomplete">
            </li>
        )
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

function NoSessionMessage(){
    return (
        <section>
            <p style={{marginTop: "100px"}}>Session is not active</p>
            <button style={{
                backgroundColor: 'white',
                alignSelf: 'center',
                border: '1px solid black',
                padding: '20px 50px',
                marginTop: '25px',
                fontSize: '20px',
                cursor: 'pointer'
            }}><Link style={{textDecoration: "none", color: 'black'}} to="/">Go to workouts</Link></button>
        </section>
    )
}