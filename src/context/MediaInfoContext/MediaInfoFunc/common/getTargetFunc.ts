import { CGDataObj } from "../../../../data/CGDataObj";
import { CharacterDataObj } from "../../../../data/CharacterDataObj";
import { EffectDataObj } from "../../../../data/EffectDataObj";
import { VideoDataObj } from "../../../../data/VideoDataObj";
import { VoiceDataObj } from "../../../../data/VoiceDataObj";
import { type MediaOriginType } from "../../mediaInfo";

type TargetObjType = Record<string, string[]>;

const getTargetFunc = (target: MediaOriginType): TargetObjType => {
  switch (target) {
    case "cg":
      return CGDataObj;
    case "character":
      return CharacterDataObj;
    case "anotherCharacter":
      return CharacterDataObj;
    case "video":
      return VideoDataObj;
    case "voice":
      return VoiceDataObj;
    case "effect":
      return EffectDataObj;
    default:
      throw new Error("不明なactionです");
  }
};

export { getTargetFunc };
