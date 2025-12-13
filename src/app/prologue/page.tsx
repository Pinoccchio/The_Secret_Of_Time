'use client';

import { useState, useEffect } from 'react';
import { PhoneCall } from '@/components/prologue/PhoneCall';
import { AncestralHouse } from '@/components/prologue/AncestralHouse';
import { LetterReveal } from '@/components/prologue/LetterReveal';
import { TimeTravel } from '@/components/prologue/TimeTravel';
import { useGameStore } from '@/store/gameStore';

type PrologueScene = 'phone-call' | 'ancestral-house' | 'letter-reveal' | 'time-travel';

export default function ProloguePage() {
  const [currentScene, setCurrentScene] = useState<PrologueScene>('phone-call');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSceneComplete = (nextScene: PrologueScene) => {
    setCurrentScene(nextScene);
  };

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {currentScene === 'phone-call' && (
        <PhoneCall onComplete={() => handleSceneComplete('ancestral-house')} />
      )}

      {currentScene === 'ancestral-house' && (
        <AncestralHouse onComplete={() => handleSceneComplete('letter-reveal')} />
      )}

      {currentScene === 'letter-reveal' && (
        <LetterReveal onComplete={() => handleSceneComplete('time-travel')} />
      )}

      {currentScene === 'time-travel' && (
        <TimeTravel />
      )}
    </main>
  );
}
