'use client';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createBrowserClient } from '@/lib/supabase/client';
import { trackEvent } from '@/lib/analytics';

interface LikeButtonProps {
  deckId: string;
  initialLiked: boolean;
  initialCount: number;
}

export function LikeButton({ deckId, initialLiked, initialCount }: LikeButtonProps) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    if (!user || loading) return;
    setLoading(true);

    // Optimistic update
    const wasLiked = liked;
    setLiked(!wasLiked);
    setCount((c) => c + (wasLiked ? -1 : 1));

    const supabase = createBrowserClient();
    if (wasLiked) {
      const { error } = await supabase
        .from('deck_likes')
        .delete()
        .eq('user_id', user.id)
        .eq('deck_id', deckId);
      if (error) { setLiked(true); setCount((c) => c + 1); }
      else trackEvent('deck_unliked', { deck_id: deckId });
    } else {
      const { error } = await supabase
        .from('deck_likes')
        .insert({ user_id: user.id, deck_id: deckId });
      if (error) { setLiked(false); setCount((c) => c - 1); }
      else trackEvent('deck_liked', { deck_id: deckId });
    }
    setLoading(false);
  };

  return (
    <button
      onClick={toggle}
      disabled={!user || loading}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all"
      style={{
        background: liked ? 'rgba(248,113,113,0.15)' : 'var(--surface)',
        border: `1px solid ${liked ? 'rgba(248,113,113,0.3)' : 'var(--border)'}`,
        color: liked ? '#f87171' : 'var(--muted)',
        cursor: user ? 'pointer' : 'default',
        opacity: user ? 1 : 0.5,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      {count}
    </button>
  );
}
