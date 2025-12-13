'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useGameStore } from '@/store/gameStore';
import { useState } from 'react';
import type { DialogueLine } from '@/types/game';

interface DialogueBoxProps {
  dialogue: DialogueLine[];
  onComplete?: () => void;
  showPortrait?: boolean;
}

export function DialogueBox({
  dialogue,
  onComplete,
  showPortrait = true,
}: DialogueBoxProps) {
  const { currentDialogueIndex, nextDialogue, resetDialogue, settings } = useGameStore();
  const [isTyping, setIsTyping] = useState(true);

  const currentLine = dialogue[currentDialogueIndex];
  const isLastLine = currentDialogueIndex >= dialogue.length - 1;
  const language = settings.language;

  const handleClick = () => {
    if (isTyping) {
      // Skip typing animation
      setIsTyping(false);
      return;
    }

    if (!isLastLine) {
      nextDialogue();
      setIsTyping(true);
    } else {
      resetDialogue();
      onComplete?.();
    }
  };

  if (!currentLine) return null;

  const textSpeed = {
    slow: 80,
    normal: 50,
    fast: 20,
    instant: 0,
  }[settings.textSpeed];

  const displayText = language === 'tl' ? currentLine.textTagalog : currentLine.text;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-8"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="
              relative
              bg-background/95 backdrop-blur-md
              border-2 border-gold/50
              rounded-2xl
              p-6 md:p-8
              shadow-2xl
              filipino-border
            "
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Decorative glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-purple/10 to-gold/10 rounded-2xl blur-xl -z-10" />

            <div className="flex gap-4 md:gap-6">
              {/* Character Portrait */}
              {showPortrait && currentLine.character.portrait && (
                <motion.div
                  className="flex-shrink-0"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="
                    w-20 h-20 md:w-24 md:h-24
                    rounded-full
                    border-4 border-gold
                    overflow-hidden
                    mystical-glow
                  ">
                    <img
                      src={currentLine.character.portrait}
                      alt={currentLine.character.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              )}

              {/* Dialogue Content */}
              <div className="flex-1 space-y-3">
                {/* Character Name */}
                <motion.h3
                  className="font-display text-gold text-xl md:text-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {currentLine.character.name}
                  {currentLine.character.role && (
                    <span className="text-sm text-foreground/60 ml-2">
                      — {currentLine.character.role}
                    </span>
                  )}
                </motion.h3>

                {/* Dialogue Text */}
                <div className="font-body text-foreground text-base md:text-lg leading-relaxed">
                  {isTyping && textSpeed > 0 ? (
                    <TypeAnimation
                      sequence={[displayText, () => setIsTyping(false)]}
                      wrapper="p"
                      speed={textSpeed}
                      cursor={false}
                    />
                  ) : (
                    <p>{displayText}</p>
                  )}
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex gap-1">
                    {dialogue.map((_, index) => (
                      <div
                        key={index}
                        className={`
                          w-2 h-2 rounded-full
                          ${index === currentDialogueIndex ? 'bg-gold' : 'bg-foreground/30'}
                          ${index < currentDialogueIndex ? 'bg-purple/50' : ''}
                        `}
                      />
                    ))}
                  </div>

                  {/* Continue prompt */}
                  {!isTyping && (
                    <motion.span
                      className="text-sm text-gold/70 font-display"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      {isLastLine ? 'Click to close ▾' : 'Click to continue ▸'}
                    </motion.span>
                  )}
                </div>
              </div>
            </div>

            {/* Click handler overlay */}
            <button
              onClick={handleClick}
              className="absolute inset-0 cursor-pointer"
              aria-label={isTyping ? 'Skip typing' : 'Continue dialogue'}
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
