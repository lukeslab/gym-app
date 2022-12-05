import './App.css'

import React, { useState,useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Timer from './components/Timer';
import CurrentSession from './views/current-session';
import WorkoutsView from './routes/workouts';
import EditWorkoutView from './views/edit-workout';
import CreateWorkoutView from './routes/create-workout';
import Nav from './components/Nav';

export default function App(){
  let location = useLocation();
  
  const [ currentSession, setCurrentSession ] = useState({title: null, id: null})
  const [ timer, setTimer ] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
    isPaused: true,
    display: location.pathname === '/session' ? 'flex' : 'none'
  });

  // Resets the timer on session change.
  useEffect( ()=> {
    if (currentSession) setTimer({
      ...timer,
      hours: "00",
      minutes: "00",
      seconds: "00",
      isPaused: true,
    })
  }, [currentSession])

  return (
    <>
      <Timer timer={timer} setTimer={setTimer} />
      <Routes>
        <Route exact path="/session" element={<CurrentSession currentSession={currentSession}/>} />
        <Route exact path="/" element={<WorkoutsView currentSession={currentSession} setCurrentSession={setCurrentSession}/>} />
        <Route exact path="/workouts" element={<WorkoutsView currentSession={currentSession} setCurrentSession={setCurrentSession}/>} />
        <Route exact path="/workouts/edit-workout/:id" element={<EditWorkoutView />} />        
        <Route exact path="/workouts/create" element={<CreateWorkoutView />} />
      </Routes>
      <Nav />
    </>
  )
}

