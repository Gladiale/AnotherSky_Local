import styles from "./CGbox.module.css";
import { useAppOption } from "../../context/AppOptionContext";
import { useEffectState } from "../../context/EffectStateContext/EffectStateContext";
import CG from "./CG";
import EffectImage from "../EffectImage/EffectImage";
import ControlParts from "./ControlParts";

type PropsType = {
  triggerEditMode: (e: React.MouseEvent<HTMLDivElement>, reset?: boolean) => void;
  changeImageScale: (e: React.WheelEvent) => void;
  moveImageReverse: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const CGbox = ({ data }: { data: PropsType }) => {
  const { triggerEditMode, changeImageScale, moveImageReverse } = data;

  const { effectState } = useEffectState();
  const { optionData } = useAppOption();

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
        onMouseMove={moveImageReverse}
        onWheel={changeImageScale}
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