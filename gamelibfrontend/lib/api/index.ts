import { create } from "domain";

interface Token {
  accessToken: string;
}

interface FetchParams extends RequestInit {
  body?: any;
  token?: Token | null;
}

function createFetchFunction(method: string, returnsJson: boolean = true) {
  return async (url: string, params: FetchParams = {}, noObjectInResponse: boolean = false) => {
    const _params: FetchParams = {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      ...params
    }

    if (_params.body !== null && _params.body !== undefined) {
      _params.body = JSON.stringify(_params.body)
    }

    if (_params.token && _params.token !== null) {
      (_params.headers as Record<string, string>)["Authorization"] = `Bearer ${_params.token.accessToken}`
    }
    
    const response = await fetch(url, _params as RequestInit)

    if (!response.ok) {
      const error = new Error("Request failed with status " + response.status) as Error & { response?: Response }
      error.response = response
      throw error
    }

    if (noObjectInResponse || !returnsJson) {
      return response
    }

    const data = await response.json()
    return data
  }
}

export const postJSON = createFetchFunction("POST")
export const putJSON = createFetchFunction("PUT")
export const deleteJSON = createFetchFunction("DELETE")
export const getJSON = createFetchFunction("GET")
export const postNoJSON = createFetchFunction("POST", false)

// Backend API Base URL (as a fallback, the localhost Backend url is used. This was our solution to avoid some CORS issues in development.)
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8087'

export const API_ENDPOINTS = {
  games: {
    getAll: (page?: number, size?: number) => {
      const params = new URLSearchParams();
      if (page !== undefined) params.append('page', page.toString());
      if (size !== undefined) params.append('size', size.toString());
      return `${BACKEND_URL}/games${params.toString() ? `?${params.toString()}` : ''}`;
    },
    getById: (id: string) => `${BACKEND_URL}/games/${id}`,
    search: (title: string) => `${BACKEND_URL}/games/search?title=${encodeURIComponent(title)}`,
    create: () => `${BACKEND_URL}/games`,
    update: () => `${BACKEND_URL}/games`,
    delete: (id: string) => `${BACKEND_URL}/games/${id}`,
    stats: () => `${BACKEND_URL}/games/stats`
  },
  comments: {
    getAll: (limit?: number) => `${BACKEND_URL}/comments${limit ? `?numberOffCommnets=${limit}` : ''}`,
    getByGameId: (gameId: string) => `${BACKEND_URL}/comments/games/${gameId}`,
    getByAchievementId: (achievementId: string) => `${BACKEND_URL}/comments/achievements/${achievementId}`,
    create: () => `${BACKEND_URL}/comments`,
    update: () => `${BACKEND_URL}/comments`,
    delete: () => `${BACKEND_URL}/comments`
  },
  achievements: {
    getByGameId: (gameId: string) => `${BACKEND_URL}/achivement/${gameId}`,
    create: () => `${BACKEND_URL}/achivement`,
    update: () => `${BACKEND_URL}/achivement`,
    delete: () => `${BACKEND_URL}/achivement`
  }
}
