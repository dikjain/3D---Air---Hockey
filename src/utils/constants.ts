export const GAME_CONSTANTS = {
  PUCK: {
    RADIUS: 0.15,
    HEIGHT: 0.05,
    INITIAL_SPEED: 0.04,
    MAX_SPEED: 0.2,
    MIN_SPEED: 0.02
  },
  TABLE: {
    WIDTH: 7,
    LENGTH: 9,
    WALL_HEIGHT: 0.2,
    GOAL_WIDTH: 1.4
  },
  PADDLE: {
    RADIUS: 0.2,
    HEIGHT: 0.15
  },
  PHYSICS: {
    FRICTION: 0.995,
    RESTITUTION: 0.85,
    PADDLE_FORCE_MULTIPLIER: 1.5
  }
} as const;