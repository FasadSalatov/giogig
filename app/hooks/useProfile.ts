import { useState } from 'react';
import { UserProfile } from '../types/profile';

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    username: 'user123',
    email: 'user@example.com',
    phone: '+1 (123) 456-7890',
    points: 1500,
    referralStats: {
      totalReferrals: 12,
      activeReferrals: 8,
      totalEarned: 450,
      pendingRewards: 50,
      referralCode: 'REF123',
      referralLink: 'https://quantex.io/ref/REF123'
    },
    exchangeRate: {
      points: 100,
      usdt: 1
    },
    name: ''
  });
  const [exchangeAmount, setExchangeAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const calculateUSDT = (points: number) => {
    return (points / profile.exchangeRate.points) * profile.exchangeRate.usdt;
  };

  const exchangePoints = async (points: number) => {
    setIsLoading(true);
    try {
      // Здесь будет API запрос
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProfile(prev => ({
        ...prev,
        points: prev.points - points
      }));

      return {
        success: true,
        message: `Successfully exchanged ${points} points for ${calculateUSDT(points)} USDT`
      };
    } catch {
      return {
        success: false,
        message: 'Failed to exchange points'
      };
    } finally {
      setIsLoading(false);
    }
  };

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(profile.referralStats.referralLink);
      return true;
    } catch {
      return false;
    }
  };

  return {
    profile,
    isLoading,
    exchangeAmount,
    setExchangeAmount,
    exchangePoints,
    calculateUSDT,
    copyReferralLink
  };
};
