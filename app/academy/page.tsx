'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  IoBookOutline,
  IoSchoolOutline,
  IoTrophyOutline,
  IoRocketOutline,
  IoWalletOutline,
  IoTimeOutline,
  IoEyeOutline,
  IoStar,
  IoPlayCircle
} from 'react-icons/io5'
import { FiVideo, FiBook, FiGrid } from 'react-icons/fi'

// Статьи и видео с общим интерфейсом
interface Content {
  id: string
  type: 'article' | 'video'
  name: string
  description: string
  duration?: string
  readTime?: string
  icon: React.ElementType
  category: string
  level: string
  imageUrl?: string
  thumbnailUrl?: string
  views: string
  rating?: number
  videoUrl?: string
}

const articles: Content[] = [
  {
    id: 'crypto-basics',
    type: 'article',
    name: 'Основы криптовалют',
    description: 'Базовые концепции и термины криптовалютного рынка',
    readTime: '10 мин',
    icon: IoBookOutline,
    category: 'basics',
    level: 'Начальный',
    imageUrl: '/images/academy/crypto-basics.jpg',
    views: '2.5K',
    rating: 4.5
  },
  {
    id: 'trading-fundamentals',
    type: 'article',
    name: 'Основы трейдинга',
    description: 'Введение в криптовалютный трейдинг',
    readTime: '15 мин',
    icon: IoSchoolOutline,
    category: 'trading',
    level: 'Начальный',
    imageUrl: '/images/academy/trading-basics.jpg',
    views: '3.1K',
    rating: 4.2
  },
  {
    id: 'advanced-analysis',
    type: 'article',
    name: 'Технический анализ',
    description: 'Продвинутые техники анализа рынка',
    readTime: '20 мин',
    icon: IoTrophyOutline,
    category: 'analysis',
    level: 'Продвинутый',
    imageUrl: '/images/academy/technical-analysis.jpg',
    views: '1.8K',
    rating: 4.8
  },
  {
    id: 'defi-explained',
    type: 'article',
    name: 'DeFi простым языком',
    description: 'Все о децентрализованных финансах',
    readTime: '12 мин',
    icon: IoWalletOutline,
    category: 'defi',
    level: 'Средний',
    imageUrl: '/images/academy/defi-basics.jpg',
    views: '4.2K',
    rating: 4.6
  }
]

const videos: Content[] = [
  {
    id: 'trading-basics',
    type: 'video',
    name: 'Введение в трейдинг',
    description: 'Базовые концепты и стратегии торговли',
    duration: '15:30',
    icon: IoRocketOutline,
    category: 'trading',
    level: 'Начальный',
    thumbnailUrl: '/images/academy/trading-video.jpg',
    views: '5.6K',
    videoUrl: 'https://youtube.com/watch?v=example1'
  },
  {
    id: 'technical-analysis',
    type: 'video',
    name: 'Технический анализ',
    description: 'Как читать графики и использовать индикаторы',
    duration: '25:45',
    icon: IoSchoolOutline,
    category: 'analysis',
    level: 'Продвинутый',
    thumbnailUrl: '/images/academy/analysis-video.jpg',
    views: '3.8K',
    videoUrl: 'https://youtube.com/watch?v=example2'
  },
  {
    id: 'risk-management',
    type: 'video',
    name: 'Управление рисками',
    description: 'Стратегии защиты капитала',
    duration: '20:15',
    icon: IoTrophyOutline,
    category: 'trading',
    level: 'Продвинутый',
    thumbnailUrl: '/images/academy/risk-video.jpg',
    views: '2.9K',
    videoUrl: 'https://youtube.com/watch?v=example3'
  }
]

