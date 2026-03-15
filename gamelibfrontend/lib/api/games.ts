import { getJSON, DATA_URLS } from './index'
import { Game } from '@/types'

export const gamesAPI = {
  getAll: async () => {
    try {
      return await getJSON(DATA_URLS.games())
    } catch (error) {
      console.error('Failed to fetch games:', error)
      return []
    }
  },

  getById: async (steamAppId: number) => {
    try {
      const games: Game[] = await getJSON(DATA_URLS.games())
      return games.find(g => g.steamAppId === steamAppId) || null
    } catch (error) {
      console.error('Failed to fetch game:', error)
      return null
    }
  },

  create: async (game: Game, token?: any) => {
    // Mock: Just add to local state (in real app, would POST to backend)
    console.log('Mock: Creating game', game)
    return game
  },

  update: async (steamAppId: number, game: Partial<Game>, token?: any) => {
    // Mock: Just log (in real app, would PUT to backend)
    console.log('Mock: Updating game', steamAppId, game)
    return game
  },

  delete: async (steamAppId: number, token?: any) => {
    // Mock: Just log (in real app, would DELETE from backend)
    console.log('Mock: Deleting game', steamAppId)
    return { success: true }
  }
}
