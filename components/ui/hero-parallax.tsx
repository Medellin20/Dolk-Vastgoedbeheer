'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export function HeroParallax({ children }: { children: ReactNode }) {
  const target = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 36]);
  return (
    <div ref={target} className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute inset-0" style={reduced ? undefined : { y, scale: 1.07 }}>
        {children}
      </motion.div>
    </div>
  );
}
