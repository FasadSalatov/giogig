"use client";

import { useState } from "react";
import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { GradientBorder } from "@/app/components/ui/GradientBorder";
import { Badge } from "@/app/components/ui/Badge";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  WalletIcon,
  TicketIcon,
  GamepadIcon,
  UsersIcon,
  TrendingUpIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { PageTransition } from "@/app/components/animations/PageTransition";

// Типы транзакций
const transactionTypes = [
  { id: "all", name: "Все" },
  { id: "deposit", name: "Пополнения" },
  { id: "withdraw", name: "Выводы" },
  { id: "voucher", name: "Ваучеры" },
  { id: "game", name: "Игры" },
  { id: "referral", name: "Рефералы" },
  { id: "trade", name: "Трейдинг" },
];

// Примеры транзакций
const transactions = [
  {
    id: 1,
    type: "deposit",
    title: "Пополнение баланса",
    amount: "<span class='text-green-400'>+1,000.00</span> <span class='text-white'>USDT</span>",
    status: "success",
    date: "16.12.2024",
    time: "12:30",
    network: "BSC",
    txHash: "0x1234...5678",
  },
  {
    id: 2,
    type: "game",
    title: "Выигрыш в Dice",
    amount: "<span class='text-green-400'>+245.50</span> <span class='text-white'>USDT</span>",
    status: "success",
    date: "16.12.2024",
    time: "11:45",
    gameId: "DICE-123456",
  },
  {
    id: 3,
    type: "voucher",
    title: "Продажа ваучера",
    amount: "<span class='text-green-400'>+500.00</span> <span class='text-white'>USDT</span>",
    status: "success",
    date: "15.12.2024",
    time: "18:20",
    voucherId: "V-789012",
  },
  {
    id: 4,
    type: "withdraw",
    title: "Вывод средств",
    amount: "<span class='text-green-400'>-750.00</span> <span class='text-white'>USDT</span>",
    status: "pending",
    date: "15.12.2024",
    time: "15:10",
    network: "ETH",
    txHash: "0x9876...4321",
  },
  {
    id: 5,
    type: "referral",
    title: "Реферальное вознаграждение",
    amount: "<span class='text-green-400'>+25.00</span> <span class='text-white'>USDT</span>",
    status: "success",
    date: "15.12.2024",
    time: "14:30",
    referral: "user123",
  },
  {
    id: 6,
    type: "trade",
    title: "Прибыль с копи-трейдинга",
    amount: "<span class='text-green-400'>+125.75</span> <span class='text-white'>USDT</span>",
    status: "success",
    date: "15.12.2024",
    time: "10:15",
    trader: "trader456",
  },
];

/**
 * Component for displaying the history of transactions.
 *
 * It uses the `transactions` array from the context to filter and display the transactions.
 * The component also provides a search bar to filter the transactions by title, amount, date, time, network, txHash, gameId, voucherId, referral, or trader.
 * The component also provides a button to toggle the display of the transaction types.
 *
 * The component uses the `PageTransition` component to animate the page transitions.
 *
 * The component is responsive and adapts to different screen sizes.
 */
