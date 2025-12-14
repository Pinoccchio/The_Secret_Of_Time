'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';
import Image from 'next/image';

interface EscapeSceneProps {
  onComplete: () => void;
}

export function EscapeScene({ onComplete }: EscapeSceneProps) {
  const router = useRouter();
  const { settings, setChapterStatus } = useGameStore();
  const [phase, setPhase] = useState<'success' | 'alone' | 'revelation' | 'farewell' | 'travel' | 'complete'>('success');
  const [dialogueIndex, setDialogueIndex] = useState(0);

  interface DialogueData {
    character: string;
    characterImage?: string;
    en: string;
    tl: string;
  }

  // Phase 2: Alone with Maria dialogues
  const aloneDialogues: DialogueData[] = [
    {
      character: 'Commander',
      characterImage: '/assets/images/characters/chapter3_allied_military_leader.png',
      en: 'Luneta! We can cut them off! Move out!',
      tl: 'Luneta! Puwede nating hadlangan sila! Lumabas na!',
    },
    {
      character: 'Narrator',
      en: "The commander rushes out, shouting orders. The American officers follow. You're alone with Maria.",
      tl: 'Tumatakbo ang kumander, sumisigaw ng mga utos. Sumunod ang mga opisyal na Amerikano. Nag-iisa ka na kasama si Maria.',
    },
    {
      character: 'Narrator',
      en: "She's staring at you with an expression you can't read.",
      tl: 'Tinitingnan ka niya ng hindi mo maintindihan na ekspresyon.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter3_young_guerilla_fighter.png',
      en: 'Magaling. You learn fast.',
      tl: 'Magaling. Mabilis kang matuto.',
    },
  ];

  // Phase 3: The Revelation dialogues
  const revelationDialogues: DialogueData[] = [
    {
      character: 'You',
      characterImage: '/assets/images/characters/main_character.png',
      en: 'Maria... you said we\'ll meet again. What did you mean?',
      tl: 'Maria... sinabi mo na magkikita pa tayo. Ano ang ibig mong sabihin?',
    },
    {
      character: 'Narrator',
      en: 'She reaches into her pocket and pulls out a photograph. Faded, creased from being carried everywhere.',
      tl: 'Iniabot niya ang kanyang bulsa at inilabas ang isang litrato. Kupas, nakatupi dahil lagi niyang dala.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter3_young_guerilla_fighter.png',
      en: 'Ang anak ng anak ko. Born in 1975. Thirty years from now para sa akin. Pero para sa iyo...',
      tl: 'Ang anak ng anak ko. Ipinanganak noong 1975. Tatlumpung taon mula ngayon para sa akin. Pero para sa iyo...',
    },
    {
      character: 'Narrator',
      en: 'The world tilts. You look at the photograph. A baby wrapped in a blanket embroidered with Baybayin script.',
      tl: 'Ang mundo ay yumuko. Tumingin ka sa litrato. Isang sanggol na nakabalot sa kumot na may burda ng Baybayin.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter3_young_guerilla_fighter.png',
      en: "I wasn't sure before. But now... I see it. Your eyes. The way you look at the world. The courage and fear together. Kilala kita.",
      tl: 'Hindi pa ako sigurado noon. Pero ngayon... nakikita ko na. Ang mata mo. Ang paraan ng pagtingin mo sa mundo. Ang tapang at takot na magkasama. Kilala kita.',
    },
    {
      character: 'You',
      characterImage: '/assets/images/characters/main_character.png',
      en: 'Lola?',
      tl: 'Lola?',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter3_young_guerilla_fighter.png',
      en: "Hindi mo pa ako lola. I'm only nineteen. But one day...",
      tl: 'Hindi mo pa ako lola. Labinsiyam pa lang ako. Pero isang araw...',
    },
  ];

  // Phase 4: Farewell dialogues
  const farewellDialogues: DialogueData[] = [
    {
      character: 'Narrator',
      en: 'She pulls you into a fierce embrace. She smells like gunpowder, jungle mud, and something floral—sampaguita. The same perfume she\'ll wear sixty years from now.',
      tl: 'Niyakap ka niya nang mahigpit. Amoy niya ay pulbura, putik ng gubat, at bulaklak—sampaguita. Ang parehong pabango na gagamitin niya animnapung taon mula ngayon.',
    },
    {
      character: 'You',
      characterImage: '/assets/images/characters/main_character.png',
      en: "So that's why you know everything. The ciphers, the eras, the time travel...",
      tl: 'Kaya pala alam mo ang lahat. Ang mga cipher, ang mga panahon, ang time travel...',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter3_young_guerilla_fighter.png',
      en: 'Because I already met you. And because one day, I\'ll teach you patterns when you\'re young. You won\'t remember. But your subconscious... knows.',
      tl: 'Dahil nakilala na kita. At dahil isang araw, magtuturo ako sa iyo ng mga patterns kapag bata ka pa. Hindi mo maalala. Pero ang iyong subconscious... alam nito.',
    },
    {
      character: 'Narrator',
      en: 'The amulet FLARES with golden light.',
      tl: 'Ang amulet ay SUMILAY ng gintong liwanag.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter3_young_guerilla_fighter.png',
      en: "We're not done yet. Two more eras. Two more ciphers. And the hardest choice at the end.",
      tl: 'Hindi pa tayo tapos. Dalawa pang panahon. Dalawa pang cipher. At ang pinakamahirap na pagpili sa dulo.',
    },
    {
      character: 'You',
      characterImage: '/assets/images/characters/main_character.png',
      en: 'Lola—Maria—where are you NOW? In my time? Why did you disappear?',
      tl: 'Lola—Maria—nasaan ka NGAYON? Sa aking panahon? Bakit ka nawala?',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter3_young_guerilla_fighter.png',
      en: "There are things I can't tell you yet. The timeline... is delicate. But you'll know. At EDSA. That's where you'll learn everything.",
      tl: 'May mga bagay na hindi ko pa pwedeng sabihin. Ang timeline... ay delikado. Pero malalaman mo. Sa EDSA. Doon mo malalaman ang lahat.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter3_young_guerilla_fighter.png',
      en: 'Mahal kita, apo. Always. In all times.',
      tl: 'Mahal kita, apo. Palagi. Sa lahat ng panahon.',
    },
  ];

  const getCurrentDialogues = () => {
    if (phase === 'alone') return aloneDialogues;
    if (phase === 'revelation') return revelationDialogues;
    if (phase === 'farewell') return farewellDialogues;
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
      if (phase === 'alone') {
        setPhase('revelation');
      } else if (phase === 'revelation') {
        setPhase('farewell');
      } else if (phase === 'farewell') {
        setPhase('travel');
      }
    }
  };

  // Handle time travel phase
  useEffect(() => {
    if (phase === 'travel') {
      const timer = setTimeout(() => {
        setPhase('complete');
        setChapterStatus(3, 'completed');
        setChapterStatus(4, 'available');
        // Navigate to next chapter after animation
        setTimeout(() => {
          router.push('/chapter/4');
        }, 2000);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [phase, router, setChapterStatus]);

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

      {/* Emotional glow for revelation */}
      {phase === 'revelation' && (
        <motion.div
          className="absolute inset-0 bg-gold/10 z-5"
          animate={{
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-start pt-12 pb-96 px-8">
        <AnimatePresence mode="wait">
          {/* Success Phase */}
          {phase === 'success' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <motion.div
                  className="text-9xl mb-6"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: 2,
                  }}
                >
                  🎖️
                </motion.div>

                <h2 className="font-display text-6xl text-gold mb-4">
                  {settings.language === 'tl' ? 'Mensahe Decoded!' : 'Message Decoded!'}
                </h2>

                <p className="font-dramatic text-2xl text-foreground/80 mb-8">
                  {settings.language === 'tl'
                    ? '"Ang kaaway ay uurong sa Luneta. Salakayin sa bukang-liwayway."'
                    : '"The enemy will retreat through Luneta. Ambush at dawn."'}
                </p>

                <Button onClick={() => setPhase('alone')} variant="primary" className="bg-gold hover:bg-gold/80">
                  {settings.language === 'tl' ? 'Ipahayag sa Kumander' : 'Report to Commander'}
                </Button>
              </motion.div>
            </div>
          )}

          {/* Dialogue Phases (alone, revelation, farewell) */}
          {(phase === 'alone' || phase === 'revelation' || phase === 'farewell') && (
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

          {/* Time Travel Phase - Galaxy transition */}
          {phase === 'travel' && (
            <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
              {/* Galaxy background */}
              <div className="absolute inset-0">
                {Array.from({ length: 100 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: Math.random() * 2,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </div>

              {/* Time travel vortex */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    'radial-gradient(circle, rgba(212,175,55,0.3) 0%, rgba(0,0,0,1) 70%)',
                    'radial-gradient(circle, rgba(147,112,219,0.3) 0%, rgba(0,0,0,1) 70%)',
                    'radial-gradient(circle, rgba(212,175,55,0.3) 0%, rgba(0,0,0,1) 70%)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center relative z-10"
              >
                <h2 className="font-dramatic text-5xl text-sunset mb-8">
                  {settings.language === 'tl' ? 'Bumibiyahe Sa Panahon...' : 'Traveling Through Time...'}
                </h2>

                <motion.div
                  className="space-y-4 text-lg text-foreground/90 font-body max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                  >
                    {settings.language === 'tl'
                      ? 'Sa pamamagitan ng usok ng digmaan...'
                      : 'Through the smoke of war...'}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 }}
                  >
                    {settings.language === 'tl'
                      ? 'Sa luha ng iyong Lola...'
                      : "Through your Lola's tears..."}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2 }}
                  >
                    {settings.language === 'tl'
                      ? 'Sa tapang ng mga bayani...'
                      : 'Through the courage of heroes...'}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, scale: 1.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.5 }}
                    className="text-gold font-dramatic text-2xl mt-8"
                  >
                    {settings.language === 'tl'
                      ? '1945 → 1983'
                      : '1945 → 1983'}
                  </motion.p>
                </motion.div>
              </motion.div>
            </div>
          )}

          {/* Complete - Fade to next chapter */}
          {phase === 'complete' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 10 }}
                >
                  <h2 className="font-display text-7xl text-gold mb-4">
                    {settings.language === 'tl' ? 'Kabanata 3 Tapos' : 'Chapter 3 Complete'}
                  </h2>
                  <p className="font-body text-xl text-foreground/70">
                    {settings.language === 'tl' ? 'Papunta sa Kabanata 4...' : 'Proceeding to Chapter 4...'}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
