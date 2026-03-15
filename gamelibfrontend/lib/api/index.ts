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

// Mock Data URLs (lokale JSON-Dateien)
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Client-side
    return ''
  }
  // Server-side: use full URL
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
}

export const BASE_URL = ""
export const DATA_URLS = {
  games: (baseUrl?: string) => `${baseUrl || getBaseUrl()}/data/games.json`,
  comments: (baseUrl?: string) => `${baseUrl || getBaseUrl()}/data/comments.json`
}
