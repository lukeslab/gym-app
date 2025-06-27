import React from 'react';
import { useNavigate, Link } from 'react-router-dom';



export default function Nav({ setIsLoggedIn }){
    const navigate = useNavigate()
    
    function handleLogout(){
        localStorage.removeItem("user")
        setIsLoggedIn(false)
        return navigate('/login')
    }

    return (
        <nav className="fixed bottom-0 left-0 w-full bg-sky-300">  
            <ul style={{
                display: 'flex',
                justifyContent: 'space-around',
            }}>
                <li>
                    <Link className="block px-4 py-3 text-center text-sm font-medium text-gray-700 hover:text-blue-600 text-black no-underline" to="/current_session">Current Session</Link>
                </li>
                <li>
                    <Link className="block px-4 py-3 text-center text-sm font-medium text-gray-700 hover:text-blue-600 text-black no-underline" to="/">Workouts</Link>
                </li>
                <li>
                    <Link className="block px-4 py-3 text-center text-sm font-medium text-gray-700 hover:text-blue-600 text-black no-underline" to="/exercises">Exercises</Link>
                </li>
                <li>
                    <div className="block px-4 py-3 text-center text-sm font-medium text-gray-700 hover:text-blue-600 text-black no-underline">
                        <button onClick={handleLogout}> Logout </button>
                    </div>
                </li>
            </ul>
        </nav>
      )
}