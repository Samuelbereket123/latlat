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
    transactions: [],
  };
}

function recordTransaction(
  session: GameSession,
  type: 'player_adjustment' | 'bank_adjustment' | 'deduct_all' | 'bank_cleared',
  amount: number,
  description: string,
  playerName?: string
): GameSession {
  const transaction = {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    timestamp: new Date(),
    type,
    amount,
    newBankBalance: session.bank,
    description,
    playerName,
  };

  const updatedTransactions = [transaction, ...session.transactions].slice(0, 50); // Keep last 50

  return {
    ...session,
    transactions: updatedTransactions,
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

  const newSession = {
    ...session,
    players: updatedPlayers,
    bank: session.bank - amount,
  };

  const playerName = session.players.find(p => p.id === playerId)?.name || 'Unknown';
  const desc = amount >= 0 
    ? `${playerName} won $${amount} from the bank` 
    : `${playerName} lost $${Math.abs(amount)} to the bank`;

  let updatedSession = recordTransaction(newSession, 'player_adjustment', amount, desc, playerName);

  if (updatedSession.bank === 0 && session.bank !== 0) {
    updatedSession = recordTransaction(updatedSession, 'bank_cleared', 0, 'BANK CLEARED! 🏁', playerName);
  }

  return updatedSession;
}

export function adjustBankBalance(session: GameSession, amount: number): GameSession {
  const newSession = {
    ...session,
    bank: session.bank + amount,
  };

  const desc = amount >= 0 
    ? `Bank increased by $${amount}` 
    : `Bank decreased by $${Math.abs(amount)}`;

  let updatedSession = recordTransaction(newSession, 'bank_adjustment', amount, desc);

  if (updatedSession.bank === 0 && session.bank !== 0) {
    updatedSession = recordTransaction(updatedSession, 'bank_cleared', 0, 'BANK CLEARED! 🏁');
  }

  return updatedSession;
}

export function deductFromAll(session: GameSession, amount: number): GameSession {
  const updatedPlayers = session.players.map(player => ({
    ...player,
    score: player.score - amount,
  }));

  const newSession = {
    ...session,
    players: updatedPlayers,
    bank: session.bank + (amount * session.players.length),
  };

  const total = amount * session.players.length;
  const desc = `Global deduction: $${amount} from each player (Total Bank +$${total})`;

  let updatedSession = recordTransaction(newSession, 'deduct_all', total, desc);

  if (updatedSession.bank === 0 && session.bank !== 0) {
    updatedSession = recordTransaction(updatedSession, 'bank_cleared', 0, 'BANK CLEARED! 🏁');
  }

  return updatedSession;
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

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('gameHistory');
}

export function calculateSettlements(players: Player[]): { from: string; to: string; amount: number }[] {
  // Filter out players with 0 score
  const activePlayers = players.filter(p => p.score !== 0);
  
  // Separate into debtors (negative score) and creditors (positive score)
  const debtors = activePlayers
    .filter(p => p.score < 0)
    .map(p => ({ ...p, score: -p.score })) // Convert to positive debt amount
    .sort((a, b) => b.score - a.score); // Sort by amount descending

  const creditors = activePlayers
    .filter(p => p.score > 0)
    .sort((a, b) => b.score - a.score); // Sort by amount descending

  const settlements: { from: string; to: string; amount: number }[] = [];

  let debtorIndex = 0;
  let creditorIndex = 0;

  while (debtorIndex < debtors.length && creditorIndex < creditors.length) {
    const debtor = debtors[debtorIndex];
    const creditor = creditors[creditorIndex];

    const amount = Math.min(debtor.score, creditor.score);

    if (amount > 0) {
      settlements.push({
        from: debtor.name,
        to: creditor.name,
        amount: Number(amount.toFixed(2))
      });
    }

    debtor.score -= amount;
    creditor.score -= amount;

    if (debtor.score < 0.01) debtorIndex++;
    if (creditor.score < 0.01) creditorIndex++;
  }

  return settlements;
}
