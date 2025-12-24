export interface Player {
  id: number;
  name: string;
  score: number;
}

export interface GameSession {
  id: string;
  players: Player[];
  bank: number;
  startTime: Date;
  endTime?: Date;
  currentPlayerIndex: number;
}

export interface GameHistory {
  sessionId: string;
  players: { name: string; finalScore: number }[];
  bank: number;
  startTime: Date;
  endTime: Date;
}
