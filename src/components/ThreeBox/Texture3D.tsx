import { Plane, Sparkles, useTexture } from "@react-three/drei";
import { useUrlConfig } from "../../hooks/useUrlConfig";
import { DoubleSide } from "three";

const Texture3D = ({
  scale = Float32Array.from({ length: 50 }, () => 5 + Math.random() * 4),
}) => {
  const { urlConfig } = useUrlConfig();
  // メインテクスチャがmap
  const imageTexture = useTexture({
    map: urlConfig.cg,
    displacementMap: "/mmd/pose/texture/ldem_3_8bit.jpg",
  });

  return (
    <>
      {/* Sphereは球体オブジェクト */}
      <Sparkles
        count={scale.length}
        size={scale}
        position={[0, 0.9, 0]}
        scale={[4, 1.5, 4]}
        speed={0.8}
      />
      {/* Planeは平面状の壁や地面のようのを表現できるのオブジェクト */}
      <Plane receiveShadow args={[20, 20, 128, 128]} position={[0, 0, -5]}>
        {/* {...imageTexture} はmap={imageTexture.map} displacementMap={imageTexture.displacementMap}と同じ意味になります */}
        {/* pngの透過画像が設定された場合はtransparentを加える */}
        <meshStandardMaterial side={DoubleSide} {...imageTexture} transparent />
      </Plane>
    </>
  );
};

export default Texture3D;
