'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ShaderGlowMeshProps {
  className?: string;
  speed?: number;
}

/**
 * ShaderGlowMesh - Animaster Lib Style Procedural Mesh Canvas
 * Generates an organic, eye-safe animated procedural gradient mesh with zero external dependencies.
 */
export function ShaderGlowMesh({ className, speed = 0.0008 }: ShaderGlowMeshProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth / 2;
      canvas.height = canvas.offsetHeight / 2;
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const render = () => {
      t += speed;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Deep obsidian base
      ctx.fillStyle = '#05080A';
      ctx.fillRect(0, 0, w, h);

      // Node 1: Emerald glow
      const x1 = w * (0.3 + 0.2 * Math.sin(t * 1.2));
      const y1 = h * (0.4 + 0.2 * Math.cos(t * 1.5));
      const g1 = ctx.createRadialGradient(x1, y1, 0, x1, y1, w * 0.45);
      g1.addColorStop(0, 'rgba(16, 185, 129, 0.22)');
      g1.addColorStop(1, 'transparent');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      // Node 2: Bengal Gold subtle accent
      const x2 = w * (0.7 + 0.15 * Math.cos(t * 0.9));
      const y2 = h * (0.6 + 0.2 * Math.sin(t * 1.1));
      const g2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, w * 0.35);
      g2.addColorStop(0, 'rgba(245, 185, 66, 0.15)');
      g2.addColorStop(1, 'transparent');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      // Node 3: Deep cyan/slate depth
      const x3 = w * (0.5 + 0.25 * Math.sin(t * 0.7));
      const y3 = h * (0.8 + 0.15 * Math.cos(t * 0.8));
      const g3 = ctx.createRadialGradient(x3, y3, 0, x3, y3, w * 0.4);
      g3.addColorStop(0, 'rgba(6, 78, 59, 0.25)');
      g3.addColorStop(1, 'transparent');
      ctx.fillStyle = g3;
      ctx.fillRect(0, 0, w, h);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn('absolute inset-0 w-full h-full pointer-events-none select-none filter blur-xl', className)}
    />
  );
}

export default ShaderGlowMesh;
