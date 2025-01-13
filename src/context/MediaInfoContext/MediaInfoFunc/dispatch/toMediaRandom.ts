import { CGDataObj } from "../../../../data/CGDataObj";
import { CharacterDataObj } from "../../../../data/CharacterDataObj";
import { EffectDataObj } from "../../../../data/EffectDataObj";
import { VideoDataObj } from "../../../../data/VideoDataObj";
import { VoiceDataObj } from "../../../../data/VoiceDataObj";
import { getRandomFolderFile } from "../../../../libs/utils/dataObjControl";
import { type MediaInfoType } from "../../mediaInfo";

const toMediaRandom = (): MediaInfoType => {
  const cgData = getRandomFolderFile(CGDataObj);
  const characterData = getRandomFolderFile(CharacterDataObj);
  const anotherCharacterData = getRandomFolderFile(CharacterDataObj);
  const videoData = getRandomFolderFile(VideoDataObj);
  const voiceData = getRandomFolderFile(VoiceDataObj);
  const effectData = getRandomFolderFile(EffectDataObj);

  const folder = {
    cg: cgData.folder,
    character: characterData.folder,
    anotherCharacter: anotherCharacterData.folder,
    video: videoData.folder,
    voice: voiceData.folder,
    effect: effectData.folder,
  };

  const file = {
    cg: cgData.file,
    character: characterData.file,
    anotherCharacter: anotherCharacterData.file,
    video: videoData.file,
    voice: voiceData.file,
    effect: effectData.file,
  };

  return {
    folder,
    file,
  };
};

export { toMediaRandom };
