import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  ContactShadows,
  OrbitControls,
  Center,
} from "@react-three/drei";
import { Effects } from "./Effects";
import { Scene } from "./Scene";
import { Leva } from "leva";
import { Suspense } from "react";
import Loader from "./Loader";

export default function App() {
  return (
    <>
      <Leva hidden />
      <Suspense fallback={<Loader />}>
        <Canvas
          gl={{ logarithmicDepthBuffer: true, antialias: false }}
          dpr={[1, 1.5]}
          camera={{
            position: [0, 0, 10],
            fov: 25,
          }}
        >
          <color attach="background" args={["#2d4967"]} />
          <spotLight
            position={[0, 15, 0]}
            angle={0.3}
            penumbra={1}
            castShadow
            intensity={20}
            shadow-bias={-0.0001}
          />
          <ambientLight intensity={1} />

          <Center>
            <Scene
              rotation={[0, Math.PI / 0.55, 0]}
              scale={0.015}
              position={[0, 0.3, 0]}
            />
          </Center>

          <hemisphereLight intensity={0.5} />
          <ContactShadows
            resolution={1024}
            frames={5}
            position={[0, -1.28, 0]}
            scale={55}
            blur={0.5}
            opacity={1}
            far={20}
          />
          <mesh
            scale={4}
            position={[3, -1.25, -1.5]}
            rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}
          >
            <ringGeometry args={[0.9, 1, 4, 1]} />
            <meshStandardMaterial color="white" roughness={0.75} />
          </mesh>
          <mesh
            scale={4}
            position={[-3, -1.25, -1]}
            rotation={[-Math.PI / 2, 0, Math.PI / 1.2]}
          >
            <ringGeometry args={[0.9, 1, 3, 1]} />
            <meshStandardMaterial color="white" roughness={0.75} />
          </mesh>
          {/* We're building a cube-mapped environment declaratively.
          Anything you put in here will be filmed (once) by a cubemap-camera
          and applied to the scenes environment, and optionally background. */}
          <Environment resolution={512}>
            {/* Ceiling */}
            <Lightformer
              intensity={2}
              rotation-x={Math.PI / 2}
              position={[0, 4, -9]}
              scale={[10, 1, 1]}
            />
            <Lightformer
              intensity={2}
              rotation-x={Math.PI / 2}
              position={[0, 4, -6]}
              scale={[10, 1, 1]}
            />
            <Lightformer
              intensity={2}
              rotation-x={Math.PI / 2}
              position={[0, 4, -3]}
              scale={[10, 1, 1]}
            />
            <Lightformer
              intensity={2}
              rotation-x={Math.PI / 2}
              position={[0, 4, 0]}
              scale={[10, 1, 1]}
            />
            <Lightformer
              intensity={2}
              rotation-x={Math.PI / 2}
              position={[0, 4, 3]}
              scale={[10, 1, 1]}
            />
            <Lightformer
              intensity={2}
              rotation-x={Math.PI / 2}
              position={[0, 4, 6]}
              scale={[10, 1, 1]}
            />
            <Lightformer
              intensity={2}
              rotation-x={Math.PI / 2}
              position={[0, 4, 9]}
              scale={[10, 1, 1]}
            />
            {/* Sides */}
            <Lightformer
              intensity={2}
              rotation-y={Math.PI / 2}
              position={[-50, 2, 0]}
              scale={[100, 2, 1]}
            />
            <Lightformer
              intensity={2}
              rotation-y={-Math.PI / 2}
              position={[50, 2, 0]}
              scale={[100, 2, 1]}
            />
            {/* Key */}
            <Lightformer
              form="ring"
              color="white"
              intensity={20}
              scale={5}
              position={[10, 5, 10]}
              onUpdate={(self) => self.lookAt(0, 0, 0)}
            />
          </Environment>
          <Effects />
          <OrbitControls makeDefault />
        </Canvas>
      </Suspense>
    </>
  );
}
