'use client';

interface Props {
  title: string;
  subtitle?: string;
  /** sm = 32px/border-3, md = 40px/border-4 (default) */
  size?: 'sm' | 'md';
  className?: string;
}

export function LoadingSpinner({ title, subtitle, size = 'md', className = 'py-20' }: Props) {
  const dim = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
  const border = size === 'sm' ? '3px' : '4px';

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`${dim} rounded-full animate-spin mb-4`}
        style={{
          borderWidth: border,
          borderStyle: 'solid',
          borderColor: 'var(--accent)',
          borderTopColor: 'transparent',
        }}
      />
      <p className="font-medium" style={{ color: 'var(--text)' }}>{title}</p>
      {subtitle && (
        <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{subtitle}</p>
      )}
    </div>
  );
}
