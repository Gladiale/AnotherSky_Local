import { EffectStateType } from "../effectStateInit";

type FilterTargetType = "card" | "character" | "video" | "allOpen" | "allClose";

const filterTargetSelect = (
  state: EffectStateType,
  target: FilterTargetType
): EffectStateType => {
  switch (target) {
    case "card":
      return {
        ...state,
        filterEffect: {
          ...state.filterEffect,
          targetCard: !state.filterEffect.targetCard,
        },
      };
    case "character":
      return {
        ...state,
        filterEffect: {
          ...state.filterEffect,
          targetCharacter: !state.filterEffect.targetCharacter,
        },
      };
    case "video":
      return {
        ...state,
        filterEffect: {
          ...state.filterEffect,
          targetVideo: !state.filterEffect.targetVideo,
        },
      };
    case "allOpen":
      return {
        ...state,
        filterEffect: {
          ...state.filterEffect,
          targetCard: true,
          targetCharacter: true,
          targetVideo: true,
        },
      };
    case "allClose":
      return {
        ...state,
        blendCG: {
          active: false,
        },
        filterEffect: {
          ...state.filterEffect,
          targetCard: false,
          targetCharacter: false,
          targetVideo: false,
        },
      };
    default:
      throw new Error("不明なエラーです");
  }
};

export { type FilterTargetType, filterTargetSelect };
