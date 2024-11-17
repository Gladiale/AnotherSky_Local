import { RandomTargetType } from "../../../../components/ControlIcon/RandomControl";
import { CGDataObj } from "../../../../data/CGDataObj";
import { CharacterDataObj } from "../../../../data/CharacterDataObj";
import { VideoDataObj } from "../../../../data/VideoDataObj";
import { getRandomFile, getRandomFolderFile } from "../../../../helper/dataObjControl";
import { type MediaInfoType } from "../../mediaInfo";

type FolderType = {
  cg?: [number, string];
  character?: [number, string];
  video?: [number, string];
};

type FileType = {
  cg?: [number, string, number];
  character?: [number, string, number];
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
      const cgData = getRandomFolderFile(CGDataObj);
      folder.cg = cgData.folder;
      file.cg = cgData.file;
    }
    if (randomTarget.stand) {
      const characterData = getRandomFolderFile(CharacterDataObj);
      folder.character = characterData.folder;
      file.character = characterData.file;
    }
    if (randomTarget.video) {
      const videoData = getRandomFolderFile(VideoDataObj);
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
    file.cg = getRandomFile(CGDataObj, state.folder.cg[1]);
  }
  if (randomTarget.stand) {
    file.character = getRandomFile(CharacterDataObj, state.folder.character[1]);
  }
  if (randomTarget.video) {
    file.video = getRandomFile(VideoDataObj, state.folder.video[1]);
  }
  return { ...state, file: { ...state.file, ...file } };
};

export { toMediaRandomWithParam };
