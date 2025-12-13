'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';

interface ChoiceSceneProps {
  onChoice: (choice: 'share' | 'protect') => void;
}

export function ChoiceScene({ onChoice }: ChoiceSceneProps) {
  const [showChoices, setShowChoices] = useState(false);
  const { settings, addChoice } = useGameStore();

  const handleChoice = (choice: 'share' | 'protect') => {
    addChoice('final-decision', choice);
    onChoice(choice);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background-gradient-end" />

      {/* Mystical effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple/10 rounded-full blur-2xl"
          animate={{
            scale: [1.5, 1, 1.5],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-4xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="font-display text-gold text-sm tracking-widest mb-2">
            EPILOGUE
          </h2>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            {settings.language === 'tl' ? 'Ang Desisyon' : 'The Choice'}
          </h1>
          <p className="font-body text-brass text-lg max-w-2xl mx-auto">
            {settings.language === 'tl'
              ? 'Ikaw ay bumalik sa kasalukuyan, hawak ang agimat at ang katotohanan. Ngayon, kailangan mong magdesisyon...'
              : 'You return to the present, holding the amulet and the truth. Now, you must decide...'
            }
          </p>
        </motion.div>

        {/* The amulet visualization */}
        <motion.div
          className="w-32 h-32 mx-auto mb-8 relative"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
            scale: { duration: 2, repeat: Infinity },
          }}
        >
          <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl animate-pulse" />
          <div className="relative w-full h-full rounded-full border-4 border-gold/50 bg-gradient-to-br from-gold/30 to-purple/30 backdrop-blur-sm flex items-center justify-center text-6xl">
            ⏳
          </div>
        </motion.div>

        {/* Question */}
        <motion.div
          className="bg-background/90 backdrop-blur-md border-2 border-gold/50 rounded-xl p-8 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="font-body text-foreground/90 text-xl md:text-2xl leading-relaxed text-center">
            {settings.language === 'tl'
              ? 'Ibabahagi mo ba ang kapangyarihan ng agimat sa mundo upang baguhin ang kasaysayan at makatulong sa iba? O panatilihing lihim ito, tulad ng ginawa ng iyong mga ninuno para protektahan ang pamilya?'
              : 'Will you share the amulet\'s power with the world to change history and help others? Or keep it secret, as your ancestors did to protect the family?'
            }
          </p>
        </motion.div>

        {/* Choices */}
        {!showChoices && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              onClick={() => setShowChoices(true)}
              variant="primary"
              size="lg"
              glow={true}
            >
              {settings.language === 'tl' ? 'Handa na Akong Magdesisyon' : 'I\'m Ready to Choose'}
            </Button>
          </motion.div>
        )}

        {showChoices && (
          <motion.div
            className="grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Choice A: Share the Truth */}
            <motion.div
              className="bg-background/80 backdrop-blur-sm border-2 border-gold/30 rounded-xl p-6 hover:border-gold/60 transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-center mb-4">
                <div className="text-5xl mb-3">🌍</div>
                <h3 className="font-display text-2xl text-gold mb-2">
                  {settings.language === 'tl' ? 'Ibahagi ang Katotohanan' : 'Share the Truth'}
                </h3>
              </div>

              <p className="font-body text-foreground/80 mb-6 text-center">
                {settings.language === 'tl'
                  ? 'Ipakita sa mundo ang kapangyarihan ng paglalakbay sa panahon. Magturo, magbago, makatulong sa sangkatauhan.'
                  : 'Reveal time travel to the world. Teach, change, help humanity.'
                }
              </p>

              <div className="bg-gold/10 border border-gold/30 rounded-lg p-4 mb-6">
                <p className="font-body text-gold text-sm">
                  {settings.language === 'tl'
                    ? '⚠️ Babaguhin ang takbo ng kasaysayan. Maaaring magdulot ng hindi inaasahang kahihinatnan.'
                    : '⚠️ Will change the course of history. May cause unexpected consequences.'
                  }
                </p>
              </div>

              <Button
                onClick={() => handleChoice('share')}
                variant="primary"
                glow={true}
                className="w-full"
              >
                {settings.language === 'tl' ? 'Piliin: Ibahagi' : 'Choose: Share'}
              </Button>
            </motion.div>

            {/* Choice B: Protect the Secret */}
            <motion.div
              className="bg-background/80 backdrop-blur-sm border-2 border-purple/30 rounded-xl p-6 hover:border-purple/60 transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-center mb-4">
                <div className="text-5xl mb-3">🔒</div>
                <h3 className="font-display text-2xl text-purple mb-2">
                  {settings.language === 'tl' ? 'Protektahan ang Lihim' : 'Protect the Secret'}
                </h3>
              </div>

              <p className="font-body text-foreground/80 mb-6 text-center">
                {settings.language === 'tl'
                  ? 'Panatilihing lihim ang agimat. Protektahan ang pamilya at ipasa ang responsibilidad sa susunod na henerasyon.'
                  : 'Keep the amulet secret. Protect the family and pass the responsibility to the next generation.'
                }
              </p>

              <div className="bg-purple/10 border border-purple/30 rounded-lg p-4 mb-6">
                <p className="font-body text-purple text-sm">
                  {settings.language === 'tl'
                    ? '⚠️ Ang lihim ay mananatili, ngunit maaaring may hindi pa natutuklasang katotohanan.'
                    : '⚠️ The secret remains, but there may be undiscovered truths.'
                  }
                </p>
              </div>

              <Button
                onClick={() => handleChoice('protect')}
                variant="secondary"
                className="w-full"
              >
                {settings.language === 'tl' ? 'Piliin: Protektahan' : 'Choose: Protect'}
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Quote */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <p className="font-body text-brass/60 text-sm italic">
            {settings.language === 'tl'
              ? '"Ang kapangyarihan ay may kaakibat na responsibilidad."'
              : '"With great power comes great responsibility."'
            }
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
