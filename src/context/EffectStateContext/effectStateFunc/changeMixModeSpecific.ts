import { type EffectStateType } from "../effectStateInit";

const changeMixModeSpecific = (
  state: EffectStateType,
  payload: "cgMix" | "image" | "equip"
): EffectStateType => {
  let nextMode: "normal" | "overlay" | "exclusion";
  const mixMode = state[payload].mixMode;

  if (mixMode === "normal") {
    nextMode = "overlay";
  } else if (mixMode === "overlay") {
    nextMode = "exclusion";
  } else {
    nextMode = "normal";
  }

  return {
    ...state,
    [payload]: {
      ...state[payload],
      mixMode: nextMode,
    },
  };
};

export { changeMixModeSpecific };
