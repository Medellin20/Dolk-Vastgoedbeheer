'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function PropertyCarousel({ children }: { children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const [navigation, setNavigation] = useState({ previous: false, next: false });

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const update = () => setNavigation({
      previous: element.scrollLeft > 2,
      next: element.scrollLeft + element.clientWidth < element.scrollWidth - 2,
    });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    for (const card of Array.from(element.children)) observer.observe(card);
    element.addEventListener('scroll', update, { passive: true });
    update();
    return () => { observer.disconnect(); element.removeEventListener('scroll', update); };
  }, [children]);

  function move(direction: -1 | 1) {
    const element = track.current;
    const card = element?.firstElementChild;
    if (!element || !card) return;
    const gap = parseFloat(getComputedStyle(element).columnGap) || 0;
    element.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  }

  return (
    <div className="mt-9">
      <div
        ref={track}
        id="featured-property-track"
        role="region"
        aria-label="Uitgelichte woningen"
        aria-roledescription="carrousel"
        tabIndex={0}
        onKeyDown={event => {
          if (event.target !== event.currentTarget) return;
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            move(event.key === 'ArrowLeft' ? -1 : 1);
          }
        }}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain rounded-2xl pb-5 [scrollbar-color:#A3B18A_#FAF9F6] [scrollbar-width:thin]"
      >
        {children}
      </div>
      {(navigation.previous || navigation.next) && (
        <div className="mt-3 flex items-center justify-between gap-4">
          <p className="text-xs text-ink-500">Veeg om meer woningen te bekijken</p>
          <div className="flex shrink-0 gap-2">
            <button type="button" aria-label="Vorige woning" aria-controls="featured-property-track" disabled={!navigation.previous} onClick={() => move(-1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald/20 bg-white text-emerald transition hover:bg-emerald hover:text-white disabled:cursor-not-allowed disabled:opacity-30"><ChevronLeft className="h-5 w-5" /></button>
            <button type="button" aria-label="Volgende woning" aria-controls="featured-property-track" disabled={!navigation.next} onClick={() => move(1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald/20 bg-white text-emerald transition hover:bg-emerald hover:text-white disabled:cursor-not-allowed disabled:opacity-30"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>
      )}
    </div>
  );
}
