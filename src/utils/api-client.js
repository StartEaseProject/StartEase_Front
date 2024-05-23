import axios from 'axios'

/**
  Axios instance to send requests
*/
const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  timeout: 20000,
})

// Add a request interceptor to add the token to each request
API.interceptors.request.use(async (config) => {
  const auth_token = localStorage.getItem('auth_token') // retreive token from local storage

  // If the token exists, add it to the Authorization header
  if (auth_token) {
    config.headers.Authorization = `Bearer ${auth_token}`
  }

  return config
})

export default API
  