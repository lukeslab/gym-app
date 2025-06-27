import React, { useState } from 'react';
import { useActionData, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';
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
  
  return credentials

  // const responseStatus = await authenticateUser(credentials) 

  // if (responseStatus === 200) {
  //   console.log('user set', credentials)
  //   localStorage.setItem('user', 'The Texan')
  //   return redirectDocument('/')
  // }
}

export async function loader(){
  // const user = localStorage.getItem('user')

  // if (user) return redirect('/')
}

export default function Login() {
  const navigate = useNavigate()
  const credentials = useActionData()
  console.log('creds from Login route', credentials)
  const auth = useAuth()

  async function handleLogin() {
    const status =  await auth.login(credentials.username, credentials.password)
    if (status === 200) {
      console.log('authorized user found')
      return navigate('/')
    }
  }

  if (credentials) {

    const status = handleLogin()
    console.log('status is, ', status)

  }

  return (
    <div className="mx-p-4 max-w-md mx-auto">
      <LoginForm />
      <Link to="/register" className="underline decoration-sky-500 my-50 block"> I do not have an account. </Link>
      <Link to="*" className="underline decoration-sky-500 my-50"> I forgot my password. </Link>
    </div>
  );
}