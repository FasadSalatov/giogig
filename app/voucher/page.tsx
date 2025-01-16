"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/Button";
import { useRouter } from "next/navigation";
import { FiClock, FiDollarSign, FiShield, FiStar } from 'react-icons/fi';
import { VoucherDetailsModal } from "./components/VoucherDetailsModal";

const voucherData = [
  {
    status: "Старт",
    duration: "1 месяц",
    minDeposit: "50",
    managementFee: "30%",
    privileges: ["Базовый функционал", "Доступ к торговле", "Поддержка 24/7"],
    price: "0",
    currency: "USDT",
    color: "zinc",
    icon: FiStar
  },
  {
    status: "Базис",
    duration: "3 месяца",
    minDeposit: "100",
    managementFee: "25%",
    privileges: ["Партнерская программа", "Доступ к Академии", "Расширенная аналитика"],
    price: "50",
    currency: "USDT",
    color: "blue",
    icon: FiShield
  },
  {
    status: "Бизнес",
    duration: "6 месяцев",
    minDeposit: "500",
    managementFee: "20%",
    privileges: ["Бонусы с команды", "Приоритетная поддержка", "Эксклюзивные вебинары"],
    price: "150",
    currency: "USDT",
    color: "purple",
    icon: FiDollarSign
  },
  {
    status: "Премиум",
    duration: "9 месяцев",
    minDeposit: "1000",
    managementFee: "17%",
    privileges: ["Финансовые продукты", "Персональный менеджер", "VIP-мероприятия"],
    price: "200",
    currency: "USDT",
    color: "amber",
    icon: FiStar
  },
  {
    status: "VIP",
    duration: "12 месяцев",
    minDeposit: "5000",
    managementFee: "15%",
    privileges: ["Доступ к играм", "Индивидуальные условия", "Закрытый клуб"],
    price: "250",
    currency: "USDT",
    color: "golden",
    icon: FiStar
  }
];

// Utility function to handle number inputs
const handleNumberInput = (value: string, setter: (value: string) => void) => {
  // Remove leading zeros
  const sanitizedValue = value.replace(/^0+(?=\d)/, '');
  setter(sanitizedValue);
};

