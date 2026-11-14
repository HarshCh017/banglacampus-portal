'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 20 Academic Nodes corresponding to West Bengal's 20 verified institutions
const NODE_COUNT = 20;

function ConstellationGraph() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Generate deterministic coordinates for 20 colleges in a cylindrical galaxy/campus cluster
  const { positions, linePositions } = useMemo(() => {
    const pos = new Float32Array(NODE_COUNT * 3);
    const coords: [number, number, number][] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      const angle = (i / NODE_COUNT) * Math.PI * 2 + (i % 2 === 0 ? 0.3 : -0.2);
      const radius = 2.4 + (i % 3) * 0.6;
      const x = Math.cos(angle) * radius;
      const y = ((i % 5) - 2) * 0.55;
      const z = Math.sin(angle) * radius;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      coords.push([x, y, z]);
    }

    // Connect neighbouring and rank-hierarchy nodes
    const linePairs: number[] = [];
    for (let i = 0; i < coords.length; i++) {
      for (let j = i + 1; j < coords.length; j++) {
        const dx = coords[i][0] - coords[j][0];
        const dy = coords[i][1] - coords[j][1];
        const dz = coords[i][2] - coords[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 2.2) {
          linePairs.push(coords[i][0], coords[i][1], coords[i][2]);
          linePairs.push(coords[j][0], coords[j][1], coords[j][2]);
        }
      }
    }

    return {
      positions: pos,
      linePositions: new Float32Array(linePairs),
    };
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.08;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group>
      {/* Constellation Network Nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.14}
          color="#34d399"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Constellation Connective Edges */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#10b981"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

function GlassCampusBuilding() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Gentle floating idle rotation
    groupRef.current.rotation.y += delta * 0.12;

    // Cursor parallax tilt
    const targetRotX = state.pointer.y * 0.25;
    const targetRotZ = -state.pointer.x * 0.25;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.05);
  });

  return (
    <group ref={groupRef}>
      {/* Base Podium - Multi-tiered architectural grid */}
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[2.2, 2.4, 0.15, 32]} />
        <meshStandardMaterial
          color="#064e3b"
          metalness={0.8}
          roughness={0.2}
          wireframe
        />
      </mesh>

      {/* Academic Tier 1 - Main Library / Hall (Translucent Emerald Glass) */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[2.2, 0.9, 2.2]} />
        <meshPhysicalMaterial
          color="#059669"
          transparent
          opacity={0.35}
          roughness={0.1}
          metalness={0.1}
          transmission={0.8}
          ior={1.4}
        />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[2.22, 0.92, 2.22]} />
        <meshBasicMaterial
          color="#34d399"
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Tier 2 - Central Faculty Tower (Translucent Cyan Core) */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[1.5, 1.2, 1.5]} />
        <meshPhysicalMaterial
          color="#0284c7"
          transparent
          opacity={0.4}
          roughness={0.15}
          metalness={0.2}
          transmission={0.7}
          ior={1.4}
        />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[1.52, 1.22, 1.52]} />
        <meshBasicMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Tier 3 - Observatory / Spire (Modern Geometric Crown) */}
      <mesh position={[0, 1.1, 0]}>
        <octahedronGeometry args={[0.65, 0]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#059669"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.9}
          wireframe
        />
      </mesh>

      {/* Floating Orbital Core Ring */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.6, 0.02, 16, 100]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Rank Constellation Network */}
      <ConstellationGraph />
    </group>
  );
}

interface HeroCampusSceneProps {
  isVisible?: boolean;
}

export default function HeroCampusScene({ isVisible = true }: HeroCampusSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 1.8, 5.2], fov: 42 }}
      frameloop={isVisible ? 'always' : 'never'}
      dpr={[1, 2]}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      }}
      className="w-full h-full pointer-events-auto"
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#34d399" />
      <pointLight position={[-4, -2, -3]} intensity={1.2} color="#38bdf8" />
      <GlassCampusBuilding />
    </Canvas>
  );
}
