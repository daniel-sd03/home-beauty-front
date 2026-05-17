import { useState, useEffect } from 'react'
import { getCategories, type Category } from '@/services/categories'

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCategories() {
      try {
        setIsLoading(true)
        const data = await getCategories()
        setCategories(data)
      } catch (err) {
        console.error(err)
        setError('Não foi possível carregar as categorias.')
      } finally {
        setIsLoading(false)
      }
    }

    loadCategories()
  }, [])


  return { categories, isLoading, error }
}