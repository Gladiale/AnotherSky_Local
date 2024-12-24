import { type EffectStateType } from "../effectStateInit";

type effectTargetType = "cg" | "character" | "video" | "allOpen" | "allClose";

const changeTarget = (
  state: EffectStateType,
  target: effectTargetType
): EffectStateType => {
  switch (target) {
    case "cg":
      return {
        ...state,
        target: {
          ...state.target,
          [target]: !state.target[target],
        },
      };
    case "character":
      return {
        ...state,
        target: {
          ...state.target,
          [target]: !state.target[target],
        },
      };
    case "video":
      return {
        ...state,
        target: {
          ...state.target,
          [target]: !state.target[target],
        },
      };
    case "allOpen":
      return {
        ...state,
        target: {
          cg: true,
          character: true,
          video: true,
        },
        cgMix: {
          ...state.cgMix,
          active: true,
        },
      };
    case "allClose":
      return {
        ...state,
        target: {
          cg: false,
          character: false,
          video: false,
        },
        pixel: false,
        shake: {
          ...state.shake,
          active: false,
        },
        cgMix: {
          active: false,
          mixMode: "normal",
        },
      };
    default:
      throw new Error("不明なエラーです");
  }
};

export { type effectTargetType, changeTarget };
