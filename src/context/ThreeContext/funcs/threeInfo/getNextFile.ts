import { getFileList } from "../../../../helper/dataObjControl";
import { MmdDataObj } from "../../../../data/MmdDataObj";
import { type ThreeInfoType } from "../../threeInit";

const getNextFile = (
  state: ThreeInfoType,
  target: keyof ThreeInfoType
): ThreeInfoType => {
  const fileList: string[] = getFileList(MmdDataObj, target);
  const nextIndex = (state[target][0] + 1) % fileList.length;

  return {
    ...state,
    [target]: [nextIndex, fileList[nextIndex], fileList.length],
  };
};

export { getNextFile };
