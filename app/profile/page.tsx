'use client';

import { motion } from 'framer-motion';
import { useProfile } from '../hooks/useProfile';
import { Shield, Mail, Phone, User } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { PageTransition } from "@/app/components/animations/PageTransition";
import { Card } from "@/app/components/ui/Card";
import { GradientBorder } from "@/app/components/ui/GradientBorder";
import { Button } from "@/app/components/ui/Button";
import { Switch } from "@/app/components/ui/Switch";

const clsx = (...classes: (string | boolean | undefined | null)[]) => {
  return classes.filter(Boolean).join(' ');
};

export default function ProfilePage() {
  const { profile } = useProfile();

  // User data states
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    email: profile.email || '',
    phone: profile.phone || '',
    name: profile.name || ''
  });
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const handleUserDataChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      // Here you would integrate with your backend to save the profile
      // await updateProfile(userData);
      toast.success('Профиль успешно обновлен');
      setIsEditing(false);
    } catch {
      toast.error('Ошибка при обновлении профиля');
    }
  };

  const handle2FAToggle = async () => {
    try {
      // Here you would integrate with your backend to enable/disable 2FA
      setIs2FAEnabled(!is2FAEnabled);
      toast.success(is2FAEnabled ? '2FA отключен' : '2FA включен');
    } catch {
      toast.error('Ошибка при изменении настроек 2FA');
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white max-w-7xl mx-auto">
        <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 text-[#F1DA8B]">
              Профиль
            </h1>
            <p className="text-white/80">Управление профилем и настройками</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-8">
              {/* Profile Card */}
              <GradientBorder className="gradient-amber">
                <Card className="bg-black/40 backdrop-blur-xl p-6">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-bold text-white">Личные данные</h3>
                    <Button
                      variant="outline"
                      onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                      className="bg-[#F1DA8B]/10 hover:bg-[#F1DA8B]/20 border-[#F1DA8B]/50 text-[#F1DA8B]"
                    >
                      {isEditing ? 'Сохранить' : 'Редактировать'}
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {/* Name Input */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        <User className="w-4 h-4 inline-block mr-2" />
                        Имя
                      </label>
                      <input
                        type="text"
                        value={userData.name}
                        onChange={handleUserDataChange('name')}
                        disabled={!isEditing}
                        className="w-full bg-black/20 border border-white/10 hover:border-[#F1DA8B]/30 focus:border-[#F1DA8B]/50 rounded-lg px-4 py-2.5 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Введите ваше имя"
                      />
                    </div>

                    {/* Email Input */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        <Mail className="w-4 h-4 inline-block mr-2" />
                        Email
                      </label>
                      <input
                        type="email"
                        value={userData.email}
                        onChange={handleUserDataChange('email')}
                        disabled={!isEditing}
                        className="w-full bg-black/20 border border-white/10 hover:border-[#F1DA8B]/30 focus:border-[#F1DA8B]/50 rounded-lg px-4 py-2.5 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Введите email"
                      />
                    </div>

                    {/* Phone Input */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        <Phone className="w-4 h-4 inline-block mr-2" />
                        Телефон
                      </label>
                      <input
                        type="tel"
                        value={userData.phone}
                        onChange={handleUserDataChange('phone')}
                        disabled={!isEditing}
                        className="w-full bg-black/20 border border-white/10 hover:border-[#F1DA8B]/30 focus:border-[#F1DA8B]/50 rounded-lg px-4 py-2.5 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Введите номер телефона"
                      />
                    </div>
                  </div>
                </Card>
              </GradientBorder>

              {/* Security Settings */}
              <GradientBorder className="gradient-amber">
                <Card className="bg-black/40 backdrop-blur-xl p-6">
                  <h3 className="text-xl font-bold mb-6 text-white">Безопасность</h3>
                  <div className="space-y-6">
                    {/* 2FA Toggle */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-[#F1DA8B]" />
                        <div>
                          <p className="font-medium">Двухфакторная аутентификация</p>
                          <p className="text-sm text-white/60">Дополнительный уровень защиты для вашего аккаунта</p>
                        </div>
                      </div>
                      <Switch
                        checked={is2FAEnabled}
                        onCheckedChange={handle2FAToggle}
                        className={clsx(
                          "relative inline-flex h-6 w-11 items-center rounded-full",
                          is2FAEnabled ? "bg-[#F1DA8B]" : "bg-zinc-600"
                        )}
                      >
                        <span className={clsx(
                          "inline-block h-4 w-4 transform rounded-full bg-white transition",
                          is2FAEnabled ? "translate-x-6" : "translate-x-1"
                        )} />
                      </Switch>
                    </div>
                  </div>
                </Card>
              </GradientBorder>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-4 space-y-8">
              {/* Statistics */}
              <GradientBorder className="gradient-amber">
                <Card className="bg-black/40 backdrop-blur-xl p-6">
                  <h3 className="text-xl font-bold mb-6 text-white">Статистика</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Баланс</span>
                      <span className="font-bold text-[#F1DA8B]">1,245.50 USDT</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Игровые поинты</span>
                      <span className="font-bold text-[#F1DA8B]">{profile.points}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Активные ваучеры</span>
                      <span className="font-bold text-[#F1DA8B]">3</span>
                    </div>
                  </div>
                </Card>
              </GradientBorder>

              {/* Level */}
              <GradientBorder className="gradient-amber">
                <Card className="bg-black/40 backdrop-blur-xl p-6">
                  <h3 className="text-xl font-bold mb-6 text-white">Уровень</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/80">Прогресс</span>
                        <span className="text-sm">75/100</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-amber-400 to-yellow-500"></div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Текущий уровень</span>
                        <span className="font-bold text-[#F1DA8B]">Silver</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">До следующего уровня</span>
                        <span className="font-bold text-[#F1DA8B]">25 points</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </GradientBorder>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
