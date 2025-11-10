import { useState } from 'react'
import apiClient from '../../api/axios'

export interface Client {
  id: string
  name: string
  email: string
  phone?: string
}

export const useClientProvider = () => {
  const [clients, setClients] = useState<Client[]>([])

  const loadClients = () => {
    apiClient
      .get('/clients')
      .then(res => setClients(res.data))
      .catch(err => console.error(err))
  }

  const createClient = (client: any) => {
    return apiClient.post('/clients', client).then(() => loadClients())
  }

  const deleteClient = (id: string) => {
    return apiClient.delete(`/clients/${id}`).then(() => loadClients())
  }

  return { clients, loadClients, createClient, deleteClient }
}
