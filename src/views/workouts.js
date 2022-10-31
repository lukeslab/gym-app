import React from 'react';
import workoutsData from '../data/workouts';
import {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';

function Workout({title, id}){
    const navigate = useNavigate();

    function onStart(){
        navigate('../session', {state: { title, id }})
    }

    return (
        <div>
            <span>{title}</span>
            <button onClick={onStart}>
                {/* <Link to="../session">Start</Link> */}
                Start
            </button>
            <button>
                <Link to={`./edit-workout/${id}`}>Edit</Link>
            </button>
        </div>
    )
}

export default function Workouts() {
    return (
        <>
            <h1>My Workouts</h1>
            <ul>
                {workoutsData.map((workout, index) => {
                    return(
                        <li key={index}>
                            <Workout id={index} title={workout.title}/>
                        </li>
                    )
                })}
                <li><Link to="./create">new workout <span>+</span></Link></li>
            </ul>
        </>
    )
}