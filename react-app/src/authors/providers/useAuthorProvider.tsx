import { useState } from 'react'
import apiClient from '../../api/axios'
import type { BookModel } from '../../books/BookModel'

export interface Author {
  id: string
  firstName: string
  lastName: string
  biography?: string
  nationality?: string
  photo?: string
}

export interface CreateAuthor {
  firstName: string
  lastName: string
  biography?: string
  nationality?: string
  photo?: string
}

export type UpdateAuthor = Partial<CreateAuthor>

export const useAuthorProvider = () => {
  const [authors, setAuthors] = useState<Author[]>([])
  const [books, setBooks] = useState<BookModel[]>([])

  const loadAuthors = async () => {
    try {
      const res = await apiClient.get<Author[]>('/authors')
      setAuthors(res.data)
      return res.data
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const createAuthor = async (author: CreateAuthor) => {
    await apiClient.post('/authors', author)
    await loadAuthors()
  }

  const updateAuthor = async (id: string, input: UpdateAuthor) => {
    await apiClient.patch(`/authors/${id}`, input)
    await loadAuthors()
  }

  const deleteAuthor = async (id: string) => {
    await apiClient.delete(`/authors/${id}`)
    await loadAuthors()
  }

  const getBooksByAuthor = async (id: string) => {
    try {
      const res = await apiClient.get<BookModel[]>(`/authors/${id}/books`)
      setBooks(res.data)
      return res.data
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  return {
    authors,
    books,
    loadAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    getBooksByAuthor,
  }
}
