import { folderData } from "../../../../App";
import { getFileList } from "../../../../libs/utils/dataObjControl";
import { fixOrnamentTarget } from "./fixOrnamentTarget";
import { type OrnamentInfoType } from "../../ornamentInit";

const getNextFile = (
  state: OrnamentInfoType,
  target: keyof OrnamentInfoType
): OrnamentInfoType => {
  const ornamentTarget = fixOrnamentTarget(target);

  const fileList: string[] = getFileList(folderData.ornamentData, ornamentTarget);
  const nextIndex = (state[target][0] + 1) % fileList.length;

  return {
    ...state,
    [target]: [nextIndex, fileList[nextIndex], fileList.length],
  };
};

export { getNextFile };
