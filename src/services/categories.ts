// COMO DEVE FICAR (Usando a nossa 'api' do Axios)
import { api } from './api' // <--- Importa o arquivo api.ts que criamos

interface Category {
  id: number;
  name: string;
  iconName: string;
}

export async function getCategories(): Promise<Category[]> {
  const response = await api.get('/categories')
  
  return response.data
}