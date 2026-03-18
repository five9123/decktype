import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a1028 0%, #0d1117 100%)',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            width: '900px',
            height: '450px',
            background: 'radial-gradient(ellipse, rgba(139,92,246,0.3) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Logo */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: '#8b5cf6',
            letterSpacing: '-3px',
            marginBottom: 20,
          }}
        >
          typee
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: '#f4f4f5',
            textAlign: 'center',
            marginBottom: 16,
            maxWidth: 800,
            lineHeight: 1.2,
          }}
        >
          Learn Languages Through Music & Movies
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 22,
            color: '#a1a1aa',
            textAlign: 'center',
            maxWidth: 640,
            marginBottom: 32,
          }}
        >
          Paste lyrics or subtitles — AI creates typing flashcards instantly
        </div>

        {/* Feature badges */}
        <div
          style={{
            display: 'flex',
            gap: 16,
          }}
        >
          {['AI Cards', '4 Game Modes', '9+ Languages', 'Free'].map((badge) => (
            <div
              key={badge}
              style={{
                padding: '8px 20px',
                borderRadius: 24,
                background: 'rgba(139,92,246,0.15)',
                border: '1px solid rgba(139,92,246,0.3)',
                color: '#c4b5fd',
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              {badge}
            </div>
          ))}
        </div>

        {/* Domain */}
        <div
          style={{
            position: 'absolute',
            bottom: 36,
            fontSize: 18,
            color: '#71717a',
            fontWeight: 600,
          }}
        >
          typee.app — Free Typing Practice for Language Learning
        </div>
      </div>
    ),
    { ...size }
  );
}
