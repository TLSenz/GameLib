// These interfaces represent the data structres we receive from the SpringBoot backend.

export interface Game {
  id: string;              // this is the MongoDB id, not the same as the SteamAppId
  steamAppId?: number;     // SteamappId is only numbers
  title: string;
  platforms?: string[];    // all possible plattforms come as a list
  storeSnapshot?: string;
  description?: string;
  shortDescription?: string; // this is the one, we mostly use, because the description is often very long and contains html tags
  genres?: string[];
  price: number;
  developers?: string[];
  rating?: number;
  releaseDate?: string;    // as an Iso String
  lastUpdateAt?: string;
}

export interface Achievement {
  id: string;              // MongoDB id
  gameId?: string;         // this links the achievemnt to the parent game (using MongoDB id)
  title?: string;
  storeSnapshot?: string;  // url to image of the achievement
}

export interface Comment {
  id: string;              // MongoDB id
  gameId: string;
  title: string;
  comment: string;
  createdAt: string;      
  description: string;
  genres: string[];
  bewertung: number;     
}