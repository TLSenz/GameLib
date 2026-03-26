import { getJSON, postJSON, putJSON, deleteJSON, API_ENDPOINTS } from './index'
import { Game } from '@/types/index'

export interface PaginatedResponse<T> {
  content: T[]
  empty: boolean
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
  pageable: {
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    sort: any
    unpaged: boolean
  }
  size: number
  sort: any
  totalElements: number
  totalPages: number
}

export interface GameDTO {
  id: string
  steamAppId?: string | number
  title?: string
  platforms?: string[]
  storeSnapshot?: string
  description?: string
  shortDescription?: string
  genres?: string[]
  price?: number
  developers?: string[]
  rating?: number
  releaseDate?: string
  lastUpdateAt?: string
  isDLC?: boolean
  baseGameAppId?: number
  earlyAccess?: boolean
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
  price?: number
  developers: string[]
  rating?: number
  releaseDate: string
  lastUpdateAt?: string
  isDLC?: boolean
  baseGameAppId?: number
  earlyAccess?: boolean
}

export interface UpdateGameDTO extends Partial<CreateGameDTO> {
  id?: string
  steamAppId?: number
}

export const gamesAPI = {
  getAll: async (page: number = 0, size: number = 20): Promise<PaginatedResponse<Game>> => {
    try {
      const url = API_ENDPOINTS.games.getAll(page, size)
      const result = await getJSON(url)
      return result
    } catch (error) {
      console.error('Failed to fetch games:', error)
      return {
        content: [],
        empty: true,
        first: true,
        last: true,
        number: page,
        numberOfElements: 0,
        pageable: { offset: 0, pageNumber: 0, pageSize: size, paged: true, sort: {}, unpaged: false },
        size,
        sort: {},
        totalElements: 0,
        totalPages: 0
      }
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

  getByStreamAppId: async (steamAppId: number | string): Promise<Game | null> => {
    try {
      // Note: There's no direct API endpoint for searching by steamAppId so we fetch and filter locally. Not very efficient, but it works :D. For a prod app, Sven or I should implement a endpoint for the steamAppId.

      const data = await gamesAPI.getAll(0, 1000)
      const game = data.content.find(g => String(g.steamAppId) === String(steamAppId))
      return game || null
    } catch (error) {
      console.error('Failed to fetch game by steamAppId:', error)
      return null
    }
  },

  search: async (title: string): Promise<Game[]> => {
    try {
      const url = API_ENDPOINTS.games.search(title)
      const result = await getJSON(url)
      return Array.isArray(result) ? result : []
    } catch (error) {
      console.error('Failed to search games:', error)
      return []
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
      return await putJSON(url, { body: game, token }, true)
    } catch (error) {
      console.error('Failed to update game:', error)
      throw error
    }
  },

  delete: async (id: string, token?: any) => {
    try {
      const url = API_ENDPOINTS.games.delete(id)
      return await deleteJSON(url, { token }, true)
    } catch (error) {
      console.error('Failed to delete game:', error)
      throw error
    }
  },

  getStats: async () => {
    try {
      const url = API_ENDPOINTS.games.stats()
      return await getJSON(url)
    } catch (error) {
      console.error('Failed to fetch stats:', error)
      throw error
    }
  }
}
