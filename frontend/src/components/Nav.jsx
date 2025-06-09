import React from 'react';
import {Link} from 'react-router-dom';

export default function Nav(){
    return (
        <nav className="app-component" style={{
            position: 'fixed',
            bottom: '0',
            left: '0',
            right: '0',
            padding: '20px',
            backgroundColor: 'lightblue',
            color: 'white',
            textDecoration: 'none',
            fontSize: '20px',
            listStyle: 'none',
            margin: 0
        }}>    
            <ul style={{
                display: 'flex',
                justifyContent: 'space-around',
            }}>
                <li>
                    <Link style={{textDecoration: 'none', color: 'black'}} to="/current_session">Current Session</Link>
                </li>
                <li>
                    <Link style={{textDecoration: 'none', color: 'black'}} to="/">Workouts</Link>
                </li>
                <li>
                    <Link style={{textDecoration: 'none', color: 'black'}} to="/exercises">Exercises</Link>
                </li>
            </ul>
        </nav>
      )
}