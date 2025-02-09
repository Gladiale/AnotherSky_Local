import { folderData } from "../../../../App";
import { getFileList } from "../../../../libs/utils/dataObjControl";
import { type ThreeInfoType } from "../../threeInit";

const getPrevFile = (
  state: ThreeInfoType,
  target: keyof ThreeInfoType
): ThreeInfoType => {
  const fileList: string[] = getFileList(folderData.mmdData, target);
  const prevIndex = (state[target][0] - 1 + fileList.length) % fileList.length;

  return {
    ...state,
    [target]: [prevIndex, fileList[prevIndex], fileList.length],
  };
};

export { getPrevFile };
