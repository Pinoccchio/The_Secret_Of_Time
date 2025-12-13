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
      en: 'You open your eyes. The world around you is unfamiliar yet strangely beautiful.',
      tl: 'Dumilat ka. Ang mundo sa paligid mo ay hindi pamilyar ngunit kakaibang maganda.',
    },
    {
      character: 'Narrator',
      en: '1450 CE. Pre-colonial Philippines. A settlement thrives along the shores of what will one day be called Manila Bay.',
      tl: '1450 CE. Pre-kolonyal na Pilipinas. Isang pamayanan ang umuunlad sa tabing-dagat ng magiging Manila Bay balang araw.',
    },
    {
      character: 'Narrator',
      en: 'People in traditional clothing move about their daily tasks. Then you see her - a woman in white robes, adorned with gold jewelry. A babaylan.',
      tl: 'Mga tao sa tradisyonal na kasuotan ang gumagalaw sa kanilang pang-araw-araw na gawain. Nakita mo siya - isang babae sa puting damit, may suot na gintong alahas. Isang babaylan.',
    },
    {
      character: 'Babaylan Tala',
      en: 'You... you carry the mark of time. I have been expecting one like you.',
      tl: 'Ikaw... may dala kang marka ng panahon. Hinihintay kita.',
    },
    {
      character: 'You',
      en: 'Who are you? Where am I? What\'s happening?',
      tl: 'Sino ka? Nasaan ako? Ano ang nangyayari?',
    },
    {
      character: 'Babaylan Tala',
      en: 'I am Tala, keeper of ancient knowledge. You have traveled through time, brought here by the Agimat.',
      tl: 'Ako si Tala, tagapag-alaga ng sinaunang kaalaman. Naglakbay ka sa panahon, dinala dito ng Agimat.',
    },
    {
      character: 'Babaylan Tala',
      en: 'But there is danger. The spirits are restless. I have written a message in code, but I fear I am being watched.',
      tl: 'Ngunit may panganib. Ang mga espiritu ay balisa. Sumulat ako ng mensahe sa code, ngunit natatakot akong binabantayan ako.',
    },
    {
      character: 'Babaylan Tala',
      en: 'If you can decipher my message, you will learn the truth about your family\'s connection to this amulet. Are you ready?',
      tl: 'Kung matutukoy mo ang aking mensahe, malalaman mo ang katotohanan tungkol sa koneksyon ng iyong pamilya sa anting-anting na ito. Handa ka na ba?',
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
      {/* Background atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-background opacity-90" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-gold/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-40 right-40 w-40 h-40 bg-sunset/10 rounded-full blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      {/* Main dialogue box */}
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
            CHAPTER 1
          </h2>
          <h1 className="font-display text-3xl md:text-4xl text-foreground mb-2">
            {settings.language === 'tl' ? 'Sa Panahon ng Ginto' : 'In the Time of Gold'}
          </h1>
          <p className="font-body text-brass text-lg">
            1450 CE • Manila Bay Settlement
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

        {/* Dialogue content */}
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
                ? '💡 Matututunan mo ang Caesar Cipher - isang simpleng substitution cipher kung saan ang bawat letra ay pinalitan ng ibang letra sa alphabet.'
                : '💡 You will learn the Caesar Cipher - a simple substitution cipher where each letter is replaced by another letter in the alphabet.'
              }
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
