import React, { useState } from 'react';
import { redirect, Form } from 'react-router-dom';
import LoginForm from '../components/LoginForm';


async function authenticateUser({username, password}) {
  const credentials = btoa(`${username}:${password}`, 'base64')
  console.log('authenticating user')
    const body = {
        username,
        password
    }
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Basic ${credentials}`,
            "Content-Type":"application/json"
        },
        body: JSON.stringify(body)
    }
    const response = await fetch('/users/auth', options)
    if (!response.ok) {
        throw new Error('failed to authorize user')
    }
    console.log(`authorized user found`)
    return response.status
}

export async function action ({ request }){
    const formData = await request.formData()
    console.log(formData)
    const credentials = Object.fromEntries(formData)
    console.log(credentials)
    const responseStatus = await authenticateUser(credentials) 

    if (responseStatus === 200) {
      localStorage.setItem('user', 'The Texan')
      return redirect('/')
    }
}

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your authentication logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <LoginForm />
  );
}