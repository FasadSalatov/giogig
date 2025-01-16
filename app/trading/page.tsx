"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiTrendingUp,
  FiShield,
  FiDollarSign,
  FiLock,
  FiUnlock
} from 'react-icons/fi'
import PriceChart from '@/components/charts/PriceChart';
import AssetStatistics from '@/components/charts/AssetStatistics';

// Типы индексов
const indices = [
  {
    id: 'defi',
    name: 'DeFi Index',
    description: 'Индекс децентрализованных финансов',
    monthlyReturn: 8.5,
    icon: FiDollarSign
  },
  {
    id: 'gaming',
    name: 'Gaming Index',
    description: 'Индекс игровых токенов',
    monthlyReturn: 12.3,
    icon: FiShield
  },
  {
    id: 'layer1',
    name: 'Layer-1 Index',
    description: 'Индекс основных блокчейн-протоколов',
    monthlyReturn: 7.2,
    icon: FiShield
  },
  {
    id: 'metaverse',
    name: 'Metaverse Index',
    description: 'Индекс метавселенных',
    monthlyReturn: 15.1,
    icon: FiShield
  },
  {
    id: 'ai',
    name: 'AI Index',
    description: 'Индекс AI-проектов',
    monthlyReturn: 18.4,
    icon: FiTrendingUp
  }
]

// Периоды периода локации
const periods = [
  { months: 1, discount: 0, bonus: 'Базовый доступ', commission: '2%' },
  { months: 3, discount: 10, bonus: 'Сниженная комиссия', commission: '1.5%' },
  { months: 6, discount: 20, bonus: 'Двойной кешбэк + низкая комиссия', commission: '1%' },
  { months: 9, discount: 30, bonus: 'Тройной кешбэк + минимальная комиссия', commission: '0.8%' },
  { months: 12, discount: 40, bonus: 'Максимальные привилегии', commission: '0.5%' }
]

// Стратегии копитрейдинга
const strategies = [
  {
    id: 'conservative',
    name: 'Консервативная',
    description: 'Минимальные риски, стабильный рост',
    monthlyReturn: 5.8,
    risk: 'Низкий'
  },
  {
    id: 'balanced',
    name: 'Умеренная',
    description: 'Сбалансированный подход к риску и доходности',
    monthlyReturn: 12.4,
    risk: 'Средний'
  },
  {
    id: 'aggressive',
    name: 'Рисковая',
    description: 'Максимальная доходность при высоких рисках',
    monthlyReturn: 25.7,
    risk: 'Высокий'
  }
]

// Моковые данные для графика индексов
const mockIndexChartData = [
  { time: '2024-01-01', value: 100 },
  { time: '2024-01-02', value: 120 },
  { time: '2024-01-03', value: 115 },
  { time: '2024-01-04', value: 125 },
  { time: '2024-01-05', value: 140 },
  { time: '2024-01-06', value: 135 },
  { time: '2024-01-07', value: 150 },
];

// Моковые данные для графика стратегий
const mockStrategyChartData = {
  conservative: [
    { time: '2024-01-01', value: 100 },
    { time: '2024-01-02', value: 105 },
    { time: '2024-01-03', value: 108 },
    { time: '2024-01-04', value: 112 },
    { time: '2024-01-05', value: 115 },
    { time: '2024-01-06', value: 118 },
    { time: '2024-01-07', value: 122 },
  ],
  balanced: [
    { time: '2024-01-01', value: 100 },
    { time: '2024-01-02', value: 110 },
    { time: '2024-01-03', value: 108 },
    { time: '2024-01-04', value: 115 },
    { time: '2024-01-05', value: 125 },
    { time: '2024-01-06', value: 122 },
    { time: '2024-01-07', value: 130 },
  ],
  aggressive: [
    { time: '2024-01-01', value: 100 },
    { time: '2024-01-02', value: 115 },
    { time: '2024-01-03', value: 110 },
    { time: '2024-01-04', value: 125 },
    { time: '2024-01-05', value: 140 },
    { time: '2024-01-06', value: 135 },
    { time: '2024-01-07', value: 150 },
  ],
};

