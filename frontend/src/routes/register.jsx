import React from 'react';
import { redirect } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

async function createNewUser(payload) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(payload)
    }

    const response = await fetch('/users', options)
    if (!response.ok) {
        throw new Error('failed to register new user')
    }
    const message = await response.json()
    console.log('New user created!', message)
    return message
    //set user ID to localstorage.
}

export async function action({ request }) {
    const formData = await request.formData()
    const payload = Object.fromEntries(formData)
    const user = await createNewUser(payload)
    console.log('user is: ', user)

    if (user) {
        console.log('redirecting, seting storage')
        localStorage.setItem('user', user.id)
        return redirect('/')
    }
}

export default function Register(){

    return (
        <RegisterForm />
    )
}