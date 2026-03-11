import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#8b5cf6',
          borderRadius: '36px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-4px',
            marginTop: '-4px',
          }}
        >
          t
        </div>
      </div>
    ),
    { ...size }
  );
}