// Моковые данные для статистики стратегий
const mockStrategyStats = {
  conservative: {
    price: 1000,
    volume24h: 5000000,
    priceChange24h: 5.2,
    totalValueLocked: 200000000
  },
  balanced: {
    price: 1500,
    volume24h: 8000000,
    priceChange24h: 8.5,
    totalValueLocked: 350000000
  },
  aggressive: {
    price: 2000,
    volume24h: 12000000,
    priceChange24h: 12.8,
    totalValueLocked: 500000000
  }
};

// Моковые данные для статистики
const mockStats: { [key: string]: { price: number; volume24h: number; priceChange24h: number; totalValueLocked: number; } } = {
  defi: {
    price: 1250.50,
    volume24h: 15000000,
    priceChange24h: 8.5,
    totalValueLocked: 350000000
  },
  aggressive: {
    price: 2000,
    volume24h: 12000000,
    priceChange24h: 12.8,
    totalValueLocked: 500000000
  }
};

// Define a union type for valid strategy keys
type StrategyKey = 'conservative' | 'balanced' | 'aggressive';

export default function TradingPage() {
  const [selectedTab, setSelectedTab] = useState<'index' | 'copytrading'>('index')
  const [selectedIndex, setSelectedIndex] = useState(indices[0])
  const [selectedPeriod, setSelectedPeriod] = useState(periods[0])
  const [depositAmount, setDepositAmount] = useState("")
  const [selectedStrategy, setSelectedStrategy] = useState(strategies[0])
  const [showIndexModal, setShowIndexModal] = useState(false)
  const [showStrategyModal, setShowStrategyModal] = useState(false)

  // Utility function to handle number inputs
  const handleNumberInput = (value: string, setter: (value: string) => void) => {
    // Remove leading zeros
    const sanitizedValue = value.replace(/^0+(?=\d)/, '');
    setter(sanitizedValue);
  };

  // Расчет прогнозируемой доходности
  const calculateExpectedReturn = () => {
    const monthlyReturn = selectedTab === 'index'
      ? selectedIndex.monthlyReturn
      : selectedStrategy.monthlyReturn
    return Number(depositAmount) * (monthlyReturn / 100) * selectedPeriod.months
  }

  return (
    <main className="flex-1">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8 max-w-7xl">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-[#F1DA8B]">
              Трейдинг
            </h1>
            <p className="text-white/80">Торгуйте индексами или копируйте успешных трейдеров</p>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            <button
              onClick={() => setSelectedTab('index')}
              className={`px-4 sm:px-5 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base whitespace-nowrap transition-all duration-300 ${selectedTab === 'index'
                ? 'bg-[#F1DA8B] text-black'
                : 'bg-white/10 hover:bg-white/20'
                }`}
            >
              Индекс трейдинг
            </button>
            <button
              onClick={() => setSelectedTab('copytrading')}
              className={`px-4 sm:px-5 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base whitespace-nowrap transition-all duration-300 ${selectedTab === 'copytrading'
                ? 'bg-[#F1DA8B] text-black'
                : 'bg-white/10 hover:bg-white/20'
                }`}
            >
              Копитрейдинг
            </button>
          </div>

          {selectedTab === 'index' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              {/* Indices Selection */}
              <div className="flex flex-col gap-4 sm:gap-6">
                <h2 className="text-base sm:text-lg lg:text-xl font-medium">Выберите индекс для торговли</h2>
                <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                  {indices.map((index) => (
                    <motion.button
                      key={index.id}
                      onClick={() => {
                        setSelectedIndex(index);
                        setShowIndexModal(true);
                      }}
                      className={`
                        w-full text-left p-4 sm:p-5 rounded-xl sm:rounded-2xl border transition-all duration-300
                        ${selectedIndex.id === index.id
                          ? 'bg-[#F1DA8B]/10 border-[#F1DA8B]/50'
                          : 'bg-black/40 border-white/10 hover:border-white/20'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className={`
                          p-3 sm:p-3.5 rounded-lg sm:rounded-xl
                          ${selectedIndex.id === index.id
                            ? 'bg-[#F1DA8B]/20'
                            : 'bg-white/10'
                          }
                        `}>
                          <index.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${selectedIndex.id === index.id ? 'text-[#F1DA8B]' : 'text-white'}`} />
                        </div>
                        <div>
                          <h3 className="font-medium text-sm sm:text-base">{index.name}</h3>
                          <div className="flex items-center gap-1.5 mt-1">
                            <FiTrendingUp className={`w-4 h-4 sm:w-5 sm:h-5 ${selectedIndex.id === index.id ? 'text-[#F1DA8B]' : 'text-zinc-400'}`} />
                            <span className={`text-xs sm:text-sm font-medium ${selectedIndex.id === index.id ? 'text-[#F1DA8B]' : 'text-zinc-400'}`}>
                              {index.monthlyReturn}% / мес
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-[#F1DA8B]/80">больше информации</p>

                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Statistics and Chart */}
              <div className="flex flex-col gap-4 sm:gap-6">
                <AssetStatistics stats={mockStats[selectedIndex.id]} />
                <div className="bg-black/40 border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <PriceChart
                    data={mockIndexChartData}
                    title={`${selectedIndex.name} - График цены`}
                    height={350}
                  />
                </div>
              </div>

              {/* Lock Period Selection */}
              <div className="flex flex-col gap-4 sm:gap-6">
                <h2 className="text-base sm:text-lg lg:text-xl font-medium">Период блокировки</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
                  {periods.map((period) => (
                    <motion.button
                      key={period.months}
                      onClick={() => setSelectedPeriod(period)}
                      className={`
                        w-full text-left p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all duration-300
                        ${selectedPeriod.months === period.months
                          ? 'bg-[#F1DA8B]/10 border-[#F1DA8B]/50'
                          : 'bg-black/40 border-white/10 hover:border-white/20'
                        }
                      `}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {period.months >= 6 ? (
                          <FiUnlock className={`w-4 h-4 sm:w-5 sm:h-5 ${selectedPeriod.months === period.months ? 'text-[#F1DA8B]' : 'text-zinc-400'}`} />
                        ) : (
                          <FiLock className={`w-4 h-4 sm:w-5 sm:h-5 ${selectedPeriod.months === period.months ? 'text-[#F1DA8B]' : 'text-zinc-400'}`} />
                        )}
                        <span className={`text-xs sm:text-sm font-medium ${selectedPeriod.months === period.months ? 'text-[#F1DA8B]' : 'text-white'}`}>
                          {period.months} мес

                        </span>

                      </div>
                      <div className="space-y-0.5 sm:space-y-1">
                        <div className="text-xs text-zinc-400">{period.bonus}</div>
                        {period.discount > 0 && (
                          <div className="text-xs font-medium text-green-400">-{period.discount}% комиссия</div>
                        )}

                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Investment Amount */}
              <div className="bg-black/40 border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5">
                <div className="flex flex-col gap-3 sm:gap-4">
                  <h2 className="text-base sm:text-lg lg:text-xl font-medium">Сумма для торговли</h2>
                  <div className="relative">
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => handleNumberInput(e.target.value, setDepositAmount)}
                      className="w-full bg-black/40 text-green-400 border border-white/10 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-base sm:text-lg font-medium focus:outline-none focus:border-[#F1DA8B]/50"
                      placeholder="0.00"
                      min="0.01"

                    />
                    <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-zinc-400 text-sm sm:text-base">
                      USDT
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-zinc-400">Ожидаемая прибыль</span>
                    <span className="text-green-400 font-medium flex gap-2">
                      +{calculateExpectedReturn().toFixed(2)} <p className="text-white">USDT</p>
                    </span>
                  </div>
                </div>
              </div>

              {/* Selected Parameters */}
              <div className="bg-black/40 border border-white/10 rounded-lg sm:rounded-xl p-4 sm:p-5">
                <div className="flex flex-col gap-3">
                  <h3 className="text-base font-medium text-[#F1DA8B]">Выбранные параметры</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Индекс:</span>
                      <span className="text-white">{selectedIndex.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Период:</span>
                      <span className="text-white">{selectedPeriod.months} месяцев</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Сумма:</span>
                      <span className="text-white flex gap-2"><p className='text-green-400'>{depositAmount}</p> USDT</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-fit bg-[#F1DA8B] hover:bg-amber-400 text-black font-medium p-3 sm:p-4 rounded-lg sm:rounded-xl text-sm sm:text-base transition-colors">
                Начать торговлю
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              {/* Copy Trading Section */}
              <div className="flex flex-col gap-4 sm:gap-6">
                <h2 className="text-base sm:text-lg lg:text-xl font-medium">Выберите стратегию</h2>
                <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                  {strategies.map((strategy) => (
                    <motion.button
                      key={strategy.id}
                      onClick={() => {
                        setSelectedStrategy(strategy);
                        setShowStrategyModal(true);
                      }}
                      className={`
                        w-full text-left p-4 sm:p-5 rounded-xl sm:rounded-2xl border transition-all duration-300
                        ${selectedStrategy.id === strategy.id
                          ? 'bg-[#F1DA8B]/10 border-[#F1DA8B]/50'
                          : 'bg-black/40 border-white/10 hover:border-white/20'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <h3 className="font-medium text-sm sm:text-base">{strategy.name}</h3>
                        <div className={`
                          px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium
                          ${strategy.risk === 'Низкий' ? 'bg-emerald-500/20 text-green-400' :
                            strategy.risk === 'Средний' ? 'bg-[#F1DA8B]/20 text-[#F1DA8B]' :
                              'bg-red-500/20 text-red-500'
                          } 
                        `}>
                          {strategy.risk} Риск
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-400 mb-2 sm:mb-3">{strategy.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <FiTrendingUp className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${selectedStrategy.id === strategy.id ? 'text-[#F1DA8B]' : 'text-zinc-400'}`} />
                          <span className={`text-xs sm:text-sm font-medium ${selectedStrategy.id === strategy.id ? 'text-[#F1DA8B]' : 'text-zinc-400'}`}>
                            {strategy.monthlyReturn}% / мес
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-[#F1DA8B]/80">больше информации</p>



                      </div>


                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Statistics and Chart */}
              <div className="flex flex-col gap-4 sm:gap-6">
                <AssetStatistics stats={mockStrategyStats[selectedStrategy.id as StrategyKey]} />
                <div className="bg-black/40 border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <PriceChart
                    data={mockStrategyChartData[selectedStrategy.id as StrategyKey]}
                    title={`${selectedStrategy.name} - График доходности`}
                    height={350}
                  />
                </div>
              </div>

              {/* Copy Trading Type */}
              <div className="flex flex-col gap-4 sm:gap-6">
                <h2 className="text-base sm:text-lg lg:text-xl font-medium">Тип копирования</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                  {/* ПАМП счет */}
                  <button className="w-full text-left p-3 sm:p-4 lg:p-5 rounded-lg sm:rounded-xl border border-[#F1DA8B]/50 bg-[#F1DA8B]/10 transition-all duration-300">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#F1DA8B]/20">
                        <FiLock className="w-4 h-4 sm:w-5 sm:h-5 text-[#F1DA8B]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm sm:text-base text-[#F1DA8B]">ПАМП счет</h3>
                        <p className="text-xs text-zinc-400 mt-0.5">Средства замораживаются</p>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-400">
                      Мы торгуем по выбранной вами стратегии
                    </p>
                  </button>

                  {/* Через свой счет (биржи) */}
                  <button
                    disabled
                    title="В разработке"
                    className="w-full text-left p-3 sm:p-4 lg:p-5 rounded-lg sm:rounded-xl border border-white/10 bg-black/40 opacity-90 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white/10">
                        <FiUnlock className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm sm:text-base text-zinc-400">Через свой счет (биржи)</h3>
                        <p className="text-xs text-zinc-500 mt-0.5">Скоро</p>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-500">
                      Торговля через ваш счет Binance с API ключами
                    </p>
                  </button>
                </div>
              </div>

              {/* Investment Amount */}
              <div className="bg-black/40 border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5">
                <div className="flex flex-col gap-3 sm:gap-4">
                  <h2 className="text-base sm:text-lg lg:text-xl font-medium">Сумма для торговли</h2>
                  <div className="relative">
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => handleNumberInput(e.target.value, setDepositAmount)}
                      className="w-full bg-black/40 text-green-400 border border-white/10 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-base sm:text-lg font-medium focus:outline-none focus:border-[#F1DA8B]/50"
                      placeholder="0.00"
                      min="0.01"

                    />
                    <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-zinc-400 text-sm sm:text-base">
                      USDT
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-zinc-400">Ожидаемая прибыль</span>
                    <span className="text-green-400 font-medium flex gap-2">
                      +{calculateExpectedReturn().toFixed(2)} <p className="text-white">USDT</p>
                    </span>
                  </div>
                </div>
              </div>

              {/* Selected Parameters */}
              <div className="bg-black/40 border border-white/10 rounded-lg sm:rounded-xl p-4 sm:p-5">
                <div className="flex flex-col gap-3">
                  <h3 className="text-base font-medium text-[#F1DA8B]">Выбранные параметры</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Стратегия:</span>
                      <span className="text-white">{selectedStrategy.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Период:</span>
                      <span className="text-white">{selectedPeriod.months} месяцев</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Сумма:</span>
                      <span className="text-white flex gap-2"><p className='text-green-400'>{depositAmount}</p> USDT</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-fit bg-[#F1DA8B] hover:bg-amber-400 text-black font-medium p-3 sm:p-4 rounded-lg sm:rounded-xl text-sm sm:text-base transition-colors">
                Начать торговлю
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Index Description Modal */}
      {showIndexModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 rounded-xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setShowIndexModal(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4 text-[#F1DA8B]">{selectedIndex.name}</h3>
            <div className="space-y-4">
              <p className="text-white/80">{selectedIndex.description}</p>
              <div className="bg-black/40 rounded-lg p-4">
                <h4 className="font-medium mb-2">Характеристики индекса:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <FiTrendingUp className="text-[#F1DA8B]" />
                    <span>Ожидаемая доходность: {selectedIndex.monthlyReturn}% в месяц</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiShield className="text-[#F1DA8B]" />
                    <span>Автоматическая ребалансировка портфеля</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiDollarSign className="text-[#F1DA8B]" />
                    <span>Диверсификация рисков</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Strategy Description Modal */}
      {showStrategyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 rounded-xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setShowStrategyModal(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4 text-[#F1DA8B]">{selectedStrategy.name}</h3>
            <div className="space-y-4">
              <p className="text-white/80">{selectedStrategy.description}</p>
              <div className="bg-black/40 rounded-lg p-4">
                <h4 className="font-medium mb-2">Характеристики стратегии:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <FiTrendingUp className="text-[#F1DA8B]" />
                    <span>Ожидаемая доходность: {selectedStrategy.monthlyReturn}% в месяц</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiShield className="text-[#F1DA8B]" />
                    <span>Уровень риска: {selectedStrategy.risk}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiDollarSign className="text-[#F1DA8B]" />
                    <span>Автоматическое копирование сделок</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
