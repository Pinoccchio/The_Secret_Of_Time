'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import { Amulet3D } from './Amulet3D';

interface AmuletSceneProps {
  className?: string;
  interactive?: boolean;
}

export function AmuletScene({ className = '', interactive = true }: AmuletSceneProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} />
        <pointLight position={[0, 5, 0]} intensity={0.5} color="#FFD700" />

        {/* The 3D Amulet */}
        <Suspense fallback={null}>
          <Amulet3D scale={1} rotationSpeed={0.5} />
        </Suspense>

        {/* Interactive controls */}
        {interactive && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        )}
      </Canvas>
    </div>
  );
}
