import { changeOrnamentColor } from "../funcs/ornamentState/changeOrnamentColor";
import { resetOrnamentColor } from "../funcs/ornamentState/resetOrnamentColor";
import { type OrnamentStateType } from "../ornamentInit";

// type ActionType<T extends keyof OrnamentStateType> = {
//   type: T;
//   payload: OrnamentStateType[T];
// };

type ChangeColorActionType<T extends keyof OrnamentStateType["color"]> = {
  type: "changeColor";
  payload: {
    target: T;
    value: OrnamentStateType["color"][T];
  };
};

type ResetColorActionType = {
  type: "resetColor";
  payload: keyof OrnamentStateType["color"];
};

type OrnamentStateActionType =
  | ChangeColorActionType<"backLight">
  | ChangeColorActionType<"magicCircle">
  | ResetColorActionType;

function ornamentStateReducer(
  state: OrnamentStateType,
  action: OrnamentStateActionType
): OrnamentStateType {
  switch (action.type) {
    case "changeColor":
      return changeOrnamentColor(state, action.payload);
    case "resetColor":
      return resetOrnamentColor(state, action.payload);
    default:
      throw new Error("不明なActionです");
  }
}

export { ornamentStateReducer, type OrnamentStateActionType };
