'use client';

import { useState, useEffect } from 'react';
import { ArrivalScene } from '@/components/chapter2/ArrivalScene';
import { ThreatScene } from '@/components/chapter2/ThreatScene';
import { CipherPuzzle } from '@/components/chapter2/CipherPuzzle';
import { EscapeScene } from '@/components/chapter2/EscapeScene';

type SceneType = 'arrival' | 'threat' | 'puzzle' | 'escape';

export default function Chapter2Page() {
  const [currentScene, setCurrentScene] = useState<SceneType>('arrival');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-gold font-display text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-background">
      {currentScene === 'arrival' && (
        <ArrivalScene onComplete={() => setCurrentScene('threat')} />
      )}
      {currentScene === 'threat' && (
        <ThreatScene onComplete={() => setCurrentScene('puzzle')} />
      )}
      {currentScene === 'puzzle' && (
        <CipherPuzzle onComplete={() => setCurrentScene('escape')} />
      )}
      {currentScene === 'escape' && (
        <EscapeScene onComplete={() => {}} />
      )}
    </main>
  );
}
