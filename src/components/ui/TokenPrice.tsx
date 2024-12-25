import React from 'react';
import { DollarSign } from 'lucide-react';

interface TokenPriceProps {
  price: number;
  onPriceChange: (price: number) => void;
}

export function TokenPrice({ price, onPriceChange }: TokenPriceProps) {
  return (
    <div className="calculator-card mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <DollarSign className="w-6 h-6 text-[#4fffbc] mr-2" />
          <h2 className="text-xl font-semibold">ISLAND Token Price</h2>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-400">Current Price: ${price.toFixed(4)}</span>
          <input
            type="number"
            value={price}
            onChange={(e) => onPriceChange(Number(e.target.value))}
            className="input-dark w-40"
            placeholder="Custom price"
            step="0.0001"
            min="0"
          />
        </div>
      </div>
    </div>
  );
}