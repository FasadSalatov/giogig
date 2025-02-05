'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiArrowRight } from 'react-icons/fi';

export default function LandingPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    login: '',
    password: '',
    agreeToTerms: false
  });

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight * 100}`;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Эффект для анимации при загрузке
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Auth Modal */}
      {isAuthModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsAuthModalOpen(false)}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-black/90 rounded-2xl border border-white/10 p-6 sm:p-8 w-full max-w-md
                      backdrop-blur-xl shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">
                {isLoginMode ? 'Войти в аккаунт' : 'Создать аккаунт'}
              </h3>
              <p className="text-zinc-400 text-sm">
                {isLoginMode ? 'Войдите чтобы начать инвестировать' : 'Зарегистрируйтесь чтобы начать инвестировать'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label htmlFor="login" className="block text-sm font-medium text-zinc-400 mb-1">
                  Логин
                </label>
                <input
                  type="login"
                  id="login"
                  value={formData.login}
                  onChange={(e) => setFormData({ ...formData, login: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white
                          placeholder:text-zinc-500 focus:outline-none focus:border-[#F1DA8B]/50
                          hover:border-white/20 transition-colors duration-200"
                  placeholder="NickName"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-zinc-400 mb-1">
                  Пароль
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white
                          placeholder:text-zinc-500 focus:outline-none focus:border-[#F1DA8B]/50
                          hover:border-white/20 transition-colors duration-200"
                  placeholder="••••••••"
                />
              </div>

              {!isLoginMode && (
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                      className="w-4 h-4 border border-white/10 rounded bg-white/5 accent-[#F1DA8B]
                              focus:ring-[#F1DA8B] focus:ring-2 focus:ring-offset-2 focus:ring-offset-black"
                    />
                  </div>
                  <label htmlFor="terms" className="ml-2 text-sm text-zinc-400">
                    Я согласен с <button className="text-[#F1DA8B] hover:text-amber-400 transition-colors duration-200">правилами</button> и <button className="text-[#F1DA8B] hover:text-amber-400 transition-colors duration-200">условиями</button>
                  </label>
                </div>
              )}

              <button
                onClick={() => {
                  // Здесь будет логика авторизации/регистрации
                  console.log('Form submitted:', formData);
                }}
                className="w-full py-2.5 bg-gradient-to-r from-[#F1DA8B] to-amber-500 text-black rounded-xl
                        font-medium hover:from-amber-300 hover:to-[#F1DA8B] transition-all duration-300
                        disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!isLoginMode && !formData.agreeToTerms}
              >
                {isLoginMode ? 'Войти' : 'Создать аккаунт'}
              </button>
            </form>

            {/* Switch Mode */}
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLoginMode(!isLoginMode)}
                className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
              >
                {isLoginMode ? 'Нет аккаунта? Создать' : 'Уже есть аккаунт? Войти'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Фоновые элементы */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/50 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(255,215,0,0.15),transparent)]" />
      </div>

      {/* Прогресс скролла */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-white/10 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-[#F1DA8B] to-amber-500"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Навигация */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-black/20 border-b border-white/5"
      >
        <div className="container mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src="/hor2logo.svg"
              alt="Quantex Logo"
              width={120}
              height={32}
              className="h-8 w-auto hover:opacity-80 transition-all duration-300"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            <motion.a
              href="#features"
              className="text-sm text-zinc-400 hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Возможности
            </motion.a>
            <motion.a
              href="#stats"
              className="text-sm text-zinc-400 hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Статистика
            </motion.a>
            <motion.a
              href="#how-it-works"
              className="text-sm text-zinc-400 hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Как это работает
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAuthModalOpen(true)}
              className="px-4 sm:px-6 py-2.5 bg-gradient-to-r from-[#F1DA8B] to-amber-500 text-black rounded-xl font-medium
                        hover:from-amber-300 hover:to-[#F1DA8B] transition-all duration-300"
            >
              Войти
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </motion.button>

          {/* Mobile Menu */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isMobileMenuOpen ? 1 : 0,
              height: isMobileMenuOpen ? 'auto' : 0
            }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl md:hidden border-b border-white/5 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <motion.a
                href="#features"
                className="text-sm text-zinc-400 hover:text-white transition-colors duration-300 py-2"
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Возможности
              </motion.a>
              <motion.a
                href="#stats"
                className="text-sm text-zinc-400 hover:text-white transition-colors duration-300 py-2"
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Статистика
              </motion.a>
              <motion.a
                href="#how-it-works"
                className="text-sm text-zinc-400 hover:text-white transition-colors duration-300 py-2"
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Как это работает
              </motion.a>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsLoginMode(true);
                  setIsAuthModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-gradient-to-r from-[#F1DA8B] to-amber-500 text-black rounded-xl font-medium
                          hover:from-amber-300 hover:to-[#F1DA8B] transition-all duration-300"
              >
                Войти
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
        {/* Фоновые эффекты */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/50 to-black" />
          <motion.div
            animate={{
              opacity: [0.1, 0.15, 0.1],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(255,215,0,0.15),transparent)]"
          />
          <motion.div
            animate={{
              opacity: [0.1, 0.15, 0.1],
              scale: [1.1, 1, 1.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
            className="absolute inset-0 bg-[radial-gradient(circle_600px_at_0%_400px,rgba(255,215,0,0.1),transparent)]"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 space-y-8 mt-[-30%]"
            >
              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl rounded-full pl-2 pr-4 py-1.5 border border-white/10
                          hover:border-[#F1DA8B]/20 transition-all duration-300"
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#F1DA8B] text-black text-sm font-medium">
                  🚀
                </span>
                <span className="text-sm text-zinc-400">Умный сервис, для умных людей</span>
              </motion.div>

              {/* Main Heading */}
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="absolute -top-8 -left-8 w-16 h-16 bg-[#F1DA8B]/10 rounded-full blur-xl"
                />
                <h1 className="relative text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="block text-transparent bg-clip-text bg-gradient-to-r from-[#F1DA8B] via-amber-200 to-[#F1DA8B]"
                  >
                    инвестиции
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400"
                  >
                    нового                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="block text-transparent bg-clip-text bg-gradient-to-r from-[#F1DA8B] to-amber-500"
                  >
                    поколения
                  </motion.span>
                </h1>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-lg sm:text-xl text-zinc-400 max-w-xl leading-relaxed"
              >
                Торгуй, Играй, Побеждай              </motion.p>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex gap-4"
              >
                <div className="bg-black/40 w-full backdrop-blur-xl rounded-xl p-4 border border-white/10
                            hover:border-[#F1DA8B]/20 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">📈</span>
                    <h3 className="text-2xl font-bold text-[#F1DA8B] group-hover:text-amber-400 transition-colors duration-300">42.5%</h3>
                  </div>
                  <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">QNX Стейкинг</p>
                  <span className="text-xs text-emerald-400 mt-1 block group-hover:text-emerald-300 transition-colors duration-300">
                    Максимальная доходность
                  </span>
                </div>

                <div className="bg-black/40 w-full backdrop-blur-xl rounded-xl p-4 border border-white/10
                            hover:border-[#F1DA8B]/20 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🎮</span>
                    <h3 className="text-2xl font-bold text-[#F1DA8B] group-hover:text-amber-400 transition-colors duration-300">4</h3>
                  </div>
                  <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">Игры</p>
                  <span className="text-xs text-emerald-400 mt-1 block group-hover:text-emerald-300 transition-colors duration-300">
                    Играй и зарабатывай
                  </span>
                </div>

                <div className="bg-black/40 w-full backdrop-blur-xl rounded-xl p-4 border border-white/10
                            hover:border-[#F1DA8B]/20 transition-all duration-300 group sm:col-span-1 col-span-2">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">💎</span>
                    <h3 className="text-2xl font-bold text-[#F1DA8B] group-hover:text-amber-400 transition-colors duration-300">3</h3>
                  </div>
                  <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">Индекса</p>
                  <span className="text-xs text-emerald-400 mt-1 block group-hover:text-emerald-300 transition-colors duration-300">
                    DeFi, Gaming, Layer-1
                  </span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsAuthModalOpen(true)}
                  className="group relative px-8 py-4 bg-gradient-to-r from-[#F1DA8B] to-amber-400 rounded-xl font-medium
                            overflow-hidden transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-[#F1DA8B] transition-transform duration-300
                                group-hover:translate-x-full" />
                  <div className="relative flex items-center justify-center gap-2">
                    <span className="text-black font-semibold">Начать инвестировать</span>
                    <FiArrowRight className="w-5 h-5 text-black transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-8 py-4 bg-white/5 backdrop-blur-xl rounded-xl font-medium border border-white/10
                            hover:bg-white/10 transition-all duration-300"
                >
                  <span className="bg-gradient-to-r from-white to-white bg-clip-text text-transparent
                                group-hover:from-[#F1DA8B] group-hover:to-amber-500 transition-all duration-300">
                    Узнать больше
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Side - 3D Image & Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 0.9 }}
              transition={{
                duration: 1,
                ease: [0.16,
                  1, 0.3, 1],
              }}
              className="relative mt-8 lg:mt-0 w-full max-w-3xl mx-auto lg:max-w-none"
            >
              {/* Decorative Elements */}
              <div className="absolute -inset-px bg-gradient-to-tr from-[#F1DA8B]/20 to-amber-500/20 blur-3xl opacity-10" />

              {/* Main Image Container */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#F1DA8B]/10 via-amber-500/5 to-transparent blur-2xl" />
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 2, 0]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative"
                >
                  <Image
                    src="/coin3_alfa.png"
                    alt="Crypto Platform"
                    width={1500}
                    height={1500}
                    className="w-full h-auto max-w-xl mx-auto lg:max-w-none transform hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </motion.div>

                {/* Floating Stats */}
                <motion.div
                  animate={{
                    y: [10, -100, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-1/4 right-1/4 bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-[#F1DA8B]/30
                            hover:bg-black/60 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎮</span>
                    <div>
                      <p className="text-sm font-medium text-white">Gaming Index</p>
                      <p className="text-xs text-emerald-400">+32.3% / мес</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    y: [10, 80, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute bottom-1/4 left-4/4 bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-[#F1DA8B]/30
                            hover:bg-black/60 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⚡</span>
                    <div>
                      <p className="text-sm font-medium text-white">Layer-1 Index</p>
                      <p className="text-xs text-emerald-400">+28.2% / мес</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, 45, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                  className="absolute top-1/2 right-0 bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-[#F1DA8B]/30"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💰</span>
                    <div>
                      <p className="text-sm font-medium text-white">DeFi Index</p>
                      <p className="text-xs text-emerald-400">+25.5% / мес</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Bottom Elements */}
        <div className="absolute bottom-0 left-0 w-full">
          <div className="h-px bg-gradient-to-r from-transparent via-[#F1DA8B]/50 overflow-hidden to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-20 bg-gradient-to-t from-[#F1DA8B]/50 to-transparent" />
        </div>
      </section>

      {/* Наши возможности */}
      <section id="features" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,rgba(255,215,0,0.15),transparent)]" />
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-24"
          >
            <span className="text-[#F1DA8B] text-sm font-medium tracking-wider uppercase mb-4 block">
              Инструменты для успеха
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#F1DA8B] via-amber-200 to-[#F1DA8B] text-transparent bg-clip-text">
              Наши возможности
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Все необходимые инструменты для успешной работы на платформе
            </p>
          </motion.div>

          {/* Индексы */}
          <div className="mb-32">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className="space-y-8">
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4 mb-6"
                  >
                    <span className="text-4xl bg-gradient-to-br from-[#F1DA8B] to-amber-400 rounded-full p-3">
                      📈
                    </span>
                    <h3 className="text-3xl font-bold text-white">Индексы</h3>
                  </motion.div>
                  <p className="text-xl text-zinc-400 mb-8">
                    Инвестируйте в диверсифицированные индексы и получайте стабильный доход
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-[#F1DA8B]/20
                              hover:border-[#F1DA8B]/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">🏦</span>
                      <h4 className="text-lg font-medium text-white">DeFi</h4>
                    </div>
                    <p className="text-sm text-zinc-400 mb-3">Децентрализованные финансы</p>
                    <span className="text-xs text-emerald-400">+25.5% / мес</span>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-[#F1DA8B]/20
                              hover:border-[#F1DA8B]/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">🎮</span>
                      <h4 className="text-lg font-medium text-white">Gaming</h4>
                    </div>
                    <p className="text-sm text-zinc-400 mb-3">Игровые проекты</p>
                    <span className="text-xs text-emerald-400">+32.3% / мес</span>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-[#F1DA8B]/20
                              hover:border-[#F1DA8B]/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">⚡</span>
                      <h4 className="text-lg font-medium text-white">Layer-1</h4>
                    </div>
                    <p className="text-sm text-zinc-400 mb-3">Базовые блокчейны</p>
                    <span className="text-xs text-emerald-400">+28.2% / мес</span>
                  </motion.div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-[#F1DA8B] hover:gap-4 transition-all duration-300"
                >
                  <span>Изучить индексы</span>
                  <FiArrowRight />
                </motion.button>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-l from-[white]/50 to-transparent" />
                <Image
                  src="/images/trading.png"
                  alt="Index Chart"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-xl border border-white/10"
                />
                <div className="absolute -bottom-8 -right-8 bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-[#F1DA8B]/30">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📊</span>
                    <div>
                      <p className="text-sm font-medium">Средняя доходность</p>
                      <p className="text-xs text-emerald-400">+28.6% / мес</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Стейкинг */}
          <div className="mb-32 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-transparent" />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative order-2 lg:order-1"
              >
                <div className="relative ">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F1DA8B]/10 to-transparent blur-3xl" />
                  <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-[#F1DA8B]/20">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm text-zinc-400">Всего застейкано</p>
                        <h4 className="text-2xl font-bold text-white">$12.5M</h4>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-zinc-400">Активных стейкеров</p>
                        <h4 className="text-2xl font-bold text-white">2.8K</h4>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "75%" }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-[#F1DA8B] to-amber-500"
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-sm">
                        <span className="text-zinc-400">Текущий пул</span>
                        <span className="text-[#F1DA8B]">75%</span>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-6 -right-6 bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-[#F1DA8B]/30"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🏆</span>
                      <div>
                        <p className="text-sm font-medium">Топ APY</p>
                        <p className="text-xs text-emerald-400">42.5%</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <div className="space-y-8 order-1 lg:order-2">
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-6"
                  >
                    <span className="text-3xl sm:text-4xl bg-gradient-to-br from-[#F1DA8B] to-amber-400 rounded-full p-3">
                      💰
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white">Стейкинг</h3>
                  </motion.div>
                  <p className="text-lg sm:text-xl text-zinc-400 mb-8">
                    Получайте пассивный доход, стейкая ваши активы
                  </p>
                </div>

                <div className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-black/40 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-[#F1DA8B]/20
                              hover:border-[#F1DA8B]/50 transition-all duration-300"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="text-xl sm:text-2xl">🪙</span>
                        <h4 className="text-base sm:text-lg font-medium text-white">QNX Token</h4>
                      </div>
                      <span className="text-xs sm:text-sm text-emerald-400">42.5% APY</span>
                    </div>
                    <div className="h-1 sm:h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full w-[85%] bg-gradient-to-r from-[#F1DA8B] to-amber-500" />
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-[10px] sm:text-xs text-zinc-400">Застейкано: 850,000 QNX</span>
                      <span className="text-[10px] sm:text-xs text-zinc-400">Мин. стейк: 100 QNX</span>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-black/40 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-[#F1DA8B]/20
                              hover:border-[#F1DA8B]/50 transition-all duration-300"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="text-xl sm:text-2xl">💵</span>
                        <h4 className="text-base sm:text-lg font-medium text-white">USDT</h4>
                      </div>
                      <span className="text-xs sm:text-sm text-emerald-400">12% APY</span>
                    </div>
                    <div className="h-1 sm:h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full w-[60%] bg-gradient-to-r from-[#F1DA8B] to-amber-500" />
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-[10px] sm:text-xs text-zinc-400">Застейкано: $5.2M</span>
                      <span className="text-[10px] sm:text-xs text-zinc-400">Мин. стейк: $100</span>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-black/40 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-[#F1DA8B]/20
                              hover:border-[#F1DA8B]/50 transition-all duration-300"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="text-xl sm:text-2xl">💫</span>
                        <h4 className="text-base sm:text-lg font-medium text-white">TON</h4>
                      </div>
                      <span className="text-xs sm:text-sm text-emerald-400">8% APY</span>
                    </div>
                    <div className="h-1 sm:h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full w-[45%] bg-gradient-to-r from-[#F1DA8B] to-amber-500" />
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-[10px] sm:text-xs text-zinc-400">Застейкано: 320,000 TON</span>
                      <span className="text-[10px] sm:text-xs text-zinc-400">Мин. стейк: 10 TON</span>
                    </div>
                  </motion.div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-[#F1DA8B] hover:gap-4 transition-all duration-300"
                >
                  <span>Начать стейкинг</span>
                  <FiArrowRight />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Игровая платформа */}
          <div className="mb-32 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-transparent" />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className="space-y-8">
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4 mb-6"
                  >
                    <span className="text-4xl bg-gradient-to-br from-[#F1DA8B] to-amber-400 rounded-full p-3">
                      🎮
                    </span>
                    <h3 className="text-3xl font-bold text-white">Игровая платформа</h3>
                  </motion.div>
                  <p className="text-xl text-zinc-400 mb-8">
                    Играйте в увлекательные игры и зарабатывайте награды
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-[#F1DA8B]/20
                              hover:border-[#F1DA8B]/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">🐍</span>
                      <h4 className="text-lg font-medium text-white">Змейка</h4>
                    </div>
                    <p className="text-sm text-zinc-400 mb-3">Классическая игра на скорость</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-emerald-400">1200</span>
                      <span className="text-xs text-zinc-500">игроков онлайн</span>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-[#F1DA8B]/20
                              hover:border-[#F1DA8B]/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">🎲</span>
                      <h4 className="text-lg font-medium text-white">Три в ряд</h4>
                    </div>
                    <p className="text-sm text-zinc-400 mb-3">Собирайте комбинации</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-emerald-400">850</span>
                      <span className="text-xs text-zinc-500">игроков онлайн</span>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-[#F1DA8B]/20
                              hover:border-[#F1DA8B]/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">❓</span>
                      <h4 className="text-lg font-medium text-white">Викторина</h4>
                    </div>
                    <p className="text-sm text-zinc-400 mb-3">Проверьте свои знания</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-emerald-400">650</span>
                      <span className="text-xs text-zinc-500">игроков онлайн</span>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-[#F1DA8B]/20
                              hover:border-[#F1DA8B]/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">🎴</span>
                      <h4 className="text-lg font-medium text-white">Дурак</h4>
                    </div>
                    <p className="text-sm text-zinc-400 mb-3">Карточная игра</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-emerald-400">920</span>
                      <span className="text-xs text-zinc-500">игроков онлайн</span>
                    </div>
                  </motion.div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-[#F1DA8B] hover:gap-4 transition-all duration-300"
                >
                  <span>Начать играть</span>
                  <FiArrowRight />
                </motion.button>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#F1DA8B]/10 to-transparent blur-3xl" />
                <Image
                  src="/images/image.png"
                  alt="Gaming Platform"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-xl border border-white/10"
                />
                <div className="absolute -bottom-8 -right-8 bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-[#F1DA8B]/30">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏆</span>
                    <div>
                      <p className="text-sm font-medium">Всего игроков</p>
                      <p className="text-xs text-emerald-400">3,620 онлайн</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Мультивалютный кошелек */}
          <div className="mb-32 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-transparent" />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative order-2 lg:order-1"
              >
                <div className="relative ">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F1DA8B]/10 to-transparent blur-3xl" />
                  <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-[#F1DA8B]/20">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm text-zinc-400">Всего в кошельках</p>
                        <h4 className="text-2xl font-bold text-white">$28.5M</h4>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-zinc-400">Активных кошельков</p>
                        <h4 className="text-2xl font-bold text-white">12.4K</h4>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flex flex-wrap gap-3">
                        <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-white">USDT</span>
                        <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-zinc-400">QNX</span>
                        <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-zinc-400">BNB</span>
                        <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-zinc-400">ETH</span>
                        <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-zinc-400">TON</span>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-6 -right-6 bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-[#F1DA8B]/30"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">⚡</span>
                      <div>
                        <p className="text-sm font-medium">Быстрые транзакции</p>
                        <p className="text-xs text-emerald-400">&lt; 5 секунд</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <div className="space-y-8 order-1 lg:order-2">
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4 mb-6"
                  >
                    <span className="text-4xl bg-gradient-to-br from-[#F1DA8B] to-amber-400 rounded-full p-3">
                      💎
                    </span>
                    <h3 className="text-3xl font-bold text-white">USDT кошелек</h3>
                  </motion.div>
                  <p className="text-xl text-zinc-400 mb-8">
                    Безопасное хранение и управление вашими активами
                  </p>
                </div>

                <div className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-[#F1DA8B]/20
                              hover:border-[#F1DA8B]/50 transition-all duration-300"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">💵</span>
                        <div>
                          <h4 className="text-lg font-medium text-white">USDT</h4>
                          <p className="text-xs text-white">Tether USD</p>
                        </div>
                      </div>
                      <span className="text-sm text-white">$12.5M</span>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-[#F1DA8B]/20
                              hover:border-[#F1DA8B]/50 transition-all duration-300"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🪙</span>
                        <div>
                          <h4 className="text-lg font-medium text-white">QNX</h4>
                          <p className="text-xs text-zinc-400">Quantex Token</p>
                        </div>
                      </div>
                      <span className="text-sm text-zinc-400">850,000 QNX</span>
                    </div>
                  </motion.div>

                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-[#F1DA8B] hover:gap-4 transition-all duration-300"
                >
                  <span>Открыть кошелек</span>
                  <FiArrowRight />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Безопасность */}
          <section className="py-20 relative bg-gradient-to-b from-black via-black/95 to-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-[#F1DA8B] mb-6">
                  Безопасность
                </h2>
                <p className="text-xl text-zinc-400">
                  Надежное хранение и проведение операций
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: "🛡️",
                    title: "Безопасное хранение",
                    description: "Надежное хранение ваших активов с использованием передовых технологий шифрования"
                  },
                  {
                    icon: "✅",
                    title: "Верификация",
                    description: "Многоуровневая система подтверждения транзакций"
                  },
                  {
                    icon: "🔒",
                    title: "Защита данных",
                    description: "Современные протоколы защиты персональных данных"
                  },
                  {
                    icon: "💬",
                    title: "Поддержка 24/7",
                    description: "Круглосуточная поддержка пользователей"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6
                             hover:border-[#F1DA8B]/20 transition-all duration-300"
                  >
                    <span className="text-3xl mb-4 block">{feature.icon}</span>
                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-zinc-400">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Достижения */}
          <section className="py-20 relative">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    value: "500K+",
                    label: "Активных трейдеров",
                    change: "+127% за год"
                  },
                  {
                    value: "$5B+",
                    label: "Дневной объем торгов",
                    change: "+85% за год"
                  },
                  {
                    value: "150+",
                    label: "Торговых пар",
                    change: "+45 за квартал"
                  },
                  {
                    value: "99.9%",
                    label: "Время работы",
                    change: "Стабильность"
                  }
                ].map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6
                             hover:border-[#F1DA8B]/20 transition-all duration-300 group"
                  >
                    <h3 className="text-3xl font-bold text-[#F1DA8B] mb-2">{achievement.value}</h3>
                    <p className="text-sm text-zinc-400">{achievement.label}</p>
                    <span className="text-xs text-emerald-400 mt-2 block">{achievement.change}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 relative">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto text-center"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-[#F1DA8B] mb-6">
                  Готовы начать?
                </h2>
                <p className="text-xl text-zinc-400 mb-8">
                  Присоединяйтесь к тысячам успешных трейдеров на нашей платформе
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-8 py-4 bg-gradient-to-r from-[#F1DA8B] to-amber-500 text-black rounded-xl font-medium
                            hover:from-amber-300 hover:to-[#F1DA8B] transition-all duration-300"
                >
                  Создать аккаунт
                </motion.button>
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-20 relative bg-black/80 border-t border-white/5">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div>
                  <Image
                    src="/hor2logo.svg"
                    alt="Quantex Logo"
                    width={120}
                    height={32}
                    className="h-8 w-auto mb-6"
                  />
                  <p className="text-zinc-400 leading-relaxed">
                    Инновационная платформа для современного крипто-трейдинга
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-bold mb-4">Продукты</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-zinc-400 hover:text-[#F1DA8B] transition-colors">Индексы</a></li>
                    <li><a href="#" className="text-zinc-400 hover:text-[#F1DA8B] transition-colors">Стейкинг</a></li>
                    <li><a href="#" className="text-zinc-400 hover:text-[#F1DA8B] transition-colors">Игры</a></li>
                    <li><a href="#" className="text-zinc-400 hover:text-[#F1DA8B] transition-colors">Кошелек</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-bold mb-4">Поддержка</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-zinc-400 hover:text-[#F1DA8B] transition-colors">База знаний</a></li>
                    <li><a href="#" className="text-zinc-400 hover:text-[#F1DA8B] transition-colors">Руководства</a></li>
                    <li><a href="#" className="text-zinc-400 hover:text-[#F1DA8B] transition-colors">API документация</a></li>
                    <li><a href="#" className="text-zinc-400 hover:text-[#F1DA8B] transition-colors">Центр поддержки</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-bold mb-4">Компания</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-zinc-400 hover:text-[#F1DA8B] transition-colors">О нас</a></li>
                    <li><a href="#" className="text-zinc-400 hover:text-[#F1DA8B] transition-colors">Карьера</a></li>
                    <li><a href="#" className="text-zinc-400 hover:text-[#F1DA8B] transition-colors">Блог</a></li>
                    <li><a href="#" className="text-zinc-400 hover:text-[#F1DA8B] transition-colors">Контакты</a></li>
                  </ul>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/5 text-center text-zinc-400">
                <p> 2024 Quantex. Все права защищены.</p>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}
