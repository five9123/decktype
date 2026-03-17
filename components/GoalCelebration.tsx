'use client';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { STORAGE_KEY_GOAL_CELEBRATED } from '@/lib/storage-keys';
import { trackEvent } from '@/lib/analytics';

interface GoalCelebrationProps {
  goalType: string;
  onDismiss: () => void;
}

export function GoalCelebration({ goalType, onDismiss }: GoalCelebrationProps) {
  const { t } = useLanguage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const key = `${STORAGE_KEY_GOAL_CELEBRATED}-${goalType}`;
    const today = new Date().toISOString().slice(0, 10);
    const celebrated = sessionStorage.getItem(key);
    if (celebrated === today) { onDismiss(); return; }

    setShow(true);
    sessionStorage.setItem(key, today);
    trackEvent('goal_completed', { goal_type: goalType });

    const timer = setTimeout(() => { setShow(false); onDismiss(); }, 4000);
    return () => clearTimeout(timer);
  }, [goalType, onDismiss]);

  if (!show) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-2xl text-center shadow-2xl"
      style={{
        background: 'var(--surface)',
        border: '2px solid var(--accent)',
        color: 'var(--text)',
        minWidth: 260,
        animation: 'retention-slide-down 0.4s ease-out',
      }}
    >
      <div className="text-3xl mb-2">🎉</div>
      <p className="font-bold text-sm" style={{ color: 'var(--accent)' }}>{t.goalCelebrationMsg}</p>
    </div>
  );
}
