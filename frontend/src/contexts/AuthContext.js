import React, { createContext, useContext, useReducer, useEffect } from 'react'

const AuthContext = createContext()

const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: true
}

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false
            }
        case 'LOGOUT':
            localStorage.removeItem('token')
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false
            }
        case 'LOAD_USER':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                isLoading: false
            }
        case 'AUTH_ERROR':
            localStorage.removeItem('token')
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false
            }
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload
            }
        default:
            return state
    }
}

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState)

    // Load user on app start if token exists
    useEffect(() => {
        if (state.token) {
            loadUser()
        } else {
            dispatch({ type: 'SET_LOADING', payload: false })
        }
    }, [])

    // Set auth token in axios headers
    const setAuthToken = (token) => {
        if (token) {
            // Apply to every request
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        } else {
            // Delete auth header
            delete axios.defaults.headers.common['Authorization']
        }
    }

    // Load user
    const loadUser = async () => {
        try {
            setAuthToken(state.token)
            const response = await fetch('/auth/me', {
                headers: {
                    'Authorization': `Bearer ${state.token}`
                }
            })

            if (response.ok) {
                const user = await response.json()
                dispatch({ type: 'LOAD_USER', payload: user })
            } else {
                dispatch({ type: 'AUTH_ERROR' })
            }
        } catch (error) {
            console.error('Error loading user:', error)
            dispatch({ type: 'AUTH_ERROR' })
        }
    }

    // Login user
    const login = async (email, password) => {
        try {
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()

            if (response.ok) {
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: {
                        user: data,
                        token: data.token
                    }
                })
                setAuthToken(data.token)
                return { success: true }
            } else {
                return { success: false, message: data.message }
            }
        } catch (error) {
            console.error('Login error:', error)
            return { success: false, message: 'Network error occurred' }
        }
    }

    // Register user
    const register = async (username, email, password) => {
        try {
            const response = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            })

            const data = await response.json()

            if (response.ok) {
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: {
                        user: data,
                        token: data.token
                    }
                })
                setAuthToken(data.token)
                return { success: true }
            } else {
                return { success: false, message: data.message }
            }
        } catch (error) {
            console.error('Registration error:', error)
            return { success: false, message: 'Network error occurred' }
        }
    }

    // Logout user
    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        setAuthToken(null)
    }

    const value = {
        ...state,
        login,
        register,
        logout,
        loadUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}