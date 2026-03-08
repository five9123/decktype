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
          background: '#0f0f12',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            width: '800px',
            height: '400px',
            background: 'radial-gradient(ellipse, rgba(139,92,246,0.25) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Logo */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: '#8b5cf6',
            letterSpacing: '-2px',
            marginBottom: 24,
          }}
        >
          typee
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: '#f4f4f5',
            textAlign: 'center',
            marginBottom: 20,
            maxWidth: 800,
            lineHeight: 1.2,
          }}
        >
          Type it. Learn it. Master any deck.
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 22,
            color: '#a1a1aa',
            textAlign: 'center',
            maxWidth: 640,
          }}
        >
          Anki Deck Typing Practice — WPM tracking, smart review & more
        </div>

        {/* Domain */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            fontSize: 18,
            color: '#52525b',
          }}
        >
          typee.app
        </div>
      </div>
    ),
    { ...size }
  );
}
