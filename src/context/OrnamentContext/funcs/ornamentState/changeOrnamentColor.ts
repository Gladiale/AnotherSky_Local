import { type OrnamentStateType } from "../../ornamentInit";

const changeOrnamentColor = (
  state: OrnamentStateType,
  payload: {
    target: keyof OrnamentStateType["color"];
    value: string | [string, string];
  }
): OrnamentStateType => {
  const { target, value } = payload;

  return {
    ...state,
    color: {
      ...state["color"],
      [target]: value,
    },
  };
};

export { changeOrnamentColor };
