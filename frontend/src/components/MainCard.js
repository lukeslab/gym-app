import React from "react"
import { Form, Link, useNavigate } from "react-router-dom"

// This is a menu card, fix it
export function MainCard({ type, data, options}) {
    const { currentSession, setShowOverwriteSessionModal, setOverwriteSessionWith } = options
    const navigate = useNavigate()

    async function startSession(workoutId) {
        // check if session exists
        const currentSession = await localStorage.getItem('currentSession')

        if (currentSession) {
            console.log('text2')
            setShowOverwriteSessionModal(true)
            setOverwriteSessionWith(workoutId)
        } else {
            // set the currentSession localStorage
            console.log('test')
            await localStorage.setItem('currentSession', JSON.stringify({ workout: { id: workoutId }, status: 'started' }))
            navigate('current_session')
        }
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