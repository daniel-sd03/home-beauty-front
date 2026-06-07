import { api } from './api'

interface LoginResponse {
  token: string;
}

export async function loginUser(login: string, password: string): Promise<string> {
  try {
    const response = await api.post<LoginResponse>('/auth/login', { login, password })

    return response.data.token

  } catch (error) {
    throw new Error('E-mail ou senha inválidos. Tente novamente.')
  }
}

export async function registerUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  role: 'USER' | 'PROFESSIONAL'
) {
  try {
    const response = await api.post('/auth/register', {
      firstName,
      lastName,
      login: email,
      password,
      role
    })

    return response.data
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message)
    }
    throw new Error('Não foi possível criar sua conta. Verifique os dados e tente novamente.')
  }
}

export async function verifyAccountEmail(email: string, code: string) {
  try {
    const response = await api.post('/auth/verify', {
      login: email,
      code        
    })
    return response.data
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message)
    }
    throw new Error('Código inválido ou expirado. Tente novamente.')
  }
}

export async function resendCodeEmail(email: string) {
  try {
    const response = await api.post('/auth/resend-code', {
      login: email
    })
    return response.data
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message)
    }
    throw new Error('Não foi possível reenviar o código. Tente novamente mais tarde.')
  }
}