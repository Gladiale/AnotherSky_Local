import { useLayoutEffect, useState } from "react";
import { ContactShadows } from "@react-three/drei";
import { useUrlConfig } from "../../hooks/useUrlConfig";
import { useThreeState } from "../../context/ThreeContext/ThreeContext";
// three js
import { useFrame, useLoader } from "@react-three/fiber";
import { MMDAnimationHelper, MMDLoader } from "three/examples/jsm/Addons.js";
import { type AnimationClip } from "three";

// 参考
// https://github.com/pmndrs/react-three-fiber/discussions/1054

const MMD_VMD = () => {
  const { threeState } = useThreeState();
  const { urlConfig } = useUrlConfig();

  const mmdUrl = {
    model: urlConfig.mmd.model,
    motion: urlConfig.mmd.motion,
    pose: urlConfig.mmd.pose,
    tPose: "/mmd/pose/T-POSE-削除不可.vpd",
  };

  const [mmdHelper, setMmdHelper] = useState<MMDAnimationHelper>(null!);
  const mesh = useLoader(MMDLoader, mmdUrl.model);

  useFrame(() => {
    threeState.actionMode === "motion" && mmdHelper.update(threeState.motionSpeed);
  });

  useLayoutEffect(() => {
    const loader = new MMDLoader();
    const helper = new MMDAnimationHelper();

    // 毎回T-Poseに復元
    threeState.actionMode === "pose"
      ? loader.loadVPD(mmdUrl.pose, true, (pose) => {
          helper.pose(mesh, pose);
        })
      : loader.loadVPD(mmdUrl.tPose, true, (pose) => {
          helper.pose(mesh, pose, { resetPose: true });
        });

    // モーション
    loader.loadAnimation(mmdUrl.motion, mesh, (motion) => {
      helper.add(mesh, {
        animation: motion as AnimationClip,
        physics: true,
        // gravity: 1000,
      });
    });

    setMmdHelper(helper);
  }, [threeState.actionMode, mmdUrl.motion]);

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
        {/* <meshStandardMaterial metalness={0} roughness={0} map={imageTexture} /> */}
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
