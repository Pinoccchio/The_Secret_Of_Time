'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';
import Image from 'next/image';
import { GalaxyTransition } from '@/components/shared/GalaxyTransition';

interface EscapeSceneProps {
  onComplete: () => void;
}

export function EscapeScene({ onComplete }: EscapeSceneProps) {
  const router = useRouter();
  const { settings, setChapterStatus } = useGameStore();
  const [phase, setPhase] = useState<'decoded' | 'prophecy' | 'bonePieces' | 'revelation' | 'travel' | 'complete'>('decoded');
  const [dialogueIndex, setDialogueIndex] = useState(0);

  interface DialogueData {
    character: string;
    characterImage?: string;
    en: string;
    tl: string;
  }

  // Phase 2: Prophecy realization dialogues
  const prophecyDialogues: DialogueData[] = [
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter4_activist_leader.png',
      en: "This isn't a list...",
      tl: 'Hindi ito listahan...',
    },
    {
      character: 'Student Activist',
      characterImage: '/assets/images/characters/chapter4_student_activist.png',
      en: 'Tita Maria?',
      tl: 'Tita Maria?',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter4_activist_leader.png',
      en: 'This is... a message. From the future? Or—',
      tl: 'Ito ay... mensahe. Galing sa hinaharap? O—',
    },
    {
      character: 'You',
      characterImage: '/assets/images/characters/main_character.png',
      en: "Lola—the message ISN'T from Malacañang. It's from YOU. You planted it. For this moment.",
      tl: 'Lola—ang mensahe ay hindi galing sa Malacañang. Galing sa IYO. Itinago mo ito. Para sa sandaling ito.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter4_activist_leader.png',
      en: 'Sometimes I forget what I did in other timelines. But this... this is the prophecy. The warning.',
      tl: 'Minsan nakakalimutan ko kung ano ang ginawa ko sa ibang timeline. Pero ito... ito ang prophecy. Ang babala.',
    },
    {
      character: 'You',
      characterImage: '/assets/images/characters/main_character.png',
      en: 'People Power. EDSA. 1986. Three years from now.',
      tl: 'People Power. EDSA. 1986. Tatlong taon mula ngayon.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter4_activist_leader.png',
      en: 'Three years. Three more years of fighting. Three more years of fear. But after...',
      tl: 'Tatlong taon. Tatlong taon pa ng pakikipaglaban. Tatlong taon pa ng takot. Pero pagkatapos...',
    },
  ];

  // Phase 3: Bone pieces dialogues
  const bonePiecesDialogues: DialogueData[] = [
    {
      character: 'Narrator',
      en: 'She opens her eyes. They\'re wet with tears—but also shining with hope.',
      tl: 'Binuksan niya ang kanyang mga mata. Basa ng luha—pero kumikislap din ng pag-asa.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter4_activist_leader.png',
      en: 'Truth always emerges. Even if you encrypt it, even if you hide it, even if you kill the people who know—truth has its own life.',
      tl: 'Ang katotohanan ay palaging lumalabas. Kahit i-encrypt mo, kahit itago mo, kahit patayin mo ang mga taong nakakaalam—ang katotohanan ay may sariling buhay.',
    },
    {
      character: 'Narrator',
      en: 'She reaches into her pocket and pulls out something. The other half of the carved bone.',
      tl: 'Iniabot niya ang kanyang bulsa at inilabas ang isang bagay. Ang kabilang kalahati ng ukit na buto.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter4_activist_leader.png',
      en: 'This is the remaining half. When you put them together—',
      tl: 'Ito ang natitirang kalahati. Kapag pinagsama mo—',
    },
    {
      character: 'Narrator',
      en: 'You pull out your piece. They fit perfectly. The bone glows. Symbols appear—a map. Coordinates. And a date: February 22, 1986.',
      tl: 'Inilabas mo ang iyong piraso. Perpektong tugma. Ang buto ay nagniningning. Lumitaw ang mga simbolo—isang mapa. Koordinado. At isang petsa: Pebrero 22, 1986.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter4_activist_leader.png',
      en: "EDSA. That's where the final cipher is. And there—there you'll learn the whole truth.",
      tl: 'EDSA. Doon ang huling cipher. At doon—doon mo malalaman ang buong katotohanan.',
    },
  ];

  // Phase 4: Final revelation dialogues
  const revelationDialogues: DialogueData[] = [
    {
      character: 'Narrator',
      en: 'She cups your face in her hands. Older now than in 1945, but her touch is the same.',
      tl: 'Hinawakan niya ang iyong mukha. Mas matanda na kaysa noong 1945, pero ang kanyang haplos ay pareho pa rin.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter4_activist_leader.png',
      en: "We're almost done, grandchild. One more era. But the final step—that's the hardest.",
      tl: 'Malapit na tayong matapos, apo. Isang panahon na lang. Pero ang huling hakbang—iyon ang pinakamahirap.',
    },
    {
      character: 'You',
      characterImage: '/assets/images/characters/main_character.png',
      en: 'Why?',
      tl: 'Bakit?',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter4_activist_leader.png',
      en: 'Because at the end... you will choose. Not me. Not the amulet. YOU.',
      tl: 'Dahil sa dulo... ikaw ang pipili. Hindi ako. Hindi ang amulet. IKAW.',
    },
    {
      character: 'Narrator',
      en: 'The amulet BLAZES. But this time, Maria grabs your hand.',
      tl: 'Ang amulet ay SUMILAY. Pero sa pagkakataong ito, hinawakan ni Maria ang iyong kamay.',
    },
    {
      character: 'Maria Santos',
      characterImage: '/assets/images/characters/chapter4_activist_leader.png',
      en: 'We go together.',
      tl: 'Sabay tayo.',
    },
  ];

  const getCurrentDialogues = () => {
    if (phase === 'prophecy') return prophecyDialogues;
    if (phase === 'bonePieces') return bonePiecesDialogues;
    if (phase === 'revelation') return revelationDialogues;
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
      if (phase === 'prophecy') {
        setPhase('bonePieces');
      } else if (phase === 'bonePieces') {
        setPhase('revelation');
      } else if (phase === 'revelation') {
        setPhase('travel');
      }
    }
  };

  // Handle time travel phase
  useEffect(() => {
    if (phase === 'travel') {
      const timer = setTimeout(() => {
        setPhase('complete');
        setChapterStatus(4, 'completed');
        setChapterStatus(5, 'available');
        // Navigate to next chapter after animation
        setTimeout(() => {
          router.push('/chapter/5');
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
          src="/assets/images/backgrounds/chapter4_bg2.jpg"
          alt="Underground resistance headquarters 1983"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Golden glow for bone pieces phase */}
      {phase === 'bonePieces' && (
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
          {/* Decoded Phase */}
          {phase === 'decoded' && (
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
                  📜
                </motion.div>

                <h2 className="font-display text-6xl text-gold mb-4">
                  {settings.language === 'tl' ? 'Mensahe Decoded!' : 'Message Decoded!'}
                </h2>

                <p className="font-dramatic text-2xl text-foreground/80 mb-8">
                  {settings.language === 'tl'
                    ? '"PEOPLE POWER INHERENT FREEDOM"'
                    : '"PEOPLE POWER INHERENT FREEDOM"'}
                </p>

                <Button onClick={() => setPhase('prophecy')} variant="primary" className="bg-gold hover:bg-gold/80">
                  {settings.language === 'tl' ? 'Ano ang ibig sabihin...' : 'What does it mean...'}
                </Button>
              </motion.div>
            </div>
          )}

          {/* Dialogue Phases (prophecy, bonePieces, revelation) */}
          {(phase === 'prophecy' || phase === 'bonePieces' || phase === 'revelation') && (
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
            <GalaxyTransition
              fromYear="1983 CE"
              toYear="1986 CE"
              fromEra={settings.language === 'tl' ? 'Batas Militar' : 'Martial Law'}
              toEra={settings.language === 'tl' ? 'Rebolusyong EDSA' : 'EDSA Revolution'}
              language={settings.language}
            />
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
                    {settings.language === 'tl' ? 'Kabanata 4 Tapos' : 'Chapter 4 Complete'}
                  </h2>
                  <p className="font-body text-xl text-foreground/70">
                    {settings.language === 'tl' ? 'Papunta sa Kabanata 5...' : 'Proceeding to Chapter 5...'}
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
