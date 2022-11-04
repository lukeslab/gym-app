import './App.css'

import React from 'react';
import CurrentSession from './views/current-session';
import WorkoutsView from './views/workouts';
import EditWorkoutView from './views/edit-workout';
import CreateWorkoutView from './views/create-workout';
import Nav from './Nav';
import {Routes, Route} from 'react-router-dom';


export default function App(){
  return (
    <>
      <Routes>
        <Route exact path="/session" element={<CurrentSession />} />
        <Route exact path="/" element={<WorkoutsView />} />
        <Route exact path="/workouts" element={<WorkoutsView />} />
        <Route exact path="/workouts/edit-workout/:id" element={<EditWorkoutView />} />        
        <Route exact path="/workouts/create" element={<CreateWorkoutView />} />
      </Routes>
      <Nav />
    </>
  )
}

