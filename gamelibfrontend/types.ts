export interface Game {
  steamAppId: number;
  title: string;
  platforms: string[];
  storeSnapshot: string;
  description: string;
  shortDescription: string;
  genres: string[];
  price: number;
  developers: string[];
  rating: number;
  releaseDate: string;
  lastUpdateAt: string;
}

export interface Comment {
  steamAppId: number;
  title: string;
  comment: string;
  created_at: string;
  description: string;
  genres: string[];
  bewertung: number;
}

export interface Achievement {
  gameId: string;
  title: string;
  storeSnapshot: string;
}
