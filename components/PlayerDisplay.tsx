'use client';

import { Player } from '@/lib/types';

interface PlayerDisplayProps {
  player: Player;
  isCurrentPlayer: boolean;
}

export default function PlayerDisplay({ player, isCurrentPlayer }: PlayerDisplayProps) {
  return (
    <div className={`
      bg-white rounded-lg p-4 border-2 transition-all
      ${isCurrentPlayer 
        ? 'border-blue-500 shadow-lg' 
        : 'border-gray-300'
      }
    `}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-800">{player.name}</h3>
          {isCurrentPlayer && (
            <span className="text-xs text-blue-600 font-medium">Current Turn</span>
          )}
        </div>
        <div className="text-right">
          <p className={`text-2xl font-bold ${
            player.score >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            ${player.score}
          </p>
        </div>
      </div>
    </div>
  );
}
