export interface Category {
  id: string;
  name: string;
  iconName: string;
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch('http://localhost:8080/categories')

  if (!response.ok) {
    throw new Error('Falha ao buscar categorias')
  }

  return response.json()
}