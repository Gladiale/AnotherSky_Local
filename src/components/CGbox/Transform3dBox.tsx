import styles from "./Transform3dBox.module.css";
import { useTransform3d } from "../../hooks/useTransform3d";
import { useScreenMode } from "../../context/ScreenContext";
import { useThreeState } from "../../context/ThreeContext/ThreeContext";
import { useAppOption } from "../../context/AppOptionContext/AppOptionContext";
import { useEffectState } from "../../context/EffectStateContext/EffectStateContext";
// components
import CG from "./CG";
import ThreeBox from "../ThreeBox/ThreeBox";
import EffectImage from "../EffectImage/EffectImage";

const Transform3dBox = () => {
  const { appOption } = useAppOption();
  const { screenMode } = useScreenMode();
  const { threeState } = useThreeState();
  const { effectState } = useEffectState();
  const { transform3d, changeTransform3d, resetTransform3d } = useTransform3d();

  const isMixMode =
    effectState.cgMix && effectState.target.cg && effectState.cgMix.mixMode !== "normal";

  return (
    <div
      className={styles["transform-3d-box"]}
      style={{
        height: screenMode === "cardMode" ? "100%" : undefined,
        transform: appOption.parallax ? transform3d : undefined,
      }}
      onMouseMove={appOption.parallax ? changeTransform3d : undefined}
      onMouseLeave={appOption.parallax ? resetTransform3d : undefined}
    >
      <CG />
      {isMixMode && (
        <CG className="texture-img" mixBlendMode={effectState.cgMix.mixMode} />
      )}
      {threeState.active.threeD && <ThreeBox />}
      {effectState.image.active && <EffectImage />}
    </div>
  );
};

export default Transform3dBox;
