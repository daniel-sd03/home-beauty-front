import axios from 'axios'
import { ErrorDictionary } from '@/constants/errorMessages'

export const api = axios.create({
  baseURL: 'http://localhost:8080', 
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status
        const requestUrl = error.config?.url || ''
        const data = error.response?.data
        const errorCode = data?.errorCode
  
        // 1. SECURITY RULE
        // If 401 and not a login attempt, token expired. Clear storage and redirect.
        if (status === 401 && !requestUrl.includes('/auth/login')) {
            localStorage.clear()
            window.location.href = '/login'
            return Promise.reject(error)
        }
  
        // 2. DICTIONARY LOOKUP
        let translatedMessage = errorCode ? ErrorDictionary[errorCode] : undefined
  
        // Fallbacks for network or internal server errors
        if (!translatedMessage) {
            if (!error.response) {
                translatedMessage = 'Não foi possível conectar ao servidor. Verifique sua internet.'
            } else if (status === 500) {
                translatedMessage = 'Erro interno no servidor. Nossa equipe já foi notificada.'
            } else {
                translatedMessage = data?.message || 'Ocorreu um erro inesperado. Tente novamente.'
            }
        }
  
        // 3. DATA INJECTION
        error.message = translatedMessage
        if (errorCode) {
            error.code = errorCode
        }
  
        return Promise.reject(error)
    }
  )