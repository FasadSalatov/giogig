"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PageTransition } from "@/app/components/animations/PageTransition";
import { useTasks } from "@/app/hooks/useTasks";
import { Task } from "@/app/types/tasks";
import { LockIcon, PlayIcon, CheckIcon } from "lucide-react";

// Добавляем утилитарную функцию для объединения классов
const clsx = (...classes: (string | boolean | undefined | null)[]) => {
  return classes.filter(Boolean).join(' ');
};

export default function TasksPage() {
  const { tasks, dailyRewards, isLoading, startTask, claimDailyReward } = useTasks();
  const [promoCode, setPromoCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePromoCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Implement promo code submission logic
    setTimeout(() => {
      setIsSubmitting(false);
      setPromoCode("");
    }, 1000);
  };

  const getTaskStatusInfo = (task: Task) => {
    switch (task.status) {
      case 'locked':
        return {
          icon: LockIcon,
          buttonText: task.requirements?.find(r => r.type === 'level')
            ? `Доступно с ${task.requirements.find(r => r.type === 'level')?.value} уровня`
            : 'Заблокировано',
          buttonClass: 'bg-zinc-500/10 text-zinc-500 cursor-not-allowed',
        };
      case 'available':
        return {
          icon: PlayIcon,
          buttonText: task.type === 'invite'
            ? 'Пригласить'
            : task.type === 'repost'
              ? 'Поделиться'
              : 'Начать',
          buttonClass: 'bg-[#F1DA8B]/10 text-[#F1DA8B] hover:bg-[#F1DA8B]/20',
        };
      case 'inProgress':
        return {
          icon: PlayIcon,
          buttonText: task.type === 'invite'
            ? `Приглашено ${task.progress?.current} из ${task.progress?.total}`
            : 'Продолжить',
          buttonClass: 'bg-[#F1DA8B]/20 text-[#F1DA8B] hover:bg-[#F1DA8B]/30',
        };
      case 'completed':
        return {
          icon: CheckIcon,
          buttonText: 'Выполнено',
          buttonClass: 'bg-green-500/10 text-green-500 cursor-not-allowed',
        };
      default:
        return {
          icon: PlayIcon,
          buttonText: 'Начать',
          buttonClass: 'bg-[#F1DA8B]/10 text-[#F1DA8B] hover:bg-[#F1DA8B]/20',
        };
    }
  };

  if (isLoading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#F1DA8B]"></div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <main className="min-h-screen bg-black text-white max-w-7xl mx-auto">
        <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12 flex flex-col gap-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F1DA8B]">
              Задания
            </h1>
            <p className="text-base sm:text-lg text-white/80">Выполняйте задания и получайте награды</p>
          </motion.div>

          {/* Daily Rewards */}
          <section>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 text-white">Ежедневные награды</h2>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 sm:gap-4">
              {dailyRewards.map((reward) => (
                <motion.div
                  key={reward.day}
                  whileHover={{ scale: reward.status === 'available' ? 1.05 : 1 }}
                  className={clsx(
                    "aspect-square rounded-xl sm:rounded-2xl flex flex-col items-center justify-center gap-2 backdrop-blur-xl p-3 sm:p-4",
                    "transition-all duration-300 border",
                    reward.status === 'claimed'
                      ? 'bg-emerald-500/10 text-green-400 border-emerald-500/20'
                      : reward.status === 'available'
                        ? 'bg-[#F1DA8B]/10 text-[#F1DA8B] border-[#F1DA8B]/20 cursor-pointer hover:bg-[#F1DA8B]/20 hover:border-[#F1DA8B]/30'
                        : 'bg-black/40 text-zinc-500 border-white/10'
                  )}
                  onClick={() => reward.status === 'available' && claimDailyReward(reward.day)}
                >
                  <span className="text-xs sm:text-sm">День {reward.day}</span>
                  <span className="font-bold text-sm sm:text-base">{reward.points}</span>
                  {reward.status === 'claimed' && (
                    <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                  {reward.status === 'locked' && (
                    <LockIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </motion.div>
              ))}
            </div>
          </section>

          {/* Promo Code Section */}
          <section>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 text-white">Промокод</h2>
            <div className="bg-black/40 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5">
              <form onSubmit={handlePromoCodeSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Введите промокод"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-base font-medium focus:outline-none focus:border-[#F1DA8B]/50 placeholder-zinc-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!promoCode || isSubmitting}
                  className={clsx(
                    "px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap",
                    promoCode && !isSubmitting
                      ? "bg-[#F1DA8B] text-black hover:bg-[#F1DA8B]/90"
                      : "bg-black/40 text-zinc-500 border border-white/10 cursor-not-allowed"
                  )}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto" />
                  ) : (
                    "Активировать"
                  )}
                </button>
              </form>
            </div>
          </section>

          {/* Social Tasks Section */}
          <section>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 text-white">Социальные задания</h2>
            <div className="block-wrap partner-progress bg-black/40 max-w-[85vw] backdrop-blur-xl rounded-2xl border border-white/10">
              {tasks
                .filter(task => task.type === 'invite')
                .map((task) => {
                  const currentLevel = task.referralInfo?.currentLevel || 1;
                  const currentBonus = task.referralInfo?.levels[currentLevel - 1].bonusPercentage || 2;
                  const nextLevel = task.referralInfo?.levels[currentLevel];
                  const totalInvites = task.referralInfo?.totalInvites || 0;

                  return (
                    <div key={task.id} className="flex flex-col divide-y divide-white/5">
                      {/* Header Stats */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4 sm:p-6">
                        <div className="flex items-center gap-3 bg-white/[0.02] rounded-xl p-3 sm:p-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#F1DA8B]/10 flex items-center justify-center shrink-0">
                            <span className="text-[#F1DA8B] text-lg sm:text-xl">%</span>
                          </div>
                          <div>
                            <div className="text-xl sm:text-2xl font-semibold text-white">
                              {currentBonus}%
                            </div>
                            <div className="text-xs sm:text-sm text-zinc-400">
                              Текущий бонус
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 bg-white/[0.02] rounded-xl p-3 sm:p-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#F1DA8B]/10 flex items-center justify-center shrink-0">
                            <span className="text-[#F1DA8B] text-lg sm:text-xl">💰</span>
                          </div>
                          <div>
                            <div className="text-xl sm:text-2xl font-semibold text-white">
                              {task.referralInfo?.earnedPoints || 0}
                            </div>
                            <div className="text-xs sm:text-sm text-zinc-400">
                              Всего заработано
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 bg-white/[0.02] rounded-xl p-3 sm:p-4 sm:col-span-2 lg:col-span-1">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#F1DA8B]/10 flex items-center justify-center shrink-0">
                            <span className="text-[#F1DA8B] text-lg sm:text-xl">👥</span>
                          </div>
                          <div>
                            <div className="text-xl sm:text-2xl font-semibold text-white">
                              {task.referralInfo?.totalInvites || 0}
                            </div>
                            <div className="text-xs sm:text-sm text-zinc-400">
                              Рефералов
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Progress Section */}
                      <div className="p-4 sm:p-6 relative">
                        {/* Level Info */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
                          <div className="space-y-1 sm:space-y-2">
                            <h3 className="text-base sm:text-lg font-semibold text-white">
                              Уровень {currentLevel} из {task.referralInfo?.levels?.length}
                            </h3>
                            <p className="text-sm sm:text-base text-zinc-400">
                              {nextLevel ? (
                                <>Пригласите еще <span className="text-[#F1DA8B] font-medium">{nextLevel.requiredInvites - totalInvites} друзей</span> для повышения уровня</>
                              ) : (
                                <>Максимальный уровень достигнут</>
                              )}
                            </p>
                          </div>
                          {nextLevel && (
                            <div className="bg-[#F1DA8B]/10 rounded-lg px-3 py-2 sm:px-4 sm:py-2 border border-[#F1DA8B]/20 shrink-0">
                              <div className="text-xs sm:text-sm text-zinc-400">Следующий бонус</div>
                              <div className="text-base sm:text-lg font-semibold text-[#F1DA8B]">
                                {nextLevel.bonusPercentage}%
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Progress Bar */}
                        <div className="overflow-x-auto -mx-4 sm:mx-0">
                          <div className="relative min-w-[475px] px-4 sm:px-0">
                            {/* Level Numbers */}
                            <div className="flex justify-between mb-2">
                              {task.referralInfo?.levels?.map((level) => (
                                <div
                                  key={level.level}
                                  className={clsx(
                                    "text-xs sm:text-sm font-medium",
                                    level.level <= currentLevel ? "text-[#F1DA8B]" : "text-zinc-500"
                                  )}
                                >
                                  {level.level}
                                </div>
                              ))}
                            </div>

                            {/* Progress Track */}
                            <div className="h-2 bg-white/5 rounded-full relative">
                              {/* Progress Fill */}
                              <div
                                className="h-full bg-gradient-to-r from-[#F1DA8B] to-[#F1DA8B]/80 rounded-full transition-all absolute left-0"
                                style={{
                                  width: (() => {
                                    if (!nextLevel) return '100%';
                                    const currentLevelInvites = currentLevel === 1 ? 0 : task.referralInfo?.levels[currentLevel - 2].requiredInvites || 0;
                                    const progressInCurrentLevel = totalInvites - currentLevelInvites;
                                    const invitesForCurrentLevel = nextLevel.requiredInvites - currentLevelInvites;
                                    const levelProgress = (progressInCurrentLevel / invitesForCurrentLevel) * 100;
                                    const segmentSize = task.referralInfo?.levels ? 100 / (task.referralInfo.levels.length - 1) : 0;
                                    const baseProgress = (currentLevel - 1) * segmentSize;
                                    const additionalProgress = (levelProgress * segmentSize) / 100;
                                    return `${Math.min(baseProgress + additionalProgress, 100)}%`;
                                  })()
                                }}
                              />

                              {/* Level Markers */}
                              <div className="absolute top-0 left-0 right-0 h-full">
                                {task.referralInfo?.levels?.map((level, index) => {
                                  if (index === 0) return null;
                                  const position = `${(index / (task.referralInfo!.levels.length - 1)) * 100}%`;
                                  return (
                                    <div
                                      key={level.level}
                                      className="absolute w-0.5 h-full bg-white/10"
                                      style={{ left: position }}
                                    />
                                  );
                                })}
                              </div>
                            </div>

                            {/* Level Details */}
                            <div className="flex justify-between mt-2">
                              {task.referralInfo?.levels?.map((level) => (
                                <div
                                  key={level.level}
                                  className={clsx(
                                    "flex flex-col items-center gap-0.5 sm:gap-1",
                                    level.level <= currentLevel ? "text-zinc-400" : "text-zinc-600"
                                  )}
                                >
                                  <div className="text-[10px] sm:text-xs whitespace-nowrap">
                                    {level.requiredInvites} друзей
                                  </div>
                                  <div className={clsx(
                                    "text-xs sm:text-sm font-medium",
                                    level.level <= currentLevel ? "text-[#F1DA8B]" : "text-zinc-500"
                                  )}>
                                    {level.bonusPercentage}%
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Current Level Marker */}
                            {nextLevel && (
                              <div
                                className="absolute top-6 max-lg:top-5 transition-all"
                                style={{
                                  left: (() => {
                                    const currentLevelInvites = currentLevel === 1 ? 0 : task.referralInfo?.levels[currentLevel - 2].requiredInvites || 0;
                                    const progressInCurrentLevel = totalInvites - currentLevelInvites;
                                    const invitesForCurrentLevel = nextLevel.requiredInvites - currentLevelInvites;
                                    const levelProgress = (progressInCurrentLevel / invitesForCurrentLevel) * 100;
                                    const segmentSize = task.referralInfo?.levels ? 100 / (task.referralInfo.levels.length - 1) : 0;
                                    const baseProgress = (currentLevel - 1) * segmentSize;
                                    const additionalProgress = (levelProgress * segmentSize) / 100;
                                    return `${Math.min(baseProgress + additionalProgress, 100)}%`;
                                  })(),
                                }}
                              >
                                <div className="w-4 h-4  rounded-full bg-[#F1DA8B] relative">
                                  <div className="absolute -inset-1 rounded-full border-2 border-[#F1DA8B]/30 animate-ping" />
                                  <div className="absolute -inset-1 rounded-full border-2 border-[#F1DA8B]/20" />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>

          {/* Regular Tasks Grid */}
          <section>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 text-white">Основные задания</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {tasks
                .filter(task => task.type !== 'invite' && task.type !== 'repost')
                .map((task, index) => {
                  const statusInfo = getTaskStatusInfo(task);
                  const Icon = statusInfo.icon;

                  return (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group"
                    >
                      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 hover:border-[#F1DA8B]/50 transition-all duration-300 h-full bg-black/40 backdrop-blur-xl">
                        {/* Status Indicator */}
                        <div className="absolute top-4 right-4">
                          <div className={clsx(
                            "px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 backdrop-blur-sm border",
                            task.status === 'completed'
                              ? 'bg-emerald-500/10 text-green-400 border-emerald-500/20'
                              : task.status === 'available'
                                ? 'bg-[#F1DA8B]/10 text-[#F1DA8B] border-[#F1DA8B]/20 cursor-pointer hover:bg-[#F1DA8B]/20 hover:border-[#F1DA8B]/30'
                                : 'bg-black/40 text-zinc-500 border-white/10'
                          )}>
                            <Icon className="w-3.5 h-3.5" />
                            {task.status === 'completed' ? "Выполнено" :
                              task.status === 'inProgress' ? "В процессе" :
                                task.status === 'locked' ? "Заблокировано" :
                                  "Доступно"}
                          </div>
                        </div>

                        <div className="p-4 sm:p-5 flex flex-col justify-between h-full">

                          <div>

                            {/* Task Type & Difficulty */}
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <span className={clsx(
                                "px-2 py-1 rounded-lg text-xs font-medium backdrop-blur-sm border",
                                task.type === 'registration' ? "bg-purple-500/10 text-purple-500 border-purple-500/20" :
                                  task.type === 'content' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                                    "bg-[#F1DA8B]/10 text-[#F1DA8B] border-[#F1DA8B]/20"
                              )}>
                                {task.type === 'registration' ? 'Регистрация' :
                                  task.type === 'content' ? 'Контент' : 'Действие'}
                              </span>
                              <span className={clsx(
                                "px-2 py-1 rounded-lg text-xs font-medium backdrop-blur-sm border",
                                task.difficulty === 'easy' ? "bg-emerald-500/10 text-green-400 border-emerald-500/20" :
                                  task.difficulty === 'medium' ? "bg-[#F1DA8B]/10 text-[#F1DA8B] border-[#F1DA8B]/20" :
                                    "bg-red-500/10 text-red-500 border-red-500/20"
                              )}>
                                {task.difficulty === 'easy' ? 'Легко' :
                                  task.difficulty === 'medium' ? 'Средне' : 'Сложно'}
                              </span>
                            </div>

                            {/* Task Title & Description */}
                            <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">{task.title}</h3>
                            <p className="text-sm text-zinc-400 mb-4">{task.description}</p>

                            {/* Progress Bar (if applicable) */}
                            {task.progress && (
                              <div className="space-y-2 mb-4">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-zinc-400">Прогресс</span>
                                  <span className="text-[#F1DA8B] font-medium">
                                    {task.progress.current}/{task.progress.total}
                                  </span>
                                </div>
                                <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
                                  <div
                                    className="h-full bg-[#F1DA8B] transition-all duration-300"
                                    style={{ width: `${(task.progress.current / task.progress.total) * 100}%` }}
                                  />
                                </div>
                              </div>
                            )}

                          </div>


                          <div className="">

                            {/* Requirements (if locked) */}
                            {task.status === 'locked' && task.requirements && (
                              <div className="mb-4 p-3 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
                                <div className="flex items-center gap-2 text-xs text-zinc-400">
                                  <LockIcon className="w-3.5 h-3.5" />
                                  <span>Требования для разблокировки:</span>
                                </div>
                                <ul className="mt-2 space-y-1">
                                  {task.requirements.map((req, idx) => (
                                    <li key={idx} className="text-xs text-zinc-500 flex items-center gap-1.5">
                                      <div className="w-1 h-1 rounded-full bg-zinc-500" />
                                      <span>Выполнить задание #{req.value}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Time & Reward */}
                            <div className="flex items-center justify-between py-3 border-t border-white/10">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center">
                                  <span className="text-[#F1DA8B]">⏱</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-xs text-zinc-400">Время</span>
                                  <span className="text-sm font-medium">{task.timeEstimate}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="flex flex-col items-end">
                                  <span className="text-xs text-zinc-400">Награда</span>
                                  <span className="text-sm font-bold text-[#F1DA8B]">{task.points} поинтов</span>
                                </div>
                                <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center">
                                  <span className="text-[#F1DA8B]">🏆</span>
                                </div>
                              </div>
                            </div>

                            {/* Action Button */}
                            <button
                              onClick={() => task.status === 'available' && startTask(task.id)}
                              disabled={task.status === 'locked' || task.status === 'completed'}
                              className={clsx(
                                "w-full mt-4 py-3 rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2",
                                task.status === 'completed' ? "bg-emerald-500/10 text-green-400 border border-emerald-500/20 cursor-not-allowed" :
                                  task.status === 'locked' ? "bg-black/40 text-zinc-500 border border-white/10 cursor-not-allowed" :
                                    task.status === 'inProgress' ? "bg-[#F1DA8B]/50 text-[#F1DA8B] border border-[#F1DA8B]/20 hover:bg-[#F1DA8B]/20" :
                                      "bg-[#F1DA8B]/20 text-white hover:text-black hover:bg-[#F1DA8B]/90"
                              )}
                            >
                              <Icon className="w-4 h-4" />
                              {statusInfo.buttonText}
                            </button>

                          </div>

                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </section>
        </div>
      </main>
    </PageTransition>
  );
}
