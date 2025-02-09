import { folderData } from "../../../../App";
import { getRandomFolderFile } from "../../../../libs/utils/dataObjControl";
import { type MediaInfoType } from "../../mediaInfo";

const toMediaRandom = (): MediaInfoType => {
  const cgData = getRandomFolderFile(folderData.cgData);
  const characterData = getRandomFolderFile(folderData.characterData);
  const anotherCharacterData = getRandomFolderFile(folderData.characterData);
  const videoData = getRandomFolderFile(folderData.videoData);
  const voiceData = getRandomFolderFile(folderData.voiceData);
  const effectData = getRandomFolderFile(folderData.effectData);

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
