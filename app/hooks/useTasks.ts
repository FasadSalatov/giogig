import { useState, useEffect } from 'react';
import { Task, TaskStatus, DailyReward, ReferralLevel } from '@/app/types/tasks';

// Пример задач (в реальном приложении будут загружаться с сервера)
const REFERRAL_LEVELS: ReferralLevel[] = [
  {
    level: 1,
    requiredInvites: 0,
    bonusPercentage: 2,
    description: 'Начальный уровень'
  },
  {
    level: 2,
    requiredInvites: 10,
    bonusPercentage: 4,
    description: 'Продвинутый уровень'
  },
  {
    level: 3,
    requiredInvites: 25,
    bonusPercentage: 6,
    description: 'Профессионал'
  },
  {
    level: 4,
    requiredInvites: 50,
    bonusPercentage: 8,
    description: 'Эксперт'
  },
  {
    level: 5,
    requiredInvites: 100,
    bonusPercentage: 10,
    description: 'Мастер'
  }
];

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Регистрация в партнерском сервисе',
    description: 'Зарегистрируйтесь в сервисе нашего партнера и получите бонус',
    type: 'registration',
    difficulty: 'easy',
    points: 500,
    timeEstimate: '5 мин',
    status: 'available',
  },
  {
    id: '2',
    title: 'Просмотр обучающего видео',
    description: 'Изучите основы криптотрейдинга в нашем обучающем видео',
    type: 'content',
    difficulty: 'easy',
    points: 100,
    timeEstimate: '10 мин',
    status: 'available',
    progress: {
      current: 0,
      total: 100 // проценты просмотра
    }
  },
  {
    id: '3',
    title: 'Первая покупка ваучера',
    description: 'Совершите свою первую покупку ваучера на маркетплейсе',
    type: 'action',
    difficulty: 'medium',
    points: 1000,
    timeEstimate: '15 мин',
    status: 'locked',
    requirements: [
      {
        type: 'task',
        value: '1' // требуется выполнение задания с id 1
      }
    ]
  },
  {
    id: '4',
    title: 'Серия побед в играх',
    description: 'Выиграйте 3 игры подряд',
    type: 'action',
    difficulty: 'hard',
    points: 2000,
    timeEstimate: '30 мин',
    status: 'locked',
    requirements: [
      {
        type: 'task',
        value: '2'
      }
    ]
  },
  {
    id: '5',
    title: 'Реферальная программа',
    description: 'Приглашайте друзей и получайте бонусы с каждого их платежа',
    type: 'invite',
    difficulty: 'medium',
    points: 1500,
    timeEstimate: '10 мин',
    status: 'available',
    progress: {
      current: 5,
      total: 10
    },
    referralInfo: {
      currentLevel: 1,
      totalInvites: 5,
      earnedPoints: 450,
      levels: REFERRAL_LEVELS
    }
  },
  {
    id: '6',
    title: 'Поделиться победой',
    description: 'Поделитесь своей победой в социальной сети и получите дополнительные бонусы',
    type: 'repost',
    difficulty: 'easy',
    points: 300,
    timeEstimate: '1 мин',
    status: 'locked',
    requirements: [
      {
        type: 'level',
        value: 5 // Репост становится доступен с 5 уровня
      }
    ]
  }
];

const MOCK_DAILY_REWARDS: DailyReward[] = Array.from({ length: 7 }, (_, i) => ({
  day: i + 1,
  points: (i + 1) * 100,
  status: i < 3 ? 'claimed' : i === 3 ? 'available' : 'locked',
  claimedAt: i < 3 ? new Date(Date.now() - (2 - i) * 24 * 60 * 60 * 1000).toISOString() : undefined
}));

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [dailyRewards, setDailyRewards] = useState<DailyReward[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки данных
    const loadData = async () => {
      setIsLoading(true);
      try {
        // В реальном приложении здесь будет API запрос
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTasks(MOCK_TASKS);
        setDailyRewards(MOCK_DAILY_REWARDS);
      } catch (error) {
        console.error('Failed to load tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const startTask = async (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: 'inProgress' as TaskStatus } : task
    ));
  };

  const updateTaskProgress = async (taskId: string, progress: number) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { 
        ...task, 
        progress: { 
          ...task.progress!,
          current: progress 
        }
      } : task
    ));
  };

  const completeTask = async (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { 
        ...task, 
        status: 'completed' as TaskStatus,
        completedAt: new Date().toISOString()
      } : task
    ));
  };

  const claimDailyReward = async (day: number) => {
    setDailyRewards(prev => prev.map(reward =>
      reward.day === day ? {
        ...reward,
        status: 'claimed',
        claimedAt: new Date().toISOString()
      } : reward
    ));
  };

  return {
    tasks,
    dailyRewards,
    isLoading,
    startTask,
    updateTaskProgress,
    completeTask,
    claimDailyReward
  };
}
