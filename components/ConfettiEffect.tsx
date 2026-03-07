'use client';
import { useEffect, useRef } from 'react';

const COLORS = ['#FF6B9D','#C084FC','#FBCF4F','#4ADE80','#60A5FA','#F87171','#FB923C','#A78BFA'];

export function ConfettiEffect({ active }: { active: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;
    const container = containerRef.current;
    container.innerHTML = '';

    const COUNT = 70;
    for (let i = 0; i < COUNT; i++) {
      const el = document.createElement('div');
      const size = 5 + Math.random() * 7;
      const isRect = Math.random() > 0.5;
      const color = COLORS[i % COLORS.length];
      const left = Math.random() * 100;
      const delay = Math.random() * 500;
      const duration = 1800 + Math.random() * 1400;

      el.className = 'confetti-particle';
      el.style.cssText = `
        left: ${left}vw;
        top: -20px;
        width: ${size}px;
        height: ${isRect ? size * 0.5 : size}px;
        background: ${color};
        border-radius: ${isRect ? '2px' : '50%'};
        animation-duration: ${duration}ms;
        animation-delay: ${delay}ms;
      `;

      el.style.animationName = 'confetti-fall';
      el.style.animationTimingFunction = 'linear';
      el.style.animationFillMode = 'forwards';

      container.appendChild(el);
      el.addEventListener('animationend', () => el.remove());
    }
  }, [active]);

  if (!active) return null;
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 9999 }}
    />
  );
}
