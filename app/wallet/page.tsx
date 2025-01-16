"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { GradientBorder } from "@/app/components/ui/GradientBorder";
import { PageTransition } from "@/app/components/animations/PageTransition";

const acceptedTokens = [
  { symbol: "USDT", name: "Tether USD", networks: ["BSC", "ETH", "TON"] },
  { symbol: "QNX", name: "Quantex Coin", networks: ["TON"] },
  { symbol: "Q-Point", name: "Quantex Points", networks: ["TON"] },
  { symbol: "BNB", name: "Binance Coin", networks: ["BSC"] },
  { symbol: "ETH", name: "Ethereum", networks: ["ETH"] },
  { symbol: "TON", name: "Toncoin", networks: ["TON"] },
  { symbol: "BTC", name: "Bitcoin", networks: ["BTC"] },
];

// Utility function to handle number inputs
const handleNumberInput = (value: string, setter: (value: string) => void) => {
  // Remove leading zeros
  const sanitizedValue = value.replace(/^0+(?=\d)/, '');
  setter(sanitizedValue);
};

// Selected Parameters Component
const SelectedParameters = ({ params }: { params: { label: string; value: string }[] }) => {
  if (params.every(param => !param.value)) return null;

  return (
    <div className="p-4 rounded-lg border border-zinc-800 bg-black/40 mb-6">
      <h4 className="text-sm font-medium text-[#F1DA8B] mb-3">Выбранные параметры</h4>
      <div className="space-y-2">
        {params.map((param, index) => (
          param.value && (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-white/60">{param.label}:</span>
              <span className="text-white font-medium">{param.value}</span>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default function WalletPage() {
  const [selectedTab, setSelectedTab] = useState<"deposit" | "withdraw" | "exchange">("deposit");
  const [selectedCurrency, setSelectedCurrency] = useState("USDT");
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [amount, setAmount] = useState("");
  const [fromAsset, setFromAsset] = useState(acceptedTokens.find(t => t.symbol === "QNX") || acceptedTokens[0]);
  const [toAsset, setToAsset] = useState(acceptedTokens.find(t => t.symbol === "USDT") || acceptedTokens[0]);
  const [exchangeAmount, setExchangeAmount] = useState("");
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  // Mock exchange rates - in real app, these would come from an API
  const mockExchangeRates: Record<string, Record<string, number>> = {
    "QNX": { "USDT": 0.5, "TON": 0.1, "Q-Point": 100 },
    "USDT": { "QNX": 2, "TON": 0.2, "Q-Point": 200 },
    "TON": { "QNX": 10, "USDT": 5, "Q-Point": 1000 },
    "Q-Point": { "QNX": 0.01, "USDT": 0.005, "TON": 0.001 }
  };

  const getExchangeRate = (from: string, to: string) => {
    return mockExchangeRates[from]?.[to] || 0;
  };

  return (
    <PageTransition>
      <main className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 text-[#F1DA8B]">
              Кошелек
            </h1>
            <p className="text-white/80">Управление средствами</p>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Wallet Operations */}
            <div className="lg:col-span-8">
              <GradientBorder className="gradient-amber h-full">
                <Card className="bg-black/80 backdrop-blur-xl p-6 h-full">
                  {/* Tabs */}
                  <div className="flex gap-2 mb-8 p-1 border border-zinc-800 rounded-lg bg-black/40">
                    <button
                      onClick={() => setSelectedTab("deposit")}
                      className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${selectedTab === "deposit"
                        ? "bg-[#F1DA8B] text-black"
                        : "text-white/80 hover:text-[#F1DA8B] hover:bg-white/5"
                        }`}
                    >
                      Пополнить
                    </button>
                    <button
                      onClick={() => setSelectedTab("withdraw")}
                      className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${selectedTab === "withdraw"
                        ? "bg-[#F1DA8B] text-black"
                        : "text-white/80 hover:text-[#F1DA8B] hover:bg-white/5"
                        }`}
                    >
                      Вывести
                    </button>
                    <button
                      onClick={() => setSelectedTab("exchange")}
                      className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${selectedTab === "exchange"
                        ? "bg-[#F1DA8B] text-black"
                        : "text-white/80 hover:text-[#F1DA8B] hover:bg-white/5"
                        }`}
                    >
                      Обмен
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedTab}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      {selectedTab === "exchange" ? (
                        <div className="space-y-6">

                          {/* From Asset Selection */}
                          <div>
                            <label className="block text-sm font-medium text-white/80 mb-4">
                              Отдаете Актив
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                              {acceptedTokens
                                .filter(token =>
                                  ["QNX", "USDT", "TON", "Q-Point"].includes(token.symbol) &&
                                  token.symbol
                                )
                                .map((token) => (
                                  <button
                                    key={token.symbol}
                                    onClick={() => {
                                      setFromAsset(token);
                                      const rate = getExchangeRate(token.symbol, toAsset.symbol);
                                      setExchangeRate(rate);
                                    }}
                                    className={`p-4 rounded-lg border transition-all ${fromAsset?.symbol === token.symbol
                                      ? "border-[#F1DA8B] bg-[#F1DA8B]/10"
                                      : "border-zinc-800 hover:border-[#F1DA8B]/50"
                                      }`}
                                  >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F1DA8B]/20 to-yellow-500/20 flex items-center justify-center mx-auto mb-2">
                                      <span className="text-[#F1DA8B] font-medium">{token.symbol[0]}</span>
                                    </div>
                                    <div className="text-center">
                                      <div className="font-medium mb-1">{token.symbol}</div>
                                      <div className="text-xs text-white/60">{token.name}</div>
                                    </div>
                                  </button>
                                ))}
                            </div>
                          </div>

                          {/* To Asset Selection */}
                          <div>
                            <label className="block text-sm font-medium text-white/80 mb-4">
                              Получаете Актив
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                              {acceptedTokens
                                .filter(token =>
                                  ["QNX", "USDT", "TON"].includes(token.symbol) &&
                                  token.symbol !== fromAsset.symbol
                                )
                                .map((token) => (
                                  <button
                                    key={token.symbol}
                                    onClick={() => setToAsset(token)}
                                    className={`p-4 rounded-lg border transition-all ${toAsset?.symbol === token.symbol
                                      ? "border-[#F1DA8B] bg-[#F1DA8B]/10"
                                      : "border-zinc-800 hover:border-[#F1DA8B]/50"
                                      }`}
                                  >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F1DA8B]/20 to-yellow-500/20 flex items-center justify-center mx-auto mb-2">
                                      <span className="text-[#F1DA8B] font-medium">{token.symbol[0]}</span>
                                    </div>
                                    <div className="text-center">
                                      <div className="font-medium mb-1">{token.symbol}</div>
                                      <div className="text-xs text-white/60">{token.name}</div>
                                    </div>
                                  </button>
                                ))}
                            </div>
                          </div>

                          {/* Exchange Calculator */}
                          {fromAsset && toAsset && (
                            <div className="p-6 rounded-lg border border-zinc-800 bg-black/40">
                              <label className="block text-sm font-medium text-white/80 mb-2">
                                Сумма {fromAsset.symbol}
                              </label>
                              <div className="relative mb-6">
                                <input
                                  type="number"
                                  value={exchangeAmount}
                                  onChange={(e) => handleNumberInput(e.target.value, setExchangeAmount)}
                                  className="w-full bg-black/40 border border-zinc-800 rounded-lg px-4 py-3 focus:outline-none focus:border-[#F1DA8B] text-white"
                                  placeholder="0.00"
                                  min="0.01"
                                  step="0.01"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80">
                                  {fromAsset.symbol}
                                </div>
                              </div>

                              <div className="space-y-3 mb-6">
                                <div className="p-4 rounded-lg bg-[#F1DA8B]/5">
                                  <div className="text-[#F1DA8B] mb-1">Курс обмена</div>
                                  <div className="text-lg">
                                    1 {fromAsset.symbol} = {exchangeRate} {toAsset.symbol}
                                  </div>
                                </div>
                                {exchangeAmount && exchangeRate && (
                                  <div className="p-4 rounded-lg bg-[#F1DA8B]/5">
                                    <div className="text-[#F1DA8B] mb-1">Вы получите</div>
                                    <div className="text-lg">
                                      {(Number(exchangeAmount) * exchangeRate).toFixed(6)} {toAsset.symbol}
                                    </div>
                                  </div>
                                )}
                              </div>

                              <SelectedParameters
                                params={[
                                  { label: "Отдаете", value: fromAsset?.symbol || "" },
                                  { label: "Получаете", value: toAsset?.symbol || "" },
                                  { label: "Курс обмена", value: exchangeRate ? `1 ${fromAsset?.symbol} = ${exchangeRate} ${toAsset?.symbol}` : "" }
                                ]}
                              />
                              <Button
                                disabled={!exchangeAmount || Number(exchangeAmount) <= 0 || !exchangeRate}
                                className="w-full bg-[#F1DA8B] hover:bg-amber-400 text-black py-4"
                                onClick={() => {
                                  // Handle exchange logic here
                                  console.log(`Exchange ${exchangeAmount} ${fromAsset.symbol} to ${toAsset.symbol}`);
                                }}
                              >
                                Обменять
                              </Button>
                            </div>
                          )}
                        </div>
                      ) : selectedTab === "deposit" ? (
                        <div className="space-y-6">

                          {/* Token Selection */}
                          <div>
                            <label className="block text-sm font-medium text-white/80 mb-4">
                              Выберите валюту
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                              {acceptedTokens
                                .filter(token => token.symbol !== "Q-Point")
                                .map((token) => (
                                  <button
                                    key={token.symbol}
                                    onClick={() => setSelectedCurrency(token.symbol)}
                                    className={`p-4 rounded-lg border transition-all ${selectedCurrency === token.symbol
                                      ? "border-[#F1DA8B] bg-[#F1DA8B]/10"
                                      : "border-zinc-800 hover:border-[#F1DA8B]/50"
                                      }`}
                                  >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F1DA8B]/20 to-yellow-500/20 flex items-center justify-center mx-auto mb-2">
                                      <span className="text-[#F1DA8B] font-medium">{token.symbol[0]}</span>
                                    </div>
                                    <div className="text-center">
                                      <div className="font-medium mb-1">{token.symbol}</div>
                                      <div className="text-xs text-white/60">{token.name}</div>
                                    </div>
                                  </button>
                                ))}
                            </div>
                          </div>

                          {/* Network Selection */}
                          <div>
                            <label className="block text-sm font-medium text-white/80 mb-4">
                              Выберите сеть
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                              {acceptedTokens
                                .find(token => token.symbol === selectedCurrency)
                                ?.networks.map((network) => (
                                  <button
                                    key={network}
                                    onClick={() => setSelectedNetwork(network)}
                                    className={`p-4 rounded-lg border transition-all ${network === selectedNetwork
                                      ? "border-[#F1DA8B] bg-[#F1DA8B]/10"
                                      : "border-zinc-800 hover:border-[#F1DA8B]/50"
                                      }`}
                                  >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F1DA8B]/20 to-yellow-500/20 flex items-center justify-center mx-auto mb-2">
                                      <span className="text-[#F1DA8B] font-medium">{network[0]}</span>
                                    </div>
                                    <div className="text-center font-medium">{network}</div>
                                  </button>
                                ))}
                            </div>
                          </div>

                          {/* Amount Input */}
                          <div className="p-6 rounded-lg border border-zinc-800 bg-black/40">
                            <label className="block text-sm font-medium text-white/80 mb-2">
                              Сумма {selectedCurrency}
                            </label>
                            <div className="relative mb-6">
                              <input
                                type="number"
                                value={amount}
                                onChange={(e) => handleNumberInput(e.target.value, setAmount)}
                                className="w-full bg-black/40 border border-zinc-800 rounded-lg px-4 py-3 focus:outline-none focus:border-[#F1DA8B] text-white"
                                placeholder="0.00"
                                min="0.01"
                                step="0.01"
                              />
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80">
                                {selectedCurrency}
                              </div>
                            </div>
                            <SelectedParameters
                              params={[
                                { label: "Валюта", value: selectedCurrency },
                                { label: "Сеть", value: selectedNetwork }
                              ]}
                            />
                            <Button
                              disabled={!amount}
                              className="w-full bg-[#F1DA8B] hover:bg-amber-400 text-black py-4"
                            >
                              Пополнить
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-6">

                          {/* Token Selection */}
                          <div>
                            <label className="block text-sm font-medium text-white/80 mb-4">
                              Выберите валюту
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                              {acceptedTokens
                                .filter(token => token.symbol !== "Q-Point")
                                .map((token) => (
                                  <button
                                    key={token.symbol}
                                    onClick={() => setSelectedCurrency(token.symbol)}
                                    className={`p-4 rounded-lg border transition-all ${selectedCurrency === token.symbol
                                      ? "border-[#F1DA8B] bg-[#F1DA8B]/10"
                                      : "border-zinc-800 hover:border-[#F1DA8B]/50"
                                      }`}
                                  >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F1DA8B]/20 to-yellow-500/20 flex items-center justify-center mx-auto mb-2">
                                      <span className="text-[#F1DA8B] font-medium">{token.symbol[0]}</span>
                                    </div>
                                    <div className="text-center">
                                      <div className="font-medium mb-1">{token.symbol}</div>
                                      <div className="text-xs text-white/60">{token.name}</div>
                                    </div>
                                  </button>
                                ))}
                            </div>
                          </div>

                          {/* Network Selection */}
                          <div>
                            <label className="block text-sm font-medium text-white/80 mb-4">
                              Выберите сеть
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                              {acceptedTokens.find(token => token.symbol === selectedCurrency)?.networks.map((network) => (
                                <button
                                  key={network}
                                  onClick={() => setSelectedNetwork(network)}
                                  className={`p-4 rounded-lg border transition-all ${network === selectedNetwork
                                    ? "border-[#F1DA8B] bg-[#F1DA8B]/10"
                                    : "border-zinc-800 hover:border-[#F1DA8B]/50"
                                    }`}
                                >
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F1DA8B]/20 to-yellow-500/20 flex items-center justify-center mx-auto mb-2">
                                    <span className="text-[#F1DA8B] font-medium">{network[0]}</span>
                                  </div>
                                  <div className="text-center font-medium">{network}</div>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Amount Input */}
                          <div className="p-6 rounded-lg border border-zinc-800 bg-black/40">
                            <label className="block text-sm font-medium text-white/80 mb-2">
                              Сумма {selectedCurrency}
                            </label>
                            <div className="relative mb-6">
                              <input
                                type="number"
                                value={amount}
                                onChange={(e) => handleNumberInput(e.target.value, setAmount)}
                                className="w-full bg-black/40 border border-zinc-800 rounded-lg px-4 py-3 focus:outline-none focus:border-[#F1DA8B] text-white"
                                placeholder="0.00"
                                min="0.01"
                                step="0.01"
                              />
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80">
                                {selectedCurrency}
                              </div>
                            </div>

                            <SelectedParameters
                              params={[
                                { label: "Валюта", value: selectedCurrency },
                                { label: "Сеть", value: selectedNetwork }
                              ]}
                            />

                            <Button
                              disabled={!amount}
                              className="w-full bg-[#F1DA8B] hover:bg-amber-400 text-black py-4"
                            >
                              Вывести
                            </Button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </Card>
              </GradientBorder>
            </div>

            {/* Right Column - Balance & History */}
            <div className="lg:col-span-4 space-y-8">
              {/* Transaction History */}
              <GradientBorder className="gradient-amber">
                <Card className="bg-black/40 backdrop-blur-xl p-6">
                  <h3 className="text-xl font-bold mb-6 text-[#F1DA8B]">
                    История транзакций
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 rounded-lg border border-zinc-800/50 hover:bg-white/5 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-[#F1DA8B]/10 text-[#F1DA8B]">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Пополнение</div>
                          <div className="flex gap-2 text-xs text-white/60">
                            <span>16.12.2024 15:30</span>
                            <span className="text-[#F1DA8B]/60">BSC</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#F1DA8B]"><span className="text-green-400">+100</span> <span className="text-white">USDT</span></div>
                        <div className="text-xs text-white/60 font-mono">0x123...abc</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 rounded-lg border border-zinc-800/50 hover:bg-white/5 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Вывод</div>
                          <div className="flex gap-2 text-xs text-white/60">
                            <span>16.12.2024 14:20</span>
                            <span className="text-[#F1DA8B]/60">TON</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-red-500"><span className="text-green-400">-50</span> <span className="text-white">USDT</span></div>
                        <div className="text-xs text-white/60 font-mono">EQBz...j7K</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 rounded-lg border border-zinc-800/50 hover:bg-white/5 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-emerald-500/10 text-green-400">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Покупка QNX</div>
                          <div className="flex gap-2 text-xs text-white/60">
                            <span>16.12.2024 12:15</span>
                            <span className="text-green-400/60">Успешно</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-400">+200 QNX</div>
                        <div className="text-xs text-white/60"><span className="text-green-400">-100</span> <span className="text-white">USDT</span></div>
                      </div>
                    </div>
                  </div>
                </Card>
              </GradientBorder>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
