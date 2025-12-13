'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Amulet3DProps {
  scale?: number;
  rotationSpeed?: number;
}

export function Amulet3D({ scale = 1, rotationSpeed = 0.5 }: Amulet3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const mainDiscRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Create particles around the amulet
  const particles = useMemo(() => {
    const count = 50;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 3.5 + Math.random() * 0.5;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    return geometry;
  }, []);

  // Animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.005 * rotationSpeed;
    }

    if (mainDiscRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
      mainDiscRef.current.scale.setScalar(1 + pulse);
    }

    if (glowRef.current) {
      const glowPulse = Math.sin(state.clock.elapsedTime * 2) * 0.3 + 0.7;
      glowRef.current.material.opacity = glowPulse * 0.15;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.z -= 0.003;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Outer Glow Ring */}
      <mesh ref={glowRef}>
        <ringGeometry args={[2.8, 3.2, 64]} />
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Main Amulet Disc - Thin and wide like a medallion */}
      <mesh ref={mainDiscRef}>
        <cylinderGeometry args={[2.5, 2.5, 0.15, 64]} />
        <meshStandardMaterial
          color="#FFD700"
          metalness={0.95}
          roughness={0.15}
          emissive="#FF8C00"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Outer decorative ring with segments */}
      <mesh>
        <torusGeometry args={[2.3, 0.08, 16, 64]} />
        <meshStandardMaterial
          color="#C9A961"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Middle decorative ring */}
      <mesh>
        <torusGeometry args={[1.6, 0.1, 16, 64]} />
        <meshStandardMaterial
          color="#DAA520"
          metalness={0.85}
          roughness={0.25}
          emissive="#9B59B6"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Inner ring */}
      <mesh>
        <torusGeometry args={[0.9, 0.12, 16, 64]} />
        <meshStandardMaterial
          color="#B8860B"
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Center sun symbol */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.05, 32]} />
        <meshStandardMaterial
          color="#FFA500"
          metalness={0.8}
          roughness={0.1}
          emissive="#FFD700"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Sun rays around center */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 0.7;
        const z = Math.sin(angle) * 0.7;
        return (
          <mesh
            key={i}
            position={[x, 0.08, z]}
            rotation={[0, angle, 0]}
          >
            <boxGeometry args={[0.15, 0.05, 0.4]} />
            <meshStandardMaterial
              color="#FFD700"
              metalness={0.9}
              roughness={0.1}
              emissive="#FF6B35"
              emissiveIntensity={0.4}
            />
          </mesh>
        );
      })}

      {/* Decorative dots around outer ring */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const x = Math.cos(angle) * 2.0;
        const z = Math.sin(angle) * 2.0;
        return (
          <mesh key={`dot-${i}`} position={[x, 0, z]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color="#8B4513"
              metalness={0.7}
              roughness={0.3}
              emissive="#C9A961"
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}

      {/* Orbiting particles */}
      <points ref={particlesRef} geometry={particles}>
        <pointsMaterial
          size={0.08}
          color="#FFD700"
          transparent
          opacity={0.7}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Lights */}
      <pointLight position={[0, 2, 0]} intensity={0.8} color="#FFD700" distance={8} />
      <pointLight position={[0, -1, 0]} intensity={0.4} color="#9B59B6" distance={6} />
    </group>
  );
}
