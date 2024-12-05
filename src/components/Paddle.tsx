import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder } from '@react-three/drei';
import { useGameStore } from '../store/gameStore';
import { GAME_CONSTANTS } from '../utils/constants';
import { Mesh } from 'three';

interface MalletProps {
  isComputer?: boolean;
}

export function Mallet({ isComputer = false }: MalletProps) {
  const malletRef = useRef<Mesh>(null);
  const { gameStarted, isPaused, difficulty } = useGameStore();

  useFrame((state) => {
    if (!gameStarted || isPaused || !malletRef.current) return;

    if (isComputer) {
      const puck = state.scene.getObjectByName('puck');
      if (puck) {
        const speed = difficulty === 'easy' ? 0.04 : 
                     difficulty === 'medium' ? 0.06 : 0.08;
        
        const targetX = puck.position.x;
        const targetZ = Math.min(-0.5, puck.position.z);
        
        const currentX = malletRef.current.position.x;
        const currentZ = malletRef.current.position.z;
        
        malletRef.current.position.x += (targetX - currentX) * speed;
        malletRef.current.position.z += (targetZ - currentZ) * speed;
        
        malletRef.current.position.x = Math.max(-3.5, Math.min(3.5, malletRef.current.position.x));
        malletRef.current.position.z = Math.max(-4.5, Math.min(-0.5, malletRef.current.position.z));
      }
    } else {
      const mouseX = state.mouse.x * 3.5;
      const mouseY = -state.mouse.y;
      const z = (mouseY * 4.5) + 1.5;
      
      malletRef.current.position.x = Math.max(-3.5, Math.min(3.5, mouseX));
      malletRef.current.position.z = Math.max(0.5, Math.min(4.5, z));
    }
  });

  return (
    <Cylinder
      ref={malletRef}
      name={isComputer ? 'computerPaddle' : 'playerPaddle'}
      args={[
        GAME_CONSTANTS.PADDLE.RADIUS,
        GAME_CONSTANTS.PADDLE.RADIUS * 0.8,
        GAME_CONSTANTS.PADDLE.HEIGHT,
        32
      ]}
      position={[0, GAME_CONSTANTS.PADDLE.HEIGHT / 2, isComputer ? -2.5 : 2.5]}
      castShadow
    >
      <meshStandardMaterial
        color={isComputer ? "#ef4444" : "#22c55e"}
        metalness={0.6}
        roughness={0.2}
        emissive={isComputer ? "#ef4444" : "#22c55e"}
        emissiveIntensity={0.2}
      />
    </Cylinder>
  );
}

