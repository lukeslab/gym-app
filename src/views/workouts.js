import React from 'react';
import Timer from './components/Timer';
import workoutsData from '../data/workouts';
import {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';

function Workout({title, id}){
    const navigate = useNavigate();

    function onStart(){
        navigate('../session', {state: { title, id }})
    }

    return (
        <>
            <span>{title}</span>
            <div style={{marginLeft: '20px'}}>
                <button style={{
                    marginLeft: '20px',
                    backgroundColor: 'white',
                    border: 'none',
                    cursor: 'pointer'
                }} onClick={onStart}>
                    Start
                </button>
                <button style={{
                    marginLeft: '20px',
                    backgroundColor: 'white',
                    border: 'none',
                    cursor: 'pointer',
                }}>
                    <Link style={{textDecoration: 'none'}}to={`./edit-workout/${id}`}>Edit</Link>
                </button>
            </div>
        </>
    )
}

export default function Workouts({timer, setTimer}) {
    
    // useEffect(()=>{
    //     setTimer({
    //         ...timer,
    //         display: 'none'
    //     })
    // }, [timer.display])

    const toDisplay = document.querySelector('.timer')
    console.log(toDisplay) // for some reason its rendering after itp asses over this

    if (toDisplay) toDisplay.style.display = 'none';
    
    return (
        <section style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '50px'
        }}>
            <h1 style={{
                fontSize: '30px', 
                textTransform: 'uppercase', 
                fontFamily:'sans-serif'
            }}>
                My Workouts
            </h1>
            <ul style={{ marginTop: '50px'}}>
                {workoutsData.map((workout, index) => {
                    return(
                        <li style={{
                            border: '1px solid black',
                            padding: '10px 30px',
                            marginTop: '10px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }} key={index}>
                            <Workout id={index} title={workout.title}/>
                        </li>
                    )
                })}
                <li style={{
                    border: '1px solid black',
                    padding: '10px 30px',
                    marginTop: '10px',
                    backgroundColor: 'limegreen',
                    textAlign: 'center'
                }}>
                    <Link style={{textDecoration:'none', color: 'black'}}to="./create">
                        new workout 
                        <span style={{marginLeft: '10px', padding: '5px 10px', borderRadius: '50px', border: '1px solid black'}}>+</span>
                    </Link>
                </li>
            </ul>
        </section>
    )
}