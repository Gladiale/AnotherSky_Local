import { EffectStateType } from "../effectStateInit";

const activeNewState = (
  state: EffectStateType,
  targetKey: "activeImage" | "activeBlend"
): EffectStateType => {
  return {
    ...state,
    imageEF: { ...state.imageEF, [targetKey]: !state.imageEF[targetKey] },
  };
};

const imgEfSingleActive = (
  state: EffectStateType,
  actionKey: "imageActive" | "blendActive"
) => {
  switch (actionKey) {
    case "imageActive":
      return activeNewState(state, "activeImage");
    case "blendActive":
      return activeNewState(state, "activeBlend");
    default:
      throw new Error("不明なactionです");
  }
};

export { imgEfSingleActive };
