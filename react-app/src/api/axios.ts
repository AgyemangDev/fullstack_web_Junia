import axios from 'axios'

// Create an Axios instance with base configuration
const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor to add token to each request
apiClient.interceptors.request.use(
  config => {
    // Get the token from localStorage
    const token = localStorage.getItem('token')

    if (token) {
      // Add the token in the Authorization header
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  },
)

// Interceptor to handle response errors
apiClient.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // If the error is 401 (unauthorized), disconnect the user
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }

    return Promise.reject(error)
  },
)

export default apiClient
