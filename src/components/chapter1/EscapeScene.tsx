'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/gameStore';

export function EscapeScene() {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();
  const { settings, setChapterStatus, addSecret } = useGameStore();

  const dialogues = [
    {
      character: 'Babaylan Tala',
      en: 'You have done it! You deciphered the message. The amulet recognizes your connection to our bloodline.',
      tl: 'Nagawa mo! Na-decipher mo ang mensahe. Kinikilala ng anting-anting ang iyong koneksyon sa ating lahi.',
    },
    {
      character: 'You',
      en: 'My grandmother... you knew her?',
      tl: 'Ang aking lola... kilala mo siya?',
    },
    {
      character: 'Babaylan Tala',
      en: 'I blessed this amulet many lifetimes ago. It has passed through generations, protecting those who carry our sacred duty.',
      tl: 'Pinagpala ko ang anting-anting na ito maraming buhay na ang nakalipas. Dumaan ito sa mga henerasyon, pinoprotektahan ang mga may dala ng ating sagradong tungkulin.',
    },
    {
      character: 'Babaylan Tala',
      en: 'But I sense a disturbance. The timeline grows unstable. You must continue your journey through time.',
      tl: 'Ngunit may nararamdaman akong gambalang. Ang timeline ay nagiging hindi matatag. Kailangan mong ipagpatuloy ang iyong paglalakbay sa panahon.',
    },
    {
      character: 'Narrator',
      en: 'The amulet begins to glow brightly, pulling you forward through the centuries...',
      tl: 'Ang anting-anting ay nagsimulang kumislap nang maliwanag, hinihila ka pasulong sa mga siglo...',
    },
  ];

  const currentDialogue = dialogues[dialogueIndex];
  const displayText = settings.language === 'tl' ? currentDialogue.tl : currentDialogue.en;

  const handleNext = () => {
    if (dialogueIndex < dialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      // Mark chapter complete and transition
      setIsTransitioning(true);
      setChapterStatus(1, 'completed');
      addSecret('babaylan-blessing');
      setChapterStatus(5, 'available');

      setTimeout(() => {
        router.push('/chapter/5');
      }, 3000);
    }
  };

  const getCharacterEmoji = (character: string) => {
    switch (character) {
      case 'Babaylan Tala':
        return '👸';
      case 'You':
        return '🧑';
      default:
        return '📜';
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6">
      {/* Background with pulsing effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-background" />

      {/* Animated amulet glow */}
      {dialogueIndex >= dialogues.length - 1 && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      )}

      {/* Transition effect */}
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 z-50 bg-gold"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3, times: [0, 0.2, 0.8, 1] }}
        >
          <div className="flex items-center justify-center h-full">
            <motion.div
              className="text-center"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 1 }}
            >
              <div className="text-8xl mb-4">⏳</div>
              <h2 className="font-display text-4xl text-background">
                {settings.language === 'tl'
                  ? 'Naglalakbay sa Panahon...'
                  : 'Traveling Through Time...'
                }
              </h2>
              <p className="font-body text-background/80 text-xl mt-4">
                1450 CE → 1986 CE
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Main dialogue */}
      <motion.div
        className="relative z-10 max-w-3xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Success badge */}
        <motion.div
          className="text-center mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-3 bg-gold/10 border-2 border-gold/50 rounded-full px-6 py-3">
            <span className="text-3xl">✓</span>
            <span className="font-display text-gold text-lg">
              {settings.language === 'tl' ? 'Puzzle Tapos Na!' : 'Puzzle Complete!'}
            </span>
          </div>
        </motion.div>

        {/* Character portrait */}
        <motion.div
          key={currentDialogue.character}
          className="w-24 h-24 mx-auto mb-6 rounded-full border-4 border-gold/50 bg-background/50 flex items-center justify-center text-5xl"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 0.5 }}
        >
          {getCharacterEmoji(currentDialogue.character)}
        </motion.div>

        {/* Dialogue box */}
        <div className="bg-background/90 backdrop-blur-md border-2 border-gold/50 rounded-xl p-6 md:p-8 mb-6">
          <p className="font-display text-gold text-sm mb-3 tracking-wide text-center">
            {currentDialogue.character.toUpperCase()}
          </p>

          <div className="font-body text-foreground text-lg leading-relaxed min-h-[100px] text-center">
            <TypeAnimation
              key={dialogueIndex}
              sequence={[displayText]}
              wrapper="span"
              speed={settings.textSpeed === 'slow' ? 40 : settings.textSpeed === 'fast' ? 80 : 60}
              cursor={false}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <div className="font-body text-brass/60 text-sm">
            {dialogueIndex + 1} / {dialogues.length}
          </div>

          <Button
            onClick={handleNext}
            variant="primary"
            glow={dialogueIndex === dialogues.length - 1}
          >
            {dialogueIndex === dialogues.length - 1
              ? settings.language === 'tl' ? 'Magpatuloy sa Susunod na Kabanata' : 'Continue to Next Chapter'
              : settings.language === 'tl' ? 'Susunod' : 'Next'
            }
          </Button>
        </div>

        {/* Chapter complete indicator */}
        {dialogueIndex === dialogues.length - 1 && (
          <motion.div
            className="mt-6 p-4 bg-purple/10 border border-purple/30 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="font-body text-purple text-sm text-center">
              {settings.language === 'tl'
                ? '📖 Kabanata 1 Tapos Na • Natutuhan mo ang Caesar Cipher'
                : '📖 Chapter 1 Complete • You learned the Caesar Cipher'
              }
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
