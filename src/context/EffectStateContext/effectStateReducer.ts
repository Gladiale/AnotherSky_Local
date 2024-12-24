import { changeActive } from "./effectStateFunc/changeActive";
import { changeImageSize } from "./effectStateFunc/changeImageSize";
import { changeMaxHeight } from "./effectStateFunc/changeMaxHeight";
import { changeShakeHeavy } from "./effectStateFunc/changeShakeHeavy";
import { changeMixModeSpecific } from "./effectStateFunc/changeMixModeSpecific";
import { changeMixMode, type MixPayloadType } from "./effectStateFunc/changeMixMode";
import { changeTarget, type effectTargetType } from "./effectStateFunc/changeTarget";
import { type EffectStateType } from "./effectStateInit";

type ActionTargetType = {
  type: "target";
  payload: effectTargetType;
};

type ActionActiveType = {
  type: "active";
  payload: keyof Omit<EffectStateType, "target">;
};

type ActionMixModeType = {
  type: "mix";
  payload: MixPayloadType;
};

type ActionMixModeSpecificType = {
  type: "mixSpecific";
  payload: "cgMix" | "image" | "equip";
};

type ActionImageSizeType = {
  type: "imageSize";
  payload: EffectStateType["image"]["size"];
};

type ActionImageMaxHightType = {
  type: "imageMaxHeight";
};

type ActionShakeType = {
  type: "shakeHeavy";
  payload: EffectStateType["shake"]["heavy"];
};

type EFStateActionType =
  | ActionTargetType
  | ActionActiveType
  | ActionMixModeType
  | ActionMixModeSpecificType
  | ActionImageSizeType
  | ActionImageMaxHightType
  | ActionShakeType;

const effectStateReducer = (
  state: EffectStateType,
  action: EFStateActionType
): EffectStateType => {
  switch (action.type) {
    case "target":
      return changeTarget(state, action.payload);
    case "active":
      return changeActive(state, action.payload);
    case "mix":
      return changeMixMode(state, action.payload);
    case "mixSpecific":
      return changeMixModeSpecific(state, action.payload);
    case "imageSize":
      return changeImageSize(state, action.payload);
    case "imageMaxHeight":
      return changeMaxHeight(state);
    case "shakeHeavy":
      return changeShakeHeavy(state, action.payload);
    default:
      throw new Error("不明なactionです");
  }
};

export { effectStateReducer, type EFStateActionType };
