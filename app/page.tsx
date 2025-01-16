"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Card } from "@/app/components/ui/Card";
import { GradientBorder } from "@/app/components/ui/GradientBorder";
import {
	TrendingUpIcon,
	WalletIcon,
	ArrowUpIcon,
	ArrowDownIcon,
	StarIcon,
	LineChartIcon,
	GamepadIcon,
	User2Icon,
} from "lucide-react";
import { LuBanknote } from "react-icons/lu";
import { motion } from "framer-motion";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import Link from "next/link";
import { PeriodSelect, type Period } from "./components/ui/PeriodSelect";
import { LineChart as CandlestickChart } from "@/app/components/ui/LineChart";

// Примеры данных для демонстрации
const stats = [
	{
		label: "Общий баланс",
		value: "12,435.50",
		unit: "USDT",
		change: "+5.25%",
		positive: true,
		icon: WalletIcon,
		processing: "125.00",
		periods: {
			"24h": { value: "12,435.50", change: "+5.25%" },
			"7d": { value: "11,935.50", change: "+8.45%" },
			"30d": { value: "10,435.50", change: "+15.25%" },
			"1y": { value: "8,435.50", change: "+45.25%" },
		},
	},
	{
		label: "Общая прибыль",
		value: "345.20",
		unit: "USDT",
		change: "+2.1%",
		positive: true,
		processing: "15.00",
		icon: TrendingUpIcon,
		periods: {
			"24h": { value: "345.20", change: "+2.1%" },
			"7d": { value: "2,145.20", change: "+12.1%" },
			"30d": { value: "8,345.20", change: "+22.1%" },
			"1y": { value: "42,345.20", change: "+82.1%" },
		},
	},
	{
		label: "Игровые поинты",
		value: "1,250",
		unit: "Q-point",
		change: "+15.5%",
		processing: "12.00",
		positive: true,
		icon: StarIcon,
		periods: {
			"24h": { value: "1,250", change: "+15.5%" },
			"7d": { value: "5,250", change: "+25.5%" },
			"30d": { value: "12,250", change: "+45.5%" },
			"1y": { value: "51,250", change: "+95.5%" },
		},
	},
	{
		label: "Партнерские начисления",
		value: "345.20",
		unit: "USDT",
		processing: "25.00",
		change: "+2.1%",
		positive: true,
		icon: User2Icon,
		periods: {
			"24h": { value: "345.20", change: "+2.1%" },
			"7d": { value: "2,445.20", change: "+12.1%" },
			"30d": { value: "8,445.20", change: "+32.1%" },
			"1y": { value: "44,445.20", change: "+92.1%" },
		},
	},
];

const quickActions = [
	{
		name: "Финансы",
		description: "Управление финансами",
		icon: LuBanknote,
		href: "/finance",
		statsLabel: "Баланс:",
		statsAmount: "5,000",
		statsCurrency: "USDT",
		color: "primary",
	},
	{
		name: "Трейдинг",
		description: "Торговля на бирже",
		icon: LineChartIcon,
		href: "/trading",
		statsLabel: "Баланс:",
		statsAmount: "2,500",
		statsCurrency: "USDT",
		color: "secondary",
	},
	{
		name: "Игры",
		description: "Играть и зарабатывать",
		icon: GamepadIcon,
		href: "/games",
		statsLabel: "Заработано:",
		statsAmount: "4,000",
		statsCurrency: "ПТ",
		color: "primary",
	},
	{
		name: "Кошелек",
		description: "Перемещение активов",
		icon: WalletIcon,
		href: "/wallet",
		statsLabel: "",
		statsAmount: "3",
		statsCurrency: "транзакции",
		color: "secondary",
	},
];

const recentActivity = [
	{
		type: "buy",
		amount: "500",
		description: "Куплен ваучер Депозит",
		time: "5 минут назад",
	},
	{
		type: "profit",
		amount: "45.20",
		description: "Получена прибыль",
		time: "15 минут назад",
	},
	{
		type: "sell",
		amount: "1,000",
		description: "Продан ваучер Копи-трейдинг",
		time: "2 часа назад",
	},
];

