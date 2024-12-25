import React from 'react';
import { Calculator, Coins, Palmtree, TrendingUp } from 'lucide-react';

// Play intensity configurations
const PLAY_INTENSITIES = {
  casual: { name: 'Casual', bloomsPerDay: 1500, bloomsPerCycle: 15000 },
  medium: { name: 'Medium', bloomsPerDay: 3000, bloomsPerCycle: 30000 },
  high: { name: 'High', bloomsPerDay: 6000, bloomsPerCycle: 60000 },
  super: { name: 'Super User', bloomsPerDay: 14000, bloomsPerCycle: 140000 }
};

// Palm NFT configurations
const PALM_TIERS = {
  none: { cap: 100, name: 'No Palm' },
  iron: { cap: 300, name: 'Iron Palm' },
  bronze: { cap: 500, name: 'Bronze Palm' },
  silver: { cap: 900, name: 'Silver Palm' },
  gold: { cap: 1700, name: 'Gold Palm' },
  neon: { cap: 3300, name: 'Neon Palm' },
  ultra: { cap: 6400, name: 'Ultra Palm' }
};

// Stake tiers and rewards
const STAKE_TIERS = [
  { amount: 150, reward: 'Free Gacha Spin' },
  { amount: 1000, reward: 'Bloom Reward' },
  { amount: 7500, reward: 'Small Bloom Boost (1.2x for 60min)' },
  { amount: 15000, reward: 'Medium Bloom Boost (1.5x for 30min)' },
  { amount: 30000, reward: 'Large Bloom Boost (2.0x for 15min)' }
];

