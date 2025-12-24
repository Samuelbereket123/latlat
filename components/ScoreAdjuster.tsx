'use client';

import { useState } from 'react';

interface ScoreAdjusterProps {
  playerName: string;
  currentScore: number;
  onAdjust: (amount: number) => void;
}

export default function ScoreAdjuster({ playerName, currentScore, onAdjust }: ScoreAdjusterProps) {
  const [customAmount, setCustomAmount] = useState('');

  const quickAmounts = [5, 10, 20, 50, 100];

  const handleCustomAdjust = (isPositive: boolean) => {
    const amount = parseInt(customAmount);
    if (!isNaN(amount) && amount > 0) {
      onAdjust(isPositive ? amount : -amount);
      setCustomAmount('');
    }
  };

  return (
    <div className="bg-white border-2 border-gray-300 rounded-lg p-4 shadow-sm">
      <div className="mb-3">
        <h3 className="font-semibold text-gray-800">{playerName}</h3>
        <p className="text-2xl font-bold text-gray-900">${currentScore}</p>
      </div>

      {/* Quick Adjust Buttons */}
      <div className="space-y-2">
        <div className="flex gap-2">
          {quickAmounts.map(amount => (
            <button
              key={`plus-${amount}`}
              onClick={() => onAdjust(amount)}
              className="flex-1 py-2 bg-green-500 text-white text-sm font-semibold rounded hover:bg-green-600 transition-colors"
            >
              +${amount}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {quickAmounts.map(amount => (
            <button
              key={`minus-${amount}`}
              onClick={() => onAdjust(-amount)}
              className="flex-1 py-2 bg-red-500 text-white text-sm font-semibold rounded hover:bg-red-600 transition-colors"
            >
              -${amount}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Amount */}
      <div className="mt-3 flex gap-2">
        <input
          type="number"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          placeholder="Custom amount"
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => handleCustomAdjust(true)}
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition-colors"
        >
          +
        </button>
        <button
          onClick={() => handleCustomAdjust(false)}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition-colors"
        >
          -
        </button>
      </div>
    </div>
  );
}
