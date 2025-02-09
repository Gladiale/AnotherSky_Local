import { folderData } from "../../../../App";
import { getFileList } from "../../../../libs/utils/dataObjControl";
import { type ThreeInfoType } from "../../threeInit";

const getNextFile = (
  state: ThreeInfoType,
  target: keyof ThreeInfoType
): ThreeInfoType => {
  const fileList: string[] = getFileList(folderData.mmdData, target);
  const nextIndex = (state[target][0] + 1) % fileList.length;

  return {
    ...state,
    [target]: [nextIndex, fileList[nextIndex], fileList.length],
  };
};

export { getNextFile };
