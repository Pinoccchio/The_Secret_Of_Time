'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import Image from 'next/image';

interface ArrivalSceneProps {
  onComplete: () => void;
}

export function ArrivalScene({ onComplete }: ArrivalSceneProps) {
  const { settings } = useGameStore();
  const [dialogueIndex, setDialogueIndex] = useState(0);

  interface DialogueData {
    character: string;
    characterImage?: string;
    en: string;
    tl: string;
  }

  const dialogues: DialogueData[] = [
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
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter5_elder_edsa.png',
      en: 'You... I can sense the amulet\'s presence. You\'ve come from another time, haven\'t you?',
      tl: 'Ikaw... Nararamdaman ko ang presensya ng anting-anting. Galing ka sa ibang panahon, hindi ba?',
    },
    {
      character: 'You',
      characterImage: '/assets/images/characters/main_character.png',
      en: 'How do you know? Who are you?',
      tl: 'Paano mo nalaman? Sino ka?',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter5_elder_edsa.png',
      en: 'My name is Maria. I\'ve carried the amulet\'s secret my entire life, waiting for this moment.',
      tl: 'Ang pangalan ko ay Maria. Dinala ko ang lihim ng anting-anting sa buong buhay ko, naghihintay para sa sandaling ito.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter5_elder_edsa.png',
      en: 'I know you must be confused. I would be too, if I met... someone like you. But there isn\'t much time.',
      tl: 'Alam kong nalilito ka. Ako rin, kung makakilala ako ng... katulad mo. Ngunit hindi na maraming oras.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter5_elder_edsa.png',
      en: 'I have a message for you - the truth about our family, about the amulet. But I\'ve encoded it, like my ancestors taught me.',
      tl: 'May mensahe ako para sa\'yo - ang katotohanan tungkol sa ating pamilya, tungkol sa anting-anting. Ngunit naka-encode ko ito, tulad ng itinuro sa akin ng aking mga ninuno.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter5_elder_edsa.png',
      en: 'This is the Columnar Transposition Cipher - more complex than the ones before. Can you decipher it?',
      tl: 'Ito ang Columnar Transposition Cipher - mas komplikado kaysa sa mga nauna. Kaya mo bang i-decipher ito?',
    },
  ];

  const currentDialogue = dialogues[dialogueIndex];
  const displayText = settings.language === 'tl' ? currentDialogue.tl : currentDialogue.en;
  const isMainCharacter = currentDialogue?.character === 'You';

  // Track previous character to avoid fade animation when same character speaks
  const prevDialogue = dialogueIndex > 0 ? dialogues[dialogueIndex - 1] : null;
  const isSameCharacter = prevDialogue && currentDialogue && prevDialogue.character === currentDialogue.character && prevDialogue.characterImage === currentDialogue.characterImage;

  const handleNext = () => {
    if (dialogueIndex < dialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/backgrounds/chapter5_bg.jpeg"
          alt="EDSA People Power Revolution 1986"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {/* Lighter overlay for hopeful atmosphere */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Golden hope atmosphere */}
      <motion.div
        className="absolute inset-0 bg-gold/10 z-5"
        animate={{
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-start pt-12 pb-96 px-8">
        <AnimatePresence mode="wait">
          {/* Title - Only show at first dialogue */}
          {dialogueIndex === 0 && (
            <motion.div
              key="chapter5-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center mb-12"
            >
              <h1 className="font-display text-6xl md:text-8xl text-gold mb-4 drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">
                {settings.language === 'tl' ? 'Kabanata 5' : 'Chapter 5'}
              </h1>
              <h2 className="font-dramatic text-3xl md:text-4xl text-sunset mb-2">
                {settings.language === 'tl' ? 'Ang Kapangyarihan ng Bayan' : 'Power of the People'}
              </h2>
              <p className="font-body text-xl text-foreground/70">
                {settings.language === 'tl' ? 'EDSA, 1986 — People Power Revolution' : 'EDSA, 1986 — People Power Revolution'}
              </p>
            </motion.div>
          )}

          {/* Character Portraits - RPG Style */}
          {currentDialogue?.characterImage && (
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
                <div className="w-48 h-48 md:w-64 md:h-64 overflow-hidden">
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

          {/* Dialogue Box - Fixed at bottom */}
          <motion.div
            key="ch5-dialogue-box"
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
                {/* Character name */}
                <h3 className="font-display text-gold text-xl md:text-2xl mb-4">
                  {currentDialogue?.character.toUpperCase()}
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
                        key={`ch5-dialogue-dot-${index}`}
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
                    {settings.language === 'tl' ? 'CLICK TO CONTINUE ▸' : 'CLICK TO CONTINUE ▸'}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Ambient indicators - hopeful sounds */}
        <AnimatePresence>
          {dialogueIndex > 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute bottom-8 text-center w-full"
            >
              <p className="text-foreground/40 text-sm font-body">
                {settings.language === 'tl'
                  ? '🔊 Mga sigaw ng kalayaan... mga awit... mga kampana...'
                  : '🔊 Cries of freedom... songs... bells...'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
