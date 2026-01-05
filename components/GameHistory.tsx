'use client';

import type { GameHistory } from '@/lib/types';
import { calculateSettlements } from '@/lib/gameLogic';

interface GameHistoryProps {
  history: GameHistory[];
  onClose: () => void;
  onClear: () => void;
}

export default function GameHistory({ history, onClose, onClear }: GameHistoryProps) {
  const handleClear = () => {
    if (window.confirm('Are you sure you want to delete all game history? This cannot be undone.')) {
      onClear();
    }
  };

  if (history.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Game History</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>
          <p className="text-gray-600 text-center py-8">No game history yet. Complete a session to see it here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Game History</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={handleClear}
              className="text-red-600 hover:text-red-700 font-semibold text-sm"
            >
              Clear History
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {[...history].reverse().map((session, index) => (
            <div key={session.sessionId} className="border border-gray-300 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800">Session #{history.length - index}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(session.startTime).toLocaleString()} - {new Date(session.endTime).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Final Bank</p>
                  <p className="text-lg font-bold text-gray-900">${session.bank}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
                {session.players.map((player, pIndex) => (
                  <div key={pIndex} className="bg-gray-50 rounded p-3">
                    <p className="text-lg font-bold text-gray-900 uppercase tracking-tight">{player.name}</p>
                    <p className={`text-2xl font-black ${player.finalScore >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${player.finalScore}
                    </p>
                  </div>
                ))}
              </div>

              {/* Settlements Section */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Settlements</h4>
                {calculateSettlements(
                  session.players.map((p, i) => ({ id: i, name: p.name, score: p.finalScore }))
                ).length > 0 ? (
                  <ul className="space-y-1">
                    {calculateSettlements(
                      session.players.map((p, i) => ({ id: i, name: p.name, score: p.finalScore }))
                    ).map((settlement, sIndex) => (
                      <li key={sIndex} className="text-blue-800 flex items-center gap-2">
                        <span className="font-medium">{settlement.from}</span>
                        <span className="text-gray-500 text-sm">pays</span>
                        <span className="font-medium">{settlement.to}</span>
                        <span className="font-bold text-blue-700">${settlement.amount}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-blue-800 text-sm italic">No settlements required.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
