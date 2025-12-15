'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

interface AncestralHouseProps {
  onComplete: () => void;
}

type Hotspot = 'photo' | 'desk' | 'baul';

export function AncestralHouse({ onComplete }: AncestralHouseProps) {
  const [exploredHotspots, setExploredHotspots] = useState<Set<Hotspot>>(new Set());
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [showIntro, setShowIntro] = useState(true);

  const hotspots = {
    photo: {
      title: 'Old Family Photo',
      description: 'A sepia-toned photograph from the 1940s. Your lola looks young, standing beside a mysterious figure in traditional clothing. The back reads: "1945 - Never forget."',
      position: { top: '18%', right: '11%' }, // Upper right - on the framed photo on wall
    },
    desk: {
      title: 'Antique Desk',
      description: 'Lola\'s writing desk, covered in old letters and documents. You notice several coded messages written in elegant script. Some appear to use shifted letters...',
      position: { top: '52%', right: '28%' }, // Right side - near the desk/cabinet
    },
    baul: {
      title: 'Ancestral Baúl',
      description: 'An ornate wooden chest with brass fittings. The lock is old but well-maintained. This must be what Lola mentioned on the phone.',
      position: { top: '65%', left: '52%' }, // Center-bottom - the chest
      isMain: true,
    },
  };

  const handleHotspotClick = (hotspot: Hotspot) => {
    setSelectedHotspot(hotspot);
    setExploredHotspots(prev => new Set(prev).add(hotspot));
  };

  const handleCloseDetail = () => {
    setSelectedHotspot(null);
  };

  const handleOpenBaul = () => {
    // Must explore at least one other hotspot first
    if (exploredHotspots.size < 2) {
      return;
    }
    onComplete();
  };

  const canOpenBaul = exploredHotspots.size >= 2;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image - Lola's Room */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/backgrounds/prologue_bg.jpg"
          alt="Lola's room in the ancestral house"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>
      {/* Intro Text */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="max-w-2xl px-6 text-center">
              <motion.h2
                className="font-display text-4xl text-gold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Lola\'s Room
              </motion.h2>

              <motion.p
                className="font-body text-foreground/90 text-lg leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                You enter your lola\'s room in the old ancestral house. The scent of sampaguita and old wood fills the air. Everything is exactly as you remember from childhood visits.
              </motion.p>

              <motion.p
                className="font-body text-brass/80 text-base mb-8 italic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Click on glowing objects to examine them. Find the baúl Lola mentioned.
              </motion.p>

              <Button
                onClick={() => setShowIntro(false)}
                variant="primary"
                glow={true}
              >
                Continue
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Room Background (Placeholder with CSS) */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full bg-gradient-to-b from-mahogany/20 to-background">
          {/* Simulated room elements with CSS */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-brass/30 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-mahogany/40 to-transparent" />
          </div>

          {/* Window light effect */}
          <div className="absolute top-10 right-20 w-64 h-96 bg-gold/5 blur-3xl" />
        </div>
      </div>

      {/* Hotspots */}
      <div className="relative z-10 w-full h-screen">
        {Object.entries(hotspots).map(([key, hotspot]) => (
          <motion.button
            key={key}
            className="absolute group"
            style={{
              ...hotspot.position,
              transform: 'translate(-50%, -50%)',
            }}
            onClick={() => handleHotspotClick(key as Hotspot)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Glow effect */}
            <motion.div
              className={`absolute inset-0 rounded-full ${
                hotspot.isMain ? 'w-24 h-24' : 'w-16 h-16'
              } ${
                exploredHotspots.has(key as Hotspot)
                  ? 'bg-purple/30'
                  : 'bg-gold/30'
              } blur-xl`}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Icon */}
            <div
              className={`relative ${
                hotspot.isMain ? 'w-24 h-24' : 'w-16 h-16'
              } rounded-full border-2 ${
                exploredHotspots.has(key as Hotspot)
                  ? 'border-purple/50 bg-purple/10'
                  : 'border-gold/50 bg-gold/10'
              } backdrop-blur-sm flex items-center justify-center text-3xl transition-all`}
            >
              {key === 'photo' && '🖼️'}
              {key === 'desk' && '📜'}
              {key === 'baul' && '🗝️'}
            </div>

            {/* Label */}
            <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <span className="font-display text-gold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                {hotspot.title}
              </span>
            </div>

            {/* Checkmark if explored */}
            {exploredHotspots.has(key as Hotspot) && !hotspot.isMain && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-background" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Detail View */}
      <AnimatePresence>
        {selectedHotspot && (
          <motion.div
            className="absolute inset-0 z-40 flex items-center justify-center bg-background/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseDetail}
          >
            <motion.div
              className="max-w-2xl w-full mx-6 bg-background/95 border-2 border-gold/50 rounded-xl p-8"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-display text-3xl text-gold mb-4">
                {hotspots[selectedHotspot].title}
              </h3>

              <p className="font-body text-foreground/90 text-lg leading-relaxed mb-6">
                {hotspots[selectedHotspot].description}
              </p>

              {selectedHotspot === 'baul' && canOpenBaul && (
                <div className="mb-6 p-4 bg-gold/10 border border-gold/30 rounded-lg">
                  <p className="font-body text-gold text-sm">
                    You\'ve explored the room. You\'re ready to open the baúl.
                  </p>
                </div>
              )}

              {selectedHotspot === 'baul' && !canOpenBaul && (
                <div className="mb-6 p-4 bg-brass/10 border border-brass/30 rounded-lg">
                  <p className="font-body text-brass text-sm">
                    You should look around the room more before opening this.
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                {selectedHotspot === 'baul' && canOpenBaul ? (
                  <Button
                    onClick={handleOpenBaul}
                    variant="primary"
                    glow={true}
                    className="flex-1"
                  >
                    Open the Baúl
                  </Button>
                ) : (
                  <Button
                    onClick={handleCloseDetail}
                    variant="ghost"
                    className="flex-1"
                  >
                    Close
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Indicator */}
      <div className="absolute top-8 right-8 z-30">
        <div className="bg-background/80 backdrop-blur-sm border border-gold/30 rounded-lg px-4 py-2">
          <p className="font-display text-gold text-sm">
            Explored: {exploredHotspots.size}/3
          </p>
        </div>
      </div>
    </div>
  );
}
