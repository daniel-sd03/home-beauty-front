import { api } from './api'

export interface LoginResponse {
  token: string;
  role: 'USER' | 'PROFESSIONAL' | 'ADMIN';
  isProfileComplete: boolean;
}

export async function loginUser(login: string, password: string): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/auth/login', { login, password })
  return response.data
}

export async function registerUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  role: 'USER' | 'PROFESSIONAL'
) {
  // Let the global interceptor handle the errors automatically
  const response = await api.post('/auth/register', {
    firstName,
    lastName,
    login: email,
    password,
    role
  })
  return response.data
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

export async function completeProfessionalProfile(
  phone: string,
  cpf: string,
  birthDate: string,
  gender: string,
  description: string,
  whatsapp: string,
  instagramHandle: string,
  serviceRadiusKm: number,
  specialtyIds: string[]
) {
  const response = await api.post('/professionals/profile/me/onboarding', {
    phone,
    cpf,
    birthDate,
    gender,
    description,
    whatsapp,
    instagramHandle,
    serviceRadiusKm,
    specialtyIds
  })
  return response.data
}

export async function verifyAccountEmail(email: string, code: string) {
  // Errors like 'INVALID_VERIFICATION_CODE' will be translated in api.ts
  const response = await api.post('/auth/verify', {
    login: email,
    code
  })
  return response.data
}

export async function resendCodeEmail(email: string) {
  const response = await api.post('/auth/resend-code', {
    login: email
  })
  return response.data
}