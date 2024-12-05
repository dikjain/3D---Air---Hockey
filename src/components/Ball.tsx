import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Box } from '@react-three/drei';
import { Mesh } from 'three';
import { useGameStore } from '../store/gameStore';
import { GAME_CONSTANTS } from '../utils/constants';
import { checkPaddleCollision, checkWallCollision, checkGoal } from '../utils/collisions';
import { calculateVelocity, applyFriction, getInitialVelocity, constrainPosition } from '../utils/physics';

export function Puck() {
  const puckRef = useRef<Mesh>(null);
  const velocityRef = useRef(getInitialVelocity());
  const { 
    gameStarted, 
    isPaused, 
    incrementScore, 
    difficulty,
    isRoundStarting,
  } = useGameStore();

  useFrame((state) => {
    if (!gameStarted || isPaused || isRoundStarting || !puckRef.current) return;

    const puck = puckRef.current;
    
    puck.position.x += velocityRef.current.x;
    puck.position.z += velocityRef.current.z;

    const wallCollision = checkWallCollision(puck.position);
    if (wallCollision.collision) {
      if (wallCollision.type === 'side') {
        velocityRef.current.x *= -GAME_CONSTANTS.PHYSICS.RESTITUTION;
      } else if (wallCollision.type === 'end') {
        velocityRef.current.z *= -GAME_CONSTANTS.PHYSICS.RESTITUTION;
      }
      puck.position.copy(constrainPosition(puck.position));
    }

    const playerPaddle = state.scene.getObjectByName('playerPaddle');
    const computerPaddle = state.scene.getObjectByName('computerPaddle');

    if (playerPaddle && computerPaddle) {
      if (checkPaddleCollision(puck.position, playerPaddle.position)) {
        velocityRef.current = calculateVelocity(
          velocityRef.current,
          playerPaddle.position,
          puck.position,
          difficulty
        );
      }

      if (checkPaddleCollision(puck.position, computerPaddle.position)) {
        velocityRef.current = calculateVelocity(
          velocityRef.current,
          computerPaddle.position,
          puck.position,
          difficulty
        );
      }
    }

    velocityRef.current = applyFriction(velocityRef.current);

    const goalScored = checkGoal(puck.position);
    if (goalScored) {
      incrementScore(goalScored);
      resetPuck();
    }

    const speed = Math.sqrt(
      velocityRef.current.x * velocityRef.current.x + 
      velocityRef.current.z * velocityRef.current.z
    );
    puck.rotation.x += velocityRef.current.z * speed * 0.1;
    puck.rotation.z -= velocityRef.current.x * speed * 0.1;
  });

  const resetPuck = () => {
    if (!puckRef.current) return;
    puckRef.current.position.set(0, GAME_CONSTANTS.PUCK.HEIGHT / 2, 0);
    velocityRef.current = getInitialVelocity();
  };

  useEffect(() => {
    resetPuck();
  }, [gameStarted, isRoundStarting]);

  return (
    <group>
      <Cylinder
        ref={puckRef}
        name="puck"
        args={[
          GAME_CONSTANTS.PUCK.RADIUS,
          GAME_CONSTANTS.PUCK.RADIUS,
          GAME_CONSTANTS.PUCK.HEIGHT,
          32
        ]}
        position={[0, GAME_CONSTANTS.PUCK.HEIGHT / 2, 0]}
        rotation={[0, 0, 0]}
        castShadow
      >
        <meshStandardMaterial 
          color="#ff4444"
          roughness={0.3}
          metalness={0.7}
          emissive="#ff4444"
          emissiveIntensity={0.2}
        />
      </Cylinder>
      <Box
        args={[7, 0.1, 9]}
        position={[0, -0.05, 0]}
        receiveShadow
      >
        <meshStandardMaterial 
          color="#1e40af"
          roughness={0.2}
          metalness={0.1}
        />
      </Box>
      
      <Box
        args={[1.4, 0.002, 0.1]}
        position={[0, 0.002, 4.5]}
      >
        <meshStandardMaterial 
          color="#ef4444"
          emissive="#ef4444"
          emissiveIntensity={0.3}
        />
      </Box>
      <Box
        args={[1.4, 0.002, 0.1]}
        position={[0, 0.002, -4.5]}
      >
        <meshStandardMaterial 
          color="#22c55e"
          emissive="#22c55e"
          emissiveIntensity={0.3}
        />
      </Box>
      
      <Box
        args={[0.1, 0.2, 9]}
        position={[3.5, 0.1, 0]}
      >
        <meshStandardMaterial 
          color="#64748b"
          metalness={0.6}
          roughness={0.2}
        />
      </Box>
      <Box
        args={[0.1, 0.2, 9]}
        position={[-3.5, 0.1, 0]}
      >
        <meshStandardMaterial 
          color="#64748b"
          metalness={0.6}
          roughness={0.2}
        />
      </Box>
    </group>
  );
}
