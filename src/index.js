import './App.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from "./routes/root"
import { 
  createBrowserRouter, 
  RouterProvider
} from 'react-router-dom';
import CurrentSession, {
  loader as sessionLoader
} from './routes/current-session';
import Workouts, {
  loader as workoutsLoader,
  action as workoutsAction
} from './routes/workouts';
import OverwriteAlert, {
  loader as overwriteSessionLoader,
} from './routes/overwrite-session'
import EditWorkout, {

} from './routes/edit-workout'

const router = createBrowserRouter([
  {
    path: "/",
    element : <Root />,
    errorElement: <p>Kaboom!</p>,
    loader: workoutsLoader,
    action: workoutsAction,
    children: [
      {
        index: true,
        element: <Workouts />,
      },
      {
        path: "/current_session",
        element: <CurrentSession />,
        loader: sessionLoader,
      },
      {
        path: "/overwrite-session",
        element: <OverwriteAlert />,
        loader: overwriteSessionLoader,
        action: overwriteSessionAction
      },
      {
        path: "/edit-workout/:id",
        element: <EditWorkout />
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