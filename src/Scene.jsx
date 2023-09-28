import {
  useGLTF,
  useAnimations,
  useVideoTexture,
  TransformControls,
  PivotControls,
  GizmoHelper,
  GizmoViewport,
  Center,
} from "@react-three/drei";
import { Suspense, useEffect } from "react";
import { useRef } from "react";

export function Scene(props) {
  const { scene, animations, nodes } = useGLTF("/Machine2.glb");
  const meshRef = useRef();
  const { actions } = useAnimations(animations, scene);
  const texture = useVideoTexture(
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  );
  console.log(texture);
  useEffect(() => {
    for (const key in actions) {
      actions[key].play();
    }
    console.log(meshRef.current.position);
  }, []);

  return (
    <>
      <primitive object={scene} {...props} />
      <mesh
        position={[0.55, 0.54, -0.15]}
        rotation={[0, -0.58, 0]}
        scale={[0.9, 0.7, 1]}
      >
        <planeGeometry />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      <mesh
        ref={meshRef}
        position={[-1.54, 0.135, 0.1]}
        // position={[-1.6, 0.15, 0.3]}
        rotation={[0, 1, 0]}
        scale={[0.4, 0.4, 0]}
      >
        <planeGeometry />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {/* <group
        position={props.position}
        rotation={[Math.PI / 0.5, Math.PI / 0.24, Math.PI / 0.7]}
        scale={0.1}
      >
        <mesh
          geometry={nodes.screenOne.geometry}
          position={nodes.screenOne.position}
          rotation={nodes.screenOne.rotation}
          scale={nodes.screenOne.scale}
        >
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      </group> */}
    </>
  );
}
