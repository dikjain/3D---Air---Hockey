import { Box } from '@react-three/drei';

export function Table() {
  return (
    <group>
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