'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';
import Image from 'next/image';

interface ThreatSceneProps {
  onComplete: () => void;
}

export function ThreatScene({ onComplete }: ThreatSceneProps) {
  const { settings } = useGameStore();
  const [phase, setPhase] = useState<'calm' | 'burst' | 'urgent' | 'ready'>('calm');
  const [dialogueIndex, setDialogueIndex] = useState(0);

  useEffect(() => {
    // Auto-progress to burst
    const timer = setTimeout(() => {
      setPhase('burst');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  interface DialogueData {
    character: string;
    characterImage?: string;
    en: string;
    tl: string;
  }

  const urgentDialogues: DialogueData[] = [
    {
      character: 'Messenger',
      characterImage: '/assets/images/characters/chapter2_messenger.png',
      en: "Guardia Civil! They know the location! They're coming!",
      tl: "Guardia Civil! Alam nila ang lokasyon! Paparating na!",
    },
    {
      character: 'Andrés Bonifacio',
      characterImage: '/assets/images/characters/chapter2_bonifacio.png',
      en: "No time. You need to decipher it now. That message... is important for the Philippines' future.",
      tl: "Walang oras. Kailangan mong decipher yan ngayon. Ang mensahe na yan... mahalaga sa kinabukasan ng Pilipinas.",
    },
    {
      character: 'Andrés Bonifacio',
      characterImage: '/assets/images/characters/chapter2_bonifacio.png',
      en: "FREEDOM is the key. Not just to the code. To everything.",
      tl: "Ang KALAYAAN ang susi. Hindi lang sa code. Sa lahat.",
    },
    {
      character: 'Babaylan',
      characterImage: '/assets/images/characters/chapter2_healer.png',
      en: "Your grandmother knows about this. This is what she left here when she visited.",
      tl: "Alam ng iyong lola ang tungkol dito. Ito ang kanyang iniwan dito noong siya ay bumisita.",
    },
    {
      character: 'Andrés Bonifacio',
      characterImage: '/assets/images/characters/chapter2_bonifacio.png',
      en: "Quick! Decipher it! When you finish, the amulet will take you to safety!",
      tl: "Mabilis! Decipher it! Kapag natapos mo, dadalhin ka ng amulet sa ligtas na lugar!",
    },
  ];

  const currentDialogue = urgentDialogues[dialogueIndex];
  const displayText = currentDialogue ? (settings.language === 'tl' ? currentDialogue.tl : currentDialogue.en) : '';
  const isMainCharacter = currentDialogue?.character === 'You';

  // Track previous character to avoid fade animation when same character speaks
  const prevDialogue = dialogueIndex > 0 ? urgentDialogues[dialogueIndex - 1] : null;
  const isSameCharacter = prevDialogue && currentDialogue && prevDialogue.character === currentDialogue.character && prevDialogue.characterImage === currentDialogue.characterImage;

  const handleNext = () => {
    if (dialogueIndex < urgentDialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      setPhase('ready');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/backgrounds/chapter2_bg.png"
          alt="Katipunan secret meeting 1896"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Red Alert Background */}
      <motion.div
        className="absolute inset-0 bg-red-600/20 z-5"
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-start pt-12 pb-96 px-8">

        {/* Calm moment */}
        <AnimatePresence mode="wait">
          {phase === 'calm' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <p className="font-body text-2xl text-foreground/70">
                  {settings.language === 'tl'
                    ? 'Bonifacio ay naghahandog ng isang papel...'
                    : 'Bonifacio is handing you a paper...'}
                </p>
              </motion.div>
            </div>
          )}

          {/* Door burst */}
          {phase === 'burst' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 10 }}
                className="text-center"
              >
              <motion.div
                className="text-9xl mb-6"
                animate={{
                  rotate: [0, -10, 10, -10, 0],
                }}
                transition={{
                  duration: 0.5,
                  times: [0, 0.25, 0.5, 0.75, 1],
                }}
              >
                🚪
              </motion.div>

              <motion.h2
                className="font-display text-6xl text-red-500 mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {settings.language === 'tl' ? '¡SUMIKLAB!' : 'BURST!'}
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  onClick={() => {
                    setPhase('urgent');
                    setDialogueIndex(0);
                  }}
                  variant="primary"
                >
                  {settings.language === 'tl' ? 'Ano ang nangyari?!' : "What's happening?!"}
                </Button>
              </motion.div>
            </motion.div>
            </div>
          )}

          {/* Urgent dialogue - RPG style */}
          {phase === 'urgent' && (
            <div className="w-full">
              {/* Character Portraits - RPG Style */}
              <AnimatePresence>
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
                        {urgentDialogues.map((_, index) => (
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

          {/* Ready for cipher */}
          {phase === 'ready' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-2xl"
              >
              <div className="bg-background/90 backdrop-blur-md border-2 border-red-500/50 rounded-xl p-8 mb-8">
                <h3 className="font-dramatic text-4xl text-sunset mb-4">
                  {settings.language === 'tl' ? '¡Peligro!' : 'Danger!'}
                </h3>

                <p className="font-body text-lg text-foreground/90 mb-6">
                  {settings.language === 'tl'
                    ? 'Ang mga Guardia Civil ay paparating! Maririnig mo na ang kanilang mga hakbang sa labas. Kailangan mong i-decipher ang mensahe NGAYON bago sila makarating!'
                    : "The Guardia Civil are coming! You can hear their boots outside. You need to decipher the message NOW before they arrive!"}
                </p>

                <motion.div
                  className="text-red-500 font-body text-sm mb-6"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {settings.language === 'tl' ? '⚠️ Peligro! Mabilis!' : '⚠️ Danger! Hurry!'}
                </motion.div>

                <Button
                  onClick={() => {
                    setTimeout(onComplete, 300);
                  }}
                  variant="primary"
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  {settings.language === 'tl' ? 'Decipher ang Mensahe!' : 'Decipher the Message!'}
                </Button>
              </div>
            </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Sound effects indicators */}
        <AnimatePresence>
          {(phase === 'urgent' || phase === 'ready') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
            >
              <p className="text-foreground/40 text-sm font-body mb-2">
                {settings.language === 'tl' ? '🔊 Mga hakbang... yabag ng mga sundalo...' : '🔊 Footsteps... soldiers marching...'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
