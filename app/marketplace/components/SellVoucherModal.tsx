import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiDollarSign, FiAlertTriangle } from "react-icons/fi";

interface FormData {
	price: string;
	amount: string;
}

interface Voucher {
	id: number;
	name: string;
	price: number;
	currency: string;
	duration: string;
	features: string[];
	seller: string;
	type: string;
	popularity: number;
	remaining: number;
	currentFunds: number;
	timeRemaining: string;
}

interface SellVoucherModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: FormData) => void;
	vouchers: Voucher[];
}

export default function SellVoucherModal({
	isOpen,
	onClose,
	onSubmit,
	vouchers,
}: SellVoucherModalProps) {
	const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
	const [step, setStep] = useState<"select" | "method" | "market" | "instant">(
		"select"
	);
	const [marketPrice, setMarketPrice] = useState("");
	const [amount, setAmount] = useState("");

	// Utility function to handle number inputs
	const handleNumberInput = (value: string, setter: (value: string) => void) => {
		// Remove leading zeros
		const sanitizedValue = value.replace(/^0+(?=\d)/, '');
		setter(sanitizedValue);
	};

	const resetState = () => {
		setSelectedVoucher(null);
		setStep("select");
		setMarketPrice("");
		setAmount("");
	};

	useEffect(() => {
		if (!isOpen) {
			resetState();
		}
	}, [isOpen]);

	const handleSubmit = () => {
		if (marketPrice && amount) {
			onSubmit({
				price: marketPrice,
				amount: amount,
			});
			onClose();
		}
	};

	const handleSellInstant = () => {
		// Implement instant sale logic
		console.log("Selling instantly with 20% commission");
		onClose();
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						className="bg-zinc-900 rounded-2xl w-full max-w-lg overflow-hidden">
						{/* Header */}
						<div className="flex justify-between items-center p-6 border-b border-white/10">
							<h2 className="text-xl font-semibold text-[#F1DA8B]">
								{step === "select" && "Выберите ваучер"}
								{step === "method" && "Выберите способ продажи"}
								{step === "market" && "Продажа по маркету"}
								{step === "instant" && "Мгновенная продажа"}
							</h2>
							<button
								onClick={onClose}
								className="p-2 hover:bg-white/5 rounded-lg transition-colors">
								<FiX className="w-5 h-5" />
							</button>
						</div>

						{/* Content */}
						<div className="p-6">
							{step === "select" && (
								<div className="space-y-4">
									{vouchers.map((voucher) => (
										<button
											key={voucher.id}
											onClick={() => {
												setSelectedVoucher(voucher);
												setStep("method");
											}}
											className={`w-full p-4 rounded-xl border transition-all ${selectedVoucher?.id === voucher.id
												? "border-[#F1DA8B] bg-[#F1DA8B]/10"
												: "border-white/10 hover:border-white/20"
												}`}>
											<div className="flex justify-between items-center">
												<div className="text-left">
													<h3 className="font-medium">{voucher.name}</h3>
													<p className="text-sm text-zinc-400">
														{voucher.type}
													</p>
												</div>
												<div className="text-right">
													<div className="text-[#F1DA8B]">
														{voucher.price} {voucher.currency}
													</div>
													<div className="text-sm text-zinc-400">
														{voucher.duration}
													</div>
												</div>
											</div>
										</button>
									))}
								</div>
							)}

							{step === "method" && (
								<div className="space-y-4">
									<button
										onClick={() => setStep("market")}
										className="w-full p-4 rounded-xl border border-white/10 hover:border-[#F1DA8B] hover:bg-[#F1DA8B]/5 transition-all">
										<div className="flex items-center gap-3">
											<FiDollarSign className="w-6 h-6" />
											<div className="text-left">
												<h3 className="font-medium">Продать по маркету</h3>
												<p className="text-sm text-zinc-400">
													Установите свою цену продажи
												</p>
											</div>
										</div>
									</button>

									<button
										onClick={() => setStep("instant")}
										className="w-full p-4 rounded-xl border border-white/10 hover:border-[#F1DA8B] hover:bg-[#F1DA8B]/5 transition-all">
										<div className="flex items-center gap-3">
											<FiAlertTriangle className="w-6 h-6" />
											<div className="text-left">
												<h3 className="font-medium">Продать мгновенно</h3>
												<p className="text-sm text-zinc-400">
													Быстрая продажа с комиссией 20%
												</p>
											</div>
										</div>
									</button>
								</div>
							)}

							{step === "market" && (
								<div className="space-y-6">
									<div>
										<label className="block text-sm text-zinc-400 mb-2">
											Установите цену продажи
										</label>
										<div className="relative">
											<input
												type="number"
												value={marketPrice}
												onChange={(e) => handleNumberInput(e.target.value, setMarketPrice)}
												placeholder="0.00"
												min="0.01"

												className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-[#F1DA8B]/50"
											/>
											<span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400">
												USDT
											</span>
										</div>
									</div>

									<div>
										<label className="block text-sm text-zinc-400 mb-2">
											Установите количество
										</label>
										<div className="relative">
											<input
												type="number"
												value={amount}
												onChange={(e) => handleNumberInput(e.target.value, setAmount)}
												placeholder="0"
												min="1"

												className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-[#F1DA8B]/50"
											/>
										</div>
									</div>

									<button
										className="w-full bg-[#F1DA8B] text-black font-medium py-3 rounded-xl"
										disabled={!marketPrice || !amount}
										onClick={handleSubmit}>
										Разместить ордер
									</button>
								</div>
							)}

							{step === "instant" && (
								<div className="space-y-6">
									<div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
										<div className="flex items-start gap-3">
											<FiAlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
											<div>
												<h4 className="font-medium text-yellow-500 mb-1">
													Комиссия за мгновенную продажу
												</h4>
												<p className="text-sm text-zinc-400">
													При мгновенной продаже взимается комиссия в размере
													20% от стоимости ваучера. Это позволяет осуществить
													сделку немедленно.
												</p>
											</div>
										</div>
									</div>

									<button
										onClick={handleSellInstant}
										className="w-full bg-[#F1DA8B] text-black font-medium py-3 rounded-xl">
										Подтвердить продажу
									</button>
								</div>
							)}
						</div>

						{/* Footer */}
						{(step === "market" || step === "instant" || step === "method") && (
							<div className="p-6 border-t border-white/10">
								<button
									onClick={() =>
										setStep(step === "method" ? "select" : "method")
									}
									className="text-sm text-zinc-400 hover:text-white transition-colors">
									← Назад
								</button>
							</div>
						)}
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
}
