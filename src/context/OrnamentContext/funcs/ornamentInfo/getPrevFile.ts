import { folderData } from "../../../../App";
import { getFileList } from "../../../../libs/utils/dataObjControl";
import { fixOrnamentTarget } from "./fixOrnamentTarget";
import { type OrnamentInfoType } from "../../ornamentInit";

const getPrevFile = (
  state: OrnamentInfoType,
  target: keyof OrnamentInfoType
): OrnamentInfoType => {
  const ornamentTarget = fixOrnamentTarget(target);

  const fileList: string[] = getFileList(folderData.ornamentData, ornamentTarget);
  const prevIndex = (state[target][0] - 1 + fileList.length) % fileList.length;

  return {
    ...state,
    [target]: [prevIndex, fileList[prevIndex], fileList.length],
  };
};

export { getPrevFile };
