import React from 'react';
import { Palmtree } from 'lucide-react';
import { PALM_TIERS, PALM_COUNTS } from '../../constants';

interface PalmSelectorProps {
  selectedPalm: string;
  palmCount: number;
  onPalmChange: (palm: string) => void;
  onCountChange: (count: number) => void;
}

export function PalmSelector({ selectedPalm, palmCount, onPalmChange, onCountChange }: PalmSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Palmtree className="w-5 h-5 text-[#4fffbc] mr-2" />
        <h3 className="text-lg font-semibold">Palm NFTs</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Palm Tier</label>
          <select
            value={selectedPalm}
            onChange={(e) => onPalmChange(e.target.value)}
            className="w-full p-3 bg-[#262933] border border-[#363a47] rounded-lg text-white focus:outline-none focus:border-[#4fffbc]"
          >
            {Object.entries(PALM_TIERS).map(([name, cap]) => (
              <option key={name} value={name}>
                {name.charAt(0).toUpperCase() + name.slice(1)} ({cap})
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-gray-400">
            Total {selectedPalm} Palms: {PALM_COUNTS[selectedPalm as keyof typeof PALM_COUNTS] || 0}
          </p>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Count</label>
          <input
            type="number"
            value={palmCount}
            onChange={(e) => onCountChange(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full p-3 bg-[#262933] border border-[#363a47] rounded-lg text-white focus:outline-none focus:border-[#4fffbc]"
            min="1"
          />
        </div>
      </div>
    </div>
  );
}