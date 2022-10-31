import React from 'react';
import {Link} from 'react-router-dom';

export default function Nav(){
    return (
        <ul>
            <li>
                <Link to="/session">Current Session</Link>
            </li>
            <li>
                <Link to="/workouts">Workouts</Link>
            </li>
            <li>
                <Link to="/exercises">Exercises</Link>
            </li>
        </ul>
      )
}