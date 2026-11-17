'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { animate } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

export function PropertyCarousel({ children }: { children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [manualStep, setManualStep] = useState(0);
  const animation = useRef<ReturnType<typeof animate> | null>(null);
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

  function scrollTo(left: number) {
    const element = track.current;
    if (!element) return;
    animation.current?.stop();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.scrollLeft = left;
      return;
    }
    animation.current = animate(element.scrollLeft, left, {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: value => { element.scrollLeft = value; },
    });
  }

  function move(direction: -1 | 1) {
    const element = track.current;
    const card = element?.firstElementChild;
    if (!element || !card) return;
    const gap = parseFloat(getComputedStyle(element).columnGap) || 0;
    scrollTo(Math.max(0, Math.min(element.scrollWidth - element.clientWidth,
      element.scrollLeft + direction * (card.getBoundingClientRect().width + gap))));
    setManualStep(step => step + 1);
  }

  useEffect(() => {
    const element = track.current;
    if (!element || paused) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.2 });
    observer.observe(element);
    const stop = () => { animation.current?.stop(); };
    media.addEventListener('change', stop);
    const timer = window.setInterval(() => {
      if (document.hidden || media.matches || !visible || element.parentElement?.matches(':hover') || element.parentElement?.contains(document.activeElement)) return;
      const card = element.firstElementChild;
      if (!card || element.scrollWidth <= element.clientWidth + 2) return;
      const gap = parseFloat(getComputedStyle(element).columnGap) || 0;
      const last = element.scrollLeft + element.clientWidth >= element.scrollWidth - 2;
      scrollTo(last ? 0 : Math.min(element.scrollWidth - element.clientWidth, element.scrollLeft + card.getBoundingClientRect().width + gap));
    }, 5000);
    return () => { window.clearInterval(timer); observer.disconnect(); media.removeEventListener('change', stop); };
  }, [paused, manualStep, children]);

  useEffect(() => () => { animation.current?.stop(); }, []);

  return (
    <div className="mt-9">
      <div
        ref={track}
        id="featured-property-track"
        role="region"
        aria-label="Uitgelichte woningen"
        aria-roledescription="carrousel"
        tabIndex={0}
        aria-live="off"
        onPointerDown={() => animation.current?.stop()}
        onKeyDown={event => {
          if (event.target !== event.currentTarget) return;
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            move(event.key === 'ArrowLeft' ? -1 : 1);
          }
        }}
        className="flex gap-5 overflow-x-auto overscroll-x-contain rounded-xl pb-5 [scrollbar-color:#9DB6A8_#F7F5F0] [scrollbar-width:thin]"
      >
        {children}
      </div>
      {(navigation.previous || navigation.next) && (
        <div className="mt-3 flex items-center justify-between gap-4">
          <p className="text-xs text-ink-500">Ontdek meer woningen</p>
          <div className="flex shrink-0 gap-2">
            <button type="button" aria-label={paused ? 'Automatisch afspelen hervatten' : 'Automatisch afspelen pauzeren'} aria-pressed={paused} onClick={() => { animation.current?.stop(); setPaused(value => !value); }} className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald/20 bg-white text-emerald hover:bg-sand-200">{paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}</button>
            <button type="button" aria-label="Vorige woning" aria-controls="featured-property-track" disabled={!navigation.previous} onClick={() => move(-1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald/20 bg-white text-emerald transition hover:bg-emerald hover:text-white disabled:cursor-not-allowed disabled:opacity-30"><ChevronLeft className="h-5 w-5" /></button>
            <button type="button" aria-label="Volgende woning" aria-controls="featured-property-track" disabled={!navigation.next} onClick={() => move(1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald/20 bg-white text-emerald transition hover:bg-emerald hover:text-white disabled:cursor-not-allowed disabled:opacity-30"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>
      )}
    </div>
  );
}