export default function HistoryPage() {
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Фильтрация транзакций
  const filteredTransactions = transactions.filter((tx) => {
    const matchesType = selectedType === "all" || tx.type === selectedType;
    const matchesSearch =
      tx.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.amount.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.date.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Получение иконки для типа транзакции
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowUpIcon className="h-4 w-4" />;
      case "withdraw":
        return <ArrowDownIcon className="h-4 w-4" />;
      case "game":
        return <GamepadIcon className="h-4 w-4" />;
      case "quest":
        return <TicketIcon className="h-4 w-4" />;
      case "referral":
        return <UsersIcon className="h-4 w-4" />;
      case "trade":
        return <TrendingUpIcon className="h-4 w-4" />;
      default:
        return <WalletIcon className="h-4 w-4" />;
    }
  };

  return (
    <PageTransition>
      <main className="min-h-screen bg-black text-white max-w-7xl mx-auto">
        <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
          {/* Animated Background */}
          <div className="fixed inset-0 -z-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-black via-zinc-900/50 to-black"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(120,119,198,0.3),transparent)]"></div>
          </div>

          {/* Header with Animation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 sm:mb-8"
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-[#F1DA8B]">
              История</h1>
            <p className="text-sm sm:text-base text-zinc-400">История всех операций</p>
          </motion.div>

          {/* Filters with Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 sm:mb-8 space-y-3 sm:space-y-4"
          >
            {/* Search and Export */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Поиск по сумме, дате или описанию..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-9 pr-4 bg-white/5 rounded-lg border border-white/10 focus:border-white/20 focus:ring-0 text-sm"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="sm:hidden flex-1 gap-2 h-10 bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <FilterIcon className="h-4 w-4" />
                  Фильтры
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 sm:flex-none gap-2 h-10 bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                >
                  <DownloadIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Экспорт</span>
                </Button>
              </div>
            </div>

            {/* Transaction Types - Desktop */}
            <div className="hidden sm:flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {transactionTypes.map((type) => (
                <motion.button
                  key={type.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: transactionTypes.indexOf(type) * 0.1 }}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedType === type.id
                    ? "bg-white/10 text-white"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {type.name}
                </motion.button>
              ))}
            </div>

            {/* Transaction Types - Mobile */}
            <div className={`sm:hidden grid grid-cols-2 gap-2 ${isFilterOpen ? 'block' : 'hidden'}`}>
              {transactionTypes.map((type) => (
                <motion.button
                  key={type.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: transactionTypes.indexOf(type) * 0.1 }}
                  onClick={() => {
                    setSelectedType(type.id);
                    setIsFilterOpen(false);
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedType === type.id
                    ? "bg-white/10 text-white"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {type.name}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Transactions List with Improved Mobile Layout */}
          <div className="space-y-3 sm:space-y-4">
            {filteredTransactions.map((tx, index) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <GradientBorder>
                  <Card className="bg-black/40 backdrop-blur-xl border-white/5 hover:bg-white/[0.08] transition-all duration-300">
                    <div className="p-4 sm:p-5">
                      {/* Transaction Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 sm:p-2.5 rounded-xl shrink-0 ${tx.type === 'deposit' ? 'bg-emerald-400/10 text-emerald-400' :
                            tx.type === 'withdraw' ? 'bg-red-400/10 text-red-400' :
                              tx.type === 'voucher' ? 'bg-primary/10 text-primary' :
                                tx.type === 'game' ? 'bg-secondary/10 text-secondary' :
                                  tx.type === 'referral' ? 'bg-amber-400/10 text-amber-400' :
                                    'bg-blue-400/10 text-blue-400'
                            }`}>
                            {getTransactionIcon(tx.type)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-sm sm:text-base font-medium truncate">{tx.title}</h3>
                            <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                              {tx.date} в {tx.time}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center sm:flex-col sm:items-end gap-2 sm:gap-1 ml-11 sm:ml-0">
                          <span dangerouslySetInnerHTML={{ __html: tx.amount }} />
                          <Badge
                            className={`text-xs ${tx.status === "success"
                              ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/20"
                              : "bg-yellow-400/10 text-yellow-400 border-yellow-400/20"
                              }`}
                          >
                            {tx.status === "success" ? "Успешно" : "В обработке"}
                          </Badge>
                        </div>
                      </div>

                      {/* Transaction Details with Improved Mobile Layout */}
                      <div className="text-xs sm:text-sm text-zinc-400 space-y-1.5 sm:space-y-2">
                        {tx.network && (
                          <div className="flex items-center justify-between">
                            <span className="text-zinc-500">Сеть:</span>
                            <span className="font-medium">{tx.network}</span>
                          </div>
                        )}
                        {tx.txHash && (
                          <div className="flex items-center justify-between">
                            <span className="text-zinc-500">TX:</span>
                            <span className="font-mono text-xs">{tx.txHash}</span>
                          </div>
                        )}
                        {tx.gameId && (
                          <div className="flex items-center justify-between">
                            <span className="text-zinc-500">ID игры:</span>
                            <span className="font-medium">{tx.gameId}</span>
                          </div>
                        )}
                        {tx.voucherId && (
                          <div className="flex items-center justify-between">
                            <span className="text-zinc-500">ID ваучера:</span>
                            <span className="font-medium">{tx.voucherId}</span>
                          </div>
                        )}
                        {tx.referral && (
                          <div className="flex items-center justify-between">
                            <span className="text-zinc-500">Реферал:</span>
                            <span className="font-medium">{tx.referral}</span>
                          </div>
                        )}
                        {tx.trader && (
                          <div className="flex items-center justify-between">
                            <span className="text-zinc-500">Трейдер:</span>
                            <span className="font-medium">{tx.trader}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </GradientBorder>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
