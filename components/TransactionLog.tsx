'use client';

import { Transaction } from '@/lib/types';

interface TransactionLogProps {
  transactions: Transaction[];
  onClose: () => void;
}

export default function TransactionLog({ transactions, onClose }: TransactionLogProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] flex flex-col shadow-2xl">
        <div className="flex justify-between items-center mb-4 border-b-2 border-gray-100 pb-2">
          <h3 className="text-gray-600 font-black uppercase tracking-widest text-xl">Transaction Logs</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-3xl font-bold leading-none"
          >
            ×
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-gray-200">
          {transactions.length === 0 ? (
            <div className="h-40 flex items-center justify-center text-gray-400 italic">
              No transactions yet
            </div>
          ) : (
            transactions.map((t) => {
              const isClearance = t.type === 'bank_cleared';
              
              if (isClearance) {
                return (
                  <div key={t.id} className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4 text-center animate-pulse">
                    <p className="text-yellow-800 font-black text-xl uppercase tracking-widest leading-tight">
                      🚨 {t.description} 🚨
                    </p>
                    <p className="text-xs text-yellow-700 mt-1 uppercase font-bold">
                      {new Date(t.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                );
              }

              return (
                <div key={t.id} className={`border-l-4 p-3 rounded bg-gray-50 flex justify-between items-start transition-all hover:bg-gray-100 ${
                  t.type === 'deduct_all' 
                    ? 'border-indigo-500 shadow-sm' 
                    : t.amount > 0 
                      ? 'border-green-500 shadow-sm' 
                      : 'border-red-500 shadow-sm'
                }`}>
                  <div>
                    <p className="text-sm font-bold text-gray-800 leading-tight">
                      {t.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-gray-500 font-medium">
                        {new Date(t.timestamp).toLocaleTimeString()}
                      </span>
                      <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded font-bold uppercase tracking-tighter">
                        Bank: ${t.newBankBalance}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        
        <button
          onClick={onClose}
          className="mt-6 w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors uppercase tracking-widest"
        >
          Close Logs
        </button>
      </div>
    </div>
  );
}
