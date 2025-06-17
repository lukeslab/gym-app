import React, { useState } from 'react';
import { Form } from 'react-router-dom';


async function authenticateUser(username, password) {
    console.log('authenticating user')
    const body = {
        username,
        password
    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(body)
    }
    const response = await fetch('/auth/login', options)
    if (!response.ok) {
        throw new Error('failed to authorize user')
    }
    const message = await response.json()
    console.log(`authorized user found`)
    return message;
}

async function action ({ request }){
    const { username, password } = await request.formData();
    const user = authenticateUser(username, password) 
    return user
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
    <Form action='.' method='post'>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </Form>
  );
}