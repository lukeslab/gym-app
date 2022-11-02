import React from 'react';
import {Link} from 'react-router-dom';

export default function Nav(){
    return (
        <ul style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            display: 'flex',
            padding: '20px',
            backgroundColor: 'lightblue',
            color: 'white',
            textDecoration: 'none',
            justifyContent: 'space-around',
            fontSize: '20px',
        }}>
            <li>
                <Link style={{textDecoration: 'none', color: 'black'}} to="/session">Current Session</Link>
            </li>
            <li>
                <Link style={{textDecoration: 'none', color: 'black'}} to="/workouts">Workouts</Link>
            </li>
            <li>
                <Link style={{textDecoration: 'none', color: 'black'}} to="/exercises">Exercises</Link>
            </li>
        </ul>
      )
}