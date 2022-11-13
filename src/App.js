import './App.css'

import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Timer from './views/components/Timer';
import CurrentSession from './views/current-session';
import WorkoutsView from './views/workouts';
import EditWorkoutView from './views/edit-workout';
import CreateWorkoutView from './views/create-workout';
import Nav from './Nav';

export default function App(){
  let location = useLocation();
  console.log(location.pathname)

  const [ timer, setTimer ] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
    isPaused: "true",
    display: location.pathname === '/session' ? 'flex':'none'
  });

  // console.log('firing from app', timer)

  return (
    <>
      <Timer timer={timer} setTimer={setTimer} />
      <Routes>
        <Route exact path="/session" element={<CurrentSession timer={timer} setTimer={setTimer} />} />
        <Route exact path="/" element={<WorkoutsView timer={timer} setTimer={setTimer} />} />
        <Route exact path="/workouts" element={<WorkoutsView timer={timer} setTimer={setTimer} />} />
        <Route exact path="/workouts/edit-workout/:id" element={<EditWorkoutView />} />        
        <Route exact path="/workouts/create" element={<CreateWorkoutView />} />
      </Routes>
      <Nav />
    </>
  )
}

