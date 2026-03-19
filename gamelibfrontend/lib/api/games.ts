import { getJSON, postJSON, putJSON, deleteJSON, API_ENDPOINTS } from './index'
import { Game } from '@/types'

export interface GameDTO {
  id: string
  steamAppId: string
  title: string
  platforms: string[]
  storeSnapshot: string
  description: string
  shortDescription: string
  genres: string[]
  price: number
  developers: string[]
  rating: number
  releaseDate: string
  lastUpdateAt: string
  isDLC: boolean
  baseGameAppId: number
  earlyAccess: boolean
  comments?: any[]
  achievements?: any[]
}

export interface CreateGameDTO {
  steamAppId: number
  title: string
  platforms: string[]
  storeSnapshot?: string
  description: string
  shortDescription: string
  genres: string[]
  price: number
  developers: string[]
  rating: number
  releaseDate: string
  lastUpdateAt?: string
  isDLC: boolean
  baseGameAppId?: number
  earlyAccess: boolean
}

export interface UpdateGameDTO extends Partial<CreateGameDTO> {
  steamAppId: number
}

export const gamesAPI = {
  getAll: async (limit?: number) => {
    try {
      const url = API_ENDPOINTS.games.getAll(limit)
      const result = await getJSON(url)
      return Array.isArray(result) ? result : [result]
    } catch (error) {
      console.error('Failed to fetch games:', error)
      return []
    }
  },

  getById: async (id: string) => {
    try {
      const url = API_ENDPOINTS.games.getById(id)
      return await getJSON(url)
    } catch (error) {
      console.error('Failed to fetch game:', error)
      return null
    }
  },

  create: async (game: CreateGameDTO, token?: any) => {
    try {
      const url = API_ENDPOINTS.games.create()
      return await postJSON(url, { body: game, token })
    } catch (error) {
      console.error('Failed to create game:', error)
      throw error
    }
  },

  update: async (game: UpdateGameDTO, token?: any) => {
    try {
      const url = API_ENDPOINTS.games.update()
      return await putJSON(url, { body: game, token })
    } catch (error) {
      console.error('Failed to update game:', error)
      throw error
    }
  },

  delete: async (id: string, token?: any) => {
    try {
      const url = API_ENDPOINTS.games.delete(id)
      return await deleteJSON(url, { token })
    } catch (error) {
      console.error('Failed to delete game:', error)
      throw error
    }
  }
}
