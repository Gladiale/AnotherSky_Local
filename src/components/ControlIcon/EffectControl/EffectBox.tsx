import styles from "./EffectControl.module.css";
import { useState } from "react";
import { useFilter } from "../../../context/FilterContext";
import { useEffectState } from "../../../context/EffectStateContext/EffectStateContext";
import { GiFeline } from "react-icons/gi";
import CheckBox from "../../Common/CheckBox";
import PackingBox from "./PackingBox";
import RangeBox from "./RangeBox";

const EffectBox = () => {
  const { filterState, filterDispatch } = useFilter();
  const { effectState, effectStateDispatch } = useEffectState();

  const [copyMessage, setCopyMessage] = useState<string>("データ取得");
  const [applyMessage, setApplyMessage] = useState<string>("データ適応");
  const [filterStatusNumber, setFilterStatusNumber] = useState<number>(0);
  const [partsActive, setPartsActive] = useState<boolean>(false);

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

          setApplyMessage(`「${listNumber}番」適応`);
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

  const resetFilterStatus = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();

    filterDispatch({ type: "reset", payload: { effectData: 0 } });

    setApplyMessage("リセット成功");
    setTimeout(() => {
      setApplyMessage("データ適応");
    }, 1000);
  };

  return (
    <div className={`${styles["effect-box"]} ${partsActive && styles["parts-2nd"]}`}>
      <div
        className={styles["inner-icon"]}
        onClick={() => setPartsActive((prev) => !prev)}
      >
        <GiFeline />
      </div>

      {partsActive ? <PackingBox /> : <RangeBox />}

      {/* 元CSS margin-top: 0.2rem; */}
      <CheckBox
        kind="1st"
        fontSize={1}
        checkBoxSize={0.8}
        gap={{
          outerGap: "0.3rem",
          innerGap: "0.1rem",
        }}
        containerStyle={{
          lineHeight: "100%",
          padding: "0.3rem 0",
        }}
        checkBoxList={[
          {
            text: "CG",
            state: effectState.target.cg,
            onChange: () => effectStateDispatch({ type: "target", payload: "cg" }),
          },
          {
            text: "立ち絵",
            state: effectState.target.character,
            onChange: () => effectStateDispatch({ type: "target", payload: "character" }),
          },
          {
            text: "動画",
            state: effectState.target.video,
            onChange: () => effectStateDispatch({ type: "target", payload: "video" }),
          },
        ]}
      />

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

export default EffectBox;
