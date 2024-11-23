import styles from "./CGbox.module.css";
import { useScreenMode } from "../../context/ScreenContext";
import { useAppOption } from "../../context/AppOptionContext";
import { useMediaTouchControl } from "../../hooks/useMediaTouchControl";
import { useEffectState } from "../../context/EffectStateContext/EffectStateContext";
import CG from "./CG";
import EffectImage from "../EffectImage/EffectImage";
import ControlParts from "./ControlParts";

type PropsType = {
  triggerEditMode: (e: React.MouseEvent<HTMLDivElement>, reset?: boolean) => void;
  changeMediaScale: (e: React.WheelEvent) => void;
  moveMediaReverse: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const CGbox = ({ data }: { data: PropsType }) => {
  const { triggerEditMode, changeMediaScale, moveMediaReverse } = data;

  const { screenMode } = useScreenMode();
  const { effectState } = useEffectState();
  const { optionData } = useAppOption();
  const { handleTouchStart, handleTouchMove } = useMediaTouchControl({ target: "image" });

  const shakeCondition = {
    low: effectState.shakeEffect.active && effectState.shakeEffect.heavy === "low",
    normal: effectState.shakeEffect.active && effectState.shakeEffect.heavy === "normal",
    high: effectState.shakeEffect.active && effectState.shakeEffect.heavy === "high",
  };

  return (
    <div
      className={`${styles["img-box"]}
      ${shakeCondition.low ? styles.shakeLow : ""}
      ${shakeCondition.normal ? styles.shakeNormal : ""}
      ${shakeCondition.high ? styles.shakeHigh : ""}
      `}
    >
      <div
        className={`${styles["blendMode"]} ${optionData.cgSwing && styles.swing}`}
        onMouseDown={triggerEditMode}
        onMouseMove={moveMediaReverse}
        onWheel={changeMediaScale}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        style={{ height: screenMode === "cardMode" ? "100%" : undefined }}
      >
        <CG className="cg-img" />
        {effectState.blendCG.active && effectState.filterEffect.targetCard && (
          <CG className="texture-img" />
        )}
        {effectState.imageEF.activeImage && <EffectImage />}
      </div>

      <ControlParts />
    </div>
  );
};

export default CGbox;