// Данные для графика доходности
const profitData = [
	{ date: "01/12", total: 1000, finance: 500, trading: 300, games: 200 },
	{ date: "02/12", total: 1200, finance: 600, trading: 400, games: 200 },
	{ date: "03/12", total: 1100, finance: 500, trading: 350, games: 250 },
	{ date: "04/12", total: 1400, finance: 700, trading: 450, games: 250 },
	{ date: "05/12", total: 1600, finance: 800, trading: 500, games: 300 },
];

// Примеры данных для графиков
type CandlestickDataPoint = {
	x: string;
	y: [number, number, number, number]; // [Open, High, Low, Close]
};

type PeriodData = Record<Period, CandlestickDataPoint[]>;

const candlestickData: PeriodData = {
	placeholder: [],
	"24h": [
		{ x: '2024-01-10', y: [100, 105, 98, 102] },
		{ x: '2024-01-11', y: [102, 108, 100, 105] },
		{ x: '2024-01-12', y: [105, 110, 102, 108] },
		{ x: '2024-01-13', y: [108, 115, 105, 110] },
		{ x: '2024-01-14', y: [110, 117, 108, 115] },
		// Add more data points as needed
	],
	"7d": [
		{ x: '2024-01-05', y: [95, 100, 92, 98] },
		{ x: '2024-01-11', y: [98, 105, 95, 102] },
		// Add more data points as needed
	],
	"30d": [
		{ x: '2023-12-11', y: [90, 95, 88, 92] },
		{ x: '2024-01-11', y: [92, 100, 90, 98] },
		// Add more data points as needed
	],
	"1y": [
		{ x: '2023-01-11', y: [80, 85, 78, 82] },
		{ x: '2024-01-11', y: [82, 90, 80, 88] },
		// Add more data points as needed
	],
};

