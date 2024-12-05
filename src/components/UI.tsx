import { Trophy } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { useEffect } from 'react';

export function UI() {
  const { 
    score, 
    gameStarted, 
    isPaused, 
    difficulty, 
    currentRound,
    isRoundStarting,
    countdown,
    winner,
    startGame, 
    pauseGame, 
    resumeGame, 
    resetGame, 
    setDifficulty,
    setCountdown,
    startNewRound,
  } = useGameStore();

  useEffect(() => {
    if (isRoundStarting && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (isRoundStarting && countdown === 0) {
      startNewRound();
    }
  }, [isRoundStarting, countdown]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="flex justify-between p-4">
        <div className="text-2xl font-bold text-white">
          {score.player} - {score.computer}
          <div className="text-sm mt-1">Round {currentRound}/10</div>
        </div>
        
        {!gameStarted ? (
          <div className="pointer-events-auto flex flex-col items-center gap-4 bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <Trophy className="w-12 h-12 text-yellow-400" />
            <h1 className="text-3xl font-bold text-white">3D Ping Pong</h1>
            {winner ? (
              <div className="text-2xl font-bold text-white">
                {winner === 'player' ? 'You Won! 🎉' : 'Computer Wins! 🤖'}
              </div>
            ) : null}
            <select
              className="bg-white/20 text-white p-2 rounded"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as any)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <button
              className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600"
              onClick={startGame}
            >
              {winner ? 'Play Again' : 'Start Game'}
            </button>
          </div>
        ) : (
          <>
            {isRoundStarting && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="text-6xl font-bold text-white animate-bounce">
                  {countdown}
                </div>
              </div>
            )}
            <div className="pointer-events-auto">
              {isPaused ? (
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={resumeGame}
                >
                  Resume
                </button>
              ) : (
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                  onClick={pauseGame}
                >
                  Pause
                </button>
              )}
              <button
                className="ml-2 bg-red-500 text-white px-4 py-2 rounded"
                onClick={resetGame}
              >
                Reset
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}


