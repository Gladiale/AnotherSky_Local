import { getFileList, getFolderList } from "../../../../helper/dataObjControl";
import { getTargetFunc } from "./getTargetFunc";
import { type MediaInfoType } from "../../mediaInfo";

type ChangeTargetType = "character" | "cg" | "video" | "voice" | "effect";

const folderNextFunc = (state: MediaInfoType, target: ChangeTargetType) => {
  const [dataObj, targetFolder, targetFile] = getTargetFunc(target);

  let folderIndex: number;
  let folderName: string;

  const folderList: string[] = getFolderList(dataObj);
  const index: number = state.folder[targetFolder][0];
  if (index < folderList.length - 1) {
    folderIndex = index + 1;
  } else {
    folderIndex = 0;
  }

  folderName = folderList[folderIndex];
  const fileList: string[] = getFileList(dataObj, folderName);

  return {
    ...state,
    folder: { ...state.folder, [targetFolder]: [folderIndex, folderName] },
    file: { ...state.file, [targetFile]: [0, fileList[0]] },
  };
};

export { folderNextFunc };
