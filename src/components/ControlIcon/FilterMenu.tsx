import styles from "./FilterControl.module.css";
import { useState } from "react";
import { useFilter } from "../../context/FilterContext";
import { useEffectState } from "../../context/EffectState/EffectStateContext";
import { type FilterTargetType } from "../../context/EffectState/effectStateFunc/filterTargetSelect";

const FilterMenu = () => {
  const { filterState, filterDispatch } = useFilter();
  const { effectState, effectStateDispatch } = useEffectState();

  const handleEffect = (
    e: React.ChangeEvent<HTMLInputElement>,
    effectName: string
  ) => {
    filterDispatch({
      type: effectName,
      payload: { effectData: Number(e.target.value) },
    });
  };

  const changeTarget = (target: FilterTargetType) => {
    effectStateDispatch({ type: "filter", payload: target });
  };

  const [copyMessage, setCopyMessage] = useState<string>("データ取得");
  const [applyMessage, setApplyMessage] = useState<string>("データ適応");
  const [filterStatusNumber, setFilterStatusNumber] = useState<number>(0);

  const copyFilterStatus = () => {
    const filterDataJson = JSON.stringify(filterState);

    navigator.clipboard.writeText(filterDataJson);
    setCopyMessage("取得成功");
    setTimeout(() => {
      setCopyMessage("データ取得");
    }, 1000);
  };

  const applyFilterStatus = async () => {
    try {
      const response = await fetch("/filterData.json");
      const fetchData = await response.json();

      const setFilterData = (listNumber: number): void => {
        if (listNumber < fetchData.length) {
          setFilterStatusNumber((prev) => prev + 1);
          filterDispatch({
            type: "apply",
            payload: { effectData: 0, allEffect: fetchData[listNumber] },
          });

          setApplyMessage(`リスト番号「${listNumber}番」適応成功`);
          setTimeout(() => {
            setApplyMessage("データ適応");
          }, 1000);
        } else {
          setFilterStatusNumber(0);
          setFilterData(0);
        }
      };
      setFilterData(filterStatusNumber);
    } catch (error) {
      console.error(error);
      setApplyMessage("fetchに失敗しました");
    }
  };

  const resetFilterStatus = (e: any) => {
    e.stopPropagation();
    e.preventDefault();

    filterDispatch({ type: "reset", payload: { effectData: 0 } });

    setApplyMessage("ステータスをリセットしました");
    setTimeout(() => {
      setApplyMessage("データ適応");
    }, 1000);
  };

  return (
    <div className={styles.menuFilter}>
      <label>
        <span>opacity</span>
        <input
          type="range"
          min="0"
          max="100"
          value={filterState.opacity}
          onChange={(e) => handleEffect(e, "opacity")}
        />
      </label>

      <label>
        <span>brightness</span>
        <input
          type="range"
          min="40"
          max="300"
          value={filterState.brightness}
          onChange={(e) => handleEffect(e, "brightness")}
        />
      </label>

      <label>
        <span>contrast</span>
        <input
          type="range"
          min="10"
          max="500"
          value={filterState.contrast}
          onChange={(e) => handleEffect(e, "contrast")}
        />
      </label>

      <label>
        <span>grayscale</span>
        <input
          type="range"
          min="0"
          max="100"
          value={filterState.grayscale}
          onChange={(e) => handleEffect(e, "grayscale")}
        />
      </label>

      <label>
        <span>hue-rotate</span>
        <input
          type="range"
          min="0"
          max="360"
          value={filterState.hueRotate}
          onChange={(e) => handleEffect(e, "hueRotate")}
        />
      </label>

      <label>
        <span>invert</span>
        <input
          type="range"
          min="0"
          max="100"
          value={filterState.invert}
          onChange={(e) => handleEffect(e, "invert")}
        />
      </label>

      <label>
        <span>saturate</span>
        <input
          type="range"
          min="0"
          max="600"
          value={filterState.saturate}
          onChange={(e) => handleEffect(e, "saturate")}
        />
      </label>

      <label>
        <span>sepia</span>
        <input
          type="range"
          min="0"
          max="100"
          value={filterState.sepia}
          onChange={(e) => handleEffect(e, "sepia")}
        />
      </label>

      <div className={styles["effect-box"]}>
        {/* <div className={styles.heavySelect}>
          <label>
            <input type="radio" name="heavy" />
            <span>軽</span>
          </label>
          <label>
            <input type="radio" name="heavy" />
            <span>中</span>
          </label>
          <label>
            <input type="radio" name="heavy" />
            <span>重</span>
          </label>
        </div> */}
        <label>
          <span>BlendEffect</span>
          <input
            type="checkbox"
            checked={effectState.blendCG.active}
            onChange={() => effectStateDispatch({ type: "blendCgActive" })}
          />
        </label>
      </div>

      <div className={styles.targetSelect}>
        <label>
          <input
            type="checkbox"
            checked={effectState.filterEffect.targetCard}
            onChange={() => changeTarget("card")}
          />
          <span>カード</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={effectState.filterEffect.targetStand}
            onChange={() => changeTarget("stand")}
          />
          <span>立ち絵</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={effectState.filterEffect.targetVideo}
            onChange={() => changeTarget("video")}
          />
          <span>動画</span>
        </label>
      </div>

      <div className={styles.filterButton} data-message="右クリックリセット">
        <input
          type="button"
          value={applyMessage}
          onClick={applyFilterStatus}
          onContextMenu={resetFilterStatus}
        />
        <input type="button" value={copyMessage} onClick={copyFilterStatus} />
      </div>
    </div>
  );
};

export default FilterMenu;
