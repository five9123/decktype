'use client';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import type { GoalType, GoalPeriod, UserGoal } from '@/types';

interface GoalSettingsModalProps {
  goals: UserGoal[];
  onSetGoal: (type: GoalType, period: GoalPeriod, target: number) => Promise<boolean>;
  onRemoveGoal: (id: string) => Promise<boolean>;
  onClose: () => void;
}

const GOAL_TYPES: GoalType[] = ['sessions', 'minutes', 'cards'];
const GOAL_PERIODS: GoalPeriod[] = ['daily', 'weekly'];

const DEFAULT_TARGETS: Record<GoalType, Record<GoalPeriod, number>> = {
  sessions: { daily: 1, weekly: 5 },
  minutes: { daily: 10, weekly: 60 },
  cards: { daily: 20, weekly: 100 },
};

export function GoalSettingsModal({ goals, onSetGoal, onRemoveGoal, onClose }: GoalSettingsModalProps) {
  const { t } = useLanguage();
  const [type, setType] = useState<GoalType>('sessions');
  const [period, setPeriod] = useState<GoalPeriod>('daily');
  const [target, setTarget] = useState(DEFAULT_TARGETS['sessions']['daily']);
  const [saving, setSaving] = useState(false);

  const typeLabel = (gt: GoalType) =>
    gt === 'sessions' ? t.sessionsGoal : gt === 'minutes' ? t.minutesGoal : t.cardsGoal;

  const handleSave = async () => {
    setSaving(true);
    await onSetGoal(type, period, target);
    setSaving(false);
  };

  const modal = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl p-6"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-lg" style={{ color: 'var(--text)' }}>{t.goalSettings}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: 18 }}>✕</button>
        </div>

        {/* Existing goals */}
        {goals.length > 0 && (
          <div className="mb-5 space-y-2">
            {goals.map((g) => (
              <div key={g.id} className="flex items-center justify-between px-3 py-2 rounded-xl text-sm" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--text)' }}>
                  {g.period === 'daily' ? t.dailyGoal : t.weeklyGoal} — {typeLabel(g.goal_type)}: {g.target_value}
                </span>
                <button
                  onClick={() => onRemoveGoal(g.id)}
                  className="text-xs px-2 py-1 rounded-lg"
                  style={{ background: 'rgba(248,113,113,0.1)', color: 'var(--incorrect)', border: 'none', cursor: 'pointer' }}
                >
                  {t.removeGoal}
                </button>
              </div>
            ))}
          </div>
        )}

        <p className="text-sm font-medium mb-3" style={{ color: 'var(--muted)' }}>{t.goalSettingsDesc}</p>

        {/* Type */}
        <div className="mb-4">
          <div className="flex gap-2">
            {GOAL_TYPES.map((gt) => (
              <button
                key={gt}
                onClick={() => { setType(gt); setTarget(DEFAULT_TARGETS[gt][period]); }}
                className="flex-1 px-3 py-2 rounded-lg text-sm transition-colors"
                style={{
                  background: type === gt ? 'var(--accent)' : 'var(--surface2)',
                  color: type === gt ? '#fff' : 'var(--text)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {typeLabel(gt)}
              </button>
            ))}
          </div>
        </div>

        {/* Period */}
        <div className="mb-4">
          <div className="flex gap-2">
            {GOAL_PERIODS.map((gp) => (
              <button
                key={gp}
                onClick={() => { setPeriod(gp); setTarget(DEFAULT_TARGETS[type][gp]); }}
                className="flex-1 px-3 py-2 rounded-lg text-sm transition-colors"
                style={{
                  background: period === gp ? 'var(--accent)' : 'var(--surface2)',
                  color: period === gp ? '#fff' : 'var(--text)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {gp === 'daily' ? t.dailyGoal : t.weeklyGoal}
              </button>
            ))}
          </div>
        </div>

        {/* Target value */}
        <div className="flex items-center gap-3 mb-5">
          <button
            onClick={() => setTarget((v) => Math.max(1, v - (type === 'minutes' ? 5 : type === 'cards' ? 10 : 1)))}
            className="w-10 h-10 rounded-xl text-xl font-bold"
            style={{ background: 'var(--surface2)', border: 'none', color: 'var(--text)', cursor: 'pointer' }}
          >−</button>
          <div className="flex-1 text-center">
            <span className="text-2xl font-bold" style={{ color: 'var(--text)' }}>{target}</span>
            <span className="text-sm ml-1" style={{ color: 'var(--muted)' }}>
              {type === 'sessions' ? t.sessionsGoal : type === 'minutes' ? t.minutesGoal : t.cardsGoal}
            </span>
          </div>
          <button
            onClick={() => setTarget((v) => v + (type === 'minutes' ? 5 : type === 'cards' ? 10 : 1))}
            className="w-10 h-10 rounded-xl text-xl font-bold"
            style={{ background: 'var(--surface2)', border: 'none', color: 'var(--text)', cursor: 'pointer' }}
          >+</button>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-2.5 rounded-xl text-sm font-bold"
          style={{ background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer', opacity: saving ? 0.7 : 1 }}
        >
          {saving ? t.loading : t.setGoal}
        </button>
      </div>
    </div>
  );

  return typeof window !== 'undefined' ? createPortal(modal, document.body) : null;
}
