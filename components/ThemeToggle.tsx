'use client';
import { useTheme } from '@/contexts/PreferencesContext';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      suppressHydrationWarning
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative transition-colors"
      style={{
        width: 52,
        height: 28,
        borderRadius: 14,
        border: 'none',
        cursor: 'pointer',
        background: isDark ? '#3C4043' : '#F3F4F6',
        boxShadow: isDark
          ? 'inset 0 1px 3px rgba(0,0,0,0.4)'
          : 'inset 0 1px 3px rgba(0,0,0,0.15)',
      }}
    >
      <span
        suppressHydrationWarning
        style={{
          position: 'absolute',
          top: '50%',
          left: 7,
          transform: 'translateY(-50%)',
          opacity: isDark ? 0.3 : 1,
          transition: 'opacity 0.2s',
          lineHeight: 0,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="5" fill="#f59e0b" />
          <g stroke="#f59e0b" strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </g>
        </svg>
      </span>
      <span
        suppressHydrationWarning
        style={{
          position: 'absolute',
          top: '50%',
          right: 7,
          transform: 'translateY(-50%)',
          opacity: isDark ? 1 : 0.7,
          transition: 'opacity 0.2s',
          lineHeight: 0,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path suppressHydrationWarning d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" fill={isDark ? '#fbbf24' : '#64748b'} />
        </svg>
      </span>
      <span
        suppressHydrationWarning
        style={{
          position: 'absolute',
          top: 3,
          left: isDark ? 27 : 3,
          width: 22,
          height: 22,
          borderRadius: '50%',
          background: isDark ? '#202124' : '#FFFFFF',
          boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
          transition: 'left 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
    </button>
  );
}
