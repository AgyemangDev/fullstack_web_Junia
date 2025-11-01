import { useState } from 'react'
import apiClient from '../../api/axios'

// Interface pour une vente
export interface Sale {
  id: string
  saleDate: Date
  user: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
  book: {
    id: string
    title: string
    author: {
      id: string
      firstName: string
      lastName: string
    }
  }
}

// Interface pour créer une vente
export interface CreateSale {
  userId: string
  bookId: string
  saleDate: string
}

// Provider pour gérer les ventes
export const useSaleProvider = () => {
  const [sales, setSales] = useState<Sale[]>([])

  // Charger toutes les ventes
  const loadSales = () => {
    apiClient
      .get('/sales')
      .then(response => {
        setSales(response.data)
      })
      .catch(err => console.error(err))
  }

  // Créer une vente
  const createSale = (sale: CreateSale) => {
    return apiClient.post('/sales', {
      id: crypto.randomUUID(),
      ...sale,
    })
  }

  // Supprimer une vente
  const deleteSale = (id: string) => {
    apiClient
      .delete(`/sales/${id}`)
      .then(() => {
        loadSales()
      })
      .catch(err => console.error(err))
  }

  return {
    sales,
    loadSales,
    createSale,
    deleteSale,
  }
}

