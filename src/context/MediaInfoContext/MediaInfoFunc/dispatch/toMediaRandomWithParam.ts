import { RandomTargetType } from "../../../../components/ControlIcon/RandomControl";
import { CGDataObj } from "../../../../data/CGDataObj";
import { StandImgDataObj } from "../../../../data/StandImgDataObj";
import { VideoDataObj } from "../../../../data/VideoDataObj";
import {
  getRandomFile,
  getRandomFolderFile,
} from "../../../../helper/dataObjControl";
import { MediaInfoType } from "../../mediaInfo";

type FolderType = {
  cgFolder?: [number, string];
  standFolder?: [number, string];
  videoFolder?: [number, string];
};

type FileType = {
  cgFile?: [number, string];
  standFile?: [number, string];
  videoFile?: [number, string];
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
      folder.cgFolder = cgData.folder;
      file.cgFile = cgData.file;
    }
    if (randomTarget.stand) {
      const standData = getRandomFolderFile(StandImgDataObj);
      folder.standFolder = standData.folder;
      file.standFile = standData.file;
    }
    if (randomTarget.video) {
      const videoData = getRandomFolderFile(VideoDataObj);
      folder.videoFolder = videoData.folder;
      file.videoFile = videoData.file;
    }
    return {
      folder: { ...state.folder, ...folder },
      file: { ...state.file, ...file },
    };
  }

  // folderがターゲット外の時実行
  if (randomTarget.cg) {
    file.cgFile = getRandomFile(CGDataObj, state.folder.cgFolder[1]);
  }
  if (randomTarget.stand) {
    file.standFile = getRandomFile(
      StandImgDataObj,
      state.folder.standFolder[1]
    );
  }
  if (randomTarget.video) {
    file.videoFile = getRandomFile(VideoDataObj, state.folder.videoFolder[1]);
  }
  return { ...state, file: { ...state.file, ...file } };
};

export { toMediaRandomWithParam };
