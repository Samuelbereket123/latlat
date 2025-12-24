'use client';

import { useState, useEffect } from 'react';
import { GameSession, GameHistory as GameHistoryType } from '@/lib/types';
import { initializeGame, adjustPlayerScore, adjustBankBalance, nextTurn, endSession, saveHistory, loadHistory } from '@/lib/gameLogic';
import GameSetup from '@/components/GameSetup';
import PlayerDisplay from '@/components/PlayerDisplay';
import BankDisplay from '@/components/BankDisplay';
import ScoreAdjuster from '@/components/ScoreAdjuster';
import GameHistory from '@/components/GameHistory';

export default function Home() {
  const [session, setSession] = useState<GameSession | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<GameHistoryType[]>([]);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const handleStartGame = (playerCount: number, playerNames: string[]) => {
    setSession(initializeGame(playerCount, playerNames));
  };

  const handleAdjustScore = (playerId: number, amount: number) => {
    if (!session) return;
    setSession(adjustPlayerScore(session, playerId, amount));
  };

  const handleAdjustBank = (amount: number) => {
    if (!session) return;
    setSession(adjustBankBalance(session, amount));
  };

  const handleNextTurn = () => {
    if (!session) return;
    setSession(nextTurn(session));
  };

  const handleEndSession = () => {
    if (!session) return;
    const historyEntry = endSession(session);
    saveHistory(historyEntry);
    setHistory(loadHistory());
    setSession(null);
  };

  if (!session) {
    return <GameSetup onStartGame={handleStartGame} />;
  }

  const currentPlayer = session.players[session.currentPlayerIndex];

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Game Score Tracker</h1>
              <p className="text-gray-600 mt-1">
                Current Turn: <span className="font-semibold text-blue-600">{currentPlayer.name}</span>
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowHistory(true)}
                className="px-4 py-2 bg-gray-600 text-white font-semibold rounded hover:bg-gray-700 transition-colors"
              >
                View History
              </button>
              <button
                onClick={handleNextTurn}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors"
              >
                Next Turn
              </button>
              <button
                onClick={handleEndSession}
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition-colors"
              >
                End Session
              </button>
            </div>
          </div>
        </div>

        {/* Players Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {session.players.map((player) => (
            <PlayerDisplay
              key={player.id}
              player={player}
              isCurrentPlayer={player.id === currentPlayer.id}
            />
          ))}
        </div>

        {/* Main Control Area */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Bank Display */}
          <div>
            <BankDisplay balance={session.bank} onAdjust={handleAdjustBank} />
          </div>

          {/* Score Adjusters for All Players */}
          {session.players.map((player) => (
            <ScoreAdjuster
              key={player.id}
              playerName={player.name}
              currentScore={player.score}
              onAdjust={(amount) => handleAdjustScore(player.id, amount)}
            />
          ))}
        </div>

        {/* Session Info */}
        <div className="bg-white rounded-lg shadow-sm p-4 text-center">
          <p className="text-gray-600">
            Session started: <span className="font-semibold">{new Date(session.startTime).toLocaleString()}</span>
          </p>
        </div>
      </div>

      {/* History Modal */}
      {showHistory && (
        <GameHistory history={history} onClose={() => setShowHistory(false)} />
      )}
    </div>
  );
}
