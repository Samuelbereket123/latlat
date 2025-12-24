import { GameSession, Player, GameHistory } from './types';

export function initializeGame(playerCount: number, playerNames: string[]): GameSession {
  const players: Player[] = Array.from({ length: playerCount }, (_, i) => ({
    id: i,
    name: playerNames[i] || `Player ${i + 1}`,
    score: 0,
  }));

  return {
    id: Date.now().toString(),
    players,
    bank: 0,
    startTime: new Date(),
    currentPlayerIndex: 0,
  };
}

export function adjustPlayerScore(
  session: GameSession,
  playerId: number,
  amount: number
): GameSession {
  const updatedPlayers = session.players.map(player =>
    player.id === playerId
      ? { ...player, score: player.score + amount }
      : player
  );

  return {
    ...session,
    players: updatedPlayers,
    bank: session.bank - amount, // Bank moves opposite to player
  };
}

export function adjustBankBalance(session: GameSession, amount: number): GameSession {
  return {
    ...session,
    bank: session.bank + amount,
  };
}

export function nextTurn(session: GameSession): GameSession {
  return {
    ...session,
    currentPlayerIndex: (session.currentPlayerIndex + 1) % session.players.length,
  };
}

export function endSession(session: GameSession): GameHistory {
  return {
    sessionId: session.id,
    players: session.players.map(p => ({ name: p.name, finalScore: p.score })),
    bank: session.bank,
    startTime: session.startTime,
    endTime: new Date(),
  };
}

export function loadHistory(): GameHistory[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('gameHistory');
  return stored ? JSON.parse(stored) : [];
}

export function saveHistory(history: GameHistory): void {
  if (typeof window === 'undefined') return;
  const existing = loadHistory();
  localStorage.setItem('gameHistory', JSON.stringify([...existing, history]));
}
