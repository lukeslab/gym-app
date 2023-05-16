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
    const [ completedSets, setCompletedSets ] = useState([])
    const [ currentSet, setCurrentSet ] = useState()
    const [ nextSet, setNextSet ] = useState()
    const [ setList, setSetList ] = useState({
        "completed-sets": [],
        "current-set": [],
        "next-set": []
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

    // Display the set cards for those completed, current, and next.
    
    useEffect(() => {
        console.log('ifired')
        const newSetList = {
            "completed-sets": [],
            "current-set": [],
            "next-set": []
        }

        exercises.forEach( (exercise, index) => {
            const { _id, target:{ sets } } = exercise
            console.log(exercise)
            for (let set = 1; set <= sets; set++) {
                if (set === 1 && index === 0) newSetList["current-set"].push(<ExerciseCard key={ _id+set } exercise={exercise} set={set} setSetList={setSetList} setList={setList}/>)
                else newSetList["next-set"].push( <ExerciseCard key={ _id+set } exercise={exercise} set={set} setSetList={setSetList} setList={setList}/> )
            }
        })

        setSetList(newSetList)

    }, [])

    console.log('this is setlist', setList)
    return (
        <section className="container set-list">
            <div className="container completed-sets ">
                <div onClick={e => toggleBannerState(e)} className="banner container">
                    <span> Completed Sets </span>
                </div>
                <ul>
                    {setList["completed-sets"]}
                </ul>
            </div>
            <div className="container current-set ">
                <div className="banner container"> 
                    <span> Current Set </span>
                </div>
                <ul>
                    {setList["current-set"]}
                </ul>
            </div>
            <div onClick={e => toggleBannerState(e)} className="container next-sets">
                <div className="expanded banner container">
                    <span> Next Sets </span>
                </div>
                <ul>
                    {setList["next-set"]}
                </ul>
            </div>
        </section>
    )
}

function ExerciseCard({ exercise, set, setSetList, setList }){
    const { _id, title, target } = exercise
    console.log(`[debug] Creating exercise card: ${title} ${set} ${_id}`)
    console.log('whats up with setlist', setList)
    const repBubbles = []

    function recordSet(e) {
        console.log(`[debug] Recording set...`, e)
        const setCardElem = e.target.parentElement
        const completedDate = new Date(Date.now())
        try {
            e.target.style.display = 'none';

            const completedDateElem = document.createElement('span')
            completedDateElem.innerText = `Completed on ${completedDate.toLocaleDateString()}`
            setCardElem.append(completedDateElem)

            // update state
            const newSetList = {
                "completed-sets": [],
                "current-set": {},
                "next-set": []
            }

            console.log('thing here', setList)
            newSetList['completed-sets'] = [...setList['current-set']]
            newSetList['current-set'] = setList['next-set'][0]
            newSetList['next-set']  = setList['next-set'].slice(2)
            console.log('new set list',newSetList)
            setSetList(newSetList)
            
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
            <button onClick={e => recordSet(e)} className="record-set">Record Set</button>
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