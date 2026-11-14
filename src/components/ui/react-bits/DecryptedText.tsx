'use client';

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent
} from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

const FADE_FLOOR = 0.16;

export interface DecryptedTextProps extends HTMLMotionProps<'span'> {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center' | 'random';
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: 'view' | 'hover' | 'inViewHover' | 'click';
  clickMode?: 'once' | 'toggle';
  effect?: 'scramble' | 'fade';
  scrambleColor?: string;
  loop?: boolean;
  loopDelay?: number;
  hoverRadius?: number;
}

interface Frame {
  shown: string[];
  revealed: boolean[];
  tint: number[];
  dim: number[];
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
const isSpace = (char: string) => /\s/.test(char);

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);

export function DecryptedText({
  text,
  speed = 40,
  maxIterations = 8,
  sequential = true,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = '0123456789ABCDEF!@#$%&*',
  className = '',
  parentClassName = '',
  encryptedClassName = 'text-emerald-400/80 font-mono',
  animateOn = 'hover',
  clickMode = 'once',
  effect = 'scramble',
  scrambleColor = '#10b981',
  loop = false,
  loopDelay = 3000,
  ...props
}: DecryptedTextProps) {
  const chars = useMemo(() => Array.from(String(text ?? '')), [text]);

  const pool = useMemo(() => {
    const letters = chars.filter(char => !isSpace(char));
    const source = useOriginalCharsOnly ? Array.from(new Set(letters)) : Array.from(characters);
    return source.length ? source : letters;
  }, [useOriginalCharsOnly, chars, characters]);

  const startsHidden = animateOn === 'click' || animateOn === 'view' || animateOn === 'inViewHover';
  const hoverable = animateOn === 'hover' || animateOn === 'inViewHover';
  const step = Math.max(16, speed);

  const [frame, setFrame] = useState<Frame>(() => {
    const revealed = chars.map(char => !startsHidden || isSpace(char));
    return {
      shown: chars.map((char, index) =>
        revealed[index] ? char : pool[((char.codePointAt(0) ?? 0) + index * 7) % pool.length]
      ),
      revealed,
      tint: revealed.map(shown => (shown ? 0 : 1)),
      dim: revealed.map(shown => (shown ? 1 : FADE_FLOOR)),
    };
  });

  const containerRef = useRef<HTMLSpanElement>(null);
  const runningRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  const triggerAnimation = () => {
    if (prefersReducedMotion() || runningRef.current) return;
    runningRef.current = true;
    let iteration = 0;

    const interval = window.setInterval(() => {
      iteration++;
      const progress = iteration / maxIterations;

      setFrame({
        shown: chars.map((char, index) => {
          if (isSpace(char)) return char;
          const charProgress = sequential
            ? revealDirection === 'end'
              ? (chars.length - index) / chars.length
              : index / chars.length
            : Math.random();

          if (progress >= charProgress) return char;
          return pool[Math.floor(Math.random() * pool.length)];
        }),
        revealed: chars.map((char, index) => {
          if (isSpace(char)) return true;
          const charProgress = sequential
            ? revealDirection === 'end'
              ? (chars.length - index) / chars.length
              : index / chars.length
            : Math.random();
          return progress >= charProgress;
        }),
        tint: chars.map(() => Math.max(0, 1 - progress)),
        dim: chars.map(() => Math.min(1, FADE_FLOOR + progress * (1 - FADE_FLOOR))),
      });

      if (iteration >= maxIterations) {
        window.clearInterval(interval);
        runningRef.current = false;
        // Ensure final state exactly matches actual text
        setFrame({
          shown: chars,
          revealed: chars.map(() => true),
          tint: chars.map(() => 0),
          dim: chars.map(() => 1),
        });

        if (loop) {
          timeoutRef.current = window.setTimeout(triggerAnimation, loopDelay);
        }
      }
    }, step);
  };

  const triggerAnimationRef = useRef(triggerAnimation);
  triggerAnimationRef.current = triggerAnimation;

  useEffect(() => {
    if (animateOn === 'view' || animateOn === 'inViewHover') {
      const observer = new IntersectionObserver(entries => {
        if (entries[0]?.isIntersecting) {
          triggerAnimationRef.current();
        }
      });
      if (containerRef.current) observer.observe(containerRef.current);
      return () => {
        observer.disconnect();
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      };
    }
  }, [animateOn]);

  const handleMouseEnter = () => {
    if (hoverable) triggerAnimation();
  };

  const handleClick = () => {
    if (animateOn === 'click') triggerAnimation();
  };

  return (
    <motion.span
      ref={containerRef}
      className={`inline-block select-none ${parentClassName}`}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      {...props}
    >
      <span className="sr-only">{chars.join('')}</span>
      <span aria-hidden="true">
        {chars.map((char, index) => {
          const revealed = frame.revealed[index] ?? true;
          return (
            <span
              key={index}
              className={revealed ? className : encryptedClassName}
              style={{
                color: !revealed && scrambleColor ? scrambleColor : undefined,
                opacity: frame.dim[index] ?? 1,
                transition: 'color 0.2s ease, opacity 0.2s ease',
              }}
            >
              {frame.shown[index] ?? char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}

export default DecryptedText;
