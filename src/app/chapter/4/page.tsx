'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/gameStore';
import { ArrivalScene } from '@/components/chapter4/ArrivalScene';
import { ThreatScene } from '@/components/chapter4/ThreatScene';
import { CipherPuzzle } from '@/components/chapter4/CipherPuzzle';
import { EscapeScene } from '@/components/chapter4/EscapeScene';

type SceneType = 'arrival' | 'threat' | 'puzzle' | 'escape';

export default function Chapter4Page() {
  const router = useRouter();
  const { chapters } = useGameStore();
  const [currentScene, setCurrentScene] = useState<SceneType>('arrival');

  // Check if chapter is available
  useEffect(() => {
    const chapter4 = chapters.find((c) => c.id === 4);
    if (!chapter4 || chapter4.status === 'locked') {
      router.push('/');
    }
  }, [chapters, router]);

  return (
    <main className="relative min-h-screen bg-background">
      {currentScene === 'arrival' && <ArrivalScene onComplete={() => setCurrentScene('threat')} />}
      {currentScene === 'threat' && <ThreatScene onComplete={() => setCurrentScene('puzzle')} />}
      {currentScene === 'puzzle' && <CipherPuzzle onComplete={() => setCurrentScene('escape')} />}
      {currentScene === 'escape' && <EscapeScene onComplete={() => {}} />}
    </main>
  );
}
