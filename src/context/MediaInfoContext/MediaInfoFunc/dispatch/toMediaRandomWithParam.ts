import { folderData } from "../../../../App";
import {
  getRandomFile,
  getRandomFolderFile,
} from "../../../../libs/utils/dataObjControl";
import { type MediaInfoType } from "../../mediaInfo";
import { type RandomTargetType } from "../../../../components/ControlIcon/RandomControl";

type FolderType = {
  cg?: [number, string];
  character?: [number, string];
  anotherCharacter?: [number, string];
  video?: [number, string];
};

type FileType = {
  cg?: [number, string, number];
  character?: [number, string, number];
  anotherCharacter?: [number, string, number];
  video?: [number, string, number];
};

const toMediaRandomWithParam = (
  state: MediaInfoType,
  randomTarget: RandomTargetType
): MediaInfoType => {
  const folder: FolderType = {};
  const file: FileType = {};

  // folderがターゲットの時実行
  if (randomTarget.folder) {
    if (randomTarget.cg) {
      const cgData = getRandomFolderFile(folderData.cgData);
      folder.cg = cgData.folder;
      file.cg = cgData.file;
      const anotherCharacterData = getRandomFolderFile(folderData.characterData);
      folder.anotherCharacter = anotherCharacterData.folder;
      file.anotherCharacter = anotherCharacterData.file;
    }
    if (randomTarget.character) {
      const characterData = getRandomFolderFile(folderData.characterData);
      folder.character = characterData.folder;
      file.character = characterData.file;
    }
    if (randomTarget.video) {
      const videoData = getRandomFolderFile(folderData.videoData);
      folder.video = videoData.folder;
      file.video = videoData.file;
    }
    return {
      folder: { ...state.folder, ...folder },
      file: { ...state.file, ...file },
    };
  }

  // folderがターゲット外の時実行
  if (randomTarget.cg) {
    file.cg = getRandomFile(folderData.cgData, state.folder.cg[1]);
    file.anotherCharacter = getRandomFile(
      folderData.characterData,
      state.folder.anotherCharacter[1]
    );
  }
  if (randomTarget.character) {
    file.character = getRandomFile(folderData.characterData, state.folder.character[1]);
  }
  if (randomTarget.video) {
    file.video = getRandomFile(folderData.videoData, state.folder.video[1]);
  }
  return { ...state, file: { ...state.file, ...file } };
};

export { toMediaRandomWithParam };
