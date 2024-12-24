import styles from "./EffectControl.module.css";
import { GiFairyWand } from "react-icons/gi";
import { useEffectState } from "../../../context/EffectStateContext/EffectStateContext";
import IconDefault from "../../Common/IconDefault";
import EffectBox from "./EffectBox";

const EffectControl = () => {
  const { effectState, effectStateDispatch } = useEffectState();

  const condition: boolean =
    effectState.pixel ||
    effectState.shake.active ||
    effectState.cgMix.active ||
    effectState.target.cg ||
    effectState.target.character ||
    effectState.target.video;

  const openCloseFilter = () => {
    condition
      ? effectStateDispatch({ type: "target", payload: "allClose" })
      : effectStateDispatch({ type: "target", payload: "allOpen" });
  };

  return (
    <div className={styles["effect-container"]}>
      <IconDefault onClick={openCloseFilter} anime={condition && "anime-color"}>
        <GiFairyWand />
      </IconDefault>
      {condition && <EffectBox />}
    </div>
  );
};

export default EffectControl;
