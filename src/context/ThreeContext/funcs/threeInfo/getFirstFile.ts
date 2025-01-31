import { MmdDataObj } from "../../../../data/MmdDataObj";
import { getFileList } from "../../../../libs/utils/dataObjControl";
import { type ThreeInfoType } from "../../threeInit";

const getFirstFile = (
  state: ThreeInfoType,
  target: keyof ThreeInfoType
): ThreeInfoType => {
  const fileList: string[] = getFileList(MmdDataObj, target);

  return {
    ...state,
    [target]: [0, fileList[0], fileList.length],
  };
};

export { getFirstFile };
