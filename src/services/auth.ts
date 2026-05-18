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