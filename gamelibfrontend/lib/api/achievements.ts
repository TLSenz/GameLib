import { getJSON, postJSON, putJSON, deleteJSON, API_ENDPOINTS } from './index'

export interface AchievementDTO {
  id: string
  gameId: string
  title: string
  storeSnapshot: string
  description: string
  rarity: number
}

export interface CreateAchievementDTO {
  gameId: string
  title: string
  storeSnapshot?: string
  description: string
  rarity: number
}

export interface UpdateAchievementDTO extends Partial<CreateAchievementDTO> {
  id: string
  gameId: string
}

export const achievementsAPI = {
  getByGameId: async (gameId: string) => {
    try {
      const url = API_ENDPOINTS.achievements.getByGameId(gameId)
      const result = await getJSON(url)
      // Handle Spring Data REST pagination response
      if (result.content && Array.isArray(result.content)) {
        return result.content
      }
      return Array.isArray(result) ? result : [result]
    } catch (error) {
      console.error('Failed to fetch achievements for game:', error)
      return []
    }
  },

  create: async (achievement: CreateAchievementDTO, token?: any) => {
    try {
      const url = API_ENDPOINTS.achievements.create()
      return await postJSON(url, { body: achievement, token })
    } catch (error) {
      console.error('Failed to create achievement:', error)
      throw error
    }
  },

  update: async (achievement: UpdateAchievementDTO, token?: any) => {
    try {
      const url = API_ENDPOINTS.achievements.update()
      return await putJSON(url, { body: achievement, token })
    } catch (error) {
      console.error('Failed to update achievement:', error)
      throw error
    }
  },

  delete: async (achievementId: string, token?: any) => {
    try {
      const url = API_ENDPOINTS.achievements.delete()
      return await deleteJSON(url, { body: achievementId, token })
    } catch (error) {
      console.error('Failed to delete achievement:', error)
      throw error
    }
  }
}
