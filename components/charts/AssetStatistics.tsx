"use client";

import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

interface StatisticProps {
  label: string;
  value: string | number;
  change?: number;
}

const Statistic = ({ label, value, change }: StatisticProps) => (
  <div className="p-3 sm:p-4 bg-white/5 rounded-lg">
    <p className="text-xs sm:text-sm text-white/60 mb-1">{label}</p>
    <div className="flex items-center gap-1.5 sm:gap-2">
      <span className="text-base sm:text-lg font-semibold">{value}</span>
      {change !== undefined && (
        <span className={`flex items-center text-xs sm:text-sm ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {change >= 0 ? <FiTrendingUp className="mr-0.5 sm:mr-1" /> : <FiTrendingDown className="mr-0.5 sm:mr-1" />}
          {Math.abs(change)}%
        </span>
      )}
    </div>
  </div>
);

interface AssetStatisticsProps {
  stats: {
    price: number;
    volume24h: number;
    priceChange24h: number;
    marketCap?: number;
    totalValueLocked?: number;
  };
}

const AssetStatistics = ({ stats }: AssetStatisticsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
      <Statistic 
        label="Текущая цена" 
        value={`$${stats && typeof stats.price === 'number' ? stats.price.toLocaleString() : 'N/A'}`}
        change={stats && stats.priceChange24h}
      />
      <Statistic 
        label="Объем (24ч)" 
        value={`$${stats && stats.volume24h ? stats.volume24h.toLocaleString() : 'N/A'}`}
      />
      {stats && stats.marketCap && (
        <Statistic 
          label="Рыночная капитализация" 
          value={`$${stats.marketCap.toLocaleString()}`}
        />
      )}
      {stats && stats.totalValueLocked && (
        <Statistic 
          label="TVL" 
          value={`$${stats.totalValueLocked.toLocaleString()}`}
        />
      )}
    </div>
  );
};

export default AssetStatistics;
