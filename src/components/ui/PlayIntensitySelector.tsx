import React from 'react';
import { Activity } from 'lucide-react';
import { PlayIntensity } from '../../types';

interface PlayIntensitySelectorProps {
  selectedIntensity: PlayIntensity;
  onIntensityChange: (intensity: PlayIntensity) => void;
  intensities: PlayIntensity[];
}

export function PlayIntensitySelector({ selectedIntensity, onIntensityChange, intensities }: PlayIntensitySelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Activity className="w-5 h-5 text-[#4fffbc] mr-2" />
        <h3 className="text-lg font-semibold">Play Intensity</h3>
      </div>
      <div className="grid gap-3">
        {intensities.map((intensity) => (
          <button
            key={intensity.name}
            onClick={() => onIntensityChange(intensity)}
            className={`flex items-center justify-between p-4 rounded-lg border ${
              selectedIntensity.name === intensity.name
                ? 'border-[#4fffbc] bg-[#262933]'
                : 'border-[#363a47] hover:bg-[#2e313c]'
            } transition-all`}
          >
            <div>
              <div className="font-medium">{intensity.name}</div>
              <div className="text-sm text-gray-400">
                {intensity.bloomsPerDay.toLocaleString()} Blooms/Day
              </div>
            </div>
            <div className="text-sm text-gray-400">
              {intensity.bloomsPerCycle.toLocaleString()} Blooms/Cycle
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}