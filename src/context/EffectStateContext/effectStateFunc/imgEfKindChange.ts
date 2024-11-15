import { blendKindList, type EffectStateType } from "../effectStateInit";

const createNewState = (
  state: EffectStateType,
  kind: EffectStateType["imageEF"]["blendKind"]
): EffectStateType => {
  return {
    ...state,
    imageEF: {
      ...state.imageEF,
      blendKind: kind,
    },
  };
};

const imgEfKindChange = (
  state: EffectStateType,
  changeKey: "prev" | "next"
) => {
  const index = blendKindList.indexOf(state.imageEF.blendKind);
  if (changeKey === "prev") {
    if (index === 0) {
      return createNewState(state, blendKindList.slice(-1)[0]);
    }
    return createNewState(state, blendKindList[index - 1]);
  }
  if (index < blendKindList.length - 1) {
    return createNewState(state, blendKindList[index + 1]);
  }
  return createNewState(state, blendKindList[0]);
};

export { imgEfKindChange };
