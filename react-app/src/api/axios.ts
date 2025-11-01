import axios from 'axios'

// Création d'une instance Axios avec une configuration de base
const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Intercepteur pour ajouter le token à chaque requête
apiClient.interceptors.request.use(
  (config) => {
    // Récupérer le token depuis le localStorage
    const token = localStorage.getItem('token')
    
    if (token) {
      // Ajouter le token dans le header Authorization
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Intercepteur pour gérer les erreurs de réponse
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Si l'erreur est 401 (non autorisé), déconnecter l'utilisateur
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    
    return Promise.reject(error)
  }
)

export default apiClient

