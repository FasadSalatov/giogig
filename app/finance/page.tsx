'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import * as Dialog from '@radix-ui/react-dialog'
import {
  FiDollarSign,
  FiClock,
  FiX
} from 'react-icons/fi'
import {
  IoWalletOutline,
  IoRocketOutline,
  IoDiamondOutline
} from 'react-icons/io5'
import PriceChart from '@/components/charts/PriceChart'
import AssetStatistics from '@/components/charts/AssetStatistics'

// Типы индексов для инвестиций
const indices = [
  {
    id: 'defi',
    name: 'DeFi Index',
    description: 'Индекс децентрализованных финансов',
    yearlyReturn: 25.5,
    icon: FiDollarSign
  },
  {
    id: 'gaming',
    name: 'Gaming Index',
    description: 'Индекс игровых токенов',
    yearlyReturn: 32.3,
    icon: IoRocketOutline
  },
  {
    id: 'layer1',
    name: 'Layer-1 Index',
    description: 'Индекс основных блокчейн-протоколов',
    yearlyReturn: 28.2,
    icon: IoDiamondOutline
  }
]

// Периоды для инвестиций
const periods = [
  { months: 3, apy: 15, bonus: 'Базовый доступ' },
  { months: 6, apy: 18, bonus: 'Повышенный доход' },
  { months: 12, apy: 25, bonus: 'Максимальный доход + бонусы' }
]

// Опции стейкинга
const stakingOptions = [
  {
    id: 'platform',
    name: 'QNX Token',
    description: 'Стейкинг нативного токена платформы',
    apy: 42.5,
    icon: IoWalletOutline,
    minAmount: 100,
    type: 'Токен',
    blockchain: 'QNX',
    protocol: 'QNX Protocol',
    unlockPeriod: 'Немедленная разблокировка'
  },
  {
    id: 'usdt',
    name: 'USDT',
    description: 'Стейкинг стейблкоина USDT',
    apy: 12.8,
    icon: FiDollarSign,
    minAmount: 100,
    type: 'Стейблкоин',
    blockchain: 'Ethereum',
    protocol: 'ERC-20',
    unlockPeriod: 'Немедленная разблокировка'
  },
  {
    id: 'ton',
    name: 'TON',
    description: 'Стейкинг The Open Network',
    apy: 18.4,
    icon: IoRocketOutline,
    minAmount: 10,
    type: 'Токен',
    blockchain: 'TON',
    protocol: 'TON Protocol',
    unlockPeriod: 'Немедленная разблокировка'
  }
]

// Периоды стейкинга
const stakingPeriods = [
  { months: 1, multiplier: 1 },
  { months: 3, multiplier: 1.2 },
  { months: 6, multiplier: 1.5 },
  { months: 12, multiplier: 2 }
]

// Mock data for charts and statistics
const mockStats = {
  defi: {
    price: 1250.50,
    volume24h: 15000000,
    priceChange24h: 8.5,
    totalValueLocked: 500000000
  },
  gaming: {
    price: 850.75,
    volume24h: 12000000,
    priceChange24h: 12.3,
    totalValueLocked: 300000000
  },
  layer1: {
    price: 2100.25,
    volume24h: 25000000,
    priceChange24h: 5.8,
    totalValueLocked: 800000000
  },
  platform: {
    price: 5.50,
    volume24h: 1000000,
    priceChange24h: 15.5,
    totalValueLocked: 50000000
  }
}

