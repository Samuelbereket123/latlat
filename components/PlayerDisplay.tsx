'use client';

import { Player } from '@/lib/types';

interface PlayerDisplayProps {
  player: Player;
}

export default function PlayerDisplay({ player }: PlayerDisplayProps) {
  return (
    <div className="bg-white rounded-lg p-4 border-2 border-gray-300 transition-all">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">{player.name}</h3>
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
