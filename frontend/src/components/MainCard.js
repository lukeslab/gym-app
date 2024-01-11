import React from "react"
import { Form, Link, useNavigate } from "react-router-dom"

// This is a menu card, fix it
export function MainCard({ type, data, options }) {
    const { currentSession, setShowOverwriteSessionModal } = options
    const navigate = useNavigate()

    async function startSession(workoutId) {
        // check if session exists
        const currentSession = await localStorage.getItem('currentSession')

        if (typeof currentSession === 'object') {
            console.log('text2')
            setShowOverwriteSessionModal(true)
        } else {
            // set the currentSession localStorage
            console.log('test')
            await localStorage.setItem('currentSession', JSON.stringify({ workout: { id: workoutId } }))
            navigate('current_session')
        }

        // Handle sessions in mongodb. This should create a new session with te status completed. Then, current session.js should fetch any session in status active.
    }

    return (
        <li className="flex justify-between items-center bg-white p-4 border border-gray-200">
            <span>{data.listItem.title}</span>
            <div>
                {type === 'workout' && <button onClick={() => startSession(data.listItem.id)} className="bg-blue-500 text-white px-4 py-2 mr-2">Start</button>}
                <Link to={`/edit-${type}/${data.listItem.id}`}>
                    <button className="bg-green-500 text-white px-4 py-2"> View </button>
                </Link>
            </div>
        </li>
    )
}

export default MainCard