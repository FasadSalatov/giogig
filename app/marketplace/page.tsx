'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FiShoppingCart,
  FiTag,
  FiDollarSign,
  FiPlus,
  FiSearch,
  FiPackage
} from 'react-icons/fi'
import SellVoucherModal from './components/SellVoucherModal'

// Примеры ваучеров
const vouchers = [
  {
    id: 1,
    name: "Premium Ваучер",
    price: 150,
    currency: "USDT",
    duration: "30 дней",
    features: ["Торговля без комиссии", "Приоритетная поддержка", "Эксклюзивные торговые пары", "24/7 VIP поддержка"],
    seller: "0x1234...5678",
    type: "Premium",
    popularity: 98,
    remaining: 5,
    currentFunds: 1000,
    timeRemaining: "10 дней"
  },
  {
    id: 2,
    name: "Pro Ваучер",
    price: 280,
    currency: "USDT",
    duration: "90 дней",
    features: ["Расширенная аналитика", "VIP поддержка", "Торговля с плечом до 10x", "Персональный менеджер"],
    seller: "0x8765...4321",
    type: "Pro",
    popularity: 95,
    remaining: 3,
    currentFunds: 500,
    timeRemaining: "20 дней"
  },
  {
    id: 3,
    name: "Стандарт Ваучер",
    price: 50,
    currency: "USDT",
    duration: "30 дней",
    features: ["Базовая аналитика", "Стандартная поддержка", "Торговля основными парами"],
    seller: "0x9876...1234",
    type: "Стандарт",
    popularity: 90,
    remaining: 15,
    currentFunds: 2000,
    timeRemaining: "5 дней"
  },
  {
    id: 4,
    name: "Pro+ Ваучер",
    price: 450,
    currency: "USDT",
    duration: "180 дней",
    features: ["Все преимущества Pro", "Доступ к IDO", "Эксклюзивные NFT", "Приватные торговые сигналы"],
    seller: "0x5432...8765",
    type: "Pro",
    popularity: 97,
    remaining: 2,
    currentFunds: 1500,
    timeRemaining: "15 дней"
  }
]

// Категории ваучеров
const categories = [
  "Все", "Basis", "Premium", "Vip"
]

export default function MarketplacePage() {
  const [selectedTab, setSelectedTab] = useState<'buy' | 'sell'>('buy')
  const [selectedCategory, setSelectedCategory] = useState("Все")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSellModalOpen, setIsSellModalOpen] = useState(false)

  const handleSellVoucher = (data: { price: string; amount: string }) => {
    console.log('Selling voucher:', data);
    // Здесь будет логика обработки продажи ваучера
    setIsSellModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-black text-white max-w-7xl mx-auto">
      <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 text-[#F1DA8B]">
            Маркет
          </h1>
          <p className="text-white/80">
            Покупайте и продавайте ваучеры для доступа к премиум функциям
          </p>
        </motion.div>


        {/* Tabs */}
        <div className="flex gap-2 mb-8 p-1 bg-black/40 rounded-xl w-fit">
          <button
            onClick={() => setSelectedTab('buy')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${selectedTab === 'buy'
              ? 'bg-[#F1DA8B] text-black'
              : 'bg-white/10 hover:bg-white/20'
              }`}
          >
            <div className="flex items-center gap-2">
              <FiShoppingCart className="w-4 h-4" />
              Купить
            </div>
          </button>
          <button
            onClick={() => setSelectedTab('sell')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${selectedTab === 'sell'
              ? 'bg-[#F1DA8B] text-black'
              : 'bg-white/10 hover:bg-white/20'
              }`}
          >
            <div className="flex items-center gap-2">
              <FiTag className="w-4 h-4" />
              Мои ваучеры
            </div>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Поиск ваучеров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[#F1DA8B]/50"
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide py-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-300 ${selectedCategory === category
                  ? 'bg-[#F1DA8B]/10 border-[#F1DA8B]/50 text-[#F1DA8B]'
                  : 'bg-black/40 border-white/10 hover:border-white/20'
                  } border`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="mb-8">
          <button
            onClick={() => setIsSellModalOpen(true)}
            className="w-full sm:w-auto px-6 py-3 bg-[#F1DA8B] hover:bg-amber-400 text-black rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <FiPlus className="w-5 h-5" />
            Продать ваучер
          </button>
        </div>

        {/* Vouchers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {vouchers.map((voucher) => (
            <motion.div
              key={voucher.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/40 border border-white/10 rounded-xl overflow-hidden hover:border-[#F1DA8B]/50 transition-all duration-300"
            >
              {/* Voucher Header */}
              <div className="p-5 border-b border-white/10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-[#F1DA8B]/20">
                      <FiPackage className="w-5 h-5 text-[#F1DA8B]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#F1DA8B]">{voucher.name}</h3>
                      <p className="text-xs text-zinc-400 mt-0.5">{voucher.type}</p>
                    </div>
                  </div>
                  <div className="text-xs px-2.5 py-1 bg-[#F1DA8B]/10 text-[#F1DA8B] rounded-lg border border-[#F1DA8B]/20">
                    {voucher.duration}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {voucher.features.map((feature, index) => (
                    <div key={index} className="text-xs text-zinc-400 flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-[#F1DA8B]" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="px-5 py-3 bg-black/20 border-b border-white/10">
                <div className="flex justify-between items-center text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <FiTag className="w-4 h-4" />
                    <span>Популярность: {voucher.popularity}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiPackage className="w-4 h-4" />
                    <span>Осталось: {voucher.remaining}</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FiDollarSign className="w-5 h-5 text-[#F1DA8B]" />
                    <span className="text-lg font-medium text-green-400">{voucher.price}</span>
                    <span className="text-sm text-white">{voucher.currency}</span>
                  </div>
                  <div className="text-xs text-zinc-400">
                    ID: {voucher.seller}
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-zinc-400">Заблокированно средств: <br></br> {voucher.currentFunds} USDT</span>
                  <span className="text-sm text-zinc-400">До конца срока: <br></br> {voucher.timeRemaining}</span>
                </div>

                <button className="w-full bg-gradient-to-r from-[#F1DA8B]/10 to-yellow-500/10 text-white font-medium py-3 rounded-xl transition-colors">
                  Купить сейчас
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sell Voucher Modal */}
      <SellVoucherModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
        onSubmit={handleSellVoucher}
        vouchers={vouchers}
      />
    </main>
  )
}
