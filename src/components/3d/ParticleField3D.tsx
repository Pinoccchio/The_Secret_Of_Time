'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ParticleField3D() {
  const particlesRef = useRef<THREE.Points>(null);

  // Create particle geometry
  const [positions, colors] = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const goldColor = new THREE.Color('#FFD700');
    const purpleColor = new THREE.Color('#9B59B6');
    const orangeColor = new THREE.Color('#FF6B35');

    for (let i = 0; i < count; i++) {
      // Random position in a large sphere
      const radius = 20 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) - 10;
      positions[i * 3 + 2] = radius * Math.cos(phi) - 20;

      // Random color between gold, purple, and orange
      const colorChoice = Math.random();
      let color: THREE.Color;

      if (colorChoice < 0.6) {
        color = goldColor;
      } else if (colorChoice < 0.9) {
        color = purpleColor;
      } else {
        color = orangeColor;
      }

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return [positions, colors];
  }, []);

  // Animate particles
  useFrame((state) => {
    if (particlesRef.current) {
      // Slow rotation
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.02;

      // Pulse effect on particle positions
      const positions = particlesRef.current.geometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        const distance = Math.sqrt(
          positions[i] ** 2 + positions[i + 1] ** 2 + positions[i + 2] ** 2
        );

        const wave = Math.sin(state.clock.elapsedTime + distance * 0.1) * 0.1;
        positions[i + 1] += wave;
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
