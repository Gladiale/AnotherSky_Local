import styles from "./PackingBox.module.css";
import { useEffectState } from "../../../context/EffectStateContext/EffectStateContext";
import { type EffectStateType } from "../../../context/EffectStateContext/effectStateInit";
import RadioBox from "../../Common/RadioBox";
import CheckBox from "../../Common/CheckBox";
import PartsBox from "../../Common/PartsBox";

const PackingBox = () => {
  const { effectState, effectStateDispatch } = useEffectState();

  const changeHeavy = (heavy: EffectStateType["shake"]["heavy"]) => {
    effectStateDispatch({ type: "shakeHeavy", payload: heavy });
  };

  const radioChecked = {
    low: effectState.shake.heavy === "low",
    normal: effectState.shake.heavy === "normal",
    high: effectState.shake.heavy === "high",
  };

  return (
    <div className={styles["packing-box"]}>
      <CheckBox
        kind="2nd"
        fontSize={1}
        checkBoxSize={0.8}
        gap={{
          outerGap: "0",
          innerGap: "0.2rem",
        }}
        checkBoxList={[
          {
            text: "PixelateEffect",
            state: effectState.pixel,
            onChange: () => effectStateDispatch({ type: "active", payload: "pixel" }),
          },
        ]}
      />

      <div className={styles["shake-box"]}>
        <RadioBox
          radioName="heavy"
          radioList={[
            {
              text: "軽",
              state: radioChecked.low,
              onChange: () => changeHeavy("low"),
            },
            {
              text: "中",
              state: radioChecked.normal,
              onChange: () => changeHeavy("normal"),
            },
            {
              text: "重",
              state: radioChecked.high,
              onChange: () => changeHeavy("high"),
            },
          ]}
        />
        <CheckBox
          kind="2nd"
          fontSize={1}
          checkBoxSize={0.8}
          gap={{
            outerGap: "0",
            innerGap: "0.2rem",
          }}
          checkBoxList={[
            {
              text: "ShakeEffect",
              state: effectState.shake.active,
              onChange: () => effectStateDispatch({ type: "active", payload: "shake" }),
            },
          ]}
        />
      </div>

      <PartsBox
        title="MixEffect"
        message={effectState.cgMix.mixMode}
        onPrevClick={() =>
          effectStateDispatch({
            type: "mix",
            payload: {
              target: "cgMix",
              changeKey: "prev",
            },
          })
        }
        onNextClick={() =>
          effectStateDispatch({
            type: "mix",
            payload: {
              target: "cgMix",
              changeKey: "next",
            },
          })
        }
        onBoxClick={() => {
          effectStateDispatch({
            type: "mixSpecific",
            payload: "cgMix",
          });
        }}
      />
    </div>
  );
};

export default PackingBox;
