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

export const getOfficerDashboard = async () => {
  return api.get('/officer/dashboard')
}

export const getOfficerReports = async (filters = {}) => {
  return api.get('/officer/reports', { params: filters })
}

export const getOfficerStats = async () => {
  return api.get('/officer/stats')
}

export const updateOfficerProfile = async (profileData) => {
  return api.put('/officer/profile', profileData)
}

export const getOfficerNotifications = async () => {
  return api.get('/officer/notifications')
}

export const markNotificationAsRead = async (notificationId) => {
  return api.patch(`/officer/notifications/${notificationId}/read`)
} 