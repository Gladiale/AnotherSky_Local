import styles from "./EffectControl.module.css";
import { useState } from "react";
import { GiFeline } from "react-icons/gi";
import { useFilterStatus } from "../../../hooks/useFilterStatus";
import { useEffectState } from "../../../context/EffectStateContext/EffectStateContext";
// components
import CheckBox from "../../Common/CheckBox";
import PackingBox from "./PackingBox";
import RangeBox from "./RangeBox";

const EffectBox = () => {
  const { effectState, effectStateDispatch } = useEffectState();
  const { message, copyFilterStatus, applyFilterStatus, resetFilterStatus } =
    useFilterStatus();

  const [partsActive, setPartsActive] = useState<boolean>(false);

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
          value={message.apply}
          onClick={applyFilterStatus}
          onContextMenu={resetFilterStatus}
        />
        <input type="button" value={message.copy} onClick={copyFilterStatus} />
      </div>
    </div>
  );
};

export default EffectBox;