export default function Home() {
	const [mounted, setMounted] = useState(false);
	const [chartFilter, setChartFilter] = useState("total");
	const [selectedPeriods, setSelectedPeriods] = useState<Record<number, Period>>({
		0: "placeholder",
		1: "placeholder",
		2: "placeholder",
		3: "placeholder",
	});

	const handlePeriodChange = (index: number, period: Period) => {
		setSelectedPeriods(prev => ({
			...prev,
			[index]: period
		}));
	};

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<main className="min-h-screen bg-black text-white">
			{/* Animated Background */}
			<div className="fixed inset-0 -z-10">
				<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
				<div className="absolute inset-0 bg-gradient-to-tr from-black via-black/50 to-black"></div>
				<div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(255,215,0,0.15),transparent)]"></div>
				<div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_300px,rgba(255,215,0,0.1),transparent)]"></div>
			</div>

			<div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8 max-w-7xl">
				{/* Header with Animation */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="mb-4 sm:mb-6 lg:mb-8">
					<div className="flex items-center mb-2 lg:hidden">
						<Image
							src="/horlogo.svg"
							alt="QuantEx Logo"
							width={135}
							height={38}
							className=""
						/>
					</div>
					<h1 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-2 text-[#F1DA8B]">
						Главная
					</h1>
					<p className="text-sm sm:text-base lg:text-lg text-white/80">
						Добро пожаловать в QuantEx
					</p>
				</motion.div>

				{/* Stats Grid with Stagger Animation */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
					{stats.slice(0, 4).map((stat, index) => (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: index * 0.1 }}
							className="h-full">
							<GradientBorder className="gradient-gold h-full">
								<Card className="bg-white/5 h-full flex flex-col justify-between backdrop-blur-xl border-[#F1DA8B]/20 hover:bg-white/5 transition-all duration-300">
									<div className="p-3 sm:p-4 lg:p-5">
										<div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4">
											<div className="flex items-center gap-2 ">
												<stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
												<h3 className="font-medium">
													{stat.label}
												</h3>
											</div>
											<PeriodSelect
												value={selectedPeriods[index]}
												onValueChange={(value) => handlePeriodChange(index, value)}
											/>
										</div>
										<div className="flex justify-between items-start">
											<div className=" flex flex-col justify-between h-[130px] w-6/12 overflow-hidden ">
												<div className="flex items-baseline space-x-2">
													<p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-400">
														{stat.periods[selectedPeriods[index] === "placeholder" ? "24h" : selectedPeriods[index]].value}
													</p>
													<span className="text-xs sm:text-sm text-muted-foreground">
														{stat.unit}
													</span>
												</div>
												<div className="flex items-center space-x-1">
													<span
														className={`text-xs sm:text-sm ${parseFloat(stat.periods[selectedPeriods[index] === "placeholder" ? "24h" : selectedPeriods[index]].change) >= 0 ? 'text-green-500' : 'text-red-500'}`}
													>
														{stat.periods[selectedPeriods[index] === "placeholder" ? "24h" : selectedPeriods[index]].change}
													</span>
													{parseFloat(stat.periods[selectedPeriods[index] === "placeholder" ? "24h" : selectedPeriods[index]].change) >= 0 ? (
														<ArrowUpIcon className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
													) : (
														<ArrowDownIcon className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
													)}
												</div>
												{stat.processing && (
													<div className="mt-2">
														<span className="text-xs sm:text-sm text-muted-foreground">
															{stat.label === "Общая прибыль" && "Доход от инструментов: "}
															{stat.label === "Игровые поинты" && "Бонус за активность: "}
															{stat.label === "Партнерские начисления" && "Доход с вашей команды: "}
															{stat.label === "Общий баланс" && "В обработке: "}
															<br></br>
															{stat.processing} {stat.unit}
														</span>
													</div>
												)}
											</div>
											<CandlestickChart data={candlestickData[selectedPeriods[index] === "placeholder" ? "24h" : selectedPeriods[index]]} />
										</div>
									</div>
								</Card>
							</GradientBorder>
						</motion.div>
					))}
				</motion.div>

				{/* Profitability Chart */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className="my-4 sm:my-6 lg:my-8">
					<GradientBorder className="gradient-gold">
						<Card className="bg-black/40 backdrop-blur-xl border-[#F1DA8B]/20 p-3 sm:p-4 lg:p-6">
							<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3 sm:gap-0">
								<h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#F1DA8B]">
									График доходности
								</h2>
								<div className="flex flex-wrap gap-2 w-full sm:w-auto">
									<button
										onClick={() => setChartFilter("total")}
										className={`px-2 sm:px-3 py-1 rounded-md text-sm ${chartFilter === "total"
											? "bg-[#F1DA8B] text-black"
											: "bg-white/10 text-white"
											}`}
									>
										Общий
									</button>
									<button
										onClick={() => setChartFilter("finance")}
										className={`px-2 sm:px-3 py-1 rounded-md text-sm ${chartFilter === "finance"
											? "bg-[#F1DA8B] text-black"
											: "bg-white/10 text-white"
											}`}
									>
										Финансы
									</button>
									<button
										onClick={() => setChartFilter("trading")}
										className={`px-2 sm:px-3 py-1 rounded-md text-sm ${chartFilter === "trading"
											? "bg-[#F1DA8B] text-black"
											: "bg-white/10 text-white"
											}`}
									>
										Трейдинг
									</button>
									<button
										onClick={() => setChartFilter("games")}
										className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm ${chartFilter === "games"
											? "bg-[#F1DA8B] text-black"
											: "bg-white/10 text-white"
											}`}
									>
										Игры
									</button>
								</div>
							</div>
							<div className="h-[200px] sm:h-[250px] lg:h-[300px] w-full">
								<ResponsiveContainer width="100%" height="100%">
									<LineChart data={profitData}>
										<XAxis
											dataKey="date"
											stroke="#ffffff80"
											tick={{ fontSize: 12 }}
											tickMargin={8}
										/>
										<YAxis
											stroke="#ffffff80"
											tick={{ fontSize: 12 }}
											tickMargin={8}
										/>
										<Tooltip
											contentStyle={{
												backgroundColor: "rgba(0, 0, 0, 0.8)",
												border: "1px solid rgba(241, 218, 139, 0.2)",
												borderRadius: "8px",
												fontSize: "12px",
											}}
										/>
										<Line
											type="monotone"
											dataKey={chartFilter}
											stroke="#F1DA8B"
											strokeWidth={2}
											dot={{ fill: "#F1DA8B", r: 4 }}
										/>
									</LineChart>
								</ResponsiveContainer>
							</div>
						</Card>
					</GradientBorder>
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.4 }}
					className="mb-4 sm:mb-6 lg:mb-8">
					<h1 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-2 text-[#F1DA8B]">
						Инструменты
					</h1>
				</motion.div>

				{/* Quick Actions with Hover Effects */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.4 }}
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{quickActions.map((action, i) => (
						<motion.div
							key={action.name}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
							className="h-full">
							<GradientBorder className="gradient-gold h-full">
								<Card className="group h-full backdrop-blur-xl border-[#F1DA8B]/10 bg-white/5 hover:bg-white/[0.08] transition-all duration-300">
									<div className="flex flex-col h-full p-4 gap-4">
										{/* Header Section */}
										<div className="flex items-center justify-between gap-3">
											<div className="flex gap-2 items-center">
												<div className="p-2.5 rounded-xl bg-white/10 border border-white/20 group-hover:bg-white/20 group-hover:border-white/30 transition-all duration-300">
													{action.icon && (
														<action.icon className="h-5 w-5 text-white" />
													)}
												</div>
												<h3 className=" font-medium text-white">
													{action.name}
												</h3>
											</div>

											{/* Action Button */}
											<Link
												className="px-2.5 py-2 rounded-xl bg-white/10 border border-white/20 group-hover:bg-white/20 group-hover:border-white/30 transition-all duration-300"
												href={action.href}>
												начать
											</Link>
										</div>

										{/* Description */}
										<p className="text-sm text-white/80">
											{action.description}
										</p>

										{/* Stats Section */}
										<div className=" ">
											<div className="flex items-center gap-2">
												<span className="inline-flex gap-1 bg-gradient-to-r from-[#F1DA8B]/10 to-yellow-500/10 items-center px-2 py-1 rounded-md bg-white/10 border border-white/20 text-white text-sm">
													{action.statsLabel}{" "}
													<span className="text-green-400">
														{action.statsAmount}
													</span>{" "}
													{action.statsCurrency}
												</span>
											</div>
										</div>
									</div>
								</Card>
							</GradientBorder>
						</motion.div>
					))}
				</motion.div>

				{/* Recent Activity */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.6 }}>
					<GradientBorder className="gradient-gold">
						<Card className="bg-black/40 backdrop-blur-xl border-[#F1DA8B]/5 p-3 sm:p-4 lg:p-6">
							<h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 lg:mb-6 text-[#F1DA8B]">
								Последние действия
							</h2>
							<div className="space-y-3 sm:space-y-4">
								{recentActivity.map((activity, i) => (
									<motion.div
										key={activity.description}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
										className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-black/20 border border-white/5 hover:border-white/20 transition-all duration-300">
										<div
											className={`p-1.5 sm:p-2 rounded-lg ${activity.type === "buy"
												? "bg-[#F1DA8B]/10 text-[#F1DA8B]"
												: activity.type === "sell"
													? "bg-red-500/10 text-red-500"
													: "bg-white/10 text-white"
												}`}
										>
											{activity.type === "buy" ? (
												<ArrowUpIcon className="h-3 w-3 sm:h-4 sm:w-4" />
											) : activity.type === "sell" ? (
												<ArrowDownIcon className="h-3 w-3 sm:h-4 sm:w-4" />
											) : (
												<TrendingUpIcon className="h-3 w-3 sm:h-4 sm:w-4" />
											)}
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-xs sm:text-sm font-medium text-white/80 truncate">
												{activity.description}
											</p>
											<p className="text-xs text-white/80">{activity.time}</p>
										</div>
										<div className="text-right">
											<p className={`text-xs sm:text-sm font-medium`}>
												{activity.type === "buy" ? "-" : "+"}
												<span className="text-green-400">
													{activity.amount}
												</span>{" "}
												<span className="text-white">USDT</span>
											</p>
										</div>
									</motion.div>
								))}
							</div>
						</Card>
					</GradientBorder>
				</motion.div>
			</div>
		</main>
	);
}
