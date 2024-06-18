import { CGDataObj } from "../../../../data/CGDataObj";
import { CharacterDataObj } from "../../../../data/CharacterDataObj";
import { EffectDataObj } from "../../../../data/EffectDataObj";
import { VideoDataObj } from "../../../../data/VideoDataObj";
import { VoiceDataObj } from "../../../../data/VoiceDataObj";
import { MediaInfoType } from "../../mediaInfo";

type ChangeTargetType = "character" | "cg" | "video" | "voice" | "effect";
type TargetObjType = Record<string, string[]>;

const getTargetFunc = (
  target: ChangeTargetType
): [
  TargetObjType,
  keyof MediaInfoType["folder"],
  keyof MediaInfoType["file"]
] => {
  let dataObj: TargetObjType;
  let targetFolder: keyof MediaInfoType["folder"];
  let targetFile: keyof MediaInfoType["file"];

  switch (target) {
    case "character":
      dataObj = CharacterDataObj;
      targetFolder = "character";
      targetFile = "characterFile";
      break;
    case "cg":
      dataObj = CGDataObj;
      targetFolder = "cg";
      targetFile = "cgFile";
      break;
    case "video":
      dataObj = VideoDataObj;
      targetFolder = "video";
      targetFile = "videoFile";
      break;
    case "voice":
      dataObj = VoiceDataObj;
      targetFolder = "voice";
      targetFile = "voiceFile";
      break;
    case "effect":
      dataObj = EffectDataObj;
      targetFolder = "effect";
      targetFile = "effectFile";
      break;
    default:
      throw new Error("不明なactionです");
  }

  return [dataObj, targetFolder, targetFile];
};

export { getTargetFunc };
