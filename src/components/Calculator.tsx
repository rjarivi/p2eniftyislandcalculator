import React, { useState, useEffect } from 'react';
import { Calculator as CalcIcon, Wallet } from 'lucide-react';
import { TokenPrice } from './ui/TokenPrice';
import { PlayToEarnCalculator } from './PlayToEarnCalculator';
import { StakeToEarnCalculator } from './StakeToEarnCalculator';

export function NiftyCalculator() {
  const [activeTab, setActiveTab] = useState<'p2e' | 'stake'>('p2e');
  const [islandPrice, setIslandPrice] = useState<number>(0);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=island-token&vs_currencies=usd');
        const data = await response.json();
        setIslandPrice(data['island-token'].usd);
      } catch (error) {
        console.error('Failed to fetch ISLAND price:', error);
        setIslandPrice(0.05); // Fallback price
      }
    };

    fetchPrice();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1014]">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#ffe500] via-[#cf68fb] to-[#4fffbc] text-transparent bg-clip-text">
            Nifty Island Calculator
          </h1>
          <p className="text-gray-400">Estimate your earnings and benefits</p>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('p2e')}
            className={`gradient-button px-6 py-3 rounded-lg flex items-center ${
              activeTab === 'p2e' ? 'opacity-100' : 'opacity-80'
            }`}
          >
            <CalcIcon className="w-5 h-5 mr-2" />
            Play to Earn
          </button>
          <button
            onClick={() => setActiveTab('stake')}
            className={`gradient-button px-6 py-3 rounded-lg flex items-center ${
              activeTab === 'stake' ? 'opacity-100' : 'opacity-80'
            }`}
          >
            <Wallet className="w-5 h-5 mr-2" />
            Stake to Earn
          </button>
        </div>

        <TokenPrice price={islandPrice} onPriceChange={setIslandPrice} />

        <div className="calculator-card">
          {activeTab === 'p2e' ? (
            <PlayToEarnCalculator islandPrice={islandPrice} />
          ) : (
            <StakeToEarnCalculator islandPrice={islandPrice} />
          )}
        </div>
      </div>
    </div>
  );
}
