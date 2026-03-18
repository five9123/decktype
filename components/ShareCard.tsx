'use client';

import { useRef, useCallback } from 'react';

interface ShareCardProps {
  score: number;
  accuracy: number;
  wpm: number;
  cardCount: number;
  mode: string;
  ratingLabel: string;
  ratingColor: string;
}

/**
 * Visual results card for social media sharing.
 * Renders an off-screen canvas and exports as PNG blob.
 */
export function useShareCard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const generateImage = useCallback(async (props: ShareCardProps): Promise<Blob | null> => {
    const canvas = canvasRef.current ?? document.createElement('canvas');
    canvasRef.current = canvas;

    const W = 1080;
    const H = 1080;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, '#1a1028');
    grad.addColorStop(1, '#0d1117');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Decorative circles
    ctx.globalAlpha = 0.06;
    ctx.fillStyle = props.ratingColor;
    ctx.beginPath();
    ctx.arc(W * 0.85, H * 0.15, 200, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(W * 0.15, H * 0.85, 150, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Rating label
    ctx.fillStyle = props.ratingColor;
    ctx.font = 'bold 48px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(props.ratingLabel, W / 2, 160);

    // Score circle
    const cx = W / 2;
    const cy = 340;
    const r = 120;

    // Circle border
    ctx.strokeStyle = props.ratingColor;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    // Score arc (progress)
    const progress = props.score / 100;
    ctx.strokeStyle = props.ratingColor;
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + progress * Math.PI * 2);
    ctx.stroke();

    // Score number
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 72px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(String(props.score), cx, cy + 20);

    // "Score" label
    ctx.fillStyle = '#8b8b9e';
    ctx.font = '24px system-ui, -apple-system, sans-serif';
    ctx.fillText('Score', cx, cy + 55);

    // Stats grid
    const stats = [
      { label: 'Accuracy', value: `${props.accuracy}%`, color: '#4ADE80' },
      { label: 'Speed', value: `${props.wpm} WPM`, color: '#818cf8' },
      { label: 'Cards', value: String(props.cardCount), color: '#ffffff' },
      { label: 'Mode', value: props.mode, color: '#ffffff' },
    ];

    const gridY = 540;
    const cardW = 220;
    const cardH = 120;
    const gap = 24;
    const startX = (W - (cardW * 2 + gap)) / 2;

    stats.forEach((stat, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = startX + col * (cardW + gap);
      const y = gridY + row * (cardH + gap);

      // Card background
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      roundRect(ctx, x, y, cardW, cardH, 16);
      ctx.fill();

      // Value
      ctx.fillStyle = stat.color;
      ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(stat.value, x + cardW / 2, y + 55);

      // Label
      ctx.fillStyle = '#8b8b9e';
      ctx.font = '18px system-ui, -apple-system, sans-serif';
      ctx.fillText(stat.label, x + cardW / 2, y + 90);
    });

    // Watermark
    const wmY = H - 80;
    ctx.fillStyle = '#8b8b9e';
    ctx.font = 'bold 28px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('typee.app', W / 2, wmY);
    ctx.font = '18px system-ui, -apple-system, sans-serif';
    ctx.fillText('Learn languages through music & movies', W / 2, wmY + 32);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), 'image/png');
    });
  }, []);

  return { generateImage };
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, radius: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}
