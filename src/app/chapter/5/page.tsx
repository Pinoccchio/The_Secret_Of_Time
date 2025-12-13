'use client';

import { useState, useEffect } from 'react';
import { ArrivalScene } from '@/components/chapter5/ArrivalScene';
import { CipherPuzzle } from '@/components/chapter5/CipherPuzzle';
import { RevelationScene } from '@/components/chapter5/RevelationScene';

type Chapter5Scene = 'arrival' | 'puzzle' | 'revelation';

export default function Chapter5Page() {
  const [currentScene, setCurrentScene] = useState<Chapter5Scene>('arrival');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-background-gradient-end to-background">
      {currentScene === 'arrival' && (
        <ArrivalScene onComplete={() => setCurrentScene('puzzle')} />
      )}

      {currentScene === 'puzzle' && (
        <CipherPuzzle onComplete={() => setCurrentScene('revelation')} />
      )}

      {currentScene === 'revelation' && (
        <RevelationScene />
      )}
    </main>
  );
}
