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
        path: "/session",
        element: <CurrentSession />,
        loader: sessionLoader,
      },
      // {
      //   path: "/workouts",
      //   element: <Workouts />,
      //   action: workoutsAction,
      //   loader: workoutsLoader
      // }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);