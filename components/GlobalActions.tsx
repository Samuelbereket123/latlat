'use client';

import { useState } from 'react';

interface GlobalActionsProps {
  onDeductAll: (amount: number) => void;
}

export default function GlobalActions({ onDeductAll }: GlobalActionsProps) {
  const [customAmount, setCustomAmount] = useState('');
  const quickAmounts = [10, 20, 50, 100];

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(customAmount);
    if (!isNaN(amount) && amount > 0) {
      onDeductAll(amount);
      setCustomAmount('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Global Actions</h2>
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-700 mb-2">Deduct from All Players (Adds to Bank)</p>
          <div className="flex flex-wrap gap-2">
            {quickAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => onDeductAll(amount)}
                className="px-4 py-2 bg-indigo-50 text-indigo-700 font-semibold rounded hover:bg-indigo-100 transition-colors border border-indigo-200"
              >
                -{amount}
              </button>
            ))}
          </div>
        </div>
        
        <form onSubmit={handleCustomSubmit} className="flex gap-2 w-full md:w-auto">
          <input
            type="number"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="Custom amount"
            className="px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none w-full md:w-40"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition-colors whitespace-nowrap"
          >
            Deduct All
          </button>
        </form>
      </div>
    </div>
  );
}
