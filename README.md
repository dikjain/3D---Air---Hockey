# 3D Ping Pong Game

A modern implementation of the classic table tennis game built with React, Three.js, and React Three Fiber.
i've used ai in writing the readme as i don't know how to do it and also used ai to fix errors i was facing in making physics thing work properly as i am not much familiar with 3d physics in wed-d.

## Features

- Realistic 3D graphics and physics
- Responsive paddle control using mouse movement
- Intelligent computer opponent with adjustable difficulty levels
- Score tracking and game state management
- Pause/Resume functionality
- Beautiful UI with game controls

## How to Play

1. Select your preferred difficulty level (Easy, Medium, or Hard)
2. Click "Start Game" to begin
3. Move your mouse left and right to control the green paddle
4. Try to hit the ball past the computer's red paddle
5. First player to reach the winning score wins!

## Controls

- Mouse Movement: Control your paddle (green)
- Pause Button: Pause the current game
- Reset Button: Start a new game
- Difficulty Selector: Choose AI opponent difficulty

## Technical Stack

- React
- Three.js
- React Three Fiber
- Zustand (State Management)
- TailwindCSS
- TypeScript

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Architecture

The game is built with a modular architecture:

- `components/`: React components for game elements
  - `Table.tsx`: 3D table model
  - `Ball.tsx`: Ball physics and movement
  - `Paddle.tsx`: Player and computer paddle logic
  - `UI.tsx`: Game interface and controls
- `store/`: State management
  - `gameStore.ts`: Game state and score tracking

## Contributing

Feel free to submit issues and enhancement requests!