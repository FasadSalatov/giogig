"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
	HomeIcon,
	WalletIcon,
	TrophyIcon,
	HistoryIcon,
	ShoppingBagIcon,
	LineChartIcon,
	ListTodoIcon,
	TicketIcon,
	Gamepad2,
} from "lucide-react";
import { motion } from "framer-motion";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { LuBanknote } from "react-icons/lu";
import { PiUsersThree } from "react-icons/pi";

const navigation = [
	{
		name: "Главная",
		href: "/",
		icon: HomeIcon,
		showInBottom: true,
	},
	{
		name: "Кошелек",
		href: "/wallet",
		icon: WalletIcon,
		showInBottom: true,
	},
	{
		name: "Ваучеры",
		href: "/voucher",
		icon: TicketIcon,
		showInBottom: false,
	},
	{
		name: "Трейдинг",
		href: "/trading",
		icon: LineChartIcon,
		showInBottom: false,
	},
	{
		name: "Финансы",
		href: "/finance",
		icon: LuBanknote,
		showInBottom: false,
	},
	{
		name: "Маркетплейс",
		href: "/marketplace",
		icon: ShoppingBagIcon,
		showInBottom: false,
	},
	{
		name: "Академия",
		href: "/academy",
		icon: HiOutlineAcademicCap,
		showInBottom: true,
	},
	{
		name: "Игры",
		href: "/games",
		icon: Gamepad2,
		showInBottom: true,
	},

	{
		name: "Задания",
		href: "/tasks",
		icon: ListTodoIcon,
		showInBottom: true,
	},

	{
		name: "Партнерка",
		href: "/partnership",
		icon: PiUsersThree,
		showInBottom: false,
	},

	{
		name: "История",
		href: "/history",
		icon: HistoryIcon,
		showInBottom: false,
	},
];

const stat = {
	processing: 100,
	unit: "USDT",
};

interface SidebarProps {
	isMobileMenuOpen: boolean;
	setIsMobileMenuOpen: (value: boolean) => void;
}

