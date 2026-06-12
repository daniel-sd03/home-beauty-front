import { api } from './api' 

interface LoginResponse {
  token: string;
  role: 'USER' | 'PROFESSIONAL' | 'ADMIN';
  isProfileComplete: boolean;
}

export async function loginUser(login: string, password: string): Promise<LoginResponse> {
  try {
    const response = await api.post<LoginResponse>('/auth/login', { login, password })
<<<<<<< Updated upstream
    
    return response.data.token
=======
    return response.data
>>>>>>> Stashed changes

  } catch (error) {
    const status = error.response?.status
    const backendMessage = (error.response?.data?.message || '').toLowerCase()

    if (status === 403 && (backendMessage.includes('not activated yet') || backendMessage.includes('verification code'))) {
      throw { code: 'UNVERIFIED_EMAIL', message: 'E-mail pendente de verificação' }
    }

    throw error;
  }
<<<<<<< Updated upstream
=======
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

export async function completeClientProfile(phone: string, cpf: string, birthDate: string, gender: string) {
  const response = await api.put('/users/me/profile', {
    phone,
    cpf,
    birthDate,
    gender
  })
  return response.data
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
>>>>>>> Stashed changes
}