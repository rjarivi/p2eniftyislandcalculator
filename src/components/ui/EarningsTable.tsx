import React from 'react';
import { Calculator } from 'lucide-react';

interface EarningsData {
  daily: { preCap: number; actual: number; usd: number };
  cycle: { preCap: number; actual: number; usd: number };
}

interface EarningsTableProps {
  earnings: EarningsData;
}

export function EarningsTable({ earnings }: EarningsTableProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Calculator className="w-5 h-5 text-[#4fffbc] mr-2" />
        <h3 className="text-lg font-semibold">Earnings Projection</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#363a47]">
              <th className="text-left py-3 text-sm font-medium text-gray-400">Period</th>
              <th className="text-right py-3 text-sm font-medium text-gray-400">Pre-Cap ISLAND</th>
              <th className="text-right py-3 text-sm font-medium text-gray-400">ISLAND</th>
              <th className="text-right py-3 text-sm font-medium text-gray-400">USD</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3">Daily</td>
              <td className="text-right">{earnings.daily.preCap.toFixed(2)}</td>
              <td className="text-right">{earnings.daily.actual.toFixed(2)}</td>
              <td className="text-right">${earnings.daily.usd.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="py-3">Per Cycle (10 days)</td>
              <td className="text-right">{earnings.cycle.preCap.toFixed(2)}</td>
              <td className="text-right">{earnings.cycle.actual.toFixed(2)}</td>
              <td className="text-right">${earnings.cycle.usd.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}