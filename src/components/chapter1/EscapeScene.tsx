'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/gameStore';
import Image from 'next/image';

export function EscapeScene() {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();
  const { settings, setChapterStatus, addSecret } = useGameStore();

  interface DialogueData {
    character: string;
    characterImage?: string;
    en: string;
    tl: string;
  }

  const dialogues: DialogueData[] = [
    {
      character: 'Babaylan Tala',
      characterImage: '/assets/images/characters/chapter1_babaylan.png',
      en: 'You have done it! You deciphered the message. The amulet recognizes your connection to our bloodline.',
      tl: 'Nagawa mo! Na-decipher mo ang mensahe. Kinikilala ng anting-anting ang iyong koneksyon sa ating lahi.',
    },
    {
      character: 'You',
      characterImage: '/assets/images/characters/main_character.png',
      en: 'My grandmother... you knew her?',
      tl: 'Ang aking lola... kilala mo siya?',
    },
    {
      character: 'Babaylan Tala',
      characterImage: '/assets/images/characters/chapter1_babaylan.png',
      en: 'I blessed this amulet many lifetimes ago. It has passed through generations, protecting those who carry our sacred duty.',
      tl: 'Pinagpala ko ang anting-anting na ito maraming buhay na ang nakalipas. Dumaan ito sa mga henerasyon, pinoprotektahan ang mga may dala ng ating sagradong tungkulin.',
    },
    {
      character: 'Babaylan Tala',
      characterImage: '/assets/images/characters/chapter1_babaylan.png',
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
  const isMainCharacter = currentDialogue.character === 'You';

  // Track previous character to avoid fade animation when same character speaks
  const prevDialogue = dialogueIndex > 0 ? dialogues[dialogueIndex - 1] : null;
  const isSameCharacter = prevDialogue && prevDialogue.character === currentDialogue.character && prevDialogue.characterImage === currentDialogue.characterImage;

  const handleNext = () => {
    if (dialogueIndex < dialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      // Mark chapter complete and transition
      setIsTransitioning(true);
      setChapterStatus(1, 'completed');
      addSecret('babaylan-blessing');
      setChapterStatus(2, 'available');

      setTimeout(() => {
        router.push('/chapter/2');
      }, 3000);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image - Same as dialogue scene */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/backgrounds/chapter1_bg.jpg"
          alt="Pre-colonial Philippines settlement"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Success Badge - Top Center */}
      <motion.div
        className="absolute top-8 left-0 right-0 z-10 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <div className="inline-flex items-center gap-3 bg-gold/10 border-2 border-gold rounded-full px-6 py-3">
          <span className="text-3xl">✓</span>
          <span className="font-display text-gold text-lg">
            {settings.language === 'tl' ? 'PUZZLE TAPOS NA!' : 'PUZZLE COMPLETE!'}
          </span>
        </div>
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

            {/* Chapter complete indicator */}
            {dialogueIndex === dialogues.length - 1 && (
              <motion.div
                className="mt-4 p-4 bg-purple/10 border border-purple/30 rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="font-body text-purple text-sm">
                  {settings.language === 'tl'
                    ? '📖 Kabanata 1 Tapos Na • Natutuhan mo ang Caesar Cipher'
                    : '📖 Chapter 1 Complete • You learned the Caesar Cipher'
                  }
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Animated amulet glow effect */}
      {dialogueIndex >= dialogues.length - 1 && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-5"
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

      {/* Galaxy Time Travel Transition */}
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Star field - multiple layers for depth */}
          <div className="absolute inset-0">
            {[...Array(100)].map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute bg-white rounded-full"
                style={{
                  width: Math.random() * 3 + 1 + 'px',
                  height: Math.random() * 3 + 1 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0.8, 1],
                  scale: [0, 1, 0.8, 1],
                }}
                transition={{
                  duration: Math.random() * 2 + 1,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Nebula clouds */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 30% 50%, rgba(138, 43, 226, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(255, 107, 53, 0.2) 0%, transparent 50%)',
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />

          {/* Swirling particles - multiple spiral arms */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => {
              const angle = (i / 50) * Math.PI * 4;
              const radius = (i / 50) * 600;
              return (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-1 h-1 bg-gold rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                    boxShadow: '0 0 6px rgba(255, 215, 0, 0.8)',
                  }}
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 0,
                  }}
                  animate={{
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    delay: i * 0.02,
                    ease: 'easeOut',
                  }}
                />
              );
            })}
          </div>

          {/* Streaking stars / light speed effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => {
              const startX = Math.random() * 100;
              const startY = Math.random() * 100;
              return (
                <motion.div
                  key={`streak-${i}`}
                  className="absolute h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
                  style={{
                    left: startX + '%',
                    top: startY + '%',
                    width: '100px',
                    transformOrigin: 'left center',
                    rotate: '45deg',
                  }}
                  initial={{
                    scaleX: 0,
                    opacity: 0,
                  }}
                  animate={{
                    scaleX: [0, 1, 0],
                    opacity: [0, 1, 0],
                    x: [0, 200],
                    y: [0, 200],
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.15,
                    ease: 'easeIn',
                  }}
                />
              );
            })}
          </div>

          {/* Center vortex tunnel */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, transparent 20%, rgba(138, 43, 226, 0.4) 40%, rgba(0,0,0,0.9) 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              ease: 'linear',
              repeat: Infinity,
            }}
          />

          {/* Center content */}
          <div className="relative z-10 text-center px-6">
            <motion.h2
              className="font-display text-5xl md:text-7xl text-gold mb-6 drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
            >
              {settings.language === 'tl'
                ? 'Naglalakbay sa Panahon'
                : 'Traveling Through Time'
              }
            </motion.h2>

            <motion.div
              className="flex items-center justify-center gap-6 text-foreground text-3xl md:text-4xl font-display mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <span className="text-brass">1450 CE</span>
              <motion.span
                className="text-gold"
                animate={{
                  x: [0, 15, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ⟶
              </motion.span>
              <span className="text-purple">1896 CE</span>
            </motion.div>

            <motion.div
              className="flex items-center justify-center gap-3 text-foreground/70 text-lg md:text-xl font-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              <span>{settings.language === 'tl' ? 'Pre-Kolonyal' : 'Pre-Colonial'}</span>
              <span className="text-gold">→</span>
              <span>{settings.language === 'tl' ? 'Rebolusyon' : 'Revolution'}</span>
            </motion.div>
          </div>

          {/* Fade out overlay */}
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.5 }}
          />
        </motion.div>
      )}
    </div>
  );
}
