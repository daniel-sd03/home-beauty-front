import { api } from './api'

export interface SpecialtyDTO {
    id: string;
    name: string;
}

export async function fetchSpecialties(): Promise<SpecialtyDTO[]> {
    try {
        const response = await api.get<SpecialtyDTO[]>('/specialties')
        return response.data
    } catch (error) {
        console.error('Erro ao buscar especialidades:', error)
        throw new Error('Não foi possível carregar as especialidades.')
    }
}