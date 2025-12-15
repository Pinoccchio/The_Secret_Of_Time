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
  const [phase, setPhase] = useState<'arrival' | 'campus' | 'grabbed' | 'recognition'>('arrival');
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
      en: 'You land on grass. Soft. Damp.',
      tl: 'Bumagsak ka sa damuhan. Malambot. Basa.',
    },
    {
      character: 'Narrator',
      en: "The air is different again—polluted, heavy, electric with tension.",
      tl: 'Ang hangin ay iba—polusyon, mabigat, puno ng tensyon.',
    },
    {
      character: 'Narrator',
      en: "You're on a university campus. Art Deco buildings. Sprawling lawns. Acacia trees.",
      tl: 'Nasa unibersidad ka. Art Deco na gusali. Malawak na damuhan. Mga puno ng akasya.',
    },
  ];

  // Phase 2: Campus observation dialogues
  const campusDialogues: DialogueData[] = [
    {
      character: 'Narrator',
      en: 'But something is wrong. Military trucks line the roads. Soldiers patrol in pairs, rifles ready.',
      tl: 'Pero may mali. Mga military truck sa kalsada. Mga sundalo ay nag-patrol na dalawa-dalawa, may dalang baril.',
    },
    {
      character: 'Narrator',
      en: 'Helicopters thrum in the distance, searchlights sweeping across buildings.',
      tl: 'Ang mga helicopter ay tumutunog sa malayuan, ang mga ilaw ay sumasalat sa mga gusali.',
    },
    {
      character: 'Narrator',
      en: 'On a wall, someone has spray-painted: "NINOY HINDI KA NAG-IISA"',
      tl: 'Sa dingding, may nag-spray paint: "NINOY HINDI KA NAG-IISA"',
    },
    {
      character: 'Narrator',
      en: "This is August 1983. Days after Senator Ninoy Aquino was assassinated. The Philippines is about to wake up.",
      tl: 'Agosto 1983 ito. Ilang araw matapos patayin si Senador Ninoy Aquino. Ang Pilipinas ay malapit nang magising.',
    },
  ];

  // Phase 3: Being grabbed dialogues
  const grabbedDialogues: DialogueData[] = [
    {
      character: 'Narrator',
      en: 'A hand grabs your arm and pulls you into the shadows.',
      tl: 'Hinila ka ng isang kamay papunta sa dilim.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter4_activist_leader.png',
      en: 'Ano ba?! Gusto mong madampot?! Bawal ang curfew violations!',
      tl: 'Ano ba?! Gusto mong madampot?! Bawal ang curfew violations!',
    },
    {
      character: 'Narrator',
      en: "It's a woman. Maybe in her fifties. She wears a simple shirt and jeans, but her eyes burn with fierce determination.",
      tl: 'Isang babae. Siguro nasa limampung taon. Suot niya ay simple na t-shirt at jeans, pero ang kanyang mga mata ay puno ng determinasyon.',
    },
    {
      character: 'Narrator',
      en: 'Wait. The shape of her face. The way she holds herself. The scar on her left forearm—older now, faded, but unmistakable.',
      tl: 'Sandali. Ang hugis ng kanyang mukha. Ang paraan niya ng pagtayo. Ang peklat sa kanyang kaliwang braso—mas luma na, kupas, pero hindi mapagkakamalang.',
    },
  ];

  // Phase 4: Recognition dialogues
  const recognitionDialogues: DialogueData[] = [
    {
      character: 'You',
      characterImage: '/assets/images/characters/main_character.png',
      en: 'Lola?',
      tl: 'Lola?',
    },
    {
      character: 'Narrator',
      en: "Her eyes widen. She pulls you deeper into the shadows, behind a building.",
      tl: 'Lumaki ang kanyang mga mata. Hinila ka niya palalim sa dilim, sa likod ng gusali.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter4_activist_leader.png',
      en: 'Paano mo— ',
      tl: 'Paano mo—',
    },
    {
      character: 'Narrator',
      en: 'She stops. Stares at the amulet glowing beneath your shirt. Understanding dawns.',
      tl: 'Tumigil siya. Tinitingnan ang amulet na nagniningning sa ilalim ng iyong damit. Naintindihan niya.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter4_activist_leader.png',
      en: 'Ah. Nandito ka na pala sa panahong ito. So you\'re here in this time now.',
      tl: 'Ah. Nandito ka na pala sa panahong ito.',
    },
    {
      character: 'Narrator',
      en: 'She looks older than in 1945—thirty-eight years older—but her spirit is unchanged. Gray streaks her hair. Lines mark her face. But her eyes are the same.',
      tl: 'Mas matanda na siya kaysa noong 1945—tatlumpu\'t walong taon na ang nakaraan—pero ang kanyang espiritu ay pareho pa rin. Uban na ang buhok niya. May mga guhit sa mukha. Pero ang kanyang mga mata ay pareho pa rin.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter4_activist_leader.png',
      en: "I didn't get to talk to you much last time. Things moved so fast in the mountains.",
      tl: 'Hindi kita masyado nakausap nung huli. Sobrang bilis ng mga pangyayari noon sa bundok.',
    },
    {
      character: 'You',
      characterImage: '/assets/images/characters/main_character.png',
      en: 'Lola, I have so many questions—',
      tl: 'Lola, ang daming tanong ko—',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter4_activist_leader.png',
      en: "I know. But now—it's not time for questions. I'm doing something important. And I need your help.",
      tl: 'Alam ko. Pero ngayon—hindi oras para sa tanong. May ginagawa akong importante. At kailangan mo akong tulungan.',
    },
  ];

  const getCurrentDialogues = () => {
    if (phase === 'arrival') return arrivalDialogues;
    if (phase === 'campus') return campusDialogues;
    if (phase === 'grabbed') return grabbedDialogues;
    if (phase === 'recognition') return recognitionDialogues;
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
        setPhase('campus');
      } else if (phase === 'campus') {
        setPhase('grabbed');
      } else if (phase === 'grabbed') {
        setPhase('recognition');
      } else if (phase === 'recognition') {
        onComplete();
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/backgrounds/chapter4_bg1.jpg"
          alt="UP Diliman 1983 Martial Law"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Oppressive atmosphere effect */}
      <motion.div
        className="absolute inset-0 bg-gray-800/20 z-5"
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Searchlight effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/10 to-transparent z-5"
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-start pt-12 pb-96 px-8">
        <AnimatePresence mode="wait">
          {/* Title - Only show in arrival phase */}
          {phase === 'arrival' && dialogueIndex === 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center mb-12"
            >
              <h1 className="font-display text-6xl md:text-8xl text-gold mb-4 drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">
                {settings.language === 'tl' ? 'Kabanata 4' : 'Chapter 4'}
              </h1>
              <h2 className="font-dramatic text-3xl md:text-4xl text-sunset mb-2">
                {settings.language === 'tl' ? 'Ang Tinig sa Kadiliman' : 'The Voice in the Darkness'}
              </h2>
              <p className="font-body text-xl text-foreground/70">
                {settings.language === 'tl' ? 'UP Diliman, 1983 — Martial Law' : 'UP Diliman, 1983 — Martial Law'}
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
        </AnimatePresence>

        {/* Ambient indicators */}
        <AnimatePresence>
          {(phase === 'campus' || phase === 'grabbed') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute bottom-8 text-center w-full"
            >
              <p className="text-foreground/40 text-sm font-body">
                {settings.language === 'tl'
                  ? '🔊 Helicopter... hakbang ng mga sundalo... bulong-bulungan...'
                  : '🔊 Helicopters... soldiers marching... whispers...'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
