import './App.css'

import React from 'react';
import {useState} from 'react';
import CurrentSession from './views/current-session';
import WorkoutsView from './views/workouts';
import EditWorkoutView from './views/edit-workout';
import CreateWorkoutView from './views/create-workout';
import Nav from './Nav';
import {Routes, Route} from 'react-router-dom';


export default function App(){
  const [ timer, setTimer ] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
    isPaused: "true"
  });
  // let [ hours, minutes, seconds ] = timer.split(':');
  // const [ timerIsPaused, setTimerIsPaused ] = useState(true);

  return (
    <>
      <Routes>
        <Route exact path="/session" element={<CurrentSession timer={timer} setTimer={setTimer}/>} />
        <Route exact path="/" element={<WorkoutsView />} />
        <Route exact path="/workouts" element={<WorkoutsView />} />
        <Route exact path="/workouts/edit-workout/:id" element={<EditWorkoutView />} />        
        <Route exact path="/workouts/create" element={<CreateWorkoutView />} />
      </Routes>
      <Nav />
    </>
  )
}

