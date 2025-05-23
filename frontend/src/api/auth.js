import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
})

export const loginUser = async (email, password) => {
  return api.post('/auth/login', { email, password })
}

export const registerUser = async (userData) => {
  return api.post('/auth/register', userData)
}

export const logoutUser = async () => {
  return api.post('/auth/logout')
}

export const getCurrentUser = async () => {
  return api.get('/auth/me')
} 