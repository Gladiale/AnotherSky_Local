import { type EffectStateType, mixBlendModeList } from "../effectStateInit";

type MixPayloadType = {
  target: "cgMix" | "image" | "equip";
  changeKey: "prev" | "next";
};

const changeMixMode = (
  state: EffectStateType,
  payload: MixPayloadType
): EffectStateType => {
  const modeIndex = mixBlendModeList.indexOf(state[payload.target].mixMode);
  const modeListLength = mixBlendModeList.length;
  const getNextMode = () => {
    const nextIndex = (modeIndex + 1) % modeListLength;
    return mixBlendModeList[nextIndex];
  };
  const getPrevMode = () => {
    const prevIndex = (modeIndex - 1 + modeListLength) % modeListLength;
    return mixBlendModeList[prevIndex];
  };

  switch (payload.changeKey) {
    case "prev":
      return {
        ...state,
        [payload.target]: {
          ...state[payload.target],
          mixMode: getPrevMode(),
        },
      };
    case "next":
      return {
        ...state,
        [payload.target]: {
          ...state[payload.target],
          mixMode: getNextMode(),
        },
      };
    default:
      throw new Error("不明なActionです");
  }
};

export { changeMixMode, type MixPayloadType };
