export interface ReferralStats {
  totalReferrals: number;
  activeReferrals: number;
  totalEarned: number;
  pendingRewards: number;
  referralCode: string;
  referralLink: string;
}

export interface ExchangeRate {
  points: number;
  usdt: number;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  points: number;
  referralStats: ReferralStats;
  exchangeRate: ExchangeRate;
  phone: string;
  name: string;
}
