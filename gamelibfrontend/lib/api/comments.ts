import { getJSON, postJSON, putJSON, deleteJSON, API_ENDPOINTS } from './index'

export interface CommentDTO {
  id: string
  gameId: string
  achievementId?: string
  title: string
  comment: string
  createdAt: string
  description?: string
  genres?: string[]
  bewertung?: number
}

export interface CreateCommentDTO {
  gameId: number
  achievementId?: string
  title: string
  comment: string
  createdAt?: string
  description?: string
  genres?: string[]
  bewertung?: number
}

export interface UpdateCommentDTO extends Partial<CreateCommentDTO> {
  gameId: number
}

export const commentsAPI = {
  getAll: async (limit?: number) => {
    try {
      const url = API_ENDPOINTS.comments.getAll(limit)
      const result = await getJSON(url)
      return Array.isArray(result) ? result : [result]
    } catch (error) {
      console.error('Failed to fetch comments:', error)
      return []
    }
  },

  getByGameId: async (gameId: string) => {
    try {
      const url = API_ENDPOINTS.comments.getByGameId(gameId)
      const result = await getJSON(url)
      return Array.isArray(result) ? result : [result]
    } catch (error) {
      console.error('Failed to fetch comments for game:', error)
      return []
    }
  },

  getByAchievementId: async (achievementId: string) => {
    try {
      const url = API_ENDPOINTS.comments.getByAchievementId(achievementId)
      const result = await getJSON(url)
      return Array.isArray(result) ? result : [result]
    } catch (error) {
      console.error('Failed to fetch comments for achievement:', error)
      return []
    }
  },

  create: async (comment: CreateCommentDTO, token?: any) => {
    try {
      const url = API_ENDPOINTS.comments.create()
      return await postJSON(url, { body: comment, token })
    } catch (error) {
      console.error('Failed to create comment:', error)
      throw error
    }
  },

  update: async (comment: UpdateCommentDTO, token?: any) => {
    try {
      const url = API_ENDPOINTS.comments.update()
      return await putJSON(url, { body: comment, token })
    } catch (error) {
      console.error('Failed to update comment:', error)
      throw error
    }
  },

  delete: async (commentId: string, token?: any) => {
    try {
      const url = API_ENDPOINTS.comments.delete()
      return await deleteJSON(url, { body: commentId, token })
    } catch (error) {
      console.error('Failed to delete comment:', error)
      throw error
    }
  }
}
