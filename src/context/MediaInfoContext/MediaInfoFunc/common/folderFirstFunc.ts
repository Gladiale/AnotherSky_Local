import { getTargetFunc } from "./getTargetFunc";
import { getFileList, getFolderList } from "../../../../libs/utils/dataObjControl";
import { type MediaOriginType, type MediaInfoType } from "../../mediaInfo";

const folderFirstFunc = (
  state: MediaInfoType,
  target: MediaOriginType
): MediaInfoType => {
  const dataObj = getTargetFunc(target);

  const folderList: string[] = getFolderList(dataObj);
  const folderIndex = 0;

  const folderName = folderList[folderIndex];
  const fileList: string[] = getFileList(dataObj, folderName);

  return {
    ...state,
    folder: { ...state.folder, [target]: [folderIndex, folderName] },
    file: { ...state.file, [target]: [0, fileList[0], fileList.length] },
  };
};

export { folderFirstFunc };
