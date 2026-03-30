'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import * as Sentry from '@sentry/nextjs';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
    >
      <p className="text-5xl mb-6">⚠️</p>
      <h1 className="text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>
        Something went wrong
      </h1>
      <p className="text-sm mb-8" style={{ color: 'var(--muted)', maxWidth: 400 }}>
        An unexpected error occurred. You can try again or return to the home page.
      </p>
      <div className="flex gap-3 flex-wrap justify-center">
        <button
          onClick={reset}
          className="px-6 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
          style={{ background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-6 py-2.5 rounded-xl text-sm font-medium no-underline transition-opacity hover:opacity-80"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
