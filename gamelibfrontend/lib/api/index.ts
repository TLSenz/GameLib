interface Token {
  accessToken: string;
}

interface FetchParams extends RequestInit {
  body?: any;
  token?: Token | null;
}

function createFetchFunction(method: string) {
  return async (url: string, params: FetchParams = {}, noObjectInResponse: boolean = false) => {
    const _params: FetchParams = {
      method,
      headers: {
        "Content-Type": "application/json",
        "Mode": "no-cors"
      },
      ...params
    }

    if (_params.body !== null && _params.body !== undefined) {
      _params.body = JSON.stringify(_params.body)
    }

    if (_params.token && _params.token !== null) {
      (_params.headers as Record<string, string>)["Authorization"] = `Bearer ${_params.token.accessToken}`
    }
    console.log("TEST", _params.token)
    
    const response = await fetch(url, _params as RequestInit)

    if (!response.ok) {
      const error = new Error("Request failed with status " + response.status) as Error & { response?: Response }
      error.response = response
      throw error
    }

    if (noObjectInResponse) {
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

// Backend API Base URL
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8087'

export const API_ENDPOINTS = {
  games: {
    getAll: (limit?: number) => `${BACKEND_URL}/games${limit ? `?numberOfGames=${limit}` : ''}`,
    getById: (id: string) => `${BACKEND_URL}/games/${id}`,
    create: () => `${BACKEND_URL}/games`,
    update: () => `${BACKEND_URL}/games`,
    delete: (id: string) => `${BACKEND_URL}/games/${id}`
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
