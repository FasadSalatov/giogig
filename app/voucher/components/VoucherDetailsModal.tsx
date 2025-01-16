import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

interface VoucherDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  voucher: {
    status: string;
    duration: string;
    minDeposit: string;
    managementFee: string;
    privileges: string[];
    price: string;
    currency: string;
  };
}

export function VoucherDetailsModal({ isOpen, onClose, voucher }: VoucherDetailsModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-zinc-900 border border-white/10 rounded-xl w-full max-w-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-xl font-semibold text-[#F1DA8B]">
              Статус {voucher.status}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <FiX className="w-5 h-5 text-white/60" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm text-zinc-400 mb-1">Срок действия</h3>
                <p className="text-white font-medium">{voucher.duration}</p>
              </div>
              <div>
                <h3 className="text-sm text-zinc-400 mb-1">Минимальный депозит</h3>
                <p className="text-green-400 font-medium">
                  {voucher.minDeposit} <span className="text-white">{voucher.currency}</span>
                </p>
              </div>
              <div>
                <h3 className="text-sm text-zinc-400 mb-1">Комиссия за управление</h3>
                <p className="text-white font-medium">{voucher.managementFee}</p>
              </div>
              <div>
                <h3 className="text-sm text-zinc-400 mb-1">Стоимость</h3>
                <p className="font-medium">
                  {voucher.price === "0" ? (
                    <span className="text-green-400">Бесплатно</span>
                  ) : (
                    <>
                      <span className="text-green-400">{voucher.price}</span>
                      <span className="text-white"> {voucher.currency}</span>
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Privileges */}
            <div>
              <h3 className="text-lg font-medium text-[#F1DA8B] mb-4">Привилегии</h3>
              <div className="space-y-3">
                {voucher.privileges.map((privilege, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F1DA8B]" />
                    <p className="text-white">{privilege}</p>
                  </div>
                ))}
              </div>
            </div>


          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
