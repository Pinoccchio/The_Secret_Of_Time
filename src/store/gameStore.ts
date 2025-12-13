import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Chapter,
  ChapterStatus,
  CipherType,
  GameProgress,
  GameSettings,
  Language,
} from '@/types/game';

interface GameState {
  // Progress
  progress: GameProgress;

  // Settings
  settings: GameSettings;

  // UI State
  isLoading: boolean;
  currentDialogueIndex: number;
  showTutorial: boolean;
  hintsUsed: number;

  // Chapters
  chapters: Chapter[];

  // Actions
  setChapterStatus: (chapterId: number, status: ChapterStatus) => void;
  unlockCipher: (cipher: CipherType) => void;
  addSecret: (secret: string) => void;
  makeChoice: (choiceId: string, value: string) => void;
  setLanguage: (lang: Language) => void;
  updateAudioVolume: (type: keyof GameSettings['audioVolume'], value: number) => void;
  nextDialogue: () => void;
  resetDialogue: () => void;
  toggleTutorial: () => void;
  useHint: () => void;
  resetHints: () => void;
  saveProgress: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Initial Progress
      progress: {
        currentChapter: 0,
        currentScene: 'landing',
        completedChapters: [],
        unlockedCiphers: [],
        discoveredSecrets: [],
        choices: {},
        totalPlayTime: 0,
        lastSaved: new Date(),
      },

      // Initial Settings
      settings: {
        language: 'en',
        textSpeed: 'normal',
        audioVolume: {
          master: 0.7,
          music: 0.6,
          sfx: 0.7,
          voice: 0.8,
        },
        accessibility: {
          textSize: 'medium',
          highContrast: false,
          reduceMotion: false,
        },
      },

      // UI State
      isLoading: false,
      currentDialogueIndex: 0,
      showTutorial: false,
      hintsUsed: 0,

      // Chapters Data
      chapters: [
        {
          id: 0,
          title: 'Prologue: The Chest of Secrets',
          titleTagalog: 'Prologue: Ang Baúl ng Lihim',
          era: 'Present Day',
          year: 2024,
          location: 'Manila, Philippines',
          cipherType: 'caesar',
          status: 'available',
          emotionalTheme: 'Mystery and Fear',
        },
        {
          id: 1,
          title: 'Chapter 1: In the Time of Gold',
          titleTagalog: 'Kabanata 1: Sa Panahon ng Ginto',
          era: 'Pre-Colonial Philippines',
          year: 1450,
          location: 'Manila Bay Settlement',
          cipherType: 'caesar',
          status: 'locked',
          emotionalTheme: 'Wonder and Discovery',
        },
        {
          id: 2,
          title: 'Chapter 2: The Secret of Freedom',
          titleTagalog: 'Kabanata 2: Ang Lihim ng Kalayaan',
          era: 'Philippine Revolution',
          year: 1896,
          location: 'Katipunan Hideout, Manila',
          cipherType: 'vigenere',
          status: 'locked',
          emotionalTheme: 'Courage and Sacrifice',
        },
        {
          id: 3,
          title: 'Chapter 3: Darkness Before Light',
          titleTagalog: 'Kabanata 3: Ang Dilim Bago ang Liwanag',
          era: 'World War II',
          year: 1945,
          location: 'Sierra Madre Mountains, Luzon',
          cipherType: 'playfair',
          status: 'locked',
          emotionalTheme: 'Sacrifice and Connection',
        },
        {
          id: 4,
          title: 'Chapter 4: Voice in the Darkness',
          titleTagalog: 'Kabanata 4: Ang Tinig sa Kadiliman',
          era: 'Martial Law Era',
          year: 1983,
          location: 'UP Diliman, Manila',
          cipherType: 'rail_fence',
          status: 'locked',
          emotionalTheme: 'Resistance and Hope',
        },
        {
          id: 5,
          title: 'Chapter 5: Power of the People',
          titleTagalog: 'Kabanata 5: Ang Kapangyarihan ng Bayan',
          era: 'EDSA Revolution',
          year: 1986,
          location: 'EDSA, Manila',
          cipherType: 'columnar_transposition',
          status: 'locked',
          emotionalTheme: 'Unity and Choice',
        },
      ],

      // Actions
      setChapterStatus: (chapterId, status) =>
        set((state) => ({
          chapters: state.chapters.map((ch) =>
            ch.id === chapterId ? { ...ch, status } : ch
          ),
        })),

      unlockCipher: (cipher) =>
        set((state) => ({
          progress: {
            ...state.progress,
            unlockedCiphers: state.progress.unlockedCiphers.includes(cipher)
              ? state.progress.unlockedCiphers
              : [...state.progress.unlockedCiphers, cipher],
          },
        })),

      addSecret: (secret) =>
        set((state) => ({
          progress: {
            ...state.progress,
            discoveredSecrets: [...state.progress.discoveredSecrets, secret],
          },
        })),

      makeChoice: (choiceId, value) =>
        set((state) => ({
          progress: {
            ...state.progress,
            choices: { ...state.progress.choices, [choiceId]: value },
          },
        })),

      setLanguage: (lang) =>
        set((state) => ({
          settings: { ...state.settings, language: lang },
        })),

      updateAudioVolume: (type, value) =>
        set((state) => ({
          settings: {
            ...state.settings,
            audioVolume: { ...state.settings.audioVolume, [type]: value },
          },
        })),

      nextDialogue: () =>
        set((state) => ({
          currentDialogueIndex: state.currentDialogueIndex + 1,
        })),

      resetDialogue: () => set({ currentDialogueIndex: 0 }),

      toggleTutorial: () =>
        set((state) => ({ showTutorial: !state.showTutorial })),

      useHint: () => set((state) => ({ hintsUsed: state.hintsUsed + 1 })),

      resetHints: () => set({ hintsUsed: 0 }),

      saveProgress: () =>
        set((state) => ({
          progress: { ...state.progress, lastSaved: new Date() },
        })),
    }),
    {
      name: 'secret-of-time-storage',
      partialize: (state) => ({
        progress: state.progress,
        settings: state.settings,
      }),
    }
  )
);
