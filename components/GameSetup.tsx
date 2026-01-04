'use client';

import { useState } from 'react';

interface GameSetupProps {
  onStartGame: (playerCount: number, playerNames: string[]) => void;
}

export default function GameSetup({ onStartGame }: GameSetupProps) {
  const [playerCount, setPlayerCount] = useState(2);
  const [playerNames, setPlayerNames] = useState<string[]>(['', '']);

  const handlePlayerCountChange = (count: number) => {
    setPlayerCount(count);
    setPlayerNames(Array(count).fill('').map((_, i) => playerNames[i] || ''));
  };

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const names = playerNames.map((name, i) => name.trim() || `Player ${i + 1}`);
    onStartGame(playerCount, names);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          እንኳን ደህና መጡ   
        </h1>
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          ቻውቻው በለው ብርህን 😂  
        </h1>


        
        {/* <p className="text-gray-600 text-center mb-8">
          ቻውቻው በለው ብርህን 😂
          Track scores for your physical card game
        </p> */}

        

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Number of Players
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {[2, 4, 6, 8, 10, 12].map(count => (
                <button
                  key={count}
                  type="button"
                  onClick={() => handlePlayerCountChange(count)}
                  className={`flex-1 min-w-15 py-3 rounded font-semibold transition-colors ${
                    playerCount === count
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-600 text-sm font-medium whitespace-nowrap">Custom Count:</span>
              <input
                type="number"
                min="2"
                max="30"
                value={playerCount}
                onChange={(e) => handlePlayerCountChange(parseInt(e.target.value) || 2)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Player Names (optional)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Array.from({ length: playerCount }).map((_, i) => (
                <input
                  key={i}
                  type="text"
                  value={playerNames[i] || ''}
                  onChange={(e) => handleNameChange(i, e.target.value)}
                  placeholder={`Player ${i + 1}`}
                  className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-blue-600 text-white text-xl font-bold rounded hover:bg-blue-700 transition-colors"
          >
            Start Game Session
          </button>
        </form>
      </div>
    </div>
  );
}
