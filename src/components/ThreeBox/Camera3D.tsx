import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// components
import MMD_VMD from "./MMD_VMD";
import Loading from "../Loading/Loading";

// 参考
// https://gmo-miyazaki-creators.com/coding/three-js-01/

const Camera3D = () => {
  return (
    <Suspense fallback={<Loading kind={"main"} loadStatus="waiting" />}>
      <Canvas
        shadows
        dpr={window.devicePixelRatio}
        camera={{ fov: 50, position: [0, 0, 24] }}
      >
        {/* 光 */}
        {/* <ambientLight intensity={3} color="white" /> */}
        <hemisphereLight intensity={4} color="white" groundColor="black" />

        {/* モデル主体 */}
        <MMD_VMD />

        {/* コントロール */}
        <OrbitControls makeDefault />

        {/* カメラ */}
        {/* <CameraShake
          maxYaw={0.1} // Max amount camera can yaw in either direction
          maxPitch={0.1} // Max amount camera can pitch in either direction
          maxRoll={0.1} // Max amount camera can roll in either direction
          yawFrequency={0.1} // Frequency of the the yaw rotation
          pitchFrequency={0.1} // Frequency of the pitch rotation
          rollFrequency={0.1} // Frequency of the roll rotation
          intensity={1} // initial intensity of the shake
          decayRate={0.65} // if decay = true this is the rate at which intensity will reduce at />
        /> */}
      </Canvas>
    </Suspense>
  );
};

export default Camera3D;
