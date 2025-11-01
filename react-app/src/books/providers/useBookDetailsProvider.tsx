import { useState } from 'react'
import type { BookModel } from '../BookModel'
import apiClient from '../../api/axios'

export const useBookDetailsProvider = (id: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [book, setBook] = useState<BookModel | null>(null)

  const loadBook = () => {
    setIsLoading(true)
    apiClient
      .get(`/books/${id}`)
      .then(response => {
        setBook(response.data)
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false))
  }

  return { isLoading, book, loadBook }
}
