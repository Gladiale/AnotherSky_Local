import styles from "./FilterControl.module.css";
import { GiFairyWand } from "react-icons/gi";
import FilterMenu from "./FilterMenu";
import { useEffectState } from "../../context/EffectState/EffectStateContext";

const FilterControl = () => {
  const { effectState, effectStateDispatch } = useEffectState();

  const condition: boolean =
    effectState.blendCG.active ||
    effectState.filterEffect.targetCard ||
    effectState.filterEffect.targetStand ||
    effectState.filterEffect.targetVideo;

  const openCloseFilter = () => {
    if (condition) {
      effectStateDispatch({ type: "filter", payload: "allClose" });
    } else {
      effectStateDispatch({ type: "filter", payload: "allOpen" });
    }
  };

  return (
    <div className={styles["filter-container"]}>
      <GiFairyWand
        className={`${styles.icon} ${condition && styles.toggleFilter}`}
        onClick={openCloseFilter}
      />
      {condition && <FilterMenu />}
    </div>
  );
};

export default FilterControl;
