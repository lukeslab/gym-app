import React, { useState, useEffect, useRef } from 'react';
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
            {title ? <SetList exercises={exercises} /> : <NoSessionMessage />}
        </section>
    )
}

function SetList({exercises}){ 
    console.log("[debug on] Colating current session setlist: ", exercises)
    
    // Determine the initial state for setList
    const currentSet = []
    const nextSet = []
    exercises.forEach( (exercise, index) => {
        const { _id, target:{ sets } } = exercise
        console.log(exercise)
        for (let set = 1; set <= sets; set++) {
            if (set === 1 && index === 0) {
                currentSet.push({exercise, set})
            } else {
                nextSet.push({exercise, set})
            }
        }
    })
    const [ setList, setSetList ] = useState({
        "completed": [],
        "current": currentSet,
        "next": nextSet
    })


    // Create a library of easy-to-read functions such as isFirst() ... i'll come back

    function toggleBannerState(e){
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
            e.target.parentElement.append(errorMessageElem)
            console.error(error, error.source)
        }
    }
    

    console.log('this is setlist', setList)
    return (
        <section className="container set-list">
            <div className="container complete ">
                <div onClick={e => toggleBannerState(e)} className="banner container">
                    <span> Completed </span>
                </div>
                <ul>
                    {setList["completed"].map( ({exercise, set}) => <SetCard key={exercise._id+set } exercise={exercise} set={set} setSetList={setSetList} setList={setList}/>)}
                </ul>
            </div>
            <div className="container current ">
                <div className="banner container"> 
                    <span> Current </span>
                </div>
                <ul>
                    {setList["current"].map( ({exercise, set}) => <SetCard key={exercise._id+set } exercise={exercise} set={set} setSetList={setSetList} setList={setList}/>)}
                </ul>
            </div>
            <div onClick={e => toggleBannerState(e)} className="container next">
                <div className="expanded banner container">
                    <span> Next </span>
                </div>
                <ul>
                    {setList["next"].map( ({exercise, set}) => <SetCard key={ exercise._id+set } exercise={exercise} set={set} setSetList={setSetList} setList={setList}/>)}
                </ul>
            </div>
        </section>
    )
}

function SetCard({ exercise, set, setSetList, setList }){
    console.log(`[debug] Creating exercise card:`, exercise, set, setList)
    const { _id, title, target } = exercise
    
    const [ setWasRecorded, setSetWasRecorded ] = useState(false)
    
    const repBubbles = []

    useEffect(() => {
        console.log(setWasRecorded)
    }, [setWasRecorded])

    function recordSet(e) {
        console.log(`[debug] Recording set...`, e)

        setSetWasRecorded(true)

        try {

            const newCompletedSets = [...setList['completed'], ...setList['current']]

            setSetList(setList => ({
                "completed": newCompletedSets,
                "current": [setList['next'][0]],
                "next": setList['next'].slice(1)
            }))
            
        } catch (e) {
            console.error(e)
        }
    }

    for (let x = 0; x < target.reps; x++){
        repBubbles.push(<li key={"rep"+x} className="rep-bubble incomplete"></li>)
    }

    return (
        <li className="set-card">
            <p>Exercise: {title}</p>
            <ul className="set-card-details">
                <li> Set: {set} </li>
                <li> Reps: {target.reps} </li>
                <li> Weight: {target.weight} </li>
            </ul>
            <ul className="rep-bubbles-container">
                {repBubbles}
            </ul>
            {setWasRecorded ? (<span>Completed on {new Date(Date.now()).toLocaleDateString()}</span>) : (<button onClick={e => recordSet(e)} className="record-set">Record Set</button>)}
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