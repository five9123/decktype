'use client';

interface Props {
  message: string;
  onClose?: () => void;
  className?: string;
}

export function ErrorAlert({ message, onClose, className = 'mb-4' }: Props) {
  return (
    <div
      className={`px-4 py-3 rounded-xl text-sm flex items-start gap-2 ${className}`}
      style={{
        background: 'rgba(248,113,113,0.1)',
        border: '1px solid rgba(248,113,113,0.3)',
        color: 'var(--incorrect)',
      }}
    >
      <span className="flex-1">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="text-xs opacity-60 hover:opacity-100 shrink-0"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--incorrect)' }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
