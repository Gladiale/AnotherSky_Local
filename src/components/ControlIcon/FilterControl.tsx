import styles from "./FilterControl.module.css";
import { GiFairyWand } from "react-icons/gi";
import { useEffectState } from "../../context/EffectState/EffectStateContext";
import FilterMenu from "./FilterMenu";
import IconDefault from "../Common/IconDefault";

const FilterControl = () => {
  const { effectState, effectStateDispatch } = useEffectState();

  const condition: boolean =
    effectState.blendCG.active ||
    effectState.filterEffect.targetCard ||
    effectState.filterEffect.targetCharacter ||
    effectState.filterEffect.targetVideo;

  const openCloseFilter = () => {
    condition
      ? effectStateDispatch({ type: "filter", payload: "allClose" })
      : effectStateDispatch({ type: "filter", payload: "allOpen" });
  };

  return (
    <div className={styles["filter-container"]}>
      <IconDefault onClick={openCloseFilter} className={condition && "toggle"}>
        <GiFairyWand />
      </IconDefault>
      {condition && <FilterMenu />}
    </div>
  );
};

export default FilterControl;
