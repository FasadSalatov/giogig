"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { motion } from "framer-motion";

import { CopyIcon, Share2Icon, Wallet } from "lucide-react";
import { toast } from "sonner";
import { clsx } from "clsx";
import { Users } from "lucide-react";
import { PiBank } from "react-icons/pi";

export default function PartnershipPage() {
	const referralLink = "quantex.com/ref/user123";

	const [totalFunds, setTotalFunds] = useState<number>(0);

	useEffect(() => {
		const fetchTotalFunds = async () => {
			try {
				// Simulate an API call to fetch total funds
				const response = await fetch("/api/totalFunds");
				if (!response.ok) {
					throw new Error("Failed to fetch total funds");
				}
				const data = await response.json();
				setTotalFunds(data.total);
			} catch (error) {
				console.error("Error fetching total funds:", error);
				setTotalFunds(0); // Fallback value
				toast.error("Failed to fetch total funds");
			}
		};

		fetchTotalFunds();
	}, []);

	const copyToClipboard = (text: string, message: string) => {
		navigator.clipboard.writeText(text);
		toast.success(message);
	};

	return (
		<main className="min-h-screen bg-black text-white max-w-7xl mx-auto">
			<div className="container mx-auto px-4 py-6 sm:pt-16 sm:py-8 lg:py-12">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className="mb-8">
					<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 text-[#F1DA8B]">
						Партнерская программа
					</h1>
					<p className="text-white/80">Зарабатывайте вместе с нами!</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.3 }}
					className="w-full">
					<div className="grid gap-3 sm:gap-4 lg:gap-6 md:grid-cols-2">
						{/* Referral Stats */}
						<Card className="p-3 sm:p-4 lg:p-6 bg-black/40 backdrop-blur-xl border-[#F1DA8B]/20 hover:border-[#F1DA8B]/40 transition-all duration-300">
							<h2 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4 lg:mb-6 text-white flex items-center gap-2">
								<div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#F1DA8B]" />
								Статистика
							</h2>

							<div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
								<div className="bg-black/20 backdrop-blur-sm border gap-2 sm:gap-3 lg:gap-4 border-white/10 flex flex-col justify-between hover:border-[#F1DA8B]/30 rounded-lg p-2 sm:p-3 lg:p-4 transition-all duration-200">
									<div className="flex items-start gap-1 sm:gap-2 text-[10px] sm:text-xs text-white/80 mb-1 w-full justify-between">
										<Users className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
										<span className="text-sm w-9/12 text-right">
											Всего рефералов
										</span>
									</div>
									<p className="text-sm sm:text-base lg:text-xl font-bold text-green-400">
										156
									</p>
								</div>
								<div className="bg-black/20 backdrop-blur-sm border gap-2 sm:gap-3 lg:gap-4 border-white/10 flex flex-col justify-between hover:border-[#F1DA8B]/30 rounded-lg p-2 sm:p-3 lg:p-4 transition-all duration-200">
									<div className="flex items-start gap-1 sm:gap-2 text-[10px] sm:text-xs text-white/80 mb-1 w-full justify-between">
										<Users className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
										<span className="text-sm w-9/12 text-right">
											Активные рефералы
										</span>
									</div>
									<p className="text-sm sm:text-base lg:text-xl font-bold text-green-400">
										89
									</p>
								</div>
								<div className="bg-black/20 w-full backdrop-blur-sm border gap-2 sm:gap-3 lg:gap-4 border-white/10 flex flex-col justify-between hover:border-[#F1DA8B]/30 rounded-lg p-2 sm:p-3 lg:p-4 transition-all duration-200">
									<div className="flex items-start gap-1 sm:gap-2 text-[10px] sm:text-xs text-white/80 mb-1 w-full justify-between">
										<Wallet className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
										<span className="text-sm w-9/12 text-right">
											Заработано
										</span>
									</div>
									<p className="text-sm sm:text-base lg:text-xl font-bold">
										<span className="text-green-400">2,456.78</span>{" "}
										<span className="text-white">USDT</span>
									</p>
								</div>
								<div className="bg-black/20 w-full backdrop-blur-sm border gap-2 sm:gap-3 lg:gap-4 border-white/10 flex flex-col justify-between hover:border-[#F1DA8B]/30 rounded-lg p-2 sm:p-3 lg:p-4 transition-all duration-200">
									<div className="flex items-start gap-1 sm:gap-2 text-[10px] sm:text-xs text-white/80 mb-1 w-full justify-between">
										<PiBank className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
										<span className="text-sm w-9/12 text-right">
											Общий объем средств
										</span>
									</div>
									<p className="text-sm sm:text-base lg:text-xl font-bold">
										<span className="text-green-400">{totalFunds}</span>{" "}
										<span className="text-white">USDT</span>
									</p>
								</div>
							</div>
						</Card>

						{/* Referral Links */}
						<Card className="p-3 sm:p-4 lg:p-6 bg-black/40 backdrop-blur-xl border-[#F1DA8B]/20 hover:border-[#F1DA8B]/40 transition-all duration-300">
							<h2 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4 lg:mb-6 text-white flex justify-between items-center gap-2">
								<div className="flex gap-2 min-w-fit items-center ">
									<div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#F1DA8B]" />
									Реферальная ссылка
								</div>

								<div className="px-2 py-1 items-center justify-center rounded-full bg-[#F1DA8B]/10 border border-[#F1DA8B]/20">
									<span className="text-[#F1DA8B] font-medium text-[10px] sm:text-sm">
										Ваш уровень: Gold
									</span>
								</div>
							</h2>
							<div className="space-y-3 sm:space-y-4">
								<div className="relative group">
									<Input
										value={referralLink}
										readOnly
										className="pr-24 sm:pr-28 text-xs bg-white/5 border-white/10 group-hover:border-white/20  sm:text-base text-white transition-all"
									/>
									<Button
										className="absolute right-1 top-1 h-7 sm:h-8 bg-[#F1DA8B] hover:bg-amber-400 text-black transition-all duration-300"
										size="sm"
										onClick={() =>
											copyToClipboard(referralLink, "Ссылка скопирована!")
										}>
										<CopyIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
										<span className="text-xs sm:text-sm">Копировать</span>
									</Button>
								</div>

								<Button
									className="w-full h-9 sm:h-10 bg-black hover:bg-black/80 text-[#F1DA8B] border border-[#F1DA8B]/20 hover:border-[#F1DA8B] transition-all duration-300 text-sm sm:text-base"
									onClick={() => {
										if (navigator.share) {
											navigator.share({
												title: "Присоединяйтесь к QuantEx",
												text: "Используйте мою реферальную ссылку",
												url: referralLink,
											});
										}
									}}>
									<Share2Icon className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
									Поделиться
								</Button>
							</div>
						</Card>

						{/* Referral Terms */}
						<Card className="p-3 sm:p-4 lg:p-6 bg-black/40 backdrop-blur-xl border-[#F1DA8B]/20 hover:border-[#F1DA8B]/40 transition-all duration-300 md:col-span-2">
							<h2 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4 lg:mb-6 text-white flex items-center gap-2">
								<div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#F1DA8B]" />
								Условия партнерской программы
							</h2>
							<div className="grid gap-3 sm:gap-4 lg:gap-6 md:grid-cols-2">
								<div className="space-y-3 sm:space-y-4">
									<div className="flex items-start gap-2 sm:gap-3 group">
										<div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#F1DA8B]/10 flex items-center justify-center mt-0.5 sm:mt-1 group-hover:bg-[#F1DA8B]/20 transition-all">
											<span className="text-[#F1DA8B] text-xs sm:text-sm">
												1
											</span>
										</div>
										<p className="text-sm sm:text-base text-white/80 group-hover:text-white transition-colors">
											Получайте 10% от комиссии за управление средствами ваших
											рефералов
										</p>
									</div>
									<div className="flex items-start gap-2 sm:gap-3 group">
										<div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#F1DA8B]/10 flex items-center justify-center mt-0.5 sm:mt-1 group-hover:bg-[#F1DA8B]/20 transition-all">
											<span className="text-[#F1DA8B] text-xs sm:text-sm">
												2
											</span>
										</div>
										<p className="text-sm sm:text-base text-white/80 group-hover:text-white transition-colors">
											Дополнительные бонусы за активных рефералов
										</p>
									</div>
								</div>
								<div className="space-y-3 sm:space-y-4">
									<div className="flex items-start gap-2 sm:gap-3 group">
										<div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#F1DA8B]/10 flex items-center justify-center mt-0.5 sm:mt-1 group-hover:bg-[#F1DA8B]/20 transition-all">
											<span className="text-[#F1DA8B] text-xs sm:text-sm">
												3
											</span>
										</div>
										<p className="text-sm sm:text-base text-white/80 group-hover:text-white transition-colors">
											Мгновенные выплаты на ваш баланс
										</p>
									</div>
									<div className="flex items-start gap-2 sm:gap-3 group">
										<div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#F1DA8B]/10 flex items-center justify-center mt-0.5 sm:mt-1 group-hover:bg-[#F1DA8B]/20 transition-all">
											<span className="text-[#F1DA8B] text-xs sm:text-sm">
												4
											</span>
										</div>
										<p className="text-sm sm:text-base text-white/80 group-hover:text-white transition-colors">
											Повышение уровня партнерства с ростом объема рефералов
										</p>
									</div>
								</div>
							</div>
						</Card>

						{/* Referrals Table */}
						<Card className="p-3 sm:p-4 lg:p-6 bg-black/40 backdrop-blur-xl border-[#F1DA8B]/20 hover:border-[#F1DA8B]/40 transition-all duration-300 md:col-span-2">
							<h2 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4 lg:mb-6 text-white flex items-center gap-2">
								<div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#F1DA8B]" />
								Список рефералов
							</h2>
							<div className="overflow-x-auto">
								<table className="w-full border-collapse">
									<thead>
										<tr className="border-b border-white/10">
											<th className="text-left py-2 sm:py-3 px-2 max-sm:px-0 text-xs sm:text-sm font-medium text-white/60">
												ID
											</th>
											<th className="text-left py-2 sm:py-3 px-2 max-sm:px-0 text-xs sm:text-sm font-medium text-white/60">
												Дата
											</th>
											<th className="text-left py-2 sm:py-3 px-2 max-sm:px-0 text-xs sm:text-sm font-medium text-white/60">
												Статус
											</th>
											<th className="text-right py-2 sm:py-3 px-2 max-sm:px-0 text-xs sm:text-sm font-medium text-white/60">
												Объем
											</th>
											<th className="text-right py-2 sm:py-3 px-2 max-sm:px-0 text-xs sm:text-sm font-medium text-white/60">
												Комиссия
											</th>
										</tr>
									</thead>
									<tbody>
										{[...Array(5)].map((_, index) => (
											<tr
												key={index}
												className="border-b border-white/10 hover:bg-white/5 transition-colors">
												<td className="py-2 sm:py-3 px-2 max-sm:px-0 text-[10px] sm:text-sm">
													#{index + 1}
												</td>
												<td className="py-2 sm:py-3 px-2 max-sm:px-0 text-[10px] sm:text-sm">
													2024.01.{index + 10}
												</td>
												<td className="py-2 sm:py-3 px-2 max-sm:px-0">
													<span
														className={clsx(
															"text-[10px] text-nowrap p-1 px-2 rounded-full",
															index % 2 === 0
																? "bg-green-500/20 text-green-500"
																: "bg-yellow-500/20 text-yellow-500"
														)}>
														{index % 2 === 0 ? "Активный" : "В ожидании"}
													</span>
												</td>
												<td className="py-2 sm:py-3 px-2 max-sm:px-0 text-xs sm:text-sm text-right">
													{(1000 * (index + 1)).toLocaleString()} USDT
												</td>
												<td className="py-2 sm:py-3 px-2 max-sm:px-0 text-xs sm:text-sm text-right text-green-400">
													{(50 * (index + 1)).toLocaleString()} USDT
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</Card>
					</div>
				</motion.div>
			</div>
		</main>
	);
}