const mockIndexChartData = {
  defi: [
    { time: '2024-01-01', value: 1150 },
    { time: '2024-01-02', value: 1180 },
    { time: '2024-01-03', value: 1220 },
    { time: '2024-01-04', value: 1250.50 },
    { time: '2024-01-05', value: 1280 },
    { time: '2024-01-06', value: 1300 },
    { time: '2024-01-07', value: 1320 }
  ],
  gaming: [
    { time: '2024-01-01', value: 750 },
    { time: '2024-01-02', value: 790 },
    { time: '2024-01-03', value: 820 },
    { time: '2024-01-04', value: 850.75 },
    { time: '2024-01-05', value: 880 },
    { time: '2024-01-06', value: 900 },
    { time: '2024-01-07', value: 920 }
  ],
  layer1: [
    { time: '2024-01-01', value: 1950 },
    { time: '2024-01-02', value: 2000 },
    { time: '2024-01-03', value: 2050 },
    { time: '2024-01-04', value: 2100.25 },
    { time: '2024-01-05', value: 2150 },
    { time: '2024-01-06', value: 2200 },
    { time: '2024-01-07', value: 2250 }
  ],
  platform: [
    { time: '2024-01-01', value: 4.80 },
    { time: '2024-01-02', value: 5.00 },
    { time: '2024-01-03', value: 5.20 },
    { time: '2024-01-04', value: 5.50 },
    { time: '2024-01-05', value: 5.70 },
    { time: '2024-01-06', value: 5.90 },
    { time: '2024-01-07', value: 6.10 }
  ],
  usdt: [
    { time: '2024-01-01', value: 1.00 },
    { time: '2024-01-02', value: 1.00 },
    { time: '2024-01-03', value: 1.00 },
    { time: '2024-01-04', value: 1.00 },
    { time: '2024-01-05', value: 1.00 },
    { time: '2024-01-06', value: 1.00 },
    { time: '2024-01-07', value: 1.00 }
  ],
  ton: [
    { time: '2024-01-01', value: 2.10 },
    { time: '2024-01-02', value: 2.15 },
    { time: '2024-01-03', value: 2.20 },
    { time: '2024-01-04', value: 2.25 },
    { time: '2024-01-05', value: 2.30 },
    { time: '2024-01-06', value: 2.35 },
    { time: '2024-01-07', value: 2.40 }
  ]
}

// Define a union type for valid stats keys
type StatKey = 'defi' | 'gaming' | 'layer1' | 'platform';

