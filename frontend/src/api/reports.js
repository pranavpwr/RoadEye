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

export const getReports = async (filters = {}) => {
  return api.get('/reports', { params: filters })
}

export const getReportById = async (id) => {
  return api.get(`/reports/${id}`)
}

export const createReport = async (reportData) => {
  const formData = new FormData()
  
  // Append all report data to FormData
  Object.keys(reportData).forEach(key => {
    if (key === 'images' && reportData[key]) {
      reportData[key].forEach(image => {
        formData.append('images', image)
      })
    } else {
      formData.append(key, reportData[key])
    }
  })

  return api.post('/reports', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const updateReport = async (id, reportData) => {
  return api.put(`/reports/${id}`, reportData)
}

export const deleteReport = async (id) => {
  return api.delete(`/reports/${id}`)
}

export const updateReportStatus = async (id, status) => {
  return api.patch(`/reports/${id}/status`, { status })
}

export const getReportStats = async () => {
  return api.get('/reports/stats')
} 