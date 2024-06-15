import { CGDataObj } from "../../../../data/CGDataObj";
import { EffectDataObj } from "../../../../data/EffectDataObj";
import { StandImgDataObj } from "../../../../data/StandImgDataObj";
import { VideoDataObj } from "../../../../data/VideoDataObj";
import { VoiceDataObj } from "../../../../data/VoiceDataObj";
import { MediaInfoType } from "../../mediaInfo";

type ChangeTargetType = "stand" | "cg" | "video" | "voice" | "effect";
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
    case "stand":
      dataObj = StandImgDataObj;
      targetFolder = "standFolder";
      targetFile = "standFile";
      break;
    case "cg":
      dataObj = CGDataObj;
      targetFolder = "cgFolder";
      targetFile = "cgFile";
      break;
    case "video":
      dataObj = VideoDataObj;
      targetFolder = "videoFolder";
      targetFile = "videoFile";
      break;
    case "voice":
      dataObj = VoiceDataObj;
      targetFolder = "voiceFolder";
      targetFile = "voiceFile";
      break;
    case "effect":
      dataObj = EffectDataObj;
      targetFolder = "effectFolder";
      targetFile = "effectFile";
      break;
    default:
      throw new Error("不明なactionです");
  }

  return [dataObj, targetFolder, targetFile];
};

export { getTargetFunc };
