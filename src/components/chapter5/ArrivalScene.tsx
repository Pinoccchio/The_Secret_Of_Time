'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Button } from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';

interface ArrivalSceneProps {
  onComplete: () => void;
}

export function ArrivalScene({ onComplete }: ArrivalSceneProps) {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const { settings } = useGameStore();

  const dialogues = [
    {
      character: 'Narrator',
      en: 'February 25, 1986. EDSA, Manila. The People Power Revolution is at its peak.',
      tl: 'Pebrero 25, 1986. EDSA, Manila. Ang People Power Revolution ay nasa rurok nito.',
    },
    {
      character: 'Narrator',
      en: 'Thousands fill the streets, united in peaceful protest. Yellow ribbons flutter in the wind. The air is electric with hope.',
      tl: 'Libu-libong tao ang pumuno sa kalye, nagkakaisa sa mapayapang protesta. Ang dilaw na mga laso ay lumilipad sa hangin. Ang hangin ay puno ng pag-asa.',
    },
    {
      character: 'Narrator',
      en: 'Among the crowd, you see a woman in her 60s, holding a sign. Something about her seems familiar...',
      tl: 'Sa gitna ng pulutong, nakita mo ang isang babae na 60 years old na, may hawak na karatula. May kakaiba sa kanya...',
    },
    {
      character: 'Maria (60 years old)',
      en: 'You... I can sense the amulet\'s presence. You\'ve come from another time, haven\'t you?',
      tl: 'Ikaw... Nararamdaman ko ang presensya ng anting-anting. Galing ka sa ibang panahon, hindi ba?',
    },
    {
      character: 'You',
      en: 'How do you know? Who are you?',
      tl: 'Paano mo nalaman? Sino ka?',
    },
    {
      character: 'Maria (60 years old)',
      en: 'My name is Maria. I\'ve carried the amulet\'s secret my entire life, waiting for this moment.',
      tl: 'Ang pangalan ko ay Maria. Dinala ko ang lihim ng anting-anting sa buong buhay ko, naghihintay para sa sandaling ito.',
    },
    {
      character: 'Maria (60 years old)',
      en: 'I know you must be confused. I would be too, if I met... someone like you. But there isn\'t much time.',
      tl: 'Alam kong nalilito ka. Ako rin, kung makakilala ako ng... katulad mo. Ngunit hindi na maraming oras.',
    },
    {
      character: 'Maria (60 years old)',
      en: 'I have a message for you - the truth about our family, about the amulet. But I\'ve encoded it, like my ancestors taught me.',
      tl: 'May mensahe ako para sa\'yo - ang katotohanan tungkol sa ating pamilya, tungkol sa anting-anting. Ngunit naka-encode ko ito, tulad ng itinuro sa akin ng aking mga ninuno.',
    },
    {
      character: 'Maria (60 years old)',
      en: 'This is the Columnar Transposition Cipher - more complex than the ones before. Can you decipher it?',
      tl: 'Ito ang Columnar Transposition Cipher - mas komplikado kaysa sa mga nauna. Kaya mo bang i-decipher ito?',
    },
  ];

  const currentDialogue = dialogues[dialogueIndex];
  const displayText = settings.language === 'tl' ? currentDialogue.tl : currentDialogue.en;

  const handleNext = () => {
    if (dialogueIndex < dialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      onComplete();
    }
  };

  const getCharacterEmoji = (character: string) => {
    if (character.includes('Maria')) return '👵';
    if (character === 'You') return '🧑';
    return '📜';
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6">
      {/* Background - EDSA atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFD700]/10 via-background to-background opacity-90" />

      {/* Animated protest atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gold/20 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 20}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-3xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Location indicator */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="font-display text-gold text-sm tracking-widest mb-2">
            CHAPTER 5
          </h2>
          <h1 className="font-display text-3xl md:text-4xl text-foreground mb-2">
            {settings.language === 'tl' ? 'Ang Kapangyarihan ng Bayan' : 'Power of the People'}
          </h1>
          <p className="font-body text-brass text-lg">
            1986 CE • EDSA, Manila
          </p>
        </motion.div>

        {/* Character portrait */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDialogue.character}
            className="w-24 h-24 mx-auto mb-6 rounded-full border-4 border-gold/50 bg-background/50 flex items-center justify-center text-5xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', duration: 0.5 }}
          >
            {getCharacterEmoji(currentDialogue.character)}
          </motion.div>
        </AnimatePresence>

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
              ? settings.language === 'tl' ? 'Magpatuloy sa Puzzle' : 'Continue to Puzzle'
              : settings.language === 'tl' ? 'Susunod' : 'Next'
            }
          </Button>
        </div>

        {/* Tutorial hint */}
        {dialogueIndex === dialogues.length - 1 && (
          <motion.div
            className="mt-6 p-4 bg-purple/10 border border-purple/30 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="font-body text-purple text-sm text-center">
              {settings.language === 'tl'
                ? '💡 Ang Columnar Transposition Cipher ay gumagamit ng isang keyword upang ayusin ang mga column ng isang grid. Mas advanced ito kaysa Caesar Cipher!'
                : '💡 The Columnar Transposition Cipher uses a keyword to arrange the columns of a grid. It\'s more advanced than the Caesar Cipher!'
              }
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
