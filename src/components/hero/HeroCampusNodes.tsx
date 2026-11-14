'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface CampusNode {
  name: string;
  slug: string;
  city: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  code: string;
}

const NODES: CampusNode[] = [
  { name: 'Jadavpur University', slug: 'jadavpur-university-engineering', city: 'Kolkata', x: 72, y: 76, code: 'JU' },
  { name: 'IEM Kolkata', slug: 'iem-kolkata', city: 'Kolkata', x: 74, y: 72, code: 'IEM' },
  { name: 'Heritage Institute', slug: 'heritage-institute-of-technology', city: 'Kolkata', x: 76, y: 78, code: 'HIT' },
  { name: 'KGEC Kalyani', slug: 'kalyani-government-engineering-college', city: 'Nadia', x: 70, y: 62, code: 'KGEC' },
  { name: 'JGEC Jalpaiguri', slug: 'jalpaiguri-government-engineering-college', city: 'Jalpaiguri', x: 62, y: 18, code: 'JGEC' },
  { name: 'Cooch Behar GEC', slug: 'cooch-behar-government-engineering-college', city: 'Cooch Behar', x: 70, y: 15, code: 'CGEC' },
  { name: 'Haldia Inst of Tech', slug: 'haldia-institute-of-technology', city: 'Purba Medinipur', x: 66, y: 88, code: 'HITK' },
  { name: 'GCELT Kolkata', slug: 'gcelt-kolkata', city: 'Kolkata', x: 73, y: 74, code: 'GCELT' },
  { name: 'Purulia GEC', slug: 'ramkrishna-mahato-government-engineering-college', city: 'Purulia', x: 28, y: 65, code: 'RKMGEC' },
  { name: 'GCETT Serampore', slug: 'gcett-serampore', city: 'Hooghly', x: 68, y: 70, code: 'GCETTS' },
  { name: 'GCETT Berhampore', slug: 'gcett-berhampore', city: 'Murshidabad', x: 64, y: 48, code: 'GCETTB' },
  { name: 'UIT Burdwan', slug: 'university-institute-of-technology-burdwan', city: 'Purba Bardhaman', x: 52, y: 64, code: 'UIT' },
];

export function HeroCampusNodes() {
  const [hoveredNode, setHoveredNode] = useState<CampusNode | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const offsetX = (e.clientX / window.innerWidth - 0.5) * 12;
      const offsetY = (e.clientY / window.innerHeight - 0.5) * 12;
      setMouseOffset({ x: offsetX, y: offsetY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
    >
      {/* Subtle Drift Container */}
      <div
        className="relative w-full h-full transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
        }}
      >
        {NODES.map((node, i) => (
          <div
            key={node.slug}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
            onMouseEnter={() => setHoveredNode(node)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            {/* Pulsing Beacon Dot */}
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.6, 0.9, 0.6],
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: i * 0.25,
                ease: 'easeInOut',
              }}
              className="relative flex items-center justify-center w-5 h-5 cursor-pointer"
            >
              <span className="absolute w-4 h-4 rounded-full bg-[#10B981]/20 animate-ping" />
              <span className="w-2 h-2 rounded-full bg-[#10B981] border border-[#05080A] shadow-[0_0_8px_#10B981]" />
            </motion.div>

            {/* Hover Tooltip Card */}
            {hoveredNode?.slug === node.slug && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 whitespace-nowrap z-50 bg-[#0B1210]/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#10B981]/40 text-left shadow-xl"
              >
                <div className="text-[11px] font-bold text-[#ECF4F0] flex items-center gap-1.5">
                  <span className="text-[#F5B942] font-mono text-[10px]">{node.code}</span>
                  <span>{node.name}</span>
                </div>
                <div className="text-[9px] text-[#9DB0A8] font-medium">{node.city}, WB</div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
