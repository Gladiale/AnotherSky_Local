import { CGDataObj } from "../../../../data/CGDataObj";
import { EffectDataObj } from "../../../../data/EffectDataObj";
import { StandImgDataObj } from "../../../../data/StandImgDataObj";
import { VideoDataObj } from "../../../../data/VideoDataObj";
import { VoiceDataObj } from "../../../../data/VoiceDataObj";
import { getRandomFolderFile } from "../../../../helper/dataObjControl";
import { MediaInfoType } from "../../mediaInfo";

const toMediaRandom = (): MediaInfoType => {
  const cgData = getRandomFolderFile(CGDataObj);
  const standData = getRandomFolderFile(StandImgDataObj);
  const videoData = getRandomFolderFile(VideoDataObj);
  const voiceData = getRandomFolderFile(VoiceDataObj);
  const effectData = getRandomFolderFile(EffectDataObj);

  const folder = {
    cgFolder: cgData.folder,
    standFolder: standData.folder,
    videoFolder: videoData.folder,
    voiceFolder: voiceData.folder,
    effectFolder: effectData.folder,
  };

  const file = {
    cgFile: cgData.file,
    standFile: standData.file,
    videoFile: videoData.file,
    voiceFile: voiceData.file,
    effectFile: effectData.file,
  };

  return {
    folder,
    file,
  };
};

export { toMediaRandom };
