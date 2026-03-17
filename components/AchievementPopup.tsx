'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Achievement } from '@/types';

interface AchievementPopupProps {
  achievements: Achievement[];
  onClose: () => void;
}

export function AchievementPopup({ achievements, onClose }: AchievementPopupProps) {
  const { t } = useLanguage();
  const tAny = t as Record<string, string>;
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (achievements.length === 0) return;
    const timer = setTimeout(() => {
      if (currentIdx + 1 < achievements.length) {
        setCurrentIdx((i) => i + 1);
      } else {
        onClose();
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [currentIdx, achievements.length, onClose]);

  if (achievements.length === 0) return null;
  const a = achievements[currentIdx];
  if (!a) return null;

  // Try to get localized name, fallback to formatted id
  const nameKey = `achiev${a.id.split('_').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('')}`;
  const name = tAny[nameKey] || a.id.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <div
        className="px-5 sm:px-8 py-4 sm:py-6 rounded-2xl text-center mx-4"
        style={{
          background: 'var(--bg)',
          border: '2px solid var(--accent)',
          animation: 'achievePop 300ms ease-out',
          maxWidth: 320,
          width: '100%',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontSize: 48 }}>{a.icon}</div>
        <p className="text-sm font-bold mt-2" style={{ color: 'var(--accent)' }}>
          {t.achievementUnlocked}
        </p>
        <p className="text-lg font-bold mt-1" style={{ color: 'var(--text)' }}>
          {name}
        </p>
        <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
          +{a.xpReward} XP
        </p>
        {achievements.length > 1 && (
          <p className="text-xs mt-2" style={{ color: 'var(--muted)' }}>
            {currentIdx + 1} / {achievements.length}
          </p>
        )}
      </div>
      <style>{`
        @keyframes achievePop {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
