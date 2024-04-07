import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter, 
  RouterProvider
} from 'react-router-dom';

import Root, {
  loader as rootLoader
} from "./routes/root"
import CurrentSession, {
  loader as sessionLoader
} from './routes/current-session';
import Workouts, {
  loader as workoutsLoader,
} from './routes/workouts';
import Exercises, {
  loader as exerciseLoader,
} from './routes/exercises'
import OverwriteAlert, {
  loader as overwriteSessionLoader,
} from './routes/overwrite-session'
import EditWorkout, {
  loader as editWorkoutLoader
} from './routes/edit-workout'
import EditExercise, {
  loader as editExerciseLoader
} from './routes/edit-exercise';
import CreateWorkout from './routes/create-workout';
import CreateExercise, {
  action as createExerciseAction
} from './routes/create-exercise';
import ReactCharts from './routes/reactCharts'

const router = createBrowserRouter([
  {
    path: "/",
    element : <Root />,
    loader: rootLoader,
    // errorElement: <section><p>Houston, we have a problem.</p><img src="/img/error.gif"></img></section>,
    children: [
      {
        index: true,
        element: <Workouts />,
        loader: workoutsLoader,
      },
      {
        path: "/current_session",
        element: <CurrentSession />,
        loader: sessionLoader,
      },
      {
        path: "/overwrite-session",
        element: <OverwriteAlert />,
        loader: overwriteSessionLoader
      },
      {
        path: "/edit-workout/:id",
        element: <EditWorkout />,
        loader: editWorkoutLoader
      },
      {
        path: "/create-workout",
        element: <CreateWorkout />
      },
      {
        path: "/exercises",
        element: <Exercises />,
        loader: exerciseLoader,
      },
      {
        path: "/edit-exercise/:id",
        element: <EditExercise />,
        loader: editExerciseLoader
      },
      {
        path: "/exercises/create-exercise",
        element: <CreateExercise />,
        action: createExerciseAction
      },
      {
        path: "/react-charts",
        element: <ReactCharts />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);