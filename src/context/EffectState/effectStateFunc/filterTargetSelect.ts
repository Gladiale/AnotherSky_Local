import { EffectStateType } from "../effectStateInit";

type FilterTargetType = "card" | "stand" | "video" | "allOpen" | "allClose";

const filterTargetSelect = (
  state: EffectStateType,
  target: FilterTargetType
) => {
  switch (target) {
    case "card":
      return {
        ...state,
        filterEffect: {
          ...state.filterEffect,
          targetCard: !state.filterEffect.targetCard,
        },
      };
    case "stand":
      return {
        ...state,
        filterEffect: {
          ...state.filterEffect,
          targetStand: !state.filterEffect.targetStand,
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
          targetStand: true,
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
          targetStand: false,
          targetVideo: false,
        },
      };
    default:
      throw new Error("不明なエラーです");
  }
};

export { type FilterTargetType, filterTargetSelect };
