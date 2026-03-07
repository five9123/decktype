'use client';
import { useState, useEffect, useRef, RefObject } from 'react';

interface UseViewportReturn {
  viewportH: number;
  compact: boolean;
  mainRef: RefObject<HTMLElement | null>;
}

export function useViewport(): UseViewportReturn {
  const [viewportH, setViewportH] = useState(0);
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const vv = window.visualViewport;

    if (!vv) {
      const onResize = () => setViewportH(window.innerHeight);
      onResize();
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }

    const update = () => {
      setViewportH(vv.height);
      if (mainRef.current) {
        mainRef.current.style.top = `${vv.offsetTop}px`;
      }
    };
    update();
    vv.addEventListener('resize', update);
    vv.addEventListener('scroll', update);
    return () => {
      vv.removeEventListener('resize', update);
      vv.removeEventListener('scroll', update);
    };
  }, []);

  const compact = viewportH > 0 && viewportH < 380;

  return { viewportH, compact, mainRef };
}
