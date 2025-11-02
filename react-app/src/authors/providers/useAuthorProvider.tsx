import { useState } from 'react'
import apiClient from '../../api/axios'

// Interface pour un auteur
export interface Author {
  id: string
  firstName: string
  lastName: string
  biography?: string
  nationality?: string
  photo?: string
}

// Interface pour créer un auteur
export interface CreateAuthor {
  firstName: string
  lastName: string
  biography?: string
  nationality?: string
  photo?: string
}

// Interface pour mettre à jour un auteur
export type UpdateAuthor = Partial<CreateAuthor>

// Provider pour gérer les auteurs
export const useAuthorProvider = () => {
  const [authors, setAuthors] = useState<Author[]>([])

  // Charger tous les auteurs
  const loadAuthors = () => {
    apiClient
      .get('/authors')
      .then(response => {
        setAuthors(response.data)
      })
      .catch(err => console.error(err))
  }

  // Créer un auteur
  const createAuthor = (author: CreateAuthor) => {
    apiClient
      .post('/authors', author)
      .then(() => {
        loadAuthors()
      })
      .catch(err => console.error(err))
  }

  // Mettre à jour un auteur
  const updateAuthor = (id: string, input: UpdateAuthor) => {
    apiClient
      .patch(`/authors/${id}`, input)
      .then(() => {
        loadAuthors()
      })
      .catch(err => console.error(err))
  }

  // Supprimer un auteur
  const deleteAuthor = (id: string) => {
    apiClient
      .delete(`/authors/${id}`)
      .then(() => {
        loadAuthors()
      })
      .catch(err => console.error(err))
  }

  return {
    authors,
    loadAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor,
  }
}
