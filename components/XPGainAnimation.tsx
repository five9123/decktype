'use client';

import { useEffect, useState } from 'react';

interface XPGainAnimationProps {
  amount: number;
  show: boolean;
}

export function XPGainAnimation({ amount, show }: XPGainAnimationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!show || amount <= 0) return;
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, [show, amount]);

  if (!visible) return null;

  return (
    <div
      className="text-center font-bold text-lg"
      style={{
        color: 'var(--accent)',
        animation: 'xpFloat 2s ease-out forwards',
      }}
    >
      +{amount} XP
      <style>{`
        @keyframes xpFloat {
          0% { opacity: 1; transform: translateY(0); }
          70% { opacity: 1; transform: translateY(-20px); }
          100% { opacity: 0; transform: translateY(-30px); }
        }
      `}</style>
    </div>
  );
}
