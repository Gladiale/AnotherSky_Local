import { getFolderList, getRandomFile } from "../../../../helper/dataObjControl";
import { getTargetFunc } from "./getTargetFunc";
import { type MediaOriginType, type MediaInfoType } from "../../mediaInfo";

const folderNextRandomFile = (
  state: MediaInfoType,
  target: MediaOriginType
): MediaInfoType => {
  const dataObj = getTargetFunc(target);

  const folderList: string[] = getFolderList(dataObj);
  const nextFolderIndex = (state.folder[target][0] + 1) % folderList.length;

  const folderName = folderList[nextFolderIndex];
  const [randomFileIndex, randomFile, fileLength] = getRandomFile(dataObj, folderName);

  return {
    ...state,
    folder: { ...state.folder, [target]: [nextFolderIndex, folderName] },
    file: { ...state.file, [target]: [randomFileIndex, randomFile, fileLength] },
  };
};

export { folderNextRandomFile };