export default function FinancePage() {
  const [selectedTab, setSelectedTab] = useState<'invest' | 'staking' | 'trading'>('invest')
  const [selectedIndex, setSelectedIndex] = useState(indices[0])
  const [selectedPeriod, setSelectedPeriod] = useState(periods[0])
  const [investmentAmount, setInvestmentAmount] = useState("")
  const [selectedStakingOption, setSelectedStakingOption] = useState(stakingOptions[0])
  const [selectedStakingPeriod, setSelectedStakingPeriod] = useState(stakingPeriods[0])
  const [showIndexDetails, setShowIndexDetails] = useState(false)
  const [showStakingDetails, setShowStakingDetails] = useState(false)

  // Utility function to handle number inputs
  const handleNumberInput = (value: string, setter: (value: string) => void) => {
    // Remove leading zeros
    const sanitizedValue = value.replace(/^0+(?=\d)/, '');
    setter(sanitizedValue);
  };

  // Расчет ожидаемой доходности для инвестиций
  const calculateInvestmentReturn = () => {
    const yearlyReturn = selectedIndex.yearlyReturn
    const periodInYears = selectedPeriod.months / 12
    return Number(investmentAmount) * (yearlyReturn / 100) * periodInYears
  }

  // Расчет доходности стейкинга
  const calculateStakingReturn = () => {
    const baseApy = selectedStakingOption.apy
    const boostedApy = baseApy * selectedStakingPeriod.multiplier
    const periodInYears = selectedStakingPeriod.months / 12
    return Number(investmentAmount) * (boostedApy / 100) * periodInYears
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
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F1DA8B]">
              {selectedTab === 'invest' ? 'Финансы' : selectedTab === 'staking' ? 'Финансы' : 'Финансы'}
            </h1>
            <p className="text-white/80">
              {selectedTab === 'invest'
                ? 'Инвестируйте в индексы криптовалют для получения пассивного дохода'
                : selectedTab === 'staking'
                  ? 'Получайте пассивный доход от стейкинга криптовалют'
                  : 'Получайте пассивный доход от торгового майнинга'
              }
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-2 p-1 bg-black/40 rounded-xl w-fit flex-wrap overflow-x-auto">
            <button
              onClick={() => setSelectedTab('invest')}
              className={`px-4 sm:px-5 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base whitespace-nowrap transition-all duration-300 ${selectedTab === 'invest'
                ? 'bg-[#F1DA8B] text-black'
                : 'bg-white/10 hover:bg-white/20'
                }`}
            >
              Инвестиционный индекс
            </button>
            <button
              onClick={() => setSelectedTab('staking')}
              className={`px-4 sm:px-5 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base whitespace-nowrap transition-all duration-300 ${selectedTab === 'staking'
                ? 'bg-[#F1DA8B] text-black'
                : 'bg-white/10 hover:bg-white/20'
                }`}
            >
              Стейкинг
            </button>
            <button
              onClick={() => setSelectedTab('trading')}
              className={`px-4 sm:px-5 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base whitespace-nowrap transition-all duration-300 ${selectedTab === 'trading'
                ? 'bg-[#F1DA8B] text-black'
                : 'bg-white/10 hover:bg-white/20'
                }`}
            >
              Майнинг
            </button>
          </div>

          {selectedTab === 'invest' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              {/* Indices Selection */}
              <div className="flex flex-col gap-4 sm:gap-6">
                <h2 className="text-base sm:text-lg lg:text-xl font-medium">Выберите Индекс для инвестирования</h2>
                <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                  {indices.map((index) => (
                    <Dialog.Root key={index.id} open={showIndexDetails && selectedIndex.id === index.id} onOpenChange={(open) => {
                      setShowIndexDetails(open)
                      if (open) setSelectedIndex(index)
                    }}>
                      <Dialog.Trigger asChild>
                        <motion.button
                          onClick={() => setSelectedIndex(index)}
                          className={`w-full text-left p-4 sm:p-5 rounded-xl sm:rounded-2xl border transition-all duration-300 ${selectedIndex.id === index.id
                            ? 'bg-[#F1DA8B]/10 border-[#F1DA8B]/50'
                            : 'bg-black/40 border-white/10 hover:border-white/20'
                            }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl ${selectedIndex.id === index.id ? 'bg-[#F1DA8B]/20' : 'bg-white/10'}`}>
                              <index.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${selectedIndex.id === index.id ? 'text-[#F1DA8B]' : 'text-zinc-400'}`} />
                            </div>

                            <div className="flex flex-col gap-1">
                              <h3 className={`text-sm sm:text-base flex gap-4 items-center w-full font-medium ${selectedIndex.id === index.id ? 'text-[#F1DA8B]' : 'text-white'}`}>
                                {index.name}
                                <div className="text-xs font-medium text-green-400">+{index.yearlyReturn}% годовых</div>

                              </h3>
                              <p className="text-xs text-zinc-400">{index.description}</p>
                              <p className="text-xs sm:text-sm text-[#F1DA8B]/80">больше информации</p>
                            </div>

                          </div>

                        </motion.button>
                      </Dialog.Trigger>

                      <Dialog.Portal>
                        <Dialog.Overlay className="bg-black/60 fixed inset-0 z-40" />
                        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-black border border-white/10 p-4 sm:p-6 shadow-lg z-50 focus:outline-none">
                          <Dialog.Title className="text-xl sm:text-2xl font-medium mb-4 text-[#F1DA8B]">
                            {index.name}
                          </Dialog.Title>

                          <div className="flex flex-col gap-6">
                            <div>
                              <h4 className="text-base text-[#F1DA8B] mb-2">Активы</h4>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white/5 p-3 rounded-lg">
                                  <p className="text-sm text-white">Bitcoin (BTC)</p>
                                  <p className="text-xs text-green-400 mt-1">40%</p>
                                </div>
                                <div className="bg-white/5 p-3 rounded-lg">
                                  <p className="text-sm text-white">Ethereum (ETH)</p>
                                  <p className="text-xs text-green-400 mt-1">30%</p>
                                </div>
                                <div className="bg-white/5 p-3 rounded-lg">
                                  <p className="text-sm text-white">BNB (BNB)</p>
                                  <p className="text-xs text-green-400 mt-1">20%</p>
                                </div>
                                <div className="bg-white/5 p-3 rounded-lg">
                                  <p className="text-sm text-white">Solana (SOL)</p>
                                  <p className="text-xs text-green-400 mt-1">10%</p>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-base text-[#F1DA8B] mb-2">Характеристики</h4>
                              <div className="bg-white/5 p-3 rounded-lg flex flex-col gap-2">
                                <div className="flex justify-between">
                                  <span className="text-sm text-zinc-400">Годовая доходность:</span>
                                  <span className="text-sm text-green-400">+{index.yearlyReturn}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-zinc-400">Риск:</span>
                                  <span className="text-sm text-yellow-500">Умеренный</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-zinc-400">Мин. сумма:</span>
                                  <span className="text-sm text-white">100 USDT</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6">
                            <button
                              className="w-full bg-[#F1DA8B] hover:bg-amber-400 text-black font-medium p-3 rounded-lg text-sm transition-colors"
                              onClick={() => setShowIndexDetails(false)}
                            >
                              Принять
                            </button>
                          </div>

                          <Dialog.Close className="absolute top-4 right-4 text-zinc-400 hover:text-white">
                            <FiX className="w-5 h-5" />
                          </Dialog.Close>
                        </Dialog.Content>
                      </Dialog.Portal>
                    </Dialog.Root>
                  ))}
                </div>
              </div>

              {/* Statistics and Chart */}
              <div className="flex flex-col gap-4 sm:gap-6">
                <AssetStatistics stats={mockStats[selectedIndex.id as StatKey]} />
                <div className="bg-black/40 border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <PriceChart
                    data={mockIndexChartData[selectedIndex.id as StatKey]}
                    title={`${selectedIndex.name} - График цены`}
                    height={300}
                  />
                </div>
              </div>

              {/* Investment Period */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h2 className="text-base sm:text-lg lg:text-xl font-medium">Период инвестирования</h2>
                  <p className="text-white/80">Выберите срок блокировки средств в Инвест Индексе</p>
                </div>
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {periods.map((period) => (
                    <motion.button
                      key={period.months}
                      onClick={() => setSelectedPeriod(period)}
                      className={`w-full text-left p-4 sm:p-5 rounded-xl sm:rounded-2xl border transition-all duration-300 ${selectedPeriod.months === period.months
                        ? 'bg-[#F1DA8B]/10 border-[#F1DA8B]/50'
                        : 'bg-black/40 border-white/10 hover:border-white/20'
                        }`}
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <FiClock className={`w-4 h-4 sm:w-5 sm:h-5 ${selectedPeriod.months === period.months ? 'text-[#F1DA8B]' : 'text-zinc-400'}`} />
                          <span className={`font-medium ${selectedPeriod.months === period.months ? 'text-[#F1DA8B]' : 'text-white'}`}>
                            {period.months} месяцев
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400">{period.bonus}</p>
                        <div className="text-xs font-medium text-green-400">До {period.apy}% годовых</div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Investment Amount */}
              <div className="bg-black/40 border border-white/10 rounded-lg sm:rounded-xl p-4 sm:p-5">
                <div className="flex flex-col gap-4">
                  <h2 className="text-base sm:text-lg lg:text-xl font-medium">Сумма инвестиций</h2>
                  <div className="relative">
                    <input
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => handleNumberInput(e.target.value, setInvestmentAmount)}
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
                      +{calculateInvestmentReturn().toFixed(2)} <p className="text-white">USDT</p>
                    </span>
                  </div>
                </div>
              </div>

              {/* Selected Parameters */}
              <div className="bg-black/40 border border-white/10 rounded-lg sm:rounded-xl p-4 sm:p-5">
                <div className="flex flex-col gap-3">
                  <h3 className="text-base font-medium text-[#F1DA8B]">Выбранные параметры</h3>
                  <div className="flex flex-col gap-2">
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
                      <span className="text-white"> <p className='text-green-400'>{investmentAmount}</p> USDT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Годовая доходность:</span>
                      <span className="text-green-400">+{selectedIndex.yearlyReturn}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-fit bg-[#F1DA8B] hover:bg-amber-400 text-black font-medium p-3 sm:p-4 rounded-lg sm:rounded-xl text-sm sm:text-base transition-colors">
                Инвестировать
              </button>
            </motion.div>
          ) : selectedTab === 'staking' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-6"
            >
              {/* Staking Options */}
              <div className="flex flex-col gap-4">
                <h2 className="text-base sm:text-lg lg:text-xl font-medium">Выберите актив для стейкинга</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {stakingOptions.map((option) => (
                    <Dialog.Root key={option.id} open={showStakingDetails && selectedStakingOption.id === option.id} onOpenChange={(open) => {
                      setShowStakingDetails(open)
                      if (open) setSelectedStakingOption(option)
                    }}>
                      <Dialog.Trigger asChild>
                        <motion.button
                          onClick={() => setSelectedStakingOption(option)}
                          className={`w-full text-left p-4 sm:p-5 rounded-xl sm:rounded-2xl border transition-all duration-300 ${selectedStakingOption.id === option.id
                            ? 'bg-[#F1DA8B]/10 border-[#F1DA8B]/50'
                            : 'bg-black/40 border-white/10 hover:border-white/20'
                            }`}
                        >
                          <div className="flex items-start gap-4 w-full">
                            <div className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl ${selectedStakingOption.id === option.id ? 'bg-[#F1DA8B]/20' : 'bg-white/10'}`}>
                              <option.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${selectedStakingOption.id === option.id ? 'text-[#F1DA8B]' : 'text-zinc-400'}`} />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <h3 className={`text-sm sm:text-base font-medium ${selectedStakingOption.id === option.id ? 'text-[#F1DA8B]' : 'text-white'}`}>
                                {option.name}
                              </h3>
                              <p className="text-xs text-zinc-400">{option.description}</p>
                              <div className='flex justify-between items-end w-full mt-2'>


                                <div className="space-y-1">
                                  <div className={`text-xs font-medium ${selectedStakingOption.id === option.id ? 'text-[#F1DA8B]' : 'text-green-400'}`}>
                                    До {option.apy}% APY
                                  </div>
                                  <div className="text-xs text-zinc-400">
                                    Мин. {option.minAmount} {option.name}
                                  </div>

                                </div>
                                <p className="text-xs sm:text-sm text-[#F1DA8B]/80">больше информации</p>

                              </div>


                            </div>
                          </div>
                        </motion.button>
                      </Dialog.Trigger>

                      <Dialog.Portal>
                        <Dialog.Overlay className="bg-black/60 fixed inset-0 z-40" />
                        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-black border border-white/10 p-4 sm:p-6 shadow-lg z-50 focus:outline-none">
                          <Dialog.Title className="text-xl sm:text-2xl font-medium mb-4 text-[#F1DA8B]">
                            {option.name}
                          </Dialog.Title>

                          <div className="flex flex-col gap-6">
                            <div>
                              <h4 className="text-base text-[#F1DA8B] mb-2">Информация об активе</h4>
                              <div className="bg-white/5 p-3 rounded-lg flex flex-col gap-2">
                                <div className="flex justify-between">
                                  <span className="text-sm text-zinc-400">Тип актива:</span>
                                  <span className="text-sm text-white">{option.type}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-zinc-400">Блокчейн:</span>
                                  <span className="text-sm text-white">{option.blockchain}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-zinc-400">Протокол:</span>
                                  <span className="text-sm text-white">{option.protocol}</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-base text-[#F1DA8B] mb-2">Условия стейкинга</h4>
                              <div className="bg-white/5 p-3 rounded-lg flex flex-col gap-2">
                                <div className="flex justify-between">
                                  <span className="text-sm text-zinc-400">APY:</span>
                                  <span className="text-sm text-green-400">До {option.apy}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-zinc-400">Мин. сумма:</span>
                                  <span className="text-sm text-white">{option.minAmount} {option.name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-zinc-400">Период разблокировки:</span>
                                  <span className="text-sm text-white">{option.unlockPeriod}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6">
                            <button
                              className="w-full bg-[#F1DA8B] hover:bg-amber-400 text-black font-medium p-3 rounded-lg text-sm transition-colors"
                              onClick={() => setShowStakingDetails(false)}
                            >
                              Принять
                            </button>
                          </div>

                          <Dialog.Close className="absolute top-4 right-4 text-zinc-400 hover:text-white">
                            <FiX className="w-5 h-5" />
                          </Dialog.Close>
                        </Dialog.Content>
                      </Dialog.Portal>
                    </Dialog.Root>
                  ))}
                </div>
              </div>

              {/* Statistics and Chart for Staking */}
              <div className="flex flex-col gap-4 sm:gap-6">
                <AssetStatistics stats={mockStats[selectedStakingOption.id as StatKey]} />
                <div className="bg-black/40 border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <PriceChart
                    data={mockIndexChartData[selectedStakingOption.id as StatKey]}
                    title={`${selectedStakingOption.name} - График цены`}
                    height={300}
                  />
                </div>
              </div>

              {/* Staking Period */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h2 className="text-base sm:text-lg lg:text-xl font-medium">Период стейкинга</h2>
                  <p className="text-white/80">Выберите срок блокировки ваших активов</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  {stakingPeriods.map((period) => (
                    <motion.button
                      key={period.months}
                      onClick={() => setSelectedStakingPeriod(period)}
                      className={`w-full text-left p-4 sm:p-5 rounded-xl sm:rounded-2xl border transition-all duration-300 ${selectedStakingPeriod.months === period.months
                        ? 'bg-[#F1DA8B]/10 border-[#F1DA8B]/50'
                        : 'bg-black/40 border-white/10 hover:border-white/20'
                        }`}
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <FiClock className={`w-4 h-4 sm:w-5 sm:h-5 ${selectedStakingPeriod.months === period.months ? 'text-[#F1DA8B]' : 'text-zinc-400'}`} />
                          <span className={`font-medium ${selectedStakingPeriod.months === period.months ? 'text-[#F1DA8B]' : 'text-white'}`}>
                            {period.months} месяцев
                          </span>
                        </div>
                        <div className="text-xs font-medium text-green-400">
                          x{period.multiplier} к APY
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Staking Amount */}
              <div className="bg-black/40 border border-white/10 rounded-lg sm:rounded-xl p-4 sm:p-5">
                <div className="flex flex-col gap-4">
                  <h2 className="text-base sm:text-lg lg:text-xl font-medium">Сумма стейкинга</h2>
                  <div className="relative">
                    <input
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => handleNumberInput(e.target.value, setInvestmentAmount)}
                      className="w-full bg-black/40 text-green-400 border border-white/10 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-base sm:text-lg font-medium focus:outline-none focus:border-[#F1DA8B]/50"
                      placeholder="0.00"
                      min="0.01"

                    />
                    <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-zinc-400 text-sm sm:text-base">
                      {selectedStakingOption.name}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-zinc-400">Ожидаемая прибыль</span>
                    <span className="text-green-400 font-medium flex gap-2">
                      +{calculateStakingReturn().toFixed(2)} <p className="text-white">{selectedStakingOption.name}</p>
                    </span>
                  </div>
                </div>
              </div>

              {/* Selected Parameters */}
              <div className="bg-black/40 border border-white/10 rounded-lg sm:rounded-xl p-4 sm:p-5">
                <div className="flex flex-col gap-3">
                  <h3 className="text-base font-medium text-[#F1DA8B]">Выбранные параметры</h3>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Актив:</span>
                      <span className="text-white">{selectedStakingOption.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Период:</span>
                      <span className="text-white">{selectedStakingPeriod.months} месяцев</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Сумма:</span>
                      <span className="text-white flex gap-2"><p className='text-green-400'>{investmentAmount}</p> {selectedStakingOption.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">APY:</span>
                      <span className="text-green-400">+{selectedStakingOption.apy}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <button className="w-fit bg-[#F1DA8B] hover:bg-amber-400 text-black font-medium p-3 sm:p-4 rounded-lg sm:rounded-xl text-sm sm:text-base transition-colors">
                    Начать стейкинг
                  </button>
                </Dialog.Trigger>

                <Dialog.Portal>
                  <Dialog.Overlay className="bg-black/60 fixed inset-0 z-40" />
                  <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-black border border-white/10 p-4 sm:p-6 shadow-lg z-50 focus:outline-none">
                    <Dialog.Title className="text-xl sm:text-2xl font-medium mb-4 text-[#F1DA8B]">
                      Подтверждение стейкинга
                    </Dialog.Title>

                    <div className="flex flex-col gap-6">
                      <div>
                        <h4 className="text-base text-[#F1DA8B] mb-2">Подтверждение</h4>
                        <div className="bg-white/5 p-3 rounded-lg flex flex-col gap-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-zinc-400">Актив:</span>
                            <span className="text-sm text-white">{selectedStakingOption.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-zinc-400">Период:</span>
                            <span className="text-sm text-white">{selectedStakingPeriod.months} месяцев</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-zinc-400">Сумма:</span>
                            <span className="text-sm text-white">{investmentAmount} {selectedStakingOption.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-zinc-400">APY:</span>
                            <span className="text-sm text-green-400">+{selectedStakingOption.apy}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button
                        className="w-full bg-[#F1DA8B] hover:bg-amber-400 text-black font-medium p-3 rounded-lg text-sm transition-colors"
                        onClick={() => console.log('Staking confirmed')}
                      >
                        Подтвердить
                      </button>
                    </div>

                    <Dialog.Close className="absolute top-4 right-4 text-zinc-400 hover:text-white">
                      <FiX className="w-5 h-5" />
                    </Dialog.Close>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-6"
            >
              {/* Trading Mining */}
              <div className="flex flex-col gap-4">
                <h2 className="text-base sm:text-lg lg:text-xl font-medium">Торговый майнинг</h2>
                <p className="text-white/80">Раздел в разработке</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  )
}
