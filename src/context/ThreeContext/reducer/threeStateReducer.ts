import { changeActive } from "../funcs/threeState/changeActive";
import { type ThreeStateType } from "../threeInit";

type ActiveActionType = {
  type: "active";
  payload: keyof ThreeStateType["active"];
};

type ActionModeType = {
  type: "actionMode";
  payload: "motion" | "pose" | "none";
};

type ThreeStateActionType = ActiveActionType | ActionModeType;

function threeStateReducer(state: ThreeStateType, action: ThreeStateActionType) {
  switch (action.type) {
    case "active":
      return changeActive(state, action.payload);
    case "actionMode":
      return {
        ...state,
        actionMode: action.payload,
      };
    default:
      throw new Error("不明なActionです");
  }
}

export { threeStateReducer, type ThreeStateActionType };
