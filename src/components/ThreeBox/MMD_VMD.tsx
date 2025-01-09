import { useLayoutEffect, useState } from "react";
import { useUrlConfig } from "../../hooks/useUrlConfig";
import { useThreeState } from "../../context/ThreeContext/ThreeContext";
// three js
import { useFrame, useLoader } from "@react-three/fiber";
import { ContactShadows, useTexture } from "@react-three/drei";
import { MMDAnimationHelper, MMDLoader } from "three/examples/jsm/Addons.js";
import { type AnimationClip } from "three";

// 参考
// https://github.com/pmndrs/react-three-fiber/discussions/1054
// https://zenn.dev/raihara3/articles/20220505_threejs_material

const MMD_VMD = () => {
  const { threeState } = useThreeState();
  const { urlConfig } = useUrlConfig();
  const [mmdHelper, setMmdHelper] = useState<MMDAnimationHelper>(null!);

  const mesh = useLoader(MMDLoader, urlConfig.mmd.model);
  const matCap = useTexture(urlConfig.mmd.matCap);

  useFrame(() => {
    threeState.actionMode === "motion" && mmdHelper.update(threeState.motionSpeed);
  });

  useLayoutEffect(() => {
    const loader = new MMDLoader();
    const helper = new MMDAnimationHelper();

    // 毎回デフォルトPoseに復元 (loadVPDの第二引数をtrueにすれば, poseのデータが読み込めないので、デフォルトの姿に戻れます)
    threeState.actionMode === "pose"
      ? loader.loadVPD(urlConfig.mmd.pose, false, (pose) => {
          helper.pose(mesh, pose);
        })
      : loader.loadVPD(urlConfig.mmd.pose, true, (pose) => {
          helper.pose(mesh, pose, { resetPose: true });
        });

    // モーション
    loader.loadAnimation(urlConfig.mmd.motion, mesh, (motion) => {
      helper.add(mesh, {
        animation: motion as AnimationClip,
        physics: true,
        // gravity: 1000,
      });
    });

    setMmdHelper(helper);
  }, [threeState.actionMode, urlConfig.mmd.motion, urlConfig.mmd.pose]);

  return (
    <>
      {/* 主体 */}
      <primitive
        object={mesh}
        dispose={null}
        position={[0, -10.9, 0]}
        castShadow
        receiveShadow
      >
        {threeState.active.matCap && <meshMatcapMaterial matcap={matCap} />}
      </primitive>

      {/* 影 */}
      <ContactShadows
        far={20}
        blur={2.4}
        opacity={0.7}
        resolution={256}
        color={"#000"}
        position={[0, -10.9, 0]}
      />
    </>
  );
};

export default MMD_VMD;
