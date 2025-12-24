'use client';

import type { GameHistory } from '@/lib/types';

interface GameHistoryProps {
  history: GameHistory[];
  onClose: () => void;
}

export default function GameHistory({ history, onClose }: GameHistoryProps) {
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
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          {history.map((session, index) => (
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

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {session.players.map((player, pIndex) => (
                  <div key={pIndex} className="bg-gray-50 rounded p-3">
                    <p className="font-medium text-gray-800">{player.name}</p>
                    <p className={`text-xl font-bold ${player.finalScore >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${player.finalScore}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
