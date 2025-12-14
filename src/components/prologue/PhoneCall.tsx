'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';
import Image from 'next/image';

interface PhoneCallProps {
  onComplete: () => void;
}

interface DialogueData {
  character: string;
  characterImage?: string;
  en: string;
  tl: string;
}

export function PhoneCall({ onComplete }: PhoneCallProps) {
  const [isRinging, setIsRinging] = useState(true);
  const [callAnswered, setCallAnswered] = useState(false);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showChoices, setShowChoices] = useState(false);

  const { settings, addChoice } = useGameStore();

  const dialogues: DialogueData[] = [
    {
      character: 'Lola Maria',
      characterImage: '/assets/images/characters/lola_maria.png',
      en: 'Apo... is that you?',
      tl: 'Apo... ikaw ba iyan?',
    },
    {
      character: 'Lola Maria',
      characterImage: '/assets/images/characters/lola_maria.png',
      en: 'I need you to come home. There\'s something important I must give you before... before it\'s too late.',
      tl: 'Kailangan mong umuwi. May importante akong ibibigay sa\'yo bago... bago huli na ang lahat.',
    },
    {
      character: 'Lola Maria',
      characterImage: '/assets/images/characters/lola_maria.png',
      en: 'It\'s about our family\'s secret. The one I\'ve been keeping all these years.',
      tl: 'Tungkol ito sa lihim ng ating pamilya. Ang lihim na matagal ko nang itinago.',
    },
    {
      character: 'Lola Maria',
      characterImage: '/assets/images/characters/lola_maria.png',
      en: 'Please, come to the ancestral house. Look for the old baúl in my room.',
      tl: 'Pakiusap, pumunta ka sa lumang bahay. Hanapin mo ang lumang baúl sa aking silid.',
    },
  ];

  useEffect(() => {
    // Phone rings for 3 seconds
    const ringTimer = setTimeout(() => {
      setIsRinging(false);
    }, 3000);

    return () => clearTimeout(ringTimer);
  }, []);

  const handleAnswerCall = () => {
    setCallAnswered(true);
  };

  const handleNext = () => {
    if (dialogueIndex < dialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      setShowChoices(true);
    }
  };

  const handleChoice = (choice: 'now' | 'morning') => {
    addChoice('prologue-timing', choice);
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  const currentDialogue = dialogues[dialogueIndex];
  const displayText = settings.language === 'tl' ? currentDialogue.tl : currentDialogue.en;

  // Track previous character for persistence logic
  const prevDialogue = dialogueIndex > 0 ? dialogues[dialogueIndex - 1] : null;
  const isSameCharacter = prevDialogue && currentDialogue &&
    prevDialogue.character === currentDialogue.character &&
    prevDialogue.characterImage === currentDialogue.characterImage;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/backgrounds/prologue_bg.jpg"
          alt="Phone call scene"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <AnimatePresence mode="wait">
        {/* Phone Ringing Animation */}
        {isRinging && !callAnswered && (
          <motion.div
            key="ringing"
            className="relative z-10 min-h-screen flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="text-center">
              <motion.div
                className="w-32 h-32 mx-auto mb-8 relative"
                animate={{
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.05, 1, 1.05, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className="absolute inset-0 bg-gold rounded-full opacity-20 animate-ping" />
                <svg
                  className="w-full h-full text-gold"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                </svg>
              </motion.div>

              <motion.h2
                className="font-display text-3xl text-gold mb-4 drop-shadow-[0_2px_8px_rgba(212,175,55,0.9)]"
                style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.9)' }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {settings.language === 'tl' ? 'Tumatawag' : 'Incoming Call'}
              </motion.h2>

              <p className="font-body text-white text-xl mb-8" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
                Lola Maria
              </p>

              <Button
                onClick={handleAnswerCall}
                variant="primary"
                size="lg"
                glow={true}
              >
                {settings.language === 'tl' ? 'Sagutin' : 'Answer Call'}
              </Button>
            </div>
          </motion.div>
        )}

        {/* RPG Dialogue Scene */}
        {callAnswered && !showChoices && (
          <div className="relative z-10 min-h-screen flex flex-col items-center justify-start pt-12 pb-96 px-8">
            <AnimatePresence>
              {/* Character Portrait - RPG Style */}
              {currentDialogue?.characterImage && (
                <motion.div
                  key={currentDialogue.character}
                  className="absolute bottom-[280px] right-8 md:right-16 z-40"
                  initial={isSameCharacter ? false : {
                    opacity: 0,
                    x: 100,
                    y: 50
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    y: 0
                  }}
                  exit={{
                    opacity: 0,
                    x: 100,
                    y: 50
                  }}
                  transition={{
                    duration: 0.5,
                    ease: 'easeOut'
                  }}
                >
                  <div className="relative">
                    {/* Character portrait */}
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
                      {settings.language === 'tl' ? 'CLICK TO CONTINUE ▸' : 'CLICK TO CONTINUE ▸'}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Choice Menu */}
        {showChoices && (
          <motion.div
            key="choices"
            className="relative z-10 min-h-screen flex items-center justify-center px-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="max-w-2xl w-full">
              <div className="bg-background/90 backdrop-blur-md border-2 border-gold/50 rounded-xl p-8 mb-8">
                <h2 className="font-display text-3xl text-gold mb-4 text-center drop-shadow-[0_2px_8px_rgba(212,175,55,0.9)]" style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.9)' }}>
                  {settings.language === 'tl' ? 'Ano ang Gagawin Mo?' : 'What Will You Do?'}
                </h2>

                <p className="font-body text-white text-lg mb-8 text-center" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
                  {settings.language === 'tl'
                    ? 'Nag-aalala ang iyong lola. Tila importante ito.'
                    : 'Your lola sounds worried. This must be important.'
                  }
                </p>

                <div className="space-y-4">
                  <Button
                    onClick={() => handleChoice('now')}
                    variant="primary"
                    size="lg"
                    glow={true}
                    className="w-full"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      {settings.language === 'tl' ? 'Pumunta sa lumang bahay ngayon' : 'Go to the ancestral house now'}
                    </span>
                  </Button>

                  <Button
                    onClick={() => handleChoice('morning')}
                    variant="secondary"
                    size="lg"
                    className="w-full"
                  >
                    {settings.language === 'tl' ? 'Maghintay hanggang umaga' : 'Wait until morning'}
                  </Button>
                </div>
              </div>

              <p className="font-body text-brass text-sm text-center italic" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                {settings.language === 'tl'
                  ? '"Ang mga desisyon ay may kaakibat na kahihinatnan..."'
                  : '"Every choice has consequences..."'
                }
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
