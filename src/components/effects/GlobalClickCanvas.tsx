'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
  decay: number;
  rotation: number;
  vRot: number;
  shape: 'circle' | 'spark' | 'ring';
  maxRadius?: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

const PARTICLE_COLORS = [
  '#10b981', // Emerald
  '#34d399', // Mint
  '#38bdf8', // Cyan
  '#06b6d4', // Teal
  '#f59e0b', // Amber/Gold
  '#ffffff', // Sparkle white
];

export function GlobalClickCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const shockwavesRef = useRef<Shockwave[]>([]);
  const isRunningRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Respect accessibility: don't render heavy particle bursts if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high-DPI screens
    const handleResize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const runAnimation = () => {
      if (!ctx || !canvas) return;

      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      // 1. Draw and update shockwave rings
      for (let i = shockwavesRef.current.length - 1; i >= 0; i--) {
        const sw = shockwavesRef.current[i];
        sw.radius += (sw.maxRadius - sw.radius) * 0.15 + 1.2;
        sw.alpha *= 0.91;

        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = sw.color;
        ctx.globalAlpha = Math.max(0, sw.alpha);
        ctx.lineWidth = Math.max(1, 2.5 * (1 - sw.radius / sw.maxRadius));
        ctx.shadowColor = sw.color;
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.restore();

        if (sw.alpha < 0.03 || sw.radius >= sw.maxRadius) {
          shockwavesRef.current.splice(i, 1);
        }
      }

      // 2. Draw and update physics particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // Light gravity
        p.vx *= 0.96; // Air resistance
        p.vy *= 0.96;
        p.alpha -= p.decay;
        p.rotation += p.vRot;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;

        if (p.shape === 'spark') {
          // 4-pointed star spark
          ctx.beginPath();
          const r = p.radius * 1.5;
          ctx.moveTo(0, -r);
          ctx.lineTo(r * 0.25, -r * 0.25);
          ctx.lineTo(r, 0);
          ctx.lineTo(r * 0.25, r * 0.25);
          ctx.lineTo(0, r);
          ctx.lineTo(-r * 0.25, r * 0.25);
          ctx.lineTo(-r, 0);
          ctx.lineTo(-r * 0.25, -r * 0.25);
          ctx.closePath();
          ctx.fill();
        } else {
          // Soft circular particle
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      // Continue animation loop only if particles or shockwaves remain active
      if (particlesRef.current.length > 0 || shockwavesRef.current.length > 0) {
        animFrameRef.current = requestAnimationFrame(runAnimation);
      } else {
        isRunningRef.current = false;
        ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      }
    };

    const triggerBurst = (x: number, y: number) => {
      // 1. Add shockwave ripples
      shockwavesRef.current.push({
        x,
        y,
        radius: 4,
        maxRadius: 42 + Math.random() * 20,
        alpha: 0.75,
        color: '#10b981',
      });

      shockwavesRef.current.push({
        x,
        y,
        radius: 2,
        maxRadius: 28 + Math.random() * 15,
        alpha: 0.6,
        color: '#38bdf8',
      });

      // 2. Add particle burst (12 - 18 particles)
      const count = 12 + Math.floor(Math.random() * 7);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2.0 + Math.random() * 4.5;
        const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
        const shape = Math.random() > 0.45 ? 'spark' : 'circle';

        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.2, // upward initial impulse
          radius: 1.5 + Math.random() * 2.5,
          alpha: 1.0,
          color,
          decay: 0.02 + Math.random() * 0.025,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.25,
          shape,
        });
      }

      // Wake up loop if idle
      if (!isRunningRef.current) {
        isRunningRef.current = true;
        animFrameRef.current = requestAnimationFrame(runAnimation);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      // Avoid firing on scrollbars
      if (e.clientX >= window.innerWidth) return;
      triggerBurst(e.clientX, e.clientY);
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', handlePointerDown);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[999999] w-full h-full"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
