import { Vector3 } from 'three';
import { Box } from '@react-three/drei';

const TABLE_WIDTH = 7;
const TABLE_LENGTH = 9;
const GOAL_WIDTH = 1.4;
const PUCK_RADIUS = 0.1;
const PADDLE_RADIUS = 0.1;

export function checkPaddleCollision(
  puckPos: Vector3,
  paddlePos: Vector3
): boolean {
  const distance = Math.sqrt(
    Math.pow(puckPos.x - paddlePos.x, 2) +
    Math.pow(puckPos.z - paddlePos.z, 2)
  );
  
  return distance <= (PADDLE_RADIUS + PUCK_RADIUS);
}

export function checkWallCollision(position: Vector3): { collision: boolean; type: 'side' | 'end' | null } {
  const sideWallCollision = Math.abs(position.x) >= (TABLE_WIDTH / 2 - PUCK_RADIUS);
  const endWallCollision = Math.abs(position.z) >= (TABLE_LENGTH / 2 - PUCK_RADIUS);
  
  if (sideWallCollision) return { collision: true, type: 'side' };
  if (endWallCollision && !isInGoalArea(position)) return { collision: true, type: 'end' };
  
  return { collision: false, type: null };
}

export function isInGoalArea(position: Vector3): boolean {
  return Math.abs(position.x) < GOAL_WIDTH / 2;
}

export function checkGoal(position: Vector3): 'player' | 'computer' | null {
  if (!isInGoalArea(position)) return null;
  
  if (position.z > TABLE_LENGTH / 2) {
    return 'player';
  } else if (position.z < -TABLE_LENGTH / 2) {
    return 'computer';
  }
  
  return null;
}