function PlayToEarnCalculator() {
  const [currentPrice, setCurrentPrice] = React.useState(0);
  const [futurePrice, setFuturePrice] = React.useState('');
  const [playIntensity, setPlayIntensity] = React.useState('casual');
  const [palmTier, setPalmTier] = React.useState('none');
  const [palmCount, setPalmCount] = React.useState(1);

  React.useEffect(() => {
    setCurrentPrice(0.05); // Set initial price
  }, []);

  const calculateEarnings = () => {
    const price = futurePrice ? parseFloat(futurePrice) : currentPrice;
    const { bloomsPerDay, bloomsPerCycle } = PLAY_INTENSITIES[playIntensity];
    const maxCap = PALM_TIERS[palmTier].cap * palmCount;

    // Calculate daily earnings (1 ISLAND per 1000 blooms, capped by palm tier)
    const dailyIsland = Math.min((bloomsPerDay * 0.001), maxCap / 10);
    const dailyUSD = dailyIsland * price;

    // Calculate cycle earnings (10 days)
    const cycleIsland = Math.min((bloomsPerCycle * 0.001), maxCap);
    const cycleUSD = cycleIsland * price;

    return {
      daily: { island: dailyIsland, usd: dailyUSD },
      cycle: { island: cycleIsland, usd: cycleUSD }
    };
  };

  const earnings = calculateEarnings();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Coins className="w-5 h-5 text-[#ffe500]" />
            Token Price
          </h2>
          <div className="space-y-2">
            <p className="text-gray-400">Current ISLAND Price: ${currentPrice.toFixed(3)}</p>
            <input
              type="number"
              placeholder="Enter future price prediction"
              value={futurePrice}
              onChange={(e) => setFuturePrice(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#262933] border border-[#363a47] focus:outline-none focus:border-[#4fffbc]"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#cf68fb]" />
            Play Intensity
          </h2>
          <select
            value={playIntensity}
            onChange={(e) => setPlayIntensity(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[#262933] border border-[#363a47] focus:outline-none focus:border-[#4fffbc]"
          >
            {Object.entries(PLAY_INTENSITIES).map(([key, value]) => (
              <option key={key} value={key}>
                {value.name} - {value.bloomsPerDay.toLocaleString()} Blooms/Day
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Palm NFT</h2>
          <div className="space-y-2">
            <select
              value={palmTier}
              onChange={(e) => setPalmTier(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#262933] border border-[#363a47] focus:outline-none focus:border-[#4fffbc]"
            >
              {Object.entries(PALM_TIERS).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.name} - Cap: {value.cap.toLocaleString()}
                </option>
              ))}
            </select>
            <input
              type="number"
              min="1"
              value={palmCount}
              onChange={(e) => setPalmCount(Math.max(1, parseInt(e.target.value)))}
              className="w-full px-4 py-2 rounded-lg bg-[#262933] border border-[#363a47] focus:outline-none focus:border-[#4fffbc]"
              placeholder="Number of Palms"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-[#262933] rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Earnings Estimate</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-2">Daily Earnings</h3>
            <p className="text-2xl font-bold text-[#4fffbc]">{earnings.daily.island.toFixed(2)} ISLAND</p>
            <p className="text-gray-400">≈ ${earnings.daily.usd.toFixed(2)}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Cycle Earnings (10 days)</h3>
            <p className="text-2xl font-bold text-[#4fffbc]">{earnings.cycle.island.toFixed(2)} ISLAND</p>
            <p className="text-gray-400">≈ ${earnings.cycle.usd.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-400">
        <p className="mb-2">Disclaimers:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>This calculator is for approximation purposes only and some error due to the exact time of staking and fluctuation of token price should be expected.</li>
          <li>The P2E system earning rate and structure may change over time, so this version of the calculator may be outdated. The most recent info will be available on the Rewards Dashboard.</li>
        </ul>
      </div>
    </div>
  );
}

function StakeToEarnCalculator() {
  const [currentPrice, setCurrentPrice] = React.useState(0);
  const [futurePrice, setFuturePrice] = React.useState('');
  const [stakeAmount, setStakeAmount] = React.useState(0);

  React.useEffect(() => {
    setCurrentPrice(0.05); // Set initial price
  }, []);

  const getUnlockedTiers = () => {
    return STAKE_TIERS.filter(tier => stakeAmount >= tier.amount);
  };

  const getNextTier = () => {
    return STAKE_TIERS.find(tier => stakeAmount < tier.amount);
  };

  const price = futurePrice ? parseFloat(futurePrice) : currentPrice;
  const valueUSD = stakeAmount * price;
  const unlockedTiers = getUnlockedTiers();
  const nextTier = getNextTier();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Coins className="w-5 h-5 text-[#ffe500]" />
            Token Price
          </h2>
          <div className="space-y-2">
            <p className="text-gray-400">Current ISLAND Price: ${currentPrice.toFixed(3)}</p>
            <input
              type="number"
              placeholder="Enter future price prediction"
              value={futurePrice}
              onChange={(e) => setFuturePrice(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#262933] border border-[#363a47] focus:outline-none focus:border-[#4fffbc]"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#cf68fb]" />
            Stake Amount
          </h2>
          <input
            type="number"
            placeholder="Enter amount to stake"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(Math.max(0, parseFloat(e.target.value)))}
            className="w-full px-4 py-2 rounded-lg bg-[#262933] border border-[#363a47] focus:outline-none focus:border-[#4fffbc]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-[#262933] rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Your Stake</h2>
          <p className="text-2xl font-bold text-[#4fffbc]">{stakeAmount.toLocaleString()} ISLAND</p>
          <p className="text-gray-400">≈ ${valueUSD.toFixed(2)}</p>
        </div>

        <div className="p-6 bg-[#262933] rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Next Tier</h2>
          {nextTier ? (
            <>
              <p className="text-lg font-medium">{nextTier.reward}</p>
              <p className="text-gray-400">
                Stake {(nextTier.amount - stakeAmount).toLocaleString()} more ISLAND to unlock
              </p>
            </>
          ) : (
            <p className="text-gray-400">You've reached the highest tier!</p>
          )}
        </div>
      </div>

      <div className="p-6 bg-[#262933] rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Unlocked Rewards</h2>
        {unlockedTiers.length > 0 ? (
          <div className="space-y-4">
            {unlockedTiers.map((tier, index) => (
              <div key={index} className="flex items-center gap-3 text-[#4fffbc]">
                <div className="w-2 h-2 rounded-full bg-[#4fffbc]" />
                <p>{tier.reward}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">Stake at least 150 ISLAND to unlock rewards</p>
        )}
      </div>

      <div className="text-sm text-gray-400">
        <p className="mb-2">Disclaimers:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>This calculator is for approximation purposes only and some error due to the exact time of staking and fluctuation of token price should be expected.</li>
          <li>The staking benefits and structure may change over time, so this version of the calculator may be outdated.</li>
        </ul>
      </div>
    </div>
  );
}

function Calculator() {
  const [activeTab, setActiveTab] = React.useState('p2e');

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab('p2e')}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            activeTab === 'p2e'
              ? 'bg-gradient-to-r from-[#ffe500] via-[#cf68fb] to-[#4fffbc] text-black'
              : 'bg-[#262933] text-white hover:bg-[#2e313c]'
          }`}
        >
          Play to Earn Calculator
        </button>
        <button
          onClick={() => setActiveTab('stake')}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            activeTab === 'stake'
              ? 'bg-gradient-to-r from-[#ffe500] via-[#cf68fb] to-[#4fffbc] text-black'
              : 'bg-[#262933] text-white hover:bg-[#2e313c]'
          }`}
        >
          Stake to Earn Calculator
        </button>
      </div>

      <div className="bg-[#16171D] rounded-xl p-6 border border-[#262933]">
        {activeTab === 'p2e' ? <PlayToEarnCalculator /> : <StakeToEarnCalculator />}
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="bg-[#16171D] border-b border-[#262933] p-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Palmtree className="w-8 h-8 text-[#4fffbc]" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#ffe500] via-[#cf68fb] to-[#4fffbc] text-transparent bg-clip-text">
            Nifty Island Calculator
          </h1>
        </div>
      </div>
    </header>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-[#0F1014] text-white">
      <Header />
      <Calculator />
    </div>
  );
}

export default App;