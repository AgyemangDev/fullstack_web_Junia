import { useState } from 'react'
import type { BookModel, CreateBookModel, UpdateBookModel } from '../BookModel'
import apiClient from '../../api/axios'

export const useBookProvider = () => {
  const [books, setBooks] = useState<BookModel[]>([])

  const loadBooks = () => {
    apiClient
      .get('/books')
      .then(data => {
        setBooks(data.data.data)
      })
      .catch(err => console.error(err))
  }

  const createBook = (book: CreateBookModel) => {
    apiClient
      .post('/books', book)
      .then(() => {
        loadBooks()
      })
      .catch(err => console.error(err))
  }

  const updateBook = (id: string, input: UpdateBookModel) => {
    apiClient
      .patch(`/books/${id}`, input)
      .then(() => {
        loadBooks()
      })
      .catch(err => console.error(err))
  }

  const deleteBook = (id: string) => {
    apiClient
      .delete(`/books/${id}`)
      .then(() => {
        loadBooks()
      })
      .catch(err => console.error(err))
  }

  return { books, loadBooks, createBook, updateBook, deleteBook }
}
