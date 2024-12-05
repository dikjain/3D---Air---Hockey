import { Vector3 } from 'three';
import { GAME_CONSTANTS } from './constants';

export function calculateVelocity(
  currentVel: { x: number; z: number },
  paddlePos: Vector3,
  puckPos: Vector3,
  difficulty: 'easy' | 'medium' | 'hard'
): { x: number; z: number } {
  const dx = puckPos.x - paddlePos.x;
  const dz = puckPos.z - paddlePos.z;
  const distance = Math.sqrt(dx * dx + dz * dz);
  const nx = dx / distance;
  const nz = dz / distance;
  const difficultyMultiplier = 
    difficulty === 'easy' ? 0.7 :
    difficulty === 'medium' ? 0.85 : 1;
  const speed = GAME_CONSTANTS.PUCK.INITIAL_SPEED * 
    GAME_CONSTANTS.PHYSICS.PADDLE_FORCE_MULTIPLIER * 
    difficultyMultiplier;
  let newVx = nx * speed;
  let newVz = nz * speed;
  const currentSpeed = Math.sqrt(newVx * newVx + newVz * newVz);
  if (currentSpeed > GAME_CONSTANTS.PUCK.MAX_SPEED) {
    const scale = GAME_CONSTANTS.PUCK.MAX_SPEED / currentSpeed;
    newVx *= scale;
    newVz *= scale;
  }
  return { x: newVx, z: newVz };
}

export function applyFriction(velocity: { x: number; z: number }): { x: number; z: number } {
  return {
    x: velocity.x * GAME_CONSTANTS.PHYSICS.FRICTION,
    z: velocity.z * GAME_CONSTANTS.PHYSICS.FRICTION
  };
}

export function getInitialVelocity(): { x: number; z: number } {
  const angle = Math.random() * Math.PI * 2;
  return {
    x: Math.cos(angle) * GAME_CONSTANTS.PUCK.INITIAL_SPEED * 0.5,
    z: Math.sin(angle) * GAME_CONSTANTS.PUCK.INITIAL_SPEED * 0.5
  };
}

export function constrainPosition(position: Vector3): Vector3 {
  const maxX = (7 / 2) - GAME_CONSTANTS.PUCK.RADIUS;
  const maxZ = (9 / 2) - GAME_CONSTANTS.PUCK.RADIUS;
  return new Vector3(
    Math.max(-maxX, Math.min(maxX, position.x)),
    GAME_CONSTANTS.PUCK.HEIGHT / 2,
    Math.max(-maxZ, Math.min(maxZ, position.z))
  );
}
