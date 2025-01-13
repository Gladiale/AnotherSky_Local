import { MmdDataObj } from "../../../../data/MmdDataObj";
import { getFileList } from "../../../../libs/utils/dataObjControl";
import { type ThreeInfoType } from "../../threeInit";

const getPrevFile = (
  state: ThreeInfoType,
  target: keyof ThreeInfoType
): ThreeInfoType => {
  const fileList: string[] = getFileList(MmdDataObj, target);
  const prevIndex = (state[target][0] - 1 + fileList.length) % fileList.length;

  return {
    ...state,
    [target]: [prevIndex, fileList[prevIndex], fileList.length],
  };
};

export { getPrevFile };
