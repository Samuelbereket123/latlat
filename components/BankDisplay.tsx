'use client';

interface BankDisplayProps {
  balance: number;
  onAdjust: (amount: number) => void;
}

export default function BankDisplay({ balance, onAdjust }: BankDisplayProps) {
  const quickAmounts = [10, 20, 50, 100];

  return (
    <div className="bg-white border-2 border-gray-300 rounded-lg p-6 shadow-sm">
      <h3 className="text-gray-600 font-semibold mb-2 text-center">Bank Balance</h3>
      <p className="text-4xl font-bold text-gray-900 text-center mb-4">
        ${balance}
      </p>

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
    </div>
  );
}
