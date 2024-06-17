import {
  FilterTargetType,
  filterTargetSelect,
} from "./effectStateFunc/filterTargetSelect";
import { imgEfKindChange } from "./effectStateFunc/imgEfKindChange";
import { imgEfMultiActive } from "./effectStateFunc/imgEfMultiActive";
import { imgEfPosiChange } from "./effectStateFunc/imgEfPosiChange";
import { imgEfSingleActive } from "./effectStateFunc/imgEfSingleActive";
import { imgEfSizeChange } from "./effectStateFunc/imgEfSizeChange";
import { shakeHeavyChange } from "./effectStateFunc/shakeHeavyChange";
import { EffectStateType } from "./effectStateInit";

type ActionBasicType = {
  type:
    | "imgEfMaxHeight"
    | "blendCgActive"
    | "filterShadow"
    | "mirror"
    | "pixel"
    | "shake";
};

type ActionImageEffectType1 = {
  type: "imgEfSingleActive";
  payload: "imageActive" | "blendActive";
};

type ActionImageEffectType2 = {
  type: "imgEfKind";
  payload: "prev" | "next";
};

type ActionImageEffectType3 = {
  type: "imgEfPosi";
  payload: EffectStateType["imageEF"]["position"];
};

type ActionImageEffectType4 = {
  type: "imgEfSize";
  payload: EffectStateType["imageEF"]["size"];
};

type ActionImageEffectType5 = {
  type: "imgEfMultiActive";
  payload: "openAll" | "closeAll";
};

type ActionFilterType = {
  type: "filter";
  payload: FilterTargetType;
};

type ActionShakeType = {
  type: "shakeHeavy";
  payload: EffectStateType["shakeEffect"]["heavy"];
};

type EFStateActionType =
  | ActionBasicType
  | ActionFilterType
  | ActionShakeType
  | ActionImageEffectType1
  | ActionImageEffectType2
  | ActionImageEffectType3
  | ActionImageEffectType4
  | ActionImageEffectType5;

const effectStateReducer = (
  state: EffectStateType,
  action: EFStateActionType
) => {
  switch (action.type) {
    case "blendCgActive":
      return {
        ...state,
        blendCG: { ...state.blendCG, active: !state.blendCG.active },
      };
    case "imgEfSingleActive":
      return imgEfSingleActive(state, action.payload);
    case "imgEfMultiActive":
      return imgEfMultiActive(state, action.payload);
    case "imgEfKind":
      return imgEfKindChange(state, action.payload);
    case "imgEfPosi":
      return imgEfPosiChange(state, action.payload);
    case "imgEfSize":
      return imgEfSizeChange(state, action.payload);
    case "imgEfMaxHeight":
      return {
        ...state,
        imageEF: {
          ...state.imageEF,
          maxHeightFull: !state.imageEF.maxHeightFull,
        },
      };
    case "mirror":
      return { ...state, mirrorEffect: !state.mirrorEffect };
    case "filter":
      return filterTargetSelect(state, action.payload);
    case "filterShadow":
      return {
        ...state,
        filterEffect: {
          ...state.filterEffect,
          dropShadow: !state.filterEffect.dropShadow,
        },
      };
    case "pixel":
      return { ...state, pixelEffect: !state.pixelEffect };
    case "shake":
      return {
        ...state,
        shakeEffect: {
          ...state.shakeEffect,
          active: !state.shakeEffect.active,
        },
      };
    case "shakeHeavy":
      return shakeHeavyChange(state, action.payload);
    default:
      throw new Error("不明なactionです");
  }
};

export { effectStateReducer, type EFStateActionType };
