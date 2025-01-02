import { type ThreeStateType } from "../../threeInit";

const changeActive = (
  state: ThreeStateType,
  target: keyof ThreeStateType["active"]
): ThreeStateType => {
  return {
    ...state,
    active: {
      ...state["active"],
      [target]: !state["active"][target],
    },
  };
};

export { changeActive };
