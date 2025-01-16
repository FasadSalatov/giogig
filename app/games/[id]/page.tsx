"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { PageTransition } from "@/app/components/animations/PageTransition";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
import { GradientBorder } from "@/app/components/ui/GradientBorder";
import { UsersIcon, CoinsIcon, ClockIcon, TrophyIcon, ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

// Временные данные для демонстрации
const gameData = {
  snake: {
    id: "snake",
    name: "Змейка",
    description: "Классическая игра змейка. Собирайте очки и растите! Управляйте змейкой, собирайте еду и избегайте столкновений со стенами и собственным хвостом. Чем длиннее становится змейка, тем сложнее становится игра.",
    emoji: "🐍",
    points: "100",
    players: 850,
    category: "casual",
    color: "emerald",
    highScore: 12500,
    playTime: "10 мин",
    leaderboard: [
      { name: "Player1", score: 12500 },
      { name: "Player2", score: 11200 },
      { name: "Player3", score: 10800 },
    ]
  },
  // Другие игры...
};

export default function GamePage() {
  const { id } = useParams();
  const game = gameData[id as keyof typeof gameData];

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Игра не найдена</h1>
          <Link href="/games">
            <Button>Вернуться к списку игр</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <main className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-6 md:py-8">
          {/* Back Button */}
          <Link href="/games" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors">
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Назад к играм</span>
          </Link>

          {/* Game Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#F1DA8B]/10 flex items-center justify-center text-4xl">
                    {game.emoji}
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#F1DA8B] via-yellow-500 to-amber-400 bg-clip-text text-transparent">
                      {game.name}
                    </h1>
                    <p className="text-zinc-400 mt-1">{game.category}</p>
                  </div>
                </div>
                <p className="text-zinc-300 text-base md:text-lg leading-relaxed">
                  {game.description}
                </p>
              </motion.div>

              {/* Game Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6"
              >
                <Card className="bg-black/40 backdrop-blur-xl p-4">
                  <div className="flex flex-col items-center text-center">
                    <UsersIcon className="w-6 h-6 text-[#F1DA8B] mb-2" />
                    <div className="text-lg font-bold">{game.players}</div>
                    <div className="text-sm text-zinc-400">Игроков</div>
                  </div>
                </Card>
                <Card className="bg-black/40 backdrop-blur-xl p-4">
                  <div className="flex flex-col items-center text-center">
                    <CoinsIcon className="w-6 h-6 text-[#F1DA8B] mb-2" />
                    <div className="text-lg font-bold">{game.points}</div>
                    <div className="text-sm text-zinc-400">Очков</div>
                  </div>
                </Card>
                <Card className="bg-black/40 backdrop-blur-xl p-4">
                  <div className="flex flex-col items-center text-center">
                    <TrophyIcon className="w-6 h-6 text-[#F1DA8B] mb-2" />
                    <div className="text-lg font-bold">{game.highScore}</div>
                    <div className="text-sm text-zinc-400">Рекорд</div>
                  </div>
                </Card>
                <Card className="bg-black/40 backdrop-blur-xl p-4">
                  <div className="flex flex-col items-center text-center">
                    <ClockIcon className="w-6 h-6 text-[#F1DA8B] mb-2" />
                    <div className="text-lg font-bold">{game.playTime}</div>
                    <div className="text-sm text-zinc-400">Время игры</div>
                  </div>
                </Card>
              </motion.div>

              {/* Game Canvas/Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <GradientBorder className="gradient-amber">
                  <Card className="bg-black/40 backdrop-blur-xl aspect-video w-full flex items-center justify-center">
                    <div className="text-6xl">{game.emoji}</div>
                  </Card>
                </GradientBorder>
              </motion.div>
            </div>

            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <GradientBorder className="gradient-amber h-full">
                <Card className="bg-black/40 backdrop-blur-xl p-6 h-full">
                  <h2 className="text-xl font-bold mb-4">Таблица лидеров</h2>
                  <div className="space-y-4">
                    {game.leaderboard.map((player, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#F1DA8B]/10 flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          <span>{player.name}</span>
                        </div>
                        <div className="font-bold text-[#F1DA8B]">{player.score}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </GradientBorder>
            </motion.div>
          </div>

          {/* Play Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6"
          >
            <Button className="w-full sm:w-auto text-lg py-6 px-12 bg-[#F1DA8B] hover:bg-amber-400">
              Играть
            </Button>
          </motion.div>
        </div>
      </main>
    </PageTransition>
  );
}
