import { useState } from 'react'
import type { BookModel } from '../BookModel'
import apiClient from '../../api/axios'

export const useBookAuthorsProviders = () => {
  const [authors, setAuthors] = useState<BookModel['author'][]>([])

  const loadAuthors = () => {
    apiClient
      .get('/authors')
      .then(data => {
        setAuthors(data.data)
      })
      .catch(err => console.error(err))
  }

  return { authors, loadAuthors }
}
