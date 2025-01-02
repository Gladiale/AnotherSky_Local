import { useScreenMode } from "../../context/ScreenContext";
import { useThreeInfo, useThreeState } from "../../context/ThreeContext/ThreeContext";
import { useWindowState } from "../../hooks/useWindowState";
import CheckBox from "../Common/CheckBox";
import PartsBox2nd from "../Common/PartsBox2nd";
import RadioBox from "../Common/RadioBox";
import styles from "./ThreeControl.module.css";

const ThreeControl = () => {
  const { screenMode } = useScreenMode();
  const { isMobileSize } = useWindowState();
  const { threeInfo, threeInfoDispatch } = useThreeInfo();
  const { threeState, threeStateDispatch } = useThreeState();

  return (
    <div
      className={`${styles["three-control"]} 
      ${!threeState.active.controlPanel && styles.hidden}`}
      style={{
        paddingBottom: isMobileSize && screenMode === "cardMode" ? "0" : "2.4rem",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <PartsBox2nd
        title="モデル"
        message={threeInfo.model[1].split("/").slice(-1)[0]}
        onNextClick={() => threeInfoDispatch({ type: "next", payload: "model" })}
        onPrevClick={() => threeInfoDispatch({ type: "prev", payload: "model" })}
        onLastClick={() => threeInfoDispatch({ type: "last", payload: "model" })}
        onFirstClick={() => {
          threeInfoDispatch({ type: "first", payload: "model" });
        }}
        onBoxClick={() => {
          threeInfoDispatch({ type: "random", payload: "model" });
        }}
      />

      <div className={styles["motion-box"]}>
        <RadioBox
          radioName="actionMode"
          radioList={[
            {
              text: "none",
              state: threeState.actionMode === "none",
              onChange: () => threeStateDispatch({ type: "actionMode", payload: "none" }),
            },
            {
              text: "motion",
              state: threeState.actionMode === "motion",
              onChange: () =>
                threeStateDispatch({ type: "actionMode", payload: "motion" }),
            },
            {
              text: "pose",
              state: threeState.actionMode === "pose",
              onChange: () => threeStateDispatch({ type: "actionMode", payload: "pose" }),
            },
          ]}
        />
        <PartsBox2nd
          message={
            threeState.actionMode === "motion"
              ? threeInfo.motion[1]
              : threeState.actionMode === "pose"
              ? threeInfo.pose[1]
              : "空"
          }
          onNextClick={() =>
            threeInfoDispatch({
              type: "next",
              payload: threeState.actionMode === "motion" ? "motion" : "pose",
            })
          }
          onPrevClick={() =>
            threeInfoDispatch({
              type: "prev",
              payload: threeState.actionMode === "motion" ? "motion" : "pose",
            })
          }
          onLastClick={() =>
            threeInfoDispatch({
              type: "last",
              payload: threeState.actionMode === "motion" ? "motion" : "pose",
            })
          }
          onFirstClick={() => {
            threeInfoDispatch({
              type: "first",
              payload: threeState.actionMode === "motion" ? "motion" : "pose",
            });
          }}
          onBoxClick={() => {
            threeInfoDispatch({
              type: "random",
              payload: threeState.actionMode === "motion" ? "motion" : "pose",
            });
          }}
        />
      </div>

      <div className={styles["multi-box"]}>
        <CheckBox
          kind="1st"
          fontSize={1.1}
          checkBoxSize={0.9}
          gap={{ outerGap: "2rem", innerGap: "0.2rem" }}
          containerStyle={{ lineHeight: "100%" }}
          checkBoxList={[
            {
              text: "回転",
              state: threeState.active.rotate,
              onChange: () => threeStateDispatch({ type: "active", payload: "rotate" }),
            },
            {
              text: "背景",
              state: threeState.active.background,
              onChange: () =>
                threeStateDispatch({ type: "active", payload: "background" }),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ThreeControl;
