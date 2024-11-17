import { getFileList } from "../../../../helper/dataObjControl";
import { getTargetFunc } from "./getTargetFunc";
import { type MediaOriginType, type MediaInfoType } from "../../mediaInfo";

const filePrevFunc = (state: MediaInfoType, target: MediaOriginType): MediaInfoType => {
  const dataObj = getTargetFunc(target);

  const fileList: string[] = getFileList(dataObj, state.folder[target][1]);
  const prevIndex = (state.file[target][0] - 1 + fileList.length) % fileList.length;

  return {
    ...state,
    file: { ...state.file, [target]: [prevIndex, fileList[prevIndex], fileList.length] },
  };
};

export { filePrevFunc };
