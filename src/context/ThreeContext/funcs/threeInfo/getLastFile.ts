import { getFileList } from "../../../../helper/dataObjControl";
import { MmdDataObj } from "../../../../data/MmdDataObj";
import { type ThreeInfoType } from "../../threeInit";

const getLastFile = (
  state: ThreeInfoType,
  target: keyof ThreeInfoType
): ThreeInfoType => {
  const fileList: string[] = getFileList(MmdDataObj, target);
  const lastIndex = fileList.length - 1;

  return {
    ...state,
    [target]: [lastIndex, fileList[lastIndex], fileList.length],
  };
};

export { getLastFile };
