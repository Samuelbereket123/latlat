import { useState } from 'react';

interface BankDisplayProps {
  balance: number;
  onAdjust: (amount: number) => void;
}

export default function BankDisplay({ balance, onAdjust }: BankDisplayProps) {
  const [customAmount, setCustomAmount] = useState('');
  const quickAmounts = [10, 20, 50, 100];

  const handleCustomAdjust = (isPositive: boolean) => {
    const amount = parseInt(customAmount);
    if (!isNaN(amount) && amount > 0) {
      onAdjust(isPositive ? amount : -amount);
      setCustomAmount('');
    }
  };

  return (
    <div className="bg-white border-2 border-gray-300 rounded-lg p-6 shadow-sm flex flex-col h-full min-h-96">
      <h3 className="text-gray-600 font-black uppercase tracking-widest mb-2 text-center">Bank Balance</h3>
      <div className="flex-1 flex flex-col justify-center">
        <p className={`text-6xl font-black text-center mb-6 tracking-tighter ${balance >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
          ${balance}
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex gap-2">
            {quickAmounts.map(amount => (
              <button
                key={`plus-${amount}`}
                onClick={() => onAdjust(amount)}
                className="flex-1 py-3 bg-green-500 text-white text-sm font-bold rounded hover:bg-green-600 transition-all active:scale-95"
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
                className="flex-1 py-3 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-600 transition-all active:scale-95"
              >
                -${amount}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Amount */}
        <div className="flex gap-2">
          <input
            type="number"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="Custom"
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
          />
          <button
            onClick={() => handleCustomAdjust(true)}
            className="px-4 py-2 bg-green-500 text-white font-black rounded hover:bg-green-600 transition-all active:scale-95"
          >
            +
          </button>
          <button
            onClick={() => handleCustomAdjust(false)}
            className="px-4 py-2 bg-red-500 text-white font-black rounded hover:bg-red-600 transition-all active:scale-95"
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
}
