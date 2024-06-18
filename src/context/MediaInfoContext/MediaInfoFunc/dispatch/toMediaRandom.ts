import { CGDataObj } from "../../../../data/CGDataObj";
import { CharacterDataObj } from "../../../../data/CharacterDataObj";
import { EffectDataObj } from "../../../../data/EffectDataObj";
import { VideoDataObj } from "../../../../data/VideoDataObj";
import { VoiceDataObj } from "../../../../data/VoiceDataObj";
import { getRandomFolderFile } from "../../../../helper/dataObjControl";
import { MediaInfoType } from "../../mediaInfo";

const toMediaRandom = (): MediaInfoType => {
  const cgData = getRandomFolderFile(CGDataObj);
  const characterData = getRandomFolderFile(CharacterDataObj);
  const videoData = getRandomFolderFile(VideoDataObj);
  const voiceData = getRandomFolderFile(VoiceDataObj);
  const effectData = getRandomFolderFile(EffectDataObj);

  const folder = {
    cg: cgData.folder,
    character: characterData.folder,
    video: videoData.folder,
    voice: voiceData.folder,
    effect: effectData.folder,
  };

  const file = {
    cgFile: cgData.file,
    characterFile: characterData.file,
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
