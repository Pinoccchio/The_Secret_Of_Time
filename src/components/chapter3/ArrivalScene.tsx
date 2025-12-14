'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';
import Image from 'next/image';

interface ArrivalSceneProps {
  onComplete: () => void;
}

export function ArrivalScene({ onComplete }: ArrivalSceneProps) {
  const { settings } = useGameStore();
  const [phase, setPhase] = useState<'arrival' | 'confrontation' | 'recognition' | 'understanding'>('arrival');
  const [dialogueIndex, setDialogueIndex] = useState(0);

  interface DialogueData {
    character: string;
    characterImage?: string;
    en: string;
    tl: string;
  }

  // Phase 1: Arrival dialogues
  const arrivalDialogues: DialogueData[] = [
    {
      character: 'Narrator',
      en: 'You crash through leaves and vines, landing hard on muddy ground.',
      tl: 'Bumagsak ka sa mga dahon at baging, tumama nang malakas sa putik.',
    },
    {
      character: 'Narrator',
      en: 'The air is thick. Humid. Heavy with the smell of rotting vegetation, wood smoke, and... gunpowder.',
      tl: 'Ang hangin ay makapal. Mamasa-masa. Mabigat na amoy ng nabulok na halaman, usok, at... pulbura.',
    },
    {
      character: 'Narrator',
      en: 'Distant thunder. No—not thunder. Artillery fire. Bombs.',
      tl: 'Malayong kulog. Hindi—hindi kulog. Putok ng kanyon. Bomba.',
    },
    {
      character: 'Narrator',
      en: "You're in a jungle. Mountains rise around you. This is 1945. The liberation of Manila. The bloodiest urban battle of the Pacific War.",
      tl: 'Nasa gubat ka. Nakapaligid ang mga bundok. Taong 1945 ito. Ang liberasyon ng Manila. Ang pinakamadugo sa labanan sa Pacific.',
    },
  ];

  // Phase 2: Confrontation dialogues
  const confrontationDialogues: DialogueData[] = [
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter3_young_guerilla_fighter.png',
      en: 'Sino ka? Paano ka nakarating dito? No one passes our line without us knowing.',
      tl: 'Sino ka? Paano ka nakarating dito? Walang dumadaan sa aming linya na hindi namin alam.',
    },
    {
      character: 'Narrator',
      en: "A young woman stands before you. She can't be older than nineteen. Her eyes are fierce but tired—eyes that have seen too much death.",
      tl: 'Isang batang babae ang nakatayo sa harap mo. Hindi siya hihigit sa labinsiyam. Ang kanyang mga mata ay matapang pero pagod—mga matang nakakita ng labis na kamatayan.',
    },
    {
      character: 'Narrator',
      en: 'She wears a military shirt too big for her frame and carries a bolo at her hip. Something about her face is... familiar.',
      tl: 'Suot niya ang military shirt na sobrang laki para sa kanya at may dalang bolo sa baywang. Ang kanyang mukha ay... pamilyar.',
    },
  ];

  // Phase 3: Recognition dialogues
  const recognitionDialogues: DialogueData[] = [
    {
      character: 'Narrator',
      en: 'Before you can answer, the amulet pulses beneath your shirt. The young woman\'s eyes lock onto the glow.',
      tl: 'Bago ka makasagot, tumibok ang amulet sa ilalim ng iyong damit. Ang mga mata ng babae ay nakatuon sa liwanag.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter3_young_guerilla_fighter.png',
      en: 'Saan mo nakuha yan? Where did you get that?',
      tl: 'Saan mo nakuha yan?',
    },
    {
      character: 'You',
      characterImage: '/assets/images/characters/main_character.png',
      en: "It's... a family heirloom. My lola—",
      tl: 'Ito ay... pamana ng pamilya. Ang aking lola—',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter3_young_guerilla_fighter.png',
      en: 'Ipakita mo. Show it.',
      tl: 'Ipakita mo.',
    },
    {
      character: 'Narrator',
      en: 'You pull out the amulet. The young woman staggers back as if struck. Her hand goes to her own chest, where a similar shape hangs beneath her shirt.',
      tl: 'Inilabas mo ang amulet. Ang babae ay umatras na parang natamaan. Ang kanyang kamay ay pumunta sa kanyang dibdib, kung saan may katulad na hugis na nakabitin.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter3_young_guerilla_fighter.png',
      en: 'Hindi... hindi pwede... This cannot be...',
      tl: 'Hindi... hindi pwede...',
    },
  ];

  // Phase 4: Understanding dialogues
  const understandingDialogues: DialogueData[] = [
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter3_young_guerilla_fighter.png',
      en: 'Saan—KAILAN—ka galing? Where—WHEN—are you from?',
      tl: 'Saan—KAILAN—ka galing?',
    },
    {
      character: 'You',
      characterImage: '/assets/images/characters/main_character.png',
      en: 'The future. 2025.',
      tl: 'Ang hinaharap. 2025.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter3_young_guerilla_fighter.png',
      en: 'Dumating ka na nga... You finally came...',
      tl: 'Dumating ka na nga...',
    },
    {
      character: 'Narrator',
      en: 'She extends her hand, tears fighting back in her eyes.',
      tl: 'Iniunat niya ang kanyang kamay, ang mga luha ay lumalaban sa kanyang mga mata.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter3_young_guerilla_fighter.png',
      en: "I'm Maria. Maria Santos. And if my suspicion is correct... we'll meet again. But you won't recognize me then.",
      tl: 'Ako si Maria. Maria Santos. At kung tama ang aking hinala... magkikita pa tayo. Pero hindi mo pa ako makikilala noon.',
    },
    {
      character: 'Narrator',
      en: 'Before you can ask what she means, a man rushes over—American, wearing guerrilla clothing.',
      tl: 'Bago ka makapagtanong kung ano ang ibig niyang sabihin, may tumakbong lalaki—Amerikano, nakasuot ng damit ng gerilya.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter3_young_guerilla_fighter.png',
      en: "We intercepted a Japanese transmission. It's encrypted. They need my help.",
      tl: 'May nahuli kaming mensahe ng mga Hapon. Naka-encrypt. Kailangan nila ng tulong ko.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter3_young_guerilla_fighter.png',
      en: 'Sumama ka. If you are truly the inheritor, you need to see this.',
      tl: 'Sumama ka. Kung ikaw talaga ang tagapagmana, kailangan mong makita ito.',
    },
  ];

  const getCurrentDialogues = () => {
    if (phase === 'arrival') return arrivalDialogues;
    if (phase === 'confrontation') return confrontationDialogues;
    if (phase === 'recognition') return recognitionDialogues;
    if (phase === 'understanding') return understandingDialogues;
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
        setPhase('confrontation');
      } else if (phase === 'confrontation') {
        setPhase('recognition');
      } else if (phase === 'recognition') {
        setPhase('understanding');
      } else if (phase === 'understanding') {
        onComplete();
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/backgrounds/chapter3_bg1.png"
          alt="Philippine jungle 1945"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Jungle atmosphere effects */}
      <motion.div
        className="absolute inset-0 bg-green-900/10 z-5"
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

        {/* Era Title - Only show in arrival phase */}
        {phase === 'arrival' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-8"
          >
            <h1 className="font-display text-6xl md:text-8xl text-gold mb-4 drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">
              {settings.language === 'tl' ? 'Kabanata 3' : 'Chapter 3'}
            </h1>
            <h2 className="font-dramatic text-3xl md:text-4xl text-sunset mb-2">
              {settings.language === 'tl' ? 'Ang Dilim Bago ang Liwanag' : 'The Darkness Before the Light'}
            </h2>
            <p className="font-body text-xl text-foreground/70">
              {settings.language === 'tl' ? 'Luzon, 1945 — Digmaang Pandaigdig II' : 'Luzon, 1945 — World War II'}
            </p>
          </motion.div>
        )}

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

        {/* Ambient indicators */}
        <AnimatePresence>
          {(phase === 'arrival' || phase === 'confrontation') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute bottom-8 right-8 text-foreground/40 text-sm font-body"
            >
              <p>
                {settings.language === 'tl'
                  ? '🔊 Malayong putok... ibon... static ng radyo...'
                  : '🔊 Distant explosions... birds... radio static...'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
