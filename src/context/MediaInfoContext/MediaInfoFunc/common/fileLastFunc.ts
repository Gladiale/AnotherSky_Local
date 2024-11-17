import { getFileList } from "../../../../helper/dataObjControl";
import { getTargetFunc } from "./getTargetFunc";
import { type MediaOriginType, type MediaInfoType } from "../../mediaInfo";

const fileLastFunc = (state: MediaInfoType, target: MediaOriginType): MediaInfoType => {
  const dataObj = getTargetFunc(target);

  const fileList: string[] = getFileList(dataObj, state.folder[target][1]);
  const fileLength = fileList.length;
  const fileIndex = fileLength - 1;

  return {
    ...state,
    file: { ...state.file, [target]: [fileIndex, fileList[fileIndex], fileLength] },
  };
};

export { fileLastFunc };
