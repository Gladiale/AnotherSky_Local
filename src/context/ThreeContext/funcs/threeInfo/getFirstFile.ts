import { folderData } from "../../../../App";
import { getFileList } from "../../../../libs/utils/dataObjControl";
import { type ThreeInfoType } from "../../threeInit";

const getFirstFile = (
  state: ThreeInfoType,
  target: keyof ThreeInfoType
): ThreeInfoType => {
  const fileList: string[] = getFileList(folderData.mmdData, target);

  return {
    ...state,
    [target]: [0, fileList[0], fileList.length],
  };
};

export { getFirstFile };