export default function VoucherPage() {
  const router = useRouter();
  const [selectedVoucher, setSelectedVoucher] = useState(voucherData[0]);
  const [depositAmount, setDepositAmount] = useState("");
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const getColorClasses = (color: string, isSelected: boolean) => {
    const baseClasses = isSelected ? {
      bg: 'bg-[#F1DA8B]/10',
      border: 'border-[#F1DA8B]/50',
      text: 'text-[#F1DA8B]',
      icon: 'text-[#F1DA8B]'
    } : {
      bg: 'bg-black/40',
      border: 'border-white/10 hover:border-white/20',
      text: 'text-white',
      icon: 'text-zinc-400'
    };

    return baseClasses;
  };

  return (
    <main className="min-h-screen bg-black text-white max-w-7xl mx-auto">
      <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-[#F1DA8B]">
            Ваучеры
          </h1>
          <p className="text-base sm:text-lg text-white/80">Выберите подходящий тарифный план</p>
        </motion.div>

        {/* Active Status */}
        <div className="flex items-center justify-end mb-6">
          <div className="px-4 py-2 rounded-full bg-[#F1DA8B]/10 border border-[#F1DA8B]/20">
            <span className="text-[#F1DA8B] font-medium">Активный статус: Базис</span>
          </div>
        </div>

        {/* Voucher Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {voucherData.map((voucher, index) => {
            const isSelected = selectedVoucher.status === voucher.status;
            const colors = getColorClasses(voucher.color, isSelected);

            return (
              <motion.button
                key={index}
                onClick={() => setSelectedVoucher(voucher)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  w-full text-left p-6 rounded-lg border transition-all duration-300
                  ${colors.bg} ${colors.border} shadow-lg hover:shadow-xl
                `}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-4 rounded-full ${isSelected ? 'bg-[#F1DA8B]/20' : 'bg-white/10'}`}>
                    <voucher.icon className={`w-6 h-6 ${colors.icon}`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold text-lg ${colors.text}`}>{voucher.status}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <FiClock className={`w-5 h-5 ${colors.icon}`} />
                      <span className={`text-sm font-medium ${colors.icon}`}>срок локации: <br />{voucher.duration}</span>
                    </div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="flex items-center gap-2">
                      {voucher.price === "0" ? (
                        <div className={`text-xl font-bold text-green-400`}>Бесплатно</div>
                      ) : (
                        <>
                          <div className={`text-xl font-bold text-green-400`}>{voucher.price}</div>
                          <div className={`text-base font-medium text-white`}>{voucher.currency}</div>
                        </>
                      )}
                    </div>
                    <div className="text-sm text-zinc-400">Стоимость</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-zinc-400">
                    <span>Мин. депозит</span>
                    <span className='text-green-400 flex gap-1'>{voucher.minDeposit} <p className="text-white">{voucher.currency}</p></span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-zinc-400">
                    <span>Комиссия за управление</span>
                    <span className={colors.text}>{voucher.managementFee}</span>
                  </div>
                  <div className="pt-3 border-t border-white/10 relative">
                    {voucher.privileges.map((privilege, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-white/80 mb-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#F1DA8B]' : 'bg-white/20'}`} />
                        {privilege}
                      </div>
                    ))}

                  </div>
                  <span 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDetailsModal(true);
                    }}
                    className={`text-[#F1DA8B] opacity-90 text-sm hover:underline w-max float-right cursor-pointer ${isSelected ? 'opacity-100' : 'hidden'}`}
                  >
                    больше информации
                  </span>

                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Deposit Amount */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/40 border border-white/10 rounded-lg sm:rounded-xl p-4 sm:p-5 mb-6"
        >
          <h2 className="text-base sm:text-lg lg:text-xl font-medium mb-4">Сумма</h2>
          <div className="space-y-4">
            <div className="relative">
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => handleNumberInput(e.target.value, setDepositAmount)}
                className="w-full bg-black/40 border text-green-400 border-white/10 rounded-lg px-4 py-3 text-lg font-medium focus:outline-none focus:border-[#F1DA8B]/50"
                placeholder="0.00"
                min="0.01"

              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <span className="text-white">USDT</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">Стоимость ваучера</span>
              <div className="flex items-center gap-2">
                {selectedVoucher.price === "0" ? (
                  <span className="text-green-400 font-medium">Бесплатно</span>
                ) : (
                  <>
                    <span className="text-green-400 font-medium">{selectedVoucher.price}</span>
                    <span className="text-white">{selectedVoucher.currency}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Selected Parameters */}
          <div className="bg-black/40 border border-white/10 rounded-lg p-4 space-y-3">
            <h3 className="text-lg font-medium text-[#F1DA8B]">Выбранные параметры</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <div className="text-zinc-400 text-sm mb-1">Статус</div>
                <div className="font-medium">{selectedVoucher.status}</div>
              </div>
              <div>
                <div className="text-zinc-400 text-sm mb-1">Срок</div>
                <div className="font-medium">{selectedVoucher.duration}</div>
              </div>
              <div>
                <div className="text-zinc-400 text-sm mb-1">Мин. депозит</div>
                <div className="font-medium text-green-400">{selectedVoucher.minDeposit} <span className="text-white">{selectedVoucher.currency}</span></div>
              </div>
              <div>
                <div className="text-zinc-400 text-sm mb-1">Комиссия</div>
                <div className="font-medium">{selectedVoucher.managementFee}</div>
              </div>
              <div>
                <div className="text-zinc-400 text-sm mb-1">Стоимость</div>
                <div className="font-medium">
                  {selectedVoucher.price === "0" ? (
                    <span className="text-green-400">Бесплатно</span>
                  ) : (
                    <span>
                      <span className="text-green-400">{selectedVoucher.price}</span>
                      <span className="text-white"> {selectedVoucher.currency}</span>
                    </span>
                  )}
                </div>
              </div>
              <div>
                <div className="text-zinc-400 text-sm mb-1">Сумма депозита</div>
                <div className="font-medium text-green-400">{depositAmount} <span className="text-white">{selectedVoucher.currency}</span></div>
              </div>
            </div>
          </div>

          <Button
            onClick={() => {
              const targetPage = selectedVoucher.status === 'VIP' ? '/finance' : '/trading';
              router.push(targetPage);
            }}
            className="w-full sm:w-auto bg-[#F1DA8B] hover:bg-amber-400 text-black font-medium px-6 py-3 rounded-lg sm:rounded-xl transition-colors"
          >
            Купить ваучер
          </Button>
        </motion.div>
      </div>
      {/* Voucher Details Modal */}
      <VoucherDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        voucher={selectedVoucher}
      />
    </main>
  );
}
