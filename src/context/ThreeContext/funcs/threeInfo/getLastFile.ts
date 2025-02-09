import { folderData } from "../../../../App";
import { getFileList } from "../../../../libs/utils/dataObjControl";
import { type ThreeInfoType } from "../../threeInit";

const getLastFile = (
  state: ThreeInfoType,
  target: keyof ThreeInfoType
): ThreeInfoType => {
  const fileList: string[] = getFileList(folderData.mmdData, target);
  const lastIndex = fileList.length - 1;

  return {
    ...state,
    [target]: [lastIndex, fileList[lastIndex], fileList.length],
  };
};

export { getLastFile };
