export interface Player {
  id: number;
  name: string;
  score: number;
}

export interface Transaction {
  id: string;
  timestamp: Date;
  type: 'player_adjustment' | 'bank_adjustment' | 'deduct_all' | 'bank_cleared';
  playerName?: string;
  amount: number;
  newBankBalance: number;
  description: string;
}

export interface GameSession {
  id: string;
  players: Player[];
  bank: number;
  startTime: Date;
  endTime?: Date;
  transactions: Transaction[];
}

export interface GameHistory {
  sessionId: string;
  players: { name: string; finalScore: number }[];
  bank: number;
  startTime: Date;
  endTime: Date;
}
