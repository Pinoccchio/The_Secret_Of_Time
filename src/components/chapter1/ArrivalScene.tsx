'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';
import Image from 'next/image';

interface ArrivalSceneProps {
  onComplete: () => void;
}

interface DialogueData {
  character: string;
  characterImage?: string;
  en: string;
  tl: string;
}

export function ArrivalScene({ onComplete }: ArrivalSceneProps) {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const { settings } = useGameStore();

  const dialogues: DialogueData[] = [
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
      characterImage: '/assets/images/characters/chapter1_babaylan.png',
      en: 'You... you carry the mark of time. I have been expecting one like you.',
      tl: 'Ikaw... may dala kang marka ng panahon. Hinihintay kita.',
    },
    {
      character: 'You',
      characterImage: '/assets/images/characters/main_character.png',
      en: 'Who are you? Where am I? What\'s happening?',
      tl: 'Sino ka? Nasaan ako? Ano ang nangyayari?',
    },
    {
      character: 'Babaylan Tala',
      characterImage: '/assets/images/characters/chapter1_babaylan.png',
      en: 'I am Tala, keeper of ancient knowledge. You have traveled through time, brought here by the Agimat.',
      tl: 'Ako si Tala, tagapag-alaga ng sinaunang kaalaman. Naglakbay ka sa panahon, dinala dito ng Agimat.',
    },
    {
      character: 'Babaylan Tala',
      characterImage: '/assets/images/characters/chapter1_babaylan.png',
      en: 'But there is danger. The spirits are restless. I have written a message in code, but I fear I am being watched.',
      tl: 'Ngunit may panganib. Ang mga espiritu ay balisa. Sumulat ako ng mensahe sa code, ngunit natatakot akong binabantayan ako.',
    },
    {
      character: 'Babaylan Tala',
      characterImage: '/assets/images/characters/chapter1_babaylan.png',
      en: 'If you can decipher my message, you will learn the truth about your family\'s connection to this amulet. Are you ready?',
      tl: 'Kung matutukoy mo ang aking mensahe, malalaman mo ang katotohanan tungkol sa koneksyon ng iyong pamilya sa anting-anting na ito. Handa ka na ba?',
    },
  ];

  const currentDialogue = dialogues[dialogueIndex];
  const displayText = settings.language === 'tl' ? currentDialogue.tl : currentDialogue.en;
  const isMainCharacter = currentDialogue.character === 'You';

  // Track previous character to avoid fade animation when same character speaks
  const prevDialogue = dialogueIndex > 0 ? dialogues[dialogueIndex - 1] : null;
  const isSameCharacter = prevDialogue && prevDialogue.character === currentDialogue.character && prevDialogue.characterImage === currentDialogue.characterImage;

  const handleNext = () => {
    if (dialogueIndex < dialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Full Screen Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/backgrounds/chapter1_bg.jpg"
          alt="Pre-colonial Philippines settlement"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Chapter Title Header */}
      <motion.div
        className="absolute top-8 left-0 right-0 z-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="font-display text-gold text-sm tracking-widest mb-2 drop-shadow-lg">
          CHAPTER 1
        </h2>
        <h1 className="font-display text-2xl md:text-3xl text-foreground drop-shadow-lg">
          {settings.language === 'tl' ? 'Sa Panahon ng Ginto' : 'In the Time of Gold'}
        </h1>
        <p className="font-body text-brass text-sm md:text-base drop-shadow-lg">
          1450 CE • Manila Bay Settlement
        </p>
      </motion.div>

      {/* Character Portraits - RPG Style */}
      <AnimatePresence>
        {currentDialogue.characterImage && (
          <motion.div
            key={currentDialogue.character}
            className={`
              absolute bottom-[280px] z-40
              ${isMainCharacter ? 'left-8 md:left-16' : 'right-8 md:right-16'}
            `}
            initial={isSameCharacter ? false : {
              opacity: 0,
              x: isMainCharacter ? -100 : 100,
              y: 50
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: 0
            }}
            exit={{
              opacity: 0,
              x: isMainCharacter ? -100 : 100,
              y: 50
            }}
            transition={{
              duration: 0.5,
              ease: 'easeOut'
            }}
          >
            <div className="relative">
              {/* Character portrait - no border */}
              <div className="
                w-48 h-48 md:w-64 md:h-64
                overflow-hidden
              ">
                <img
                  src={currentDialogue.characterImage}
                  alt={currentDialogue.character}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Character name label */}
              <div className="
                absolute -bottom-2 left-1/2 -translate-x-1/2
                bg-background/95 backdrop-blur-sm
                border-2 border-gold/70
                rounded-full
                px-4 py-1
                whitespace-nowrap
              ">
                <p className="font-display text-gold text-sm">
                  {currentDialogue.character}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dialogue Box - Fixed at bottom */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="
            bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a]
            border-2 border-gold
            rounded-lg
            p-6 md:p-8
            shadow-2xl
          ">
            {/* Character name - matching Chapter 2 style */}
            <h3 className="font-display text-gold text-xl md:text-2xl mb-4">
              {currentDialogue.character.toUpperCase()}
            </h3>

            {/* Dialogue text */}
            <div className="font-body text-foreground text-base md:text-lg leading-relaxed mb-4">
              {displayText}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                {dialogues.map((_, index) => (
                  <div
                    key={index}
                    className={`
                      w-2 h-2 rounded-full
                      ${index === dialogueIndex ? 'bg-gold' : 'bg-foreground/30'}
                      ${index < dialogueIndex ? 'bg-gold/50' : ''}
                    `}
                  />
                ))}
              </div>

              <motion.button
                onClick={handleNext}
                className="
                  font-display text-gold text-sm tracking-wider
                  hover:text-gold/80 transition-colors
                  cursor-pointer
                "
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                {dialogueIndex === dialogues.length - 1
                  ? settings.language === 'tl' ? 'CLICK TO CONTINUE ▸' : 'CLICK TO CONTINUE ▸'
                  : settings.language === 'tl' ? 'CLICK TO CONTINUE ▸' : 'CLICK TO CONTINUE ▸'
                }
              </motion.button>
            </div>

            {/* Tutorial hint */}
            {dialogueIndex === dialogues.length - 1 && (
              <motion.div
                className="mt-4 p-4 bg-purple/10 border border-purple/30 rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="font-body text-purple text-sm">
                  {settings.language === 'tl'
                    ? '💡 Matututunan mo ang Caesar Cipher - isang simpleng substitution cipher kung saan ang bawat letra ay pinalitan ng ibang letra sa alphabet.'
                    : '💡 You will learn the Caesar Cipher - a simple substitution cipher where each letter is replaced by another letter in the alphabet.'
                  }
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
