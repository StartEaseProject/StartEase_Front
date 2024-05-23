import { useState, createContext, useContext, useEffect } from 'react'
import { LoadingAnimation } from './components/Globals'
import API from './utils/api-client'

const AuthContext = createContext({})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProdiver({ children }) {
  const [auth, setAuth] = useState()
  const [loading, setLoading] = useState(true)

  const authenticate = async (email, password) => {
    let success = null
    let error = null
    let errors = null
    try {
      const res = await API.post('/authenticate', { email, password })
      const data = res.data.data
      localStorage.setItem('auth_token', data.token)
      success = res.data.message
      setAuth(data.user)
    } catch (e) {
      error = e.response.data.message
      errors = e.response.data.errors
    } finally {
      return { success, error, errors }
    }
  }

  const logout = async () => {
    let success = null
    let error = null
    try {
      const res = await API.post('/logout')
      localStorage.removeItem('auth_token')
      success = res.data.message
      setAuth(null)
    } catch (e) {
      error = e.response.data.message
    } finally {
      return { success, error }
    }
  }

  const updateUsername = async (username) => {
    let success = null
    let error = null
    let errors = null
    try {
      const res = await API.put('users/update/username', { username })
      const data = res.data.data
      success = res.data.message
      setAuth(data.user)
    } catch (e) {
      error = e.response.data.message
      errors = e.response.data.errors
    } finally {
      return { success, error, errors }
    }
  }

  const updatePhoto = async (image) => {
    let success = null
    let error = null
    let errors = null
    const formData = new FormData()
    formData.append('image', image)
    try {
      const res = await API.post('users/update/photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      const data = res.data.data
      success = res.data.message
      setAuth(data.user)
    } catch (e) {
      error = e.response.data.message
      errors = e.response.data.errors
    } finally {
      return { success, error, errors }
    }
  }

  const updatePhone = async (verif_code) => {
    let success = null
    let error = null
    try {
      const res = await API.post('users/update/phonenumber/otp', { verif_code })
      success = res.data.message
      const data = res.data.data
      setAuth(data.user)
    } catch (e) {
      error = e.response.data.message
    } finally {
      return { success, error }
    }
  }

  const getAuthUser = async () => {
    const auth_token = localStorage.getItem('auth_token')
    if (!auth_token) {
      setLoading(false)
      return
    }
    try {
      const res = await API.get('/auth')
      const data = res.data.data
      setAuth(data.user)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAuthUser()
  }, [])

  const value = {
    auth,
    authenticate,
    logout,
    updateUsername,
    updatePhoto,
    updatePhone,
    getAuthUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {loading ? <LoadingAnimation className='scale-[0.5]' /> : children}
    </AuthContext.Provider>
  )
}
