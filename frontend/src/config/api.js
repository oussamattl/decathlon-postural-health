// Configuration de l'API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export const API_ENDPOINTS = {
  HEALTH: `${API_URL}/api/health`,
  RECOMMENDATIONS: `${API_URL}/api/recommendations`
}

export default API_URL

