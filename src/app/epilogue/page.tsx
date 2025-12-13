'use client';

import { useState, useEffect } from 'react';
import { ChoiceScene } from '@/components/epilogue/ChoiceScene';
import { EndingA } from '@/components/epilogue/EndingA';
import { EndingB } from '@/components/epilogue/EndingB';
import { PostCredits } from '@/components/epilogue/PostCredits';
import { useGameStore } from '@/store/gameStore';

type EpilogueScene = 'choice' | 'ending-a' | 'ending-b' | 'post-credits';

export default function EpiloguePage() {
  const [currentScene, setCurrentScene] = useState<EpilogueScene>('choice');
  const [mounted, setMounted] = useState(false);
  const [selectedEnding, setSelectedEnding] = useState<'share' | 'protect' | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleChoice = (choice: 'share' | 'protect') => {
    setSelectedEnding(choice);
    if (choice === 'share') {
      setCurrentScene('ending-a');
    } else {
      setCurrentScene('ending-b');
    }
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-background-gradient-end to-background">
      {currentScene === 'choice' && (
        <ChoiceScene onChoice={handleChoice} />
      )}

      {currentScene === 'ending-a' && (
        <EndingA onComplete={() => setCurrentScene('post-credits')} />
      )}

      {currentScene === 'ending-b' && (
        <EndingB onComplete={() => setCurrentScene('post-credits')} />
      )}

      {currentScene === 'post-credits' && (
        <PostCredits ending={selectedEnding!} />
      )}
    </main>
  );
}
