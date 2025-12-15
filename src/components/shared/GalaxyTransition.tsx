'use client';

import { motion } from 'framer-motion';

interface GalaxyTransitionProps {
  fromYear: string;
  toYear: string;
  fromEra: string;
  toEra: string;
  language: 'en' | 'tl';
}

export function GalaxyTransition({ fromYear, toYear, fromEra, toEra, language }: GalaxyTransitionProps) {
  return (
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
          {language === 'tl'
            ? 'BUMIBIYAHE SA PANAHON'
            : 'TRAVELING THROUGH TIME'
          }
        </motion.h2>

        <motion.div
          className="flex items-center justify-center gap-6 text-foreground text-3xl md:text-4xl font-display mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <span className="text-brass">{fromYear}</span>
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
          <span className="text-purple">{toYear}</span>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-3 text-foreground/70 text-lg md:text-xl font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <span>{fromEra}</span>
          <span className="text-gold">→</span>
          <span>{toEra}</span>
        </motion.div>
      </div>

      {/* Fade out overlay */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5, duration: 0.5 }}
      />
    </motion.div>
  );
}
