"use client";

import { useState } from "react";
import { Card } from "@/app/components/ui/Card";
import { GradientBorder } from "@/app/components/ui/GradientBorder";
import { Button } from "@/app/components/ui/Button";
import {
	SearchIcon,
	UsersIcon,
	CoinsIcon,
	GridIcon,
	Gamepad2,
} from "lucide-react";
import { motion } from "framer-motion";
import { PageTransition } from "@/app/components/animations/PageTransition";
import Image from "next/image";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";

const games = [
	{
		id: "snake",
		name: "Змейка",
		description: "Классическая игра змейка. Собирайте очки и растите!",
		icon: <Gamepad2 className="w-6 h-6 text-emerald-400" />,
		imageUrl: "/icons/snake.png",
		points: "100",
		players: 850,
		category: "casual",
		color: "emerald",
	},
	{
		id: "match3",
		name: "Три в ряд",
		description: "Составляйте комбинации из трех и более фигур",
		points: "150",
		players: 720,
		category: "casual",
		color: "purple",
		icon: <GridIcon className="w-6 h-6 text-purple-400" />,
		imageUrl: "/icons/crystal.png",

		emoji: "🎰",
	},
	{
		id: "quiz",
		name: "Викторина",
		description: "Отвечайте на вопросы и получайте награды за знания",
		points: "200",
		players: 540,
		category: "educational",
		color: "amber",
		emoji: "❓",
	},
	{
		id: "durak",
		name: "Дурак",
		description: "Классическая карточная игра. Играйте против других игроков",
		points: "500",
		players: 1250,
		category: "card",
		color: "amber",
		emoji: "🃏",
	},
];

export default function GamesPage() {
	const [selectedCategory, setSelectedCategory] = useState<string>("all");
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedGame, setSelectedGame] = useState<(typeof games)[0] | null>(
		null
	);

	const filteredGames = games.filter((game) => {
		const matchesCategory =
			selectedCategory === "all" || game.category === selectedCategory;
		const matchesSearch =
			game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			game.description.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	return (
		<PageTransition>
			<main className="min-h-screen bg-black text-white max-w-7xl mx-auto">
				<div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12 flex flex-col gap-6">
					{/* Header */}
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						className="flex flex-col gap-2">
						<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F1DA8B]">
							Игры
						</h1>
						<p className="text-white/80">Развлекайтесь и зарабатывайте</p>
					</motion.div>

					{/* Filters */}
					<div className="flex flex-col lg:flex-row gap-4">
						<div className="relative flex items-center w-6/12 max-sm:w-full">
							<input
								type="text"
								placeholder="Поиск игр..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full bg-black/40 border border-zinc-800 rounded-lg pl-10 pr-4 py-3 text-base focus:outline-none focus:border-[#F1DA8B] transition-colors"
							/>
							<SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
						</div>
						<div className="flex gap-2 p-1 bg-black/40 rounded-xl w-6/12 max-sm:w-full max-sm:flex-wrap">
							<button
								onClick={() => setSelectedCategory("all")}
								className={`px-4 sm:px-5 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base whitespace-nowrap transition-all duration-300 ${selectedCategory === "all"
									? 'bg-[#F1DA8B] text-black'
									: 'bg-white/10 hover:bg-white/20'
									}`}>
								Все
							</button>
							<button
								onClick={() => setSelectedCategory("casual")}
								className={`px-4 sm:px-5 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base whitespace-nowrap transition-all duration-300 ${selectedCategory === "casual"
									? 'bg-[#F1DA8B] text-black'
									: 'bg-white/10 hover:bg-white/20'
									}`}>
								Казуальные
							</button>
							<button
								onClick={() => setSelectedCategory("educational")}
								className={`px-4 sm:px-5 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base whitespace-nowrap transition-all duration-300 ${selectedCategory === "educational"
									? 'bg-[#F1DA8B] text-black'
									: 'bg-white/10 hover:bg-white/20'
									}`}>
								Обучающие
							</button>
							<button
								onClick={() => setSelectedCategory("card")}
								className={`px-4 sm:px-5 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base whitespace-nowrap transition-all duration-300 ${selectedCategory === "card"
									? 'bg-[#F1DA8B] text-black'
									: 'bg-white/10 hover:bg-white/20'
									}`}>
								Карточные
							</button>
						</div>
					</div>

					{/* Games Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
						{filteredGames.map((game) => (
							<motion.div
								key={game.id}
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.3 }}>
								<Card className="h-full flex flex-col gap-4 p-4 items-center justify-between bg-zinc-900/50 hover:bg-zinc-900/80 border border-zinc-800 transition-all duration-300 group">

									<div className="flex w-full items-center justify-between">

										<div className="flex gap-2">

											{game.imageUrl ? (
												<Image
													src={game.imageUrl}
													alt={game.name}
													width={24}
													height={24}
													className="object-contain"
												/>
											) : (
												game.icon || <p className="text-xl">{game.emoji}</p>
											)}
											<h3 className="text-sm w-full sm:text-2xl font-semibold text-white group-hover:text-[#F1DA8B] transition-colors">
												{game.name}
											</h3>
										</div>

										<GradientBorder className="px-3 py-1 text-sm">
											{game.points} QP
										</GradientBorder>
									</div>



									<p className="text-zinc-400 w-full text-sm sm:text-base">
										{game.description}
									</p>

									<div className="flex w-full items-center gap-4 text-sm text-zinc-500">
										<div className="flex items-center gap-1">
											<UsersIcon className="w-4 h-4" />
											<span>{game.players}</span>
										</div>
										<div className="flex items-center gap-1">
											<CoinsIcon className="w-4 h-4" />
											<span>{game.points}</span>
										</div>
									</div>

									<div className=" w-full flex flex-col items-center gap-2">
										<Button
											onClick={() => {
												/* TODO: Add play handler */
											}}
											className="flex-1 w-full">
											Играть
										</Button>
										<Button
											variant="outline"
											onClick={() => setSelectedGame(game)}
											className="flex-1 text-sm px-4 py-1  opacity-80 border-white/30 ">
											больше информации
										</Button>
									</div>
								</Card>
							</motion.div>
						))}
					</div>
				</div>
				<Dialog
					open={!!selectedGame}
					onOpenChange={() => setSelectedGame(null)}>
					<DialogContent className="bg-zinc-900 text-white border-zinc-800">
						<DialogHeader>
							<div className="flex items-center gap-3">
								{selectedGame?.icon}
								<DialogTitle className="text-xl">
									{selectedGame?.name}
								</DialogTitle>
							</div>
						</DialogHeader>
						<div className="space-y-4">
							<DialogDescription className="text-zinc-400">
								{selectedGame?.description}
							</DialogDescription>

							<div className="flex gap-4 text-sm text-zinc-500">
								<div className="flex items-center gap-1">
									<UsersIcon className="w-4 h-4" />
									<span>{selectedGame?.players} игроков</span>
								</div>
								<div className="flex items-center gap-1">
									<CoinsIcon className="w-4 h-4" />
									<span>{selectedGame?.points} QP</span>
								</div>
							</div>

							<div className="space-y-2">
								<h4 className="font-medium text-white">Как играть:</h4>
								<p className="text-zinc-400">
									Подробные правила и инструкции для игры {selectedGame?.name}{" "}
									будут добавлены позже.
								</p>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</main>
		</PageTransition>
	);
}
