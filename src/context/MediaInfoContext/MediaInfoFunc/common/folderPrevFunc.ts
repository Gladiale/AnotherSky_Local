import { getFileList, getFolderList } from "../../../../helper/dataObjControl";
import { type MediaInfoType } from "../../mediaInfo";
import { getTargetFunc } from "./getTargetFunc";

type ChangeTargetType = "stand" | "cg" | "video" | "voice" | "effect";

const folderPrevFunc = (state: MediaInfoType, target: ChangeTargetType) => {
  const [dataObj, targetFolder, targetFile] = getTargetFunc(target);

  let folderIndex: number;
  let folderName: string;

  const folderList: string[] = getFolderList(dataObj);
  const index: number = state.folder[targetFolder][0];
  if (index === 0) {
    folderIndex = folderList.length - 1;
  } else {
    folderIndex = index - 1;
  }

  folderName = folderList[folderIndex];
  const fileList: string[] = getFileList(dataObj, folderName);

  return {
    ...state,
    folder: { ...state.folder, [targetFolder]: [folderIndex, folderName] },
    file: { ...state.file, [targetFile]: [0, fileList[0]] },
  };
};

export { folderPrevFunc };
