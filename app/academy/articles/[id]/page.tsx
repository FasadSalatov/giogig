'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { IoArrowBack, IoTimeOutline, IoEyeOutline } from 'react-icons/io5'
import ArticleRating from '@/components/academy/ArticleRating'

// Временные данные статей (в реальном приложении это должно быть в API/базе данных)
const articles = {
  'crypto-basics': {
    id: 'crypto-basics',
    name: 'Основы криптовалют',
    description: 'Базовые концепции и термины криптовалютного рынка',
    readTime: '10 мин',
    level: 'Начальный',
    imageUrl: '/images/academy/crypto-basics.jpg',
    views: '2.5K',
    rating: 4.7,
    totalVotes: 128,
    content: `
# Основы криптовалют

Криптовалюты представляют собой цифровые или виртуальные валюты, которые используют криптографию для обеспечения безопасности. В отличие от традиционных валют, они не выпускаются центральными банками.

## Ключевые концепции

### Блокчейн
Блокчейн - это децентрализованная база данных, которая хранит информацию о всех транзакциях. Каждый новый блок связан с предыдущим, образуя цепочку блоков.

### Криптографические ключи
- Публичный ключ: используется для получения средств
- Приватный ключ: необходим для отправки средств

### Майнинг
Процесс проверки и добавления транзакций в блокчейн, за который майнеры получают вознаграждение.

## Преимущества криптовалют

1. Децентрализация
2. Безопасность
3. Прозрачность
4. Низкие комиссии за международные переводы
5. Отсутствие посредников

## Риски и безопасность

- Хранение ключей
- Выбор надежных бирж
- Защита от мошенников
- Волатильность рынка

## Начало работы

1. Выберите надежный кошелек
2. Изучите основы безопасности
3. Начните с малых сумм
4. Диверсифицируйте инвестиции
`
  },
  'trading-fundamentals': {
    id: 'trading-fundamentals',
    name: 'Основы трейдинга',
    description: 'Введение в криптовалютный трейдинг',
    readTime: '15 мин',
    level: 'Начальный',
    imageUrl: '/images/academy/trading-basics.jpg',
    views: '3.1K',
    rating: 4.5,
    totalVotes: 256,
    content: `
# Основы криптовалютного трейдинга

Криптовалютный трейдинг - это покупка и продажа цифровых активов с целью получения прибыли. 

## Основные понятия

### Типы ордеров
- Market Order: мгновенное исполнение по рыночной цене
- Limit Order: исполнение по заданной цене
- Stop Loss: автоматическая продажа при достижении определенной цены

### Анализ рынка
1. Технический анализ
2. Фундаментальный анализ
3. Сентимент-анализ

## Стратегии трейдинга

### Долгосрочная торговля (HODL)
Покупка и удержание активов на длительный срок

### Внутридневная торговля
Открытие и закрытие позиций в течение одного дня

### Скальпинг
Получение прибыли на минимальных движениях цены

## Управление рисками

1. Не торгуйте на заемные средства
2. Используйте Stop Loss
3. Не инвестируйте больше, чем можете позволить себе потерять
4. Диверсифицируйте портфель
`
  },
  'advanced-analysis': {
    id: 'advanced-analysis',
    name: 'Технический анализ',
    description: 'Продвинутые техники анализа рынка',
    readTime: '20 мин',
    level: 'Продвинутый',
    imageUrl: '/images/academy/technical-analysis.jpg',
    views: '1.8K',
    rating: 4.8,
    totalVotes: 89,
    content: `
# Технический анализ криптовалют

Технический анализ - это метод прогнозирования цен на основе исторических данных.

## Ключевые индикаторы

### Трендовые индикаторы
- Moving Averages (MA)
- MACD
- Bollinger Bands

### Осцилляторы
- Relative Strength Index (RSI)
- Stochastic
- Williams %R

## Паттерны графиков

### Разворотные паттерны
1. Голова и плечи
2. Двойное дно/вершина
3. Треугольники

### Продолжение тренда
1. Флаги
2. Вымпелы
3. Клинья

## Объемный анализ

- Volume Profile
- On-Balance Volume (OBV)
- Money Flow Index (MFI)

## Практические советы

1. Используйте несколько таймфреймов
2. Комбинируйте индикаторы
3. Учитывайте объем торгов
4. Ведите журнал сделок
`
  },
  'defi-explained': {
    id: 'defi-explained',
    name: 'DeFi простым языком',
    description: 'Все о децентрализованных финансах',
    readTime: '12 мин',
    level: 'Средний',
    imageUrl: '/images/academy/defi-basics.jpg',
    views: '4.2K',
    rating: 4.6,
    totalVotes: 167,
    content: `
# Децентрализованные финансы (DeFi)

DeFi - это финансовые сервисы на базе блокчейна без посредников.

## Основные компоненты

### Смарт-контракты
Автоматически исполняемые контракты на блокчейне

### Протоколы
1. Lending protocols (Aave, Compound)
2. DEX (Uniswap, SushiSwap)
3. Yield farming
4. Liquidity mining

## Преимущества DeFi

1. Отсутствие посредников
2. Прозрачность
3. Доступность 24/7
4. Программируемость
5. Композируемость

## Риски

- Смарт-контракт риски
- Волатильность
- Потеря ключей
- Недостаточная ликвидность

## Как начать

1. Создайте Web3 кошелек
2. Изучите основные протоколы
3. Начните с малых сумм
4. Диверсифицируйте риски
`
  }
}

interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const [article, setArticle] = useState<typeof articles[keyof typeof articles] | null>(null);

  useEffect(() => {
    params.then((params) => {
      if (params.id) {
        setArticle(articles[params.id as keyof typeof articles]);
      }
    });
  }, [params]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-black text-white max-w-7xl mx-auto">
      <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
        {/* Back button */}
        <Link
          href="/academy"
          className="inline-flex items-center gap-2 text-[#F1DA8B] hover:text-[#F1DA8B]/80 mb-6"
        >
          <IoArrowBack />
          <span>Назад к академии</span>
        </Link>

        {/* Article header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative aspect-[21/9] mb-6 rounded-xl overflow-hidden">
            <Image
              src={article.imageUrl}
              alt={article.name}
              fill
              className="object-cover"
            />
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-[#F1DA8B]">
            {article.name}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6">
            <div className="flex items-center gap-6 text-white/60">
              <div className="flex items-center gap-2">
                <IoTimeOutline className="w-4 h-4" />
                {article.readTime}
              </div>
              <div className="flex items-center gap-2">
                <IoEyeOutline className="w-4 h-4" />
                {article.views} просмотров
              </div>
              <span className="px-2 py-1 bg-[#F1DA8B]/10 rounded-lg text-[#F1DA8B] text-sm">
                {article.level}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Article content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="prose prose-invert prose-gold max-w-none"
          dangerouslySetInnerHTML={{
            __html: article.content
              .split('\n')
              .map(line => {
                if (line.startsWith('# ')) {
                  return `<h1 class="text-[#F1DA8B]">${line.slice(2)}</h1>`;
                }
                if (line.startsWith('## ')) {
                  return `<h2 class="text-[#F1DA8B]">${line.slice(3)}</h2>`;
                }
                if (line.startsWith('### ')) {
                  return `<h3 class="text-[#F1DA8B]">${line.slice(4)}</h3>`;
                }
                if (line.startsWith('- ')) {
                  return `<li>${line.slice(2)}</li>`;
                }
                if (line.match(/^\d+\. /)) {
                  return `<li>${line.replace(/^\d+\. /, '')}</li>`;
                }
                return line ? `<p>${line}</p>` : '';
              })
              .join('\n'),
          }}
        />

        <div className="border rounded-2xl mt-6 border-white/10 p-4 max-w-[200px]">
          <ArticleRating
            initialRating={article.rating}
            totalVotes={article.totalVotes}
            onRate={(newRating) => {
              console.log('New rating:', newRating);
            }}
          />
        </div>
      </div>
    </main>
  );
}
