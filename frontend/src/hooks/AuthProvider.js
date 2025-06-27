import { useContext, createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext)
}

export default function AuthProvider ({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState('')
  const navigate = useNavigate()
  console.log('user in authprovider is ', user)
  
  async function login(username, password){
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
    setUser(username)
    console.log(await response.json())
    console.log(`authorized user found`)
    return response.status
  }

  async function logout() {
    setUser(null)
    setToken("")
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}> 
      {children} 
    </AuthContext.Provider>
  )
}

