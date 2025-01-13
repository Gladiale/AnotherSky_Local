import { getTargetFunc } from "./getTargetFunc";
import { getFileList } from "../../../../libs/utils/dataObjControl";
import { type MediaOriginType, type MediaInfoType } from "../../mediaInfo";

const fileNextFunc = (state: MediaInfoType, target: MediaOriginType): MediaInfoType => {
  const dataObj = getTargetFunc(target);

  const fileList: string[] = getFileList(dataObj, state.folder[target][1]);
  const nextIndex = (state.file[target][0] + 1) % fileList.length;

  return {
    ...state,
    file: { ...state.file, [target]: [nextIndex, fileList[nextIndex], fileList.length] },
  };
};

export { fileNextFunc };
