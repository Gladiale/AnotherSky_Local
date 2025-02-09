import { folderData } from "../../../../App";
import { type MediaOriginType } from "../../mediaInfo";

type TargetObjType = Record<string, string[]>;

const getTargetFunc = (target: MediaOriginType): TargetObjType => {
  switch (target) {
    case "cg":
      return folderData.cgData;
    case "character":
      return folderData.characterData;
    case "anotherCharacter":
      return folderData.characterData;
    case "video":
      return folderData.videoData;
    case "voice":
      return folderData.voiceData;
    case "effect":
      return folderData.effectData;
    default:
      throw new Error("不明なactionです");
  }
};

export { getTargetFunc };
