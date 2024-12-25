import React, { useState } from 'react';
import { PlayIntensitySelector } from './ui/PlayIntensitySelector';
import { PalmSelector } from './ui/PalmSelector';
import { StakingInput } from './ui/StakingInput';
import { EarningsTable } from './ui/EarningsTable';
import { PLAY_INTENSITIES, PALM_TIERS } from '../constants';

interface Props {
  islandPrice: number;
}

export function PlayToEarnCalculator({ islandPrice }: Props) {
  const [selectedIntensity, setSelectedIntensity] = useState(PLAY_INTENSITIES[0]);
  const [selectedPalm, setSelectedPalm] = useState('none');
  const [palmCount, setPalmCount] = useState(1);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [compoundRate, setCompoundRate] = useState(100);

  const calculateEarnings = () => {
    const palmCap = PALM_TIERS[selectedPalm] * palmCount;
    const baseRate = 0.001;
    const earnRate = baseRate * (1 + (stakeAmount / 1000));
    
    const dailyBlooms = selectedIntensity.bloomsPerDay;
    const cycleBlooms = selectedIntensity.bloomsPerCycle;
    
    const preCapDaily = dailyBlooms * earnRate;
    const preCapCycle = cycleBlooms * earnRate;
    
    const actualDaily = Math.min(preCapDaily, palmCap / 10);
    const actualCycle = Math.min(preCapCycle, palmCap);
    
    return {
      daily: {
        preCap: preCapDaily,
        actual: actualDaily,
        usd: actualDaily * islandPrice
      },
      cycle: {
        preCap: preCapCycle,
        actual: actualCycle,
        usd: actualCycle * islandPrice
      }
    };
  };

  const earnings = calculateEarnings();

  return (
    <div className="space-y-8">
      <PlayIntensitySelector
        selectedIntensity={selectedIntensity}
        onIntensityChange={setSelectedIntensity}
        intensities={PLAY_INTENSITIES}
      />
      
      <StakingInput
        stakeAmount={stakeAmount}
        compoundRate={compoundRate}
        onStakeChange={setStakeAmount}
        onCompoundChange={setCompoundRate}
      />
      
      <PalmSelector
        selectedPalm={selectedPalm}
        palmCount={palmCount}
        onPalmChange={setSelectedPalm}
        onCountChange={setPalmCount}
      />
      
      <EarningsTable earnings={earnings} />
      
      <div className="bg-[#262933] rounded-lg p-4 text-sm text-gray-400">
        <h3 className="font-semibold mb-2">Disclaimers:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>This calculator is for approximation purposes only and some error due to the exact time of staking and fluctuation of token price should be expected.</li>
          <li>The P2E system earning rate and structure may change over time, so this version of the calculator may be outdated.</li>
        </ul>
      </div>
    </div>
  );
}