import { getTargetFunc } from "./getTargetFunc";
import { getFileList, getFolderList } from "../../../../libs/utils/dataObjControl";
import { type MediaOriginType, type MediaInfoType } from "../../mediaInfo";

const folderPrevFunc = (state: MediaInfoType, target: MediaOriginType): MediaInfoType => {
  const dataObj = getTargetFunc(target);

  const folderList: string[] = getFolderList(dataObj);
  const prevFolderIndex =
    (state.folder[target][0] - 1 + folderList.length) % folderList.length;

  const folderName = folderList[prevFolderIndex];
  const fileList: string[] = getFileList(dataObj, folderName);

  return {
    ...state,
    folder: { ...state.folder, [target]: [prevFolderIndex, folderName] },
    file: { ...state.file, [target]: [0, fileList[0], fileList.length] },
  };
};

export { folderPrevFunc };
