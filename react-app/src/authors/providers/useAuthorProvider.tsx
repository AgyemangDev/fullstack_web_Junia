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

export interface Book {
  id: string
  title: string
  publicationYear?: number
  genre?: string
  cover?: string
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

  const loadAuthors = () => {
    return apiClient
      .get<Author[]>('/authors')
      .then(res => {
        setAuthors(res.data)
        return res.data
      })
      .catch(err => {
        console.error(err)
        throw err
      })
  }

  const createAuthor = (author: CreateAuthor) => {
    return apiClient
      .post('/authors', author)
      .then(() => loadAuthors())
      .catch(err => {
        console.error(err)
        throw err
      })
  }

  const updateAuthor = (id: string, input: UpdateAuthor) => {
    return apiClient
      .patch(`/authors/${id}`, input)
      .then(() => loadAuthors())
      .catch(err => {
        console.error(err)
        throw err
      })
  }

  const deleteAuthor = (id: string) => {
    return apiClient
      .delete(`/authors/${id}`)
      .then(() => loadAuthors())
      .catch(err => {
        console.error(err)
        throw err
      })
  }

  const getBooksByAuthor = (id: string) => {
    return apiClient
      .get<Book[]>(`/authors/${id}/books`)
      .then(res => {
        setBooks(res.data as BookModel[])
        return res.data
      })
      .catch(err => {
        console.error(err)
        throw err
      })
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
