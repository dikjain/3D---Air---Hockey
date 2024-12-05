import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { Table } from './components/Table';
import { Puck } from './components/Ball';
import { Mallet } from './components/Paddle';
import { UI } from './components/UI';
import { P3Primaries } from 'three';

function App() {
  return (
    <div className="w-full h-screen bg-gray-900">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 8, 8]} fov={50} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          target={[0, 0, 0]}
        />
        
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight
          position={[-5, 10, -5]}
          intensity={0.5}
          castShadow
        />
        
        <pointLight position={[0, 2, 4]} intensity={0.3} />
        <pointLight position={[0, 2, -4]} intensity={0.3} />
        <Table />
        <Puck />
        <Mallet />
        <Mallet isComputer />
      </Canvas>
      <UI />
    </div>
  );
}

export default App;

