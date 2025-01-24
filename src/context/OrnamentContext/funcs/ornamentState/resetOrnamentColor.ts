import { ornamentStateInit, type OrnamentStateType } from "../../ornamentInit";

const resetOrnamentColor = (
  state: OrnamentStateType,
  target: keyof OrnamentStateType["color"]
): OrnamentStateType => {
  return {
    ...state,
    color: {
      ...state["color"],
      [target]: ornamentStateInit["color"][target],
    },
  };
};

export { resetOrnamentColor };
