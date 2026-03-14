import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
    >
      <p className="font-bold mb-2" style={{ fontSize: 'clamp(4rem, 15vw, 8rem)', color: 'var(--accent)', lineHeight: 1 }}>
        404
      </p>
      <h1 className="text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>
        Page not found
      </h1>
      <p className="text-sm mb-8" style={{ color: 'var(--muted)', maxWidth: 360 }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold no-underline transition-opacity hover:opacity-90"
        style={{ background: 'var(--accent)', color: '#fff' }}
      >
        ← Go home
      </Link>
    </div>
  );
}
