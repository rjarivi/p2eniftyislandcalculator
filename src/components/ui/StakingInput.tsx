import React from 'react';
import { Wallet } from 'lucide-react';

interface StakingInputProps {
  stakeAmount: number;
  compoundRate: number;
  onStakeChange: (amount: number) => void;
  onCompoundChange: (rate: number) => void;
}

export function StakingInput({ stakeAmount, compoundRate, onStakeChange, onCompoundChange }: StakingInputProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Wallet className="w-5 h-5 text-[#4fffbc] mr-2" />
        <h3 className="text-lg font-semibold">Staking</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Initial Stake</label>
          <input
            type="number"
            value={stakeAmount}
            onChange={(e) => onStakeChange(Math.max(0, Number(e.target.value)))}
            className="input-dark w-full"
            min="0"
            placeholder="Initial ISLAND"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Compound Rate (%)</label>
          <input
            type="number"
            value={compoundRate}
            onChange={(e) => onCompoundChange(Math.min(100, Math.max(0, Number(e.target.value))))}
            className="input-dark w-full"
            min="0"
            max="100"
            placeholder="Compound %"
          />
        </div>
      </div>
      <p className="text-sm text-gray-400">
        Staking ISLAND increases your conversion rate from Blooms to ISLAND
      </p>
    </div>
  );
}