import { useCallback, useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function rectsOverlap(a: DOMRect, b: DOMRect) {
  return !(
    a.right < b.left ||
    a.left > b.right ||
    a.bottom < b.top ||
    a.top > b.bottom
  );
}

function inflateRect(r: DOMRect, px: number) {
  return new DOMRect(r.x - px, r.y - px, r.width + px * 2, r.height + px * 2);
}

export function useNoButtonDodge() {
  const [noPos, setNoPos] = useState<Point>({ x: 0, y: 0 });

  const arenaRef = useRef<HTMLDivElement | null>(null);
  const noBtnRef = useRef<HTMLButtonElement | null>(null);
  const yesBtnRef = useRef<HTMLButtonElement | null>(null);

  const moveNoButton = useCallback(() => {
    const arena = arenaRef.current;
    const noBtn = noBtnRef.current;
    const yesBtn = yesBtnRef.current;
    if (!arena || !noBtn || !yesBtn) return;

    const arenaRect = arena.getBoundingClientRect();
    const noRect = noBtn.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();

    // Convert yes rect into arena-relative coordinates.
    const yesRel = new DOMRect(
      yesRect.left - arenaRect.left,
      yesRect.top - arenaRect.top,
      yesRect.width,
      yesRect.height,
    );

    const padding = 8;
    const maxX = Math.max(0, arenaRect.width - noRect.width - padding);
    const maxY = Math.max(0, arenaRect.height - noRect.height - padding);

    // Try a few random spots that don't overlap the Yes button.
    let next: Point | null = null;
    const avoid = inflateRect(yesRel, 12);
    for (let i = 0; i < 25; i++) {
      const candidate: Point = {
        x: clamp(Math.random() * maxX, padding, maxX),
        y: clamp(Math.random() * maxY, padding, maxY),
      };
      const candRect = new DOMRect(
        candidate.x,
        candidate.y,
        noRect.width,
        noRect.height,
      );
      if (!rectsOverlap(inflateRect(candRect, 6), avoid)) {
        next = candidate;
        break;
      }
    }

    // Fallback if we couldn't find a perfect spot.
    if (!next) {
      next = {
        x: clamp(Math.random() * maxX, padding, maxX),
        y: clamp(Math.random() * maxY, padding, maxY),
      };
    }

    setNoPos(next);
  }, []);

  useEffect(() => {
    // Place the No button somewhere reasonable on first paint.
    // Small delay ensures refs are laid out (fonts/styles applied).
    const t = window.setTimeout(() => {
      setNoPos({ x: 0, y: 0 });
      moveNoButton();
    }, 0);
    return () => window.clearTimeout(t);
  }, [moveNoButton]);

  return {
    noPos,
    arenaRef,
    noBtnRef,
    yesBtnRef,
    moveNoButton,
  };
}
