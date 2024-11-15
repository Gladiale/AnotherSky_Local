import styles from "./EffectBox.module.css";
import { useEffectState } from "../../context/EffectState/EffectStateContext";
import { type EffectStateType } from "../../context/EffectState/effectStateInit";
import RadioBox from "./RadioBox";

const EffectBox = () => {
  const { effectState, effectStateDispatch } = useEffectState();

  const changeHeavy = (heavy: EffectStateType["shakeEffect"]["heavy"]) => {
    effectStateDispatch({ type: "shakeHeavy", payload: heavy });
  };

  const radioChecked = {
    low: effectState.shakeEffect.heavy === "low",
    normal: effectState.shakeEffect.heavy === "normal",
    high: effectState.shakeEffect.heavy === "high",
  };

  return (
    <div className={styles["effect-box"]}>
      <label>
        <span>PixelateEffect</span>
        <input
          type="checkbox"
          checked={effectState.pixelEffect}
          onChange={() => effectStateDispatch({ type: "pixel" })}
        />
      </label>
      <div className={styles["shake-box"]}>
        <RadioBox
          radioName="heavy"
          radioSpanList={["軽", "中", "重"]}
          radioCheckList={[radioChecked.low, radioChecked.normal, radioChecked.high]}
          radioChangeFuncList={[
            () => changeHeavy("low"),
            () => changeHeavy("normal"),
            () => changeHeavy("high"),
          ]}
        />
        <label>
          <span>ShakeEffect</span>
          <input
            type="checkbox"
            checked={effectState.shakeEffect.active}
            onChange={() => effectStateDispatch({ type: "shake" })}
          />
        </label>
      </div>
    </div>
  );
};

export default EffectBox;
