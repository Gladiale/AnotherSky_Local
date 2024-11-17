import { getFileList } from "../../../../helper/dataObjControl";
import { getTargetFunc } from "./getTargetFunc";
import { type MediaOriginType, type MediaInfoType } from "../../mediaInfo";

const fileFirstFunc = (state: MediaInfoType, target: MediaOriginType): MediaInfoType => {
  const dataObj = getTargetFunc(target);
  const fileList: string[] = getFileList(dataObj, state.folder[target][1]);

  return {
    ...state,
    file: { ...state.file, [target]: [0, fileList[0], fileList.length] },
  };
};

export { fileFirstFunc };
