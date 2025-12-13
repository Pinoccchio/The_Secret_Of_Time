'use client';

import { useState, useEffect } from 'react';
import { ArrivalScene } from '@/components/chapter1/ArrivalScene';
import { CipherPuzzle } from '@/components/chapter1/CipherPuzzle';
import { EscapeScene } from '@/components/chapter1/EscapeScene';
import { useGameStore } from '@/store/gameStore';

type Chapter1Scene = 'arrival' | 'puzzle' | 'escape';

export default function Chapter1Page() {
  const [currentScene, setCurrentScene] = useState<Chapter1Scene>('arrival');
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
        <CipherPuzzle onComplete={() => setCurrentScene('escape')} />
      )}

      {currentScene === 'escape' && (
        <EscapeScene />
      )}
    </main>
  );
}
