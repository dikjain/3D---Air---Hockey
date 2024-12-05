import { create } from 'zustand';

interface GameState {
  score: { player: number; computer: number };
  gameStarted: boolean;
  isPaused: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  currentRound: number;
  isRoundStarting: boolean;
  countdown: number;
  winner: 'player' | 'computer' | null;
  incrementScore: (player: 'player' | 'computer') => void;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetGame: () => void;
  setDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
  startNewRound: () => void;
  setCountdown: (count: number) => void;
  setRoundStarting: (starting: boolean) => void;
  setWinner: (winner: 'player' | 'computer' | null) => void;
}

export const useGameStore = create<GameState>((set) => ({
  score: { player: 0, computer: 0 },
  gameStarted: false,
  isPaused: false,
  difficulty: 'medium',
  currentRound: 1,
  isRoundStarting: false,
  countdown: 3,
  winner: null,
  incrementScore: (player) =>
    set((state) => {
      const newScore = {
        ...state.score,
        [player]: state.score[player] + 1,
      };
      
      const totalRounds = newScore.player + newScore.computer;
      if (totalRounds >= 10) {
        const winner = newScore.player > newScore.computer ? 'player' : 'computer';
        return {
          score: newScore,
          winner,
          gameStarted: false,
        };
      }
      
      return {
        score: newScore,
        isRoundStarting: true,
        countdown: 3,
        currentRound: state.currentRound + 1,
      };
    }),
  startGame: () => set({ 
    gameStarted: true, 
    isPaused: false, 
    isRoundStarting: true, 
    countdown: 3,
    currentRound: 1,
    score: { player: 0, computer: 0 },
    winner: null,
  }),
  pauseGame: () => set({ isPaused: true }),
  resumeGame: () => set({ isPaused: false }),
  resetGame: () => set({ 
    score: { player: 0, computer: 0 }, 
    gameStarted: false, 
    isPaused: false,
    currentRound: 1,
    isRoundStarting: false,
    countdown: 3,
    winner: null,
  }),
  setDifficulty: (difficulty) => set({ difficulty }),
  startNewRound: () => set({ isRoundStarting: false }),
  setCountdown: (count) => set({ countdown: count }),
  setRoundStarting: (starting) => set({ isRoundStarting: starting }),
  setWinner: (winner) => set({ winner }),
}));