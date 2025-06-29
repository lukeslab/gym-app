// API utility functions with authentication
const API_BASE_URL = process.env.REACT_APP_API_URL || ''

class ApiError extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}

const getAuthHeaders = () => {
    const token = localStorage.getItem('token')
    return token ? { 'Authorization': `Bearer ${token}` } : {}
}

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Network error' }))
        throw new ApiError(error.message || 'Request failed', response.status)
    }
    return response.json()
}

export const apiRequest = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
            ...options.headers
        },
        ...options
    }

    try {
        const response = await fetch(url, config)
        return await handleResponse(response)
    } catch (error) {
        if (error.status === 401) {
            // Token expired or invalid, redirect to login
            localStorage.removeItem('token')
            window.location.href = '/login'
        }
        throw error
    }
}

// Updated functions to use authenticated requests
export async function getCurrentUserId() {
    try {
        const user = await apiRequest('/auth/me')
        return user._id
    } catch (error) {
        console.error('Error getting current user:', error)
        throw error
    }
}

export async function getUserWorkouts() {
    try {
        const userId = await getCurrentUserId()
        return await apiRequest(`/workouts/user/${userId}`)
    } catch (error) {
        console.error('Error fetching workouts:', error)
        throw error
    }
}

export async function getAllExercises() {
    try {
        return await apiRequest('/exercises')
    } catch (error) {
        console.error('Error fetching exercises:', error)
        throw error
    }
}

export async function createExercise(exerciseData) {
    try {
        return await apiRequest('/exercises', {
            method: 'POST',
            body: JSON.stringify(exerciseData)
        })
    } catch (error) {
        console.error('Error creating exercise:', error)
        throw error
    }
}