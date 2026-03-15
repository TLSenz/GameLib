export interface Game {
  id: string;              // Entspricht @Id private String id;
  steamAppId?: number;     // Integer in Java -> number in TS
  title?: string;
  platforms?: string[];    // List<String> in Java -> string[] in TS
  storeSnapshot?: string;
  description?: string;
  shortDescription?: string;
  genres?: string[];
  price?: number;          // Double in Java -> number in TS
  developers?: string[];
  rating?: number;
  releaseDate?: string;    // LocalDate wird von Spring als ISO-String (z.B. "2023-09-27") gesendet
  lastUpdateAt?: string;
}

export interface Achievement {
  id: string;              // Entspricht @Id private String id;
  gameId?: string;         // Verweis auf die Game.id
  title?: string;
  storeSnapshot?: string;
}

export interface Comment {
  id: string;              // Entspricht @Id private String id;
  gameId?: string;
  title?: string;
  comment?: string;
  createdAt?: string;      // In deinem Java-Model jetzt "createdAt" (camelCase)
  description?: string;
  genres?: string[];
  bewertung?: number;      // Double in Java -> number in TS
}