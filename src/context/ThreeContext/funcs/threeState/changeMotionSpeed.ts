import { threeStateInit, type ThreeStateType } from "../../threeInit";

const changeMotionSpeed = (
  state: ThreeStateType,
  key: "prev" | "next" | "reset"
): ThreeStateType => {
  switch (key) {
    case "next":
      return {
        ...state,
        // 二進数演算よる不具合を回避
        motionSpeed: (state["motionSpeed"] * 100 + 1) / 100,
      };
    case "prev":
      return {
        ...state,
        motionSpeed: (state["motionSpeed"] * 100 - 1) / 100,
      };
    case "reset":
      return {
        ...state,
        motionSpeed: threeStateInit["motionSpeed"],
      };
    default:
      throw new Error("不明なActionです");
  }
};

export { changeMotionSpeed };
