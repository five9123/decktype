'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import type { GoalProgress } from '@/hooks/useGoals';
import type { GoalType, GoalPeriod } from '@/types';

interface GoalProgressBarProps {
  goalProgress: GoalProgress[];
  onOpenSettings: () => void;
}

function goalLabel(type: GoalType, period: GoalPeriod, t: ReturnType<typeof useLanguage>['t']): string {
  const periodLabel = period === 'daily' ? t.dailyGoal : t.weeklyGoal;
  const typeLabel = type === 'sessions' ? t.sessionsGoal : type === 'minutes' ? t.minutesGoal : t.cardsGoal;
  return `${periodLabel} — ${typeLabel}`;
}

export function GoalProgressBar({ goalProgress, onOpenSettings }: GoalProgressBarProps) {
  const { t } = useLanguage();

  if (goalProgress.length === 0) {
    return (
      <div className="flex items-center justify-between mb-6 px-1">
        <p className="text-sm" style={{ color: 'var(--muted)' }}>{t.noGoalsYet}</p>
        <button
          onClick={onOpenSettings}
          className="text-xs px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', cursor: 'pointer' }}
        >
          + {t.setGoal}
        </button>
      </div>
    );
  }

  return (
    <div className="mb-6 p-4 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-bold" style={{ color: 'var(--text)' }}>{t.goalSettings}</p>
        <button
          onClick={onOpenSettings}
          className="text-xs px-2 py-1 rounded-lg transition-opacity hover:opacity-80"
          style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}
          aria-label="Goal settings"
        >
          ⚙
        </button>
      </div>
      <div className="space-y-3">
        {goalProgress.map(({ goal, current, percentage, completed }) => (
          <div key={goal.id}>
            <div className="flex items-center justify-between mb-1 text-xs" style={{ color: 'var(--muted)' }}>
              <span>{goalLabel(goal.goal_type, goal.period, t)}</span>
              <span style={{ color: completed ? 'var(--correct)' : 'var(--text)' }}>
                {completed ? '✓ ' : ''}{current} / {goal.target_value}
              </span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--surface2)' }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${percentage}%`,
                  background: completed ? 'var(--correct)' : 'var(--accent)',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
