import { useState } from 'react'
import apiClient from '../../api/axios'
import type { AxiosError } from 'axios'
import { useAuth } from '../../auth/AuthContext'

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

export interface CreateSale {
  buyerId: string
  bookId: string
  saleDate: string
}

export interface Member {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
}

export const useSaleProvider = () => {
  const [sales, setSales] = useState<Sale[]>([])
  const { user: librarian } = useAuth()

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token')
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  const loadSales = async () => {
    try {
      const response = await apiClient.get<Sale[]>('/sales', {
        headers: getAuthHeaders(),
      })
      setSales(response.data)
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as AxiosError
        console.error(
          'Error loading sales:',
          axiosErr.response?.data || axiosErr.message,
        )
      } else {
        console.error('Error loading sales:', err)
      }
    }
  }

  const createSale = async (sale: CreateSale) => {
    if (!librarian) throw new Error('No logged-in librarian found')

    try {
      const response = await apiClient.post(
        '/sales',
        { ...sale, librarianId: librarian.id },
        { headers: getAuthHeaders() },
      )
      await loadSales()
      return response.data
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as AxiosError
        console.error(
          'Error creating sale:',
          axiosErr.response?.data || axiosErr.message,
        )
        throw axiosErr
      } else {
        console.error('Error creating sale:', err)
        throw err
      }
    }
  }

  const deleteSale = async (id: string) => {
    try {
      await apiClient.delete(`/sales/${id}`, { headers: getAuthHeaders() })
      await loadSales()
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as AxiosError
        console.error(
          'Error deleting sale:',
          axiosErr.response?.data || axiosErr.message,
        )
      } else {
        console.error('Error deleting sale:', err)
      }
    }
  }

  /** 🔹 Fetch all members from API */
  const fetchMembers = async (): Promise<Member[]> => {
    try {
      const response = await apiClient.get<Member[]>('/users/role/member', {
        headers: getAuthHeaders(),
      })
      return Array.isArray(response.data) ? response.data : []
    } catch (err) {
      console.error('Error fetching members:', err)
      return []
    }
  }

  return {
    sales,
    loadSales,
    createSale,
    deleteSale,
    fetchMembers, // ✅ Expose here
  }
}
