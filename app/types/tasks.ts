export type TaskType = 'registration' | 'content' | 'action' | 'invite' | 'repost';
export type TaskDifficulty = 'easy' | 'medium' | 'hard';
export type TaskStatus = 'available' | 'inProgress' | 'completed' | 'locked';

export interface Task {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  difficulty: TaskDifficulty;
  points: number;
  timeEstimate: string;
  status: TaskStatus;
  requirements?: {
    type: string;
    value: string | number | boolean;
  }[];
  progress?: {
    current: number;
    total: number;
  };
  completedAt?: string;
  referralInfo?: ReferralInfo;
}

export interface DailyReward {
  day: number;
  points: number;
  status: 'locked' | 'available' | 'claimed';
  claimedAt?: string;
}

export interface ReferralLevel {
  level: number;
  requiredInvites: number;
  bonusPercentage: number;
  description: string;
}

export interface ReferralInfo {
  currentLevel: number;
  totalInvites: number;
  earnedPoints: number;
  levels: ReferralLevel[];
}
