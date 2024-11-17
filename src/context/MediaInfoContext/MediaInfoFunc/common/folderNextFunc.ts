import { getFileList, getFolderList } from "../../../../helper/dataObjControl";
import { getTargetFunc } from "./getTargetFunc";
import { type MediaOriginType, type MediaInfoType } from "../../mediaInfo";

const folderNextFunc = (state: MediaInfoType, target: MediaOriginType): MediaInfoType => {
  const dataObj = getTargetFunc(target);

  const folderList: string[] = getFolderList(dataObj);
  const nextFolderIndex = (state.folder[target][0] + 1) % folderList.length;

  const folderName = folderList[nextFolderIndex];
  const fileList: string[] = getFileList(dataObj, folderName);

  return {
    ...state,
    folder: { ...state.folder, [target]: [nextFolderIndex, folderName] },
    file: { ...state.file, [target]: [0, fileList[0], fileList.length] },
  };
};

export { folderNextFunc };
