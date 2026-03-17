'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';

export interface CoachmarkStep {
  /** CSS selector for the target element. Omit for a centered modal. */
  targetSelector?: string;
  title: string;
  description: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

interface CoachmarkProps {
  steps: CoachmarkStep[];
  onComplete: () => void;
  onSkip: () => void;
  nextLabel?: string;
  skipLabel?: string;
  doneLabel?: string;
}

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const PADDING = 8;

export function Coachmark({
  steps,
  onComplete,
  onSkip,
  nextLabel = 'Next',
  skipLabel = 'Skip',
  doneLabel = "Let's Go!",
}: CoachmarkProps) {
  const [current, setCurrent] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const [mounted, setMounted] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const step = steps[current];
  const isLast = current === steps.length - 1;

  // Ensure client-only rendering for createPortal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Measure target element position
  const measure = useCallback(() => {
    if (!step?.targetSelector) {
      setRect(null);
      return;
    }
    const el = document.querySelector(step.targetSelector);
    if (!el) {
      setRect(null);
      return;
    }
    const r = el.getBoundingClientRect();
    setRect({
      top: r.top - PADDING,
      left: r.left - PADDING,
      width: r.width + PADDING * 2,
      height: r.height + PADDING * 2,
    });
  }, [step]);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, true);
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure, true);
    };
  }, [measure]);

  // Focus trap & keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onSkip();
      }
    };
    document.addEventListener('keydown', handleKey);
    tooltipRef.current?.focus();
    return () => document.removeEventListener('keydown', handleKey);
  }, [current, onSkip]);

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setCurrent((c) => c + 1);
    }
  };

  if (!mounted) return null;

  // Compute tooltip position
  const tooltipStyle = computeTooltipStyle(rect, step?.position ?? 'bottom');

  const overlay = (
    <div
      className="coachmark-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Onboarding guide"
    >
      {/* Dark backdrop — only when there's no spotlight target */}
      {!rect && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
          }}
        />
      )}

      {/* Spotlight hole */}
      {rect && (
        <div
          className="coachmark-spotlight"
          style={{
            position: 'fixed',
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            borderRadius: 12,
            zIndex: 10001,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Clickable backdrop areas around spotlight */}
      {rect && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
          }}
          onClick={(e) => e.stopPropagation()}
        />
      )}

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="coachmark-tooltip"
        tabIndex={-1}
        style={{
          position: 'fixed',
          zIndex: 10002,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: '20px 24px',
          maxWidth: 340,
          width: 'calc(100vw - 2rem)',
          outline: 'none',
          ...tooltipStyle,
        }}
      >
        <h3
          style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            color: 'var(--text)',
            margin: '0 0 8px',
          }}
        >
          {step.title}
        </h3>
        <p
          style={{
            fontSize: '0.875rem',
            color: 'var(--muted)',
            margin: '0 0 20px',
            lineHeight: 1.5,
          }}
        >
          {step.description}
        </p>

        {/* Step dots */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {steps.map((_, i) => (
              <div
                key={i}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: i === current ? 'var(--accent)' : 'var(--border)',
                  transition: 'background 0.2s',
                }}
              />
            ))}
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={onSkip}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--muted)',
                fontSize: '0.8rem',
                cursor: 'pointer',
                padding: '6px 12px',
              }}
            >
              {skipLabel}
            </button>
            <button
              onClick={handleNext}
              style={{
                background: 'var(--accent)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '6px 16px',
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              {isLast ? doneLabel : nextLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}

/** Compute tooltip CSS position based on spotlight rect and desired placement. */
function computeTooltipStyle(
  rect: Rect | null,
  position: 'top' | 'bottom' | 'left' | 'right',
): React.CSSProperties {
  // No target → center on screen
  if (!rect) {
    return {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };
  }

  const gap = 16;

  switch (position) {
    case 'top':
      return {
        bottom: `calc(100vh - ${rect.top}px + ${gap}px)`,
        left: Math.max(16, rect.left + rect.width / 2 - 170),
      };
    case 'bottom':
      return {
        top: rect.top + rect.height + gap,
        left: Math.max(16, rect.left + rect.width / 2 - 170),
      };
    case 'left':
      return {
        top: rect.top,
        right: `calc(100vw - ${rect.left}px + ${gap}px)`,
      };
    case 'right':
      return {
        top: rect.top,
        left: rect.left + rect.width + gap,
      };
    default:
      return {
        top: rect.top + rect.height + gap,
        left: Math.max(16, rect.left + rect.width / 2 - 170),
      };
  }
}
