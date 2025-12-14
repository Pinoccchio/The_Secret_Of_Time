'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';
import Image from 'next/image';

interface ArrivalSceneProps {
  onComplete: () => void;
}

export function ArrivalScene({ onComplete }: ArrivalSceneProps) {
  const { settings } = useGameStore();
  const [phase, setPhase] = useState<'arrival' | 'meeting' | 'bonifacio' | 'ready'>('arrival');
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showKKK, setShowKKK] = useState(true);

  interface DialogueData {
    character: string;
    characterImage?: string;
    en: string;
    tl: string;
  }

  // Arrival dialogues
  const arrivalDialogues: DialogueData[] = [
    {
      character: 'Narrator',
      en: "You land in darkness. For a moment, you panic—then you realize you're inside a structure. Nipa walls. Bamboo floor. The smell of burning coconut oil from a small lamp.",
      tl: "Dumating ka sa dilim. Sandaling nag-panic ka—pero napagtanto mo na nasa loob ka ng isang gusali. Nipa ang dingding. Bamboo ang sahig. Ang amoy ng nasusunog na langis ng niyog mula sa isang maliit na ilawan.",
    },
    {
      character: 'Narrator',
      en: "Voices. Urgent. Whispering. Your eyes adjust. You're in a small hut. About twenty people crowd inside—men and women, young and old. They wear simple clothing, barong and saya, but each has a red scarf or band somewhere on their person.",
      tl: "Mga tinig. Mabilisan. Bubulong. Nagsimulang maging malinaw ang iyong paningin. Nasa loob ka ng isang maliit na kubo. Mga dalawampung tao ang siksikan sa loob—lalaki at babae, bata at matanda. Nakasuot sila ng simpleng kasuotan, barong at saya, ngunit mayroon silang pulang bandana o pulseras.",
    },
    {
      character: 'Narrator',
      en: "On the wall: A triangle with three K's. KKK—Kataastaasan, Kagalanggalangang Katipunan ng mga Anak ng Bayan. The secret society that launched the Philippine Revolution against Spain.",
      tl: "Sa dingding: Isang tatsulok na may tatlong K. KKK—Kataastaasan, Kagalanggalangang Katipunan ng mga Anak ng Bayan. Ang lihim na samahan na naglunsad ng Rebolusyong Pilipino laban sa Espanya.",
    },
    {
      character: 'Narrator',
      en: "This is 1896. The revolution is about to begin. A man in the center is speaking—Andrés Bonifacio, the Supremo. His eyes burn with passion.",
      tl: "Ito ay 1896. Ang rebolusyon ay malapit nang magsimula. Isang lalaki sa gitna ang nagsasalita—si Andrés Bonifacio, ang Supremo. Ang kanyang mga mata ay puno ng apoy.",
    },
  ];

  // Meeting dialogues
  const meetingDialogues: DialogueData[] = [
    {
      character: 'Andrés Bonifacio',
      characterImage: '/assets/images/characters/chapter2_bonifacio.png',
      en: "Brothers and sisters, the time has come. We can no longer stay silent. Freedom is not given—we take it.",
      tl: "Mga kapatid, dumating na ang panahon. Hindi na tayo pwedeng manahimik. Ang kalayaan ay hindi ibibigay—kinukuha natin.",
    },
    {
      character: 'Katipunero',
      characterImage: '/assets/images/characters/chapter2_katipunero.png',
      en: "Who are you?",
      tl: "Sino ka?",
    },
    {
      character: 'Andrés Bonifacio',
      characterImage: '/assets/images/characters/chapter2_bonifacio.png',
      en: "New face. But your eyes... you've seen our future.",
      tl: "Bagong mukha. Pero ang mata mo... nakita mo na ang ating hinaharap.",
    },
    {
      character: 'Andrés Bonifacio',
      characterImage: '/assets/images/characters/chapter2_bonifacio.png',
      en: "Show it. The amulet.",
      tl: "Ipakita mo. Ang anting-anting.",
    },
  ];

  // Bonifacio dialogues
  const bonifacioDialogues: DialogueData[] = [
    {
      character: 'Babaylan',
      characterImage: '/assets/images/characters/chapter2_healer.png',
      en: "The inheritor! My ancestor said you would come. The carrier of the codes.",
      tl: "Ang tagapagmana! Sinabi ng aking ninuno na darating ka. Ang daladalang ng kodigo.",
    },
    {
      character: 'Andrés Bonifacio',
      characterImage: '/assets/images/characters/chapter2_bonifacio.png',
      en: "If that's true, we have a message for you. Or should I say—for the future. For those who come after.",
      tl: "Kung totoo yan, mayroon kaming mensahe para sa'yo. O dapat sabihin—para sa kinabukasan. Para sa mga susunod.",
    },
    {
      character: 'Andrés Bonifacio',
      characterImage: '/assets/images/characters/chapter2_bonifacio.png',
      en: "We made this code. Its key is the word most precious to us—the reason for our struggle.",
      tl: "Ginawa namin ang code na ito. Ang susi nito ay ang salitang pinakamamahal namin—ang dahilan ng aming pakikibaka.",
    },
  ];

  const getCurrentDialogues = () => {
    if (phase === 'arrival') return arrivalDialogues;
    if (phase === 'meeting') return meetingDialogues;
    if (phase === 'bonifacio') return bonifacioDialogues;
    return [];
  };

  const currentDialogues = getCurrentDialogues();
  const currentDialogue = currentDialogues[dialogueIndex];
  const displayText = currentDialogue ? (settings.language === 'tl' ? currentDialogue.tl : currentDialogue.en) : '';
  const isMainCharacter = currentDialogue?.character === 'You';

  // Track previous character to avoid fade animation when same character speaks
  const prevDialogue = dialogueIndex > 0 ? currentDialogues[dialogueIndex - 1] : null;
  const isSameCharacter = prevDialogue && currentDialogue && prevDialogue.character === currentDialogue.character && prevDialogue.characterImage === currentDialogue.characterImage;

  const handleNext = () => {
    if (dialogueIndex < currentDialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      // Move to next phase
      setDialogueIndex(0);
      if (phase === 'arrival') {
        setShowKKK(false);
        setPhase('meeting');
      } else if (phase === 'meeting') {
        setPhase('bonifacio');
      } else if (phase === 'bonifacio') {
        setPhase('ready');
      }
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

      {/* Firelight Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-transparent z-5"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-start pt-12 pb-96 px-8">

        {/* Era Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-6xl md:text-8xl text-gold mb-4 drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">
            {settings.language === 'tl' ? 'Kabanata 2' : 'Chapter 2'}
          </h1>
          <h2 className="font-dramatic text-3xl md:text-4xl text-sunset mb-2">
            {settings.language === 'tl'
              ? 'Ang Lihim ng Kalayaan'
              : 'The Secret of Freedom'}
          </h2>
          <p className="font-body text-xl text-foreground/70">
            {settings.language === 'tl'
              ? '1896 - Katipunan, Lihim na Pulong'
              : '1896 - Katipunan, Secret Meeting'}
          </p>
        </motion.div>

        {/* Katipunan Symbol */}
        <AnimatePresence>
          {showKKK && phase === 'arrival' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 1 }}
              className="mb-12"
            >
              <div className="relative w-48 h-48">
                {/* KKK Triangle */}
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Triangle */}
                  <motion.path
                    d="M 100 20 L 180 180 L 20 180 Z"
                    fill="none"
                    stroke="#FF6B35"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                  />

                  {/* Three K's */}
                  <text x="100" y="80" textAnchor="middle" fill="#FFD700" fontSize="40" fontFamily="serif" fontWeight="bold">K</text>
                  <text x="60" y="150" textAnchor="middle" fill="#FFD700" fontSize="40" fontFamily="serif" fontWeight="bold">K</text>
                  <text x="140" y="150" textAnchor="middle" fill="#FFD700" fontSize="40" fontFamily="serif" fontWeight="bold">K</text>
                </svg>

                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-red-600/20 rounded-full blur-3xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Character Portraits - RPG Style */}
        <AnimatePresence>
          {currentDialogue?.characterImage && phase !== 'ready' && (
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
        {phase !== 'ready' && (
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
                    {currentDialogues.map((_, index) => (
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
        )}

        {/* Ready to Continue */}
        <AnimatePresence>
          {phase === 'ready' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center max-w-2xl"
              >
              <div className="bg-background/80 backdrop-blur-md border-2 border-gold/30 rounded-xl p-8">
                <p className="font-body text-lg text-foreground/90 mb-6">
                  {settings.language === 'tl'
                    ? 'Nakita mo ang KALAYAAN na nakasulat sa dingding sa likod ni Bonifacio. Ito ang susi sa code na gagawin mo.'
                    : 'You see KALAYAAN written on the wall behind Bonifacio. This is the key to the code you must solve.'}
                </p>

                {/* KALAYAAN Display */}
                <motion.div
                  className="text-center mb-6"
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(255, 215, 0, 0.5)',
                      '0 0 20px rgba(255, 215, 0, 0.8)',
                      '0 0 10px rgba(255, 215, 0, 0.5)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <span className="font-display text-6xl text-gold">KALAYAAN</span>
                </motion.div>

                <p className="font-body text-sm text-foreground/60 mb-6">
                  {settings.language === 'tl' ? '(Kalayaan = Freedom)' : '(Freedom = Kalayaan)'}
                </p>

                <Button
                  onClick={() => {
                    setTimeout(onComplete, 500);
                  }}
                  variant="primary"
                  className="w-full"
                >
                  {settings.language === 'tl' ? 'Magpatuloy' : 'Continue'}
                </Button>
              </div>
            </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Ambient Sound Indicator */}
        <motion.div
          className="absolute bottom-8 right-8 text-foreground/40 text-sm font-body"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {settings.language === 'tl' ? '🔊 Mga bubulong...' : '🔊 Hushed voices...'}
        </motion.div>
      </div>
    </div>
  );
}