export default function AcademyPage() {
  const [selectedTab, setSelectedTab] = useState<'all' | 'articles' | 'videos'>('all')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'Все' },
    { id: 'basics', name: 'Основы' },
    { id: 'trading', name: 'Трейдинг' },
    { id: 'analysis', name: 'Анализ' },
    { id: 'defi', name: 'DeFi' }
  ]

  const filteredContent = useMemo(() => {
    let content: Content[] = []

    if (selectedTab === 'all') {
      content = [...articles, ...videos]
    } else if (selectedTab === 'articles') {
      content = articles
    } else {
      content = videos
    }

    if (selectedCategory !== 'all') {
      content = content.filter(item => item.category === selectedCategory)
    }

    return content
  }, [selectedTab, selectedCategory])

  const renderContent = (item: Content) => {
    const ContentWrapper = item.type === 'article'
      ? Link
      : motion.a

    const wrapperProps = item.type === 'article'
      ? { href: `/academy/articles/${item.id}` }
      : {
        href: item.videoUrl || '',
        target: "_blank",
        rel: "noopener noreferrer"
      }

    return (
      <ContentWrapper
        key={item.id}
        {...wrapperProps}
        className="group relative block bg-black/40 rounded-xl overflow-hidden border border-white/10 hover:border-[#F1DA8B]/50 transition-all duration-300"
      >
        <div className="relative aspect-video">
          <Image
            src={item.type === 'article' ? item.imageUrl! : item.thumbnailUrl!}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {item.type === 'video' ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <IoPlayCircle className="w-16 h-16 text-[#F1DA8B]" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}
          {item.type === 'video' && (
            <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-sm">
              {item.duration}
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-[#F1DA8B]/10">
              <item.icon className="w-4 h-4 text-[#F1DA8B]" />
            </div>
            <span className="text-sm text-white/60">{item.level}</span>
            <span className="ml-auto text-xs px-2 py-1 rounded-full bg-white/5 text-white/60">
              {item.type === 'article' ? 'Статья' : 'Видео'}
            </span>
          </div>

          <h3 className="font-semibold text-white mb-2 group-hover:text-[#F1DA8B] transition-colors">
            {item.name}
          </h3>
          <p className="text-white/80 text-sm mb-3 line-clamp-2">{item.description}</p>

          <div className="flex items-center justify-between text-sm text-white/60">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <IoTimeOutline className="w-4 h-4" />
                {item.type === 'article' ? item.readTime : item.duration}
              </div>
              <div className="flex items-center gap-2">
                <IoEyeOutline className="w-4 h-4" />
                {item.views}
              </div>
            </div>
            {item.type === 'article' && item.rating && (
              <div className="flex items-center gap-1 text-[#F1DA8B]">
                <IoStar className="w-4 h-4" />
                <span>{item.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </ContentWrapper>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white max-w-7xl mx-auto">
      <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 text-[#F1DA8B]">
            Академия
          </h1>
          <p className="text-white/80">
            Изучайте криптовалюты и трейдинг с помощью наших обучающих материалов
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex gap-2 p-1 bg-black/40 rounded-xl">
            <button
              onClick={() => setSelectedTab('all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${selectedTab === 'all'
                ? 'bg-[#F1DA8B] text-black'
                : 'bg-white/10 hover:bg-white/20'
                }`}
            >
              <FiGrid className="w-4 h-4" />
              <span>Все</span>
            </button>
            <button
              onClick={() => setSelectedTab('articles')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${selectedTab === 'articles'
                ? 'bg-[#F1DA8B] text-black'
                : 'bg-white/10 hover:bg-white/20'
                }`}
            >
              <FiBook className="w-4 h-4" />
              <span>Статьи</span>
            </button>
            <button
              onClick={() => setSelectedTab('videos')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${selectedTab === 'videos'
                ? 'bg-[#F1DA8B] text-black'
                : 'bg-white/10 hover:bg-white/20'
                }`}
            >
              <FiVideo className="w-4 h-4" />
              <span>Видео</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 h-fit py-1 rounded-lg whitespace-nowrap transition-all border ${selectedCategory === category.id
                  ? 'bg-[#F1DA8B]/10 border-[#F1DA8B]/50 text-[#F1DA8B]'
                  : 'bg-black/40 border-white/10 hover:border-white/20'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredContent.map(renderContent)}
        </motion.div>
      </div>
    </main>
  )
}
