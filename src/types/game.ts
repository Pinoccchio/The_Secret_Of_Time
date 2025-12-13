// Type definitions for The Secret of Time

export type Language = 'en' | 'tl';

export type ChapterStatus = 'locked' | 'available' | 'in_progress' | 'completed';

export type CipherType =
  | 'caesar'
  | 'vigenere'
  | 'playfair'
  | 'rail_fence'
  | 'columnar_transposition';

export interface Chapter {
  id: number;
  title: string;
  titleTagalog: string;
  era: string;
  year: number;
  location: string;
  cipherType: CipherType;
  status: ChapterStatus;
  emotionalTheme: string;
}

export interface Character {
  id: string;
  name: string;
  role: string;
  portrait?: string;
  voiceId?: string;
}

export interface DialogueLine {
  id: string;
  character: Character;
  text: string;
  textTagalog: string;
  emotion?: 'neutral' | 'happy' | 'sad' | 'angry' | 'fearful' | 'mysterious';
  autoAdvance?: boolean;
  delay?: number;
}

export interface CipherChallenge {
  id: string;
  cipherType: CipherType;
  encryptedMessage: string;
  key: string | number;
  solution: string;
  hints: string[];
  tutorialSteps?: TutorialStep[];
}

export interface TutorialStep {
  id: string;
  title: string;
  description: string;
  example?: string;
  visual?: string;
}

export interface GameProgress {
  currentChapter: number;
  currentScene: string;
  completedChapters: number[];
  unlockedCiphers: CipherType[];
  discoveredSecrets: string[];
  choices: Record<string, string>;
  totalPlayTime: number;
  lastSaved: Date;
}

export interface GameSettings {
  language: Language;
  textSpeed: 'slow' | 'normal' | 'fast' | 'instant';
  audioVolume: {
    master: number;
    music: number;
    sfx: number;
    voice: number;
  };
  accessibility: {
    textSize: 'small' | 'medium' | 'large';
    highContrast: boolean;
    reduceMotion: boolean;
  };
}

export interface AudioAsset {
  id: string;
  type: 'music' | 'sfx' | 'ambient' | 'voice';
  url: string;
  loop?: boolean;
  volume?: number;
}

export interface Scene3DConfig {
  cameraPosition: [number, number, number];
  ambientLightIntensity: number;
  environment?: string;
  particles?: boolean;
}
