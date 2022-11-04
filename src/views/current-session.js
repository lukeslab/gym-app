import React from 'react';
import workoutsData from '../data/workouts';
import exerciseData from '../data/exercises';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Timer(){
    const [ timer, setTimer ] = useState('00:58:55');
    let [ hours, minutes, seconds ] = timer.split(':');
    const [ timerIsPaused, setTimerIsPaused ] = useState(true);

    useEffect( async () => {
        let intervalId;
        if(!timerIsPaused){
            intervalId = setInterval(() => {
                +seconds < 9 ? seconds = `0${+seconds+1}` : seconds++
                if (seconds === 60) {
                    +minutes <= 9 ? minutes = `0${+minutes+1}` : minutes++
                    seconds = '00';
                }   
        
                if (minutes === 60) {
                    +hours < 9 ? hours = `0${+hours+1}` : hours++
                    minutes = '00';
                }
                
                setTimer(`${hours}:${minutes}:${seconds}`)
            }, 1000)
        }
    
        return () => clearInterval(intervalId);
    }, [timerIsPaused])

    function handleOnClick(){
        setTimerIsPaused(!timerIsPaused);
        console.log(timerIsPaused)
    }

    return( 
        <section style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <div style={{fontSize:'40px', marginTop: '50px'}}>{timer}</div>
            <button style={{
                backgroundColor: 'white',
                alignSelf: 'center',
                border: '1px solid black',
                padding: '20px 50px',
                marginTop: '25px',
                fontSize: '20px',
                cursor: 'pointer'
            }} onClick={handleOnClick}>{timerIsPaused ? 'Start' : 'Pause'}</button>
        </section>
    )
}

function SetList(){
    const location = useLocation();
    const title = location.state?.title || JSON.parse(localStorage.getItem('current-session'));

    useEffect(()=> {
        localStorage.setItem('current-session', JSON.stringify(title))
    }, [title])
    
    const workout = workoutsData.filter(workout => workout.title === title)[0];
    const exerciseList = workout.exercises.map(exerciseFromWorkout => {
        return exerciseData.filter(exerciseFromModel => {
            return exerciseFromWorkout === exerciseFromModel.name 
        })[0];
    }) 
    
    let setList = [];
    exerciseList.forEach(exercise => {
        for (let set = 1; set <= exercise.sets; set++){
            setList.push(
                <li style={{
                    border: '1px solid black',
                    padding: '10px',
                    marginTop: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }} key={exercise.name+set}>
                    <span style={{
                        flex: '1'
                    }}>
                        {`${exercise.name} Set ${set}: ${exercise.reps} reps @ ${exercise.weight} lbs`} 
                    </span>
                    <div>
                        <button style={{
                            backgroundColor: 'limegreen',
                            border: 'none',
                            padding: '5px 10px',
                        }}>Pass</button>
                        <button style={{
                            backgroundColor: 'red',
                            border: 'none',
                            padding: '5px 10px',
                           
                        }}>Fail</button>
                    </div>
                </li>
            )
        }
    })
    
    return (
        <ul style={{
            margin: '60px auto 100px auto',
            width: '90%',
            maxWidth: '500px',    
            minWidth: '400px',
        }}>
            {setList}
        </ul>
    )
}

export default function CurrentSession() {
    return (
        <section style={{
            textAlign: 'center',
        }}>
            <Timer />
            <SetList />
        </section>
    )
}