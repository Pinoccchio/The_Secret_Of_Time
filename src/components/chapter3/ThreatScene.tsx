'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';
import Image from 'next/image';

interface ThreatSceneProps {
  onComplete: () => void;
}

export function ThreatScene({ onComplete }: ThreatSceneProps) {
  const { settings } = useGameStore();
  const [phase, setPhase] = useState<'bunker' | 'briefing' | 'urgency' | 'ready'>('bunker');
  const [dialogueIndex, setDialogueIndex] = useState(0);

  interface DialogueData {
    character: string;
    characterImage?: string;
    en: string;
    tl: string;
  }

  // Phase 1: Bunker arrival
  const bunkerDialogues: DialogueData[] = [
    {
      character: 'Narrator',
      en: 'Maria leads you into a hidden bunker dug into the mountainside.',
      tl: 'Dinala ka ni Maria sa isang lihim na bunker na hinukay sa bundok.',
    },
    {
      character: 'Narrator',
      en: 'Oil lamps cast flickering shadows on earthen walls. Maps cover every surface—Manila, Bataan, Corregidor. Red pins mark Japanese positions.',
      tl: 'Ang mga ilawan ay nagbibigay ng umiindayog na anino sa mga pader. Puno ng mapa ang bawat ibabaw—Manila, Bataan, Corregidor. Pula ang marka ng posisyon ng mga Hapon.',
    },
    {
      character: 'Narrator',
      en: 'A Filipino commander and two American officers huddle over a table.',
      tl: 'Isang kumander na Pilipino at dalawang opisyal na Amerikano ay nag-uusap sa mesa.',
    },
  ];

  // Phase 2: Briefing
  const briefingDialogues: DialogueData[] = [
    {
      character: 'Commander',
      characterImage: '/assets/images/characters/chapter3_allied_military_leader.png',
      en: 'Maria. The message?',
      tl: 'Maria. Ang mensahe?',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter3_young_guerilla_fighter.png',
      en: 'Playfair cipher. The Japanese military has been using it for local communications. Faster than their Purple machine, but easier to read—if you know the keyword.',
      tl: 'Playfair cipher. Ginagamit ito ng militar ng mga Hapon para sa lokal na komunikasyon. Mas mabilis kaysa sa kanilang Purple machine, pero mas madaling basahin—kung alam mo ang keyword.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter3_young_guerilla_fighter.png',
      en: 'Our intelligence says they\'re using location-based keywords. This transmission came from their unit that fought at Bataan.',
      tl: 'Ang aming intelligence ay nagsasabi na gumagamit sila ng mga keyword base sa lokasyon. Ang mensaheng ito ay galing sa unit na lumaban sa Bataan.',
    },
    {
      character: 'Narrator',
      en: "Maria's jaw tightens. Pain flashes across her face.",
      tl: 'Humigpit ang panga ni Maria. Lumitaw ang sakit sa kanyang mukha.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter3_young_guerilla_fighter.png',
      en: 'Ang tatay ko... namatay sa Bataan Death March. My father... died in the Bataan Death March.',
      tl: 'Ang tatay ko... namatay sa Bataan Death March.',
    },
  ];

  // Phase 3: Urgency
  const urgencyDialogues: DialogueData[] = [
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter3_young_guerilla_fighter.png',
      en: 'So I will use that word to defeat them. BATAAN.',
      tl: 'Kaya gagamitin ko ang salitang yan para talunin sila. BATAAN.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter3_young_guerilla_fighter.png',
      en: 'The Playfair cipher uses pairs of letters. Like how we fight—never alone. Always together.',
      tl: 'Ang Playfair cipher ay gumagamit ng mga pares ng letra. Tulad ng kung paano tayo lumalaban—hindi kailanman mag-isa. Palaging magkasama.',
    },
    {
      character: 'Narrator',
      en: 'She hands you the intercepted message. Distant explosions rock the bunker. Dust falls from the ceiling.',
      tl: 'Ibinigay niya sa iyo ang nahuli na mensahe. Malayong pagsabog ang yumanig sa bunker. Bumagsak ang alikabok mula sa kisame.',
    },
    {
      character: 'Commander',
      characterImage: '/assets/images/characters/chapter3_allied_military_leader.png',
      en: 'We need that message decoded NOW! Lives depend on it!',
      tl: 'Kailangan naming ma-decode ang mensahe NGAYON! Nakasalalay ang mga buhay dito!',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter3_young_guerilla_fighter.png',
      en: 'Sabay nating gawin. Magkasama. Let\'s do it together.',
      tl: 'Sabay nating gawin. Magkasama.',
    },
  ];

  const getCurrentDialogues = () => {
    if (phase === 'bunker') return bunkerDialogues;
    if (phase === 'briefing') return briefingDialogues;
    if (phase === 'urgency') return urgencyDialogues;
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
      if (phase === 'bunker') {
        setPhase('briefing');
      } else if (phase === 'briefing') {
        setPhase('urgency');
      } else if (phase === 'urgency') {
        setPhase('ready');
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/backgrounds/chapter3_bg2.png"
          alt="War bunker 1945"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Bunker atmosphere effects */}
      <motion.div
        className="absolute inset-0 bg-orange-900/5 z-5"
        animate={{
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-start pt-12 pb-96 px-8">
        <AnimatePresence mode="wait">
          {/* Phase 1-3: Dialogue phases */}
          {phase !== 'ready' && (
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
            </div>
          )}

          {/* Phase 4: Ready for puzzle */}
          {phase === 'ready' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-2xl"
              >
                <div className="bg-background/90 backdrop-blur-md border-2 border-gold/50 rounded-xl p-8 mb-8">
                  <motion.div
                    className="text-6xl mb-4"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  >
                    📜
                  </motion.div>

                  <h3 className="font-dramatic text-4xl text-gold mb-4">
                    {settings.language === 'tl' ? 'Intercepted na Mensahe' : 'Intercepted Message'}
                  </h3>

                  <p className="font-body text-lg text-foreground/90 mb-6">
                    {settings.language === 'tl'
                      ? 'Ang mga buhay ng iyong mga kasama ay nakasalalay sa iyong kakayahang i-decode ang mensaheng ito. Gumamit ng Playfair cipher kasama ang keyword: BATAAN'
                      : 'The lives of your comrades depend on your ability to decode this message. Use the Playfair cipher with keyword: BATAAN'}
                  </p>

                  <motion.div
                    className="text-red-400 font-body text-sm mb-6"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {settings.language === 'tl' ? '⚠️ Urgente! Bilisan!' : '⚠️ Urgent! Hurry!'}
                  </motion.div>

                  <Button
                    onClick={() => {
                      setTimeout(onComplete, 300);
                    }}
                    variant="primary"
                    className="w-full bg-gold hover:bg-gold/80"
                  >
                    {settings.language === 'tl' ? 'Simulan ang Decryption' : 'Begin Decryption'}
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Sound effects indicators */}
        <AnimatePresence>
          {(phase === 'urgency' || phase === 'ready') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
            >
              <p className="text-foreground/40 text-sm font-body">
                {settings.language === 'tl'
                  ? '🔊 Mga pagsabog... static ng radyo... mabibigat na hakbang...'
                  : '🔊 Explosions... radio static... heavy footsteps...'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
