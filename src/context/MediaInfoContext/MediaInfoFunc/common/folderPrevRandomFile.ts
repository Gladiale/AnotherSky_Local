import { getTargetFunc } from "./getTargetFunc";
import { getFolderList, getRandomFile } from "../../../../libs/utils/dataObjControl";
import { type MediaOriginType, type MediaInfoType } from "../../mediaInfo";

const folderPrevRandomFile = (
  state: MediaInfoType,
  target: MediaOriginType
): MediaInfoType => {
  const dataObj = getTargetFunc(target);

  const folderList: string[] = getFolderList(dataObj);
  const prevFolderIndex =
    (state.folder[target][0] - 1 + folderList.length) % folderList.length;

  const folderName = folderList[prevFolderIndex];
  const [randomFileIndex, randomFile, fileLength] = getRandomFile(dataObj, folderName);

  return {
    ...state,
    folder: { ...state.folder, [target]: [prevFolderIndex, folderName] },
    file: { ...state.file, [target]: [randomFileIndex, randomFile, fileLength] },
  };
};

export { folderPrevRandomFile };