export function Sidebar({
	isMobileMenuOpen,
	setIsMobileMenuOpen,
}: SidebarProps) {
	const pathname = usePathname();
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		setIsMobileMenuOpen(false);
	}, [pathname, setIsMobileMenuOpen]);

	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isMobileMenuOpen]);

	return (
		<>
			{/* Desktop Sidebar */}
			<aside
				className="hidden max-lg:mt-24 lg:flex h-screen w-64 flex-col fixed left-0 top-0 bottom-0 bg-black/80 backdrop-blur-xl border-r border-white/20"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}>
				{/* Logo */}
				<div className="flex items-center px-6 py-5 border-b border-white/20">
					<Image
						src="/horlogo.svg"
						alt="QuantEx Logo"
						width={150}
						height={64}
						className="w-full"
					/>
				</div>

				{/* Balance */}
				<div className="flex flex-col flex-1">
					<div className="flex-1">
						<div className="p-4">
							<div className="space-y-3">
								<motion.div
									whileHover={{ scale: 1.02 }}
									className="bg-gradient-to-r from-[#F1DA8B]/10 to-yellow-500/10 rounded-xl p-4 border border-[#F1DA8B]/20 group transition-all duration-200 hover:from-[#F1DA8B]/20 hover:to-yellow-500/20">
									<div className="flex items-center gap-3 text-sm text-zinc-400 mb-2 group-hover:text-zinc-300">
										<WalletIcon className="w-4 h-4" />
										<span>Общий баланс</span>
									</div>
									<p className="text-2xl font-bold text-white flex items-center gap-1">
										<span className="text-green-400">1,245.50</span>
										<span className="text-white">USDT</span>
									</p>
									{stat.processing && (
										<div className="mt-1 text-xs text-gray-200">
											В обработке: {stat.processing} {stat.unit}
										</div>
									)}
								</motion.div>
								<motion.div
									whileHover={{ scale: 1.02 }}
									className="bg-gradient-to-r from-[#F1DA8B]/10 to-yellow-500/10 rounded-xl p-4 border border-[#F1DA8B]/20 group transition-all duration-200 hover:from-[#F1DA8B]/20 hover:to-yellow-500/20">
									<div className="flex items-center gap-3 text-sm text-zinc-400 mb-2 group-hover:text-zinc-300">
										<TrophyIcon className="w-4 h-4" />
										<span>Игровые поинты</span>
									</div>
									<p className="text-2xl font-bold text-green-400">2,500</p>
								</motion.div>
							</div>
						</div>

						{/* Navigation */}
						<nav className="px-3 mt-4">
							<div className="space-y-1">
								{navigation.map((item) => {
									const isActive = pathname === item.href;
									return (
										<Link
											key={item.name}
											href={item.href}
											className={cn(
												"group flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 relative overflow-hidden",
												isActive
													? "text-white"
													: "text-zinc-400 hover:text-white"
											)}>
											{isActive && (
												<motion.div
													layoutId="sidebarIndicator"
													className="absolute inset-0 bg-[#F1DA8B]/30 border-2 border-[#F1DA8B]/80"
													style={{ borderRadius: "12px" }}
													transition={{
														type: "spring",
														bounce: 0.2,
														duration: 0.6,
													}}
												/>
											)}
											<div className="relative flex items-center gap-3">
												{item.icon &&
													React.createElement(item.icon, {
														className: cn(
															"w-5 h-5 transition-transform duration-200 text-[#F1DA8B]",
															isActive
																? "text-[#F1DA8B]"
																: "group-hover:text-[#F1DA8B]",
															isHovered && !isActive && "group-hover:scale-110"
														),
														"aria-hidden": "true",
													})}
												<span
													className={cn(
														"relative transition-colors duration-200",
														isActive
															? "text-white"
															: "text-zinc-400 group-hover:text-white"
													)}>
													{item.name}
												</span>
											</div>
										</Link>
									);
								})}
							</div>
						</nav>
					</div>
				</div>
			</aside>

			{/* Mobile Sidebar */}
			<motion.aside
				initial={false}
				animate={{
					x: isMobileMenuOpen ? 0 : "-100%",
				}}
				transition={{ type: "spring", bounce: 0, duration: 0.3 }}
				className={cn(
					"lg:hidden pt-24 fixed inset-y-0 left-0 w-[280px] bg-black/95 backdrop-blur-xl z-40 border-r border-white/20",
					isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
				)}>
				<div className="flex flex-col h-full">
					{/* Logo */}
					<div className="flex items-center px-6 py-5 border-b border-white/20">
						<Image
							src="/horlogo.svg"
							alt="QuantEx Logo"
							width={150}
							height={64}
							className="w-32"
						/>
					</div>

					{/* Контент сайдбара */}
					<div className="flex-1 overflow-y-auto">
						<div className="p-4">
							<div className="space-y-3">
								<motion.div
									whileTap={{ scale: 0.98 }}
									className="bg-gradient-to-r from-[#F1DA8B]/10 to-yellow-500/10 rounded-xl p-4 border border-[#F1DA8B]/20">
									<div className="flex items-center gap-3 text-sm text-zinc-400 mb-2">
										<WalletIcon className="w-4 h-4" />
										<span>Баланс</span>
									</div>
									<p className="text-2xl font-bold text-white flex items-center gap-1">
										<span className="text-green-400">1,245.50</span>
										<span className="text-white">USDT</span>
									</p>
									{stat.processing && (
										<div className="mt-1 text-xs text-gray-200">
											В обработке: {stat.processing} {stat.unit}
										</div>
									)}
								</motion.div>
								<motion.div
									whileTap={{ scale: 0.98 }}
									className="bg-gradient-to-r from-[#F1DA8B]/10 to-yellow-500/10 rounded-xl p-4 border border-[#F1DA8B]/20">
									<div className="flex items-center gap-3 text-sm text-zinc-400 mb-2">
										<TrophyIcon className="w-4 h-4" />
										<span>Игровые поинты</span>
									</div>
									<p className="text-2xl font-bold text-green-400">2,500</p>
								</motion.div>
							</div>
						</div>

						{/* Navigation */}
						<nav className="px-3 pb-32">
							<div className="space-y-1">
								{navigation.map((item) => {
									const isActive = pathname === item.href;
									return (
										<motion.div key={item.name} whileTap={{ scale: 0.98 }}>
											<Link
												href={item.href}
												onClick={() => setIsMobileMenuOpen(false)}
												className={cn(
													"flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 relative overflow-hidden",
													isActive
														? "text-white bg-gradient-to-r from-[#F1DA8B]/20 to-yellow-500/20 border border-[#F1DA8B]/20"
														: "text-zinc-400 hover:text-white hover:bg-white/5"
												)}>
												{item.icon &&
													React.createElement(item.icon, {
														className: cn(
															"w-5 h-5",
															isActive ? "text-[#F1DA8B]" : ""
														),
														"aria-hidden": "true",
													})}
												<span>{item.name}</span>
											</Link>
										</motion.div>
									);
								})}
							</div>
						</nav>
					</div>
				</div>
			</motion.aside>

			{/* Mobile Bottom Navigation */}
			<div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 pb-8">
				{/* Backdrop blur */}
				<div className="absolute inset-0 bg-black/80 backdrop-blur-lg border-t border-white/20" />

				{/* Main navigation */}
				<nav className="relative px-4 py-2">
					<div className="grid grid-cols-5 gap-1">
						{navigation
							.filter((item) => item.showInBottom)
							.map((item) => {
								const isActive = pathname === item.href;
								return (
									<Link
										key={item.name}
										href={item.href}
										className="relative group">
										<div
											className={cn(
												"flex flex-col items-center justify-center py-2 rounded-xl transition-all duration-200 relative",
												isActive
													? "text-[#F1DA8B]"
													: "text-zinc-400 hover:text-zinc-200"
											)}>
											{/* Активный индикатор */}
											{isActive && (
												<motion.div
													layoutId="bottomNavIndicator"
													className="absolute inset-0 bg-[#F1DA8B]/10 rounded-xl"
													transition={{
														type: "spring",
														bounce: 0.2,
														duration: 0.6,
													}}
												/>
											)}

											{/* Иконка */}
											<div className="relative">
												{item.icon &&
													React.createElement(item.icon, {
														className: cn(
															"w-6 h-6 transition-transform duration-200",
															isActive ? "scale-110" : "group-hover:scale-105"
														),
														"aria-hidden": "true",
													})}
											</div>

											{/* Название */}
											<span
												className={cn(
													"text-xs mt-1 transition-opacity duration-200 text-center",
													isActive
														? "opacity-100"
														: "opacity-70 group-hover:opacity-100"
												)}>
												{item.name}
											</span>
										</div>
									</Link>
								);
							})}
					</div>
				</nav>
			</div>
		</>
	);
}
