import styles from "./ThreeControl.module.css";
import { useScene } from "../../context/SceneContext";
import { useThreeInfo, useThreeState } from "../../context/ThreeContext/ThreeContext";
// components
import CheckBox from "../Common/CheckBox";
import PartsBox from "../Common/PartsBox";
import PartsBox2nd from "../Common/PartsBox2nd";
import RadioBox from "../Common/RadioBox";

const ThreeControl = () => {
  const { scene } = useScene();
  const { threeInfo, threeInfoDispatch } = useThreeInfo();
  const { threeState, threeStateDispatch } = useThreeState();

  return (
    <div
      className={`${styles["three-control"]} 
      ${(!threeState.active.controlPanel || scene !== "cg") && styles.hidden}`}
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
          checkBoxSize={0.95}
          gap={{ outerGap: "2rem", innerGap: "0.2rem" }}
          containerStyle={{ lineHeight: "100%" }}
          checkBoxList={[
            {
              text: "回転",
              state: threeState.active.rotate,
              onChange: () => threeStateDispatch({ type: "active", payload: "rotate" }),
            },
          ]}
        />
        <PartsBox
          message={`speed: ${threeState.motionSpeed}`}
          onPrevClick={() => threeStateDispatch({ type: "motionSpeed", payload: "prev" })}
          onNextClick={() => threeStateDispatch({ type: "motionSpeed", payload: "next" })}
          onBoxClick={() => threeStateDispatch({ type: "motionSpeed", payload: "reset" })}
        />
        <CheckBox
          kind="2nd"
          fontSize={1.1}
          checkBoxSize={0.95}
          gap={{ outerGap: "2rem", innerGap: "0.2rem" }}
          containerStyle={{ lineHeight: "100%" }}
          checkBoxList={[
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
