import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter, 
  RouterProvider
} from 'react-router-dom';
import AuthProvider from './hooks/AuthProvider';
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
import CreateSetHistoryCollection, {
  loader as createSetHistoryCollectionLoader
} from './routes/createSetHistoryCollection';
import Register, {
  action as registerAction
} from './routes/register';
import Login, {
  loader as loginLoader,
  action as loginAction
} from './routes/login';
import PrivateRoute from './routes/PrivateRoute';

const router = createBrowserRouter([
  {
    Component: Root,
    children: [
      {
        path: "/register",
        Component: Register,
        action: registerAction
      },
      {
        path: "/login",
        Component: Login,
        loader: loginLoader,
        action: loginAction
      },
      {
        path: "/",
        Component: PrivateRoute,
        children: [
          {
            index: true,
            Component: Workouts,
            loader: workoutsLoader,
          },
          {
            path: "/current_session",
            Component: CurrentSession,
            loader: sessionLoader,
          },
          {
            path: "/overwrite-session",
            Component: OverwriteAlert,
            loader: overwriteSessionLoader
          },
          {
            path: "/edit-workout/:id",
            Component: EditWorkout,
            loader: editWorkoutLoader
          },
          {
            path: "/create-workout",
            Component: CreateWorkout
          },
          {
            path: "/exercises",
            Component: Exercises,
            loader: exerciseLoader,
          },
          {
            path: "/edit-exercise/:id",
            Component: EditExercise,
            loader: editExerciseLoader
          },
          {
            path: "/exercises/create-exercise",
            Component: CreateExercise,
            action: createExerciseAction
          },
          {
            path: "/react-charts",
            Component: ReactCharts
          },
          {
            path: "/data/seed",
            Component: CreateSetHistoryCollection,
            loader: createSetHistoryCollectionLoader
          }
        ]
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} >
      
    </RouterProvider>
  </React.StrictMode>
);