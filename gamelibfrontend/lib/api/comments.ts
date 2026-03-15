import { getJSON, DATA_URLS } from './index'

export interface Comment {
  steamAppId: number;
  title: string;
  comment: string;
  created_at: string;
  description: string;
  genres: string[];
  bewertung: number;
}

export const commentsAPI = {
  getAll: async () => {
    try {
      return await getJSON(DATA_URLS.comments())
    } catch (error) {
      console.error('Failed to fetch comments:', error)
      return []
    }
  },

  getByGameId: async (steamAppId: number) => {
    try {
      const comments: Comment[] = await getJSON(DATA_URLS.comments())
      return comments.filter(c => c.steamAppId === steamAppId)
    } catch (error) {
      console.error('Failed to fetch comments:', error)
      return []
    }
  },

  create: async (comment: Comment, token?: any) => {
    // Mock: Just log (in real app, would POST to backend)
    console.log('Mock: Creating comment', comment)
    return comment
  }
}
