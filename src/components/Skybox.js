import { BackSide } from "three";
import {
  useVideoTexture,
  useTexture,
  Float,
  Edges,
  Plane,
  MeshDistortMaterial,
} from "@react-three/drei";

export default function SkyBox(props) {
  const texture = useVideoTexture(props.imageUrl);

  return (
    <mesh
      userData={{ lensflare: "no-occlusion" }}
      scale={[2, 1, 1]}
      rotation={[0, -4.6, 0]}
    >
      <sphereGeometry
        castShadow={false}
        receiveShadow={false}
        args={[5, 32, 32]}
      />
      <meshBasicMaterial toneMapped={false} map={texture} side={BackSide} />
    </mesh>
  );
}
