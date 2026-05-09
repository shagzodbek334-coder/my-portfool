import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Torus, MeshDistortMaterial, OrbitControls } from '@react-three/drei';

function NeonSphere() {
  const meshRef = useRef();
  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
  });
  return (
    <Sphere ref={meshRef} args={[1.2, 64, 64]}>
      <MeshDistortMaterial
        color="#00ff9f"
        emissive="#00ff9f"
        emissiveIntensity={0.4}
        distort={0.4}
        speed={2}
        roughness={0.1}
        metalness={0.8}
        wireframe={false}
      />
    </Sphere>
  );
}

function NeonRing() {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * 0.6;
    ref.current.rotation.z = state.clock.elapsedTime * 0.3;
  });
  return (
    <Torus ref={ref} args={[1.8, 0.04, 16, 100]}>
      <meshStandardMaterial
        color="#00d4ff"
        emissive="#00d4ff"
        emissiveIntensity={1}
      />
    </Torus>
  );
}

function NeonRing2() {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.4;
    ref.current.rotation.x = Math.PI / 3;
  });
  return (
    <Torus ref={ref} args={[2.2, 0.03, 16, 100]}>
      <meshStandardMaterial
        color="#7b2fff"
        emissive="#7b2fff"
        emissiveIntensity={1}
      />
    </Torus>
  );
}

export default function Scene3D() {
  return (
    <div className="scene3d">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#00ff9f" />
        <pointLight position={[-5, -5, -5]} intensity={1} color="#00d4ff" />
        <Suspense fallback={null}>
          <NeonSphere />
          <NeonRing />
          <NeonRing2 />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.5}
        />
      </Canvas>
    </div>
  );
}
