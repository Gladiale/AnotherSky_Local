import { folderData } from "../../../../App";
import { getFileList } from "../../../../libs/utils/dataObjControl";
import { fixOrnamentTarget } from "./fixOrnamentTarget";
import { type OrnamentInfoType } from "../../ornamentInit";

const getLastFile = (
  state: OrnamentInfoType,
  target: keyof OrnamentInfoType
): OrnamentInfoType => {
  const ornamentTarget = fixOrnamentTarget(target);

  const fileList: string[] = getFileList(folderData.ornamentData, ornamentTarget);
  const lastIndex = fileList.length - 1;

  return {
    ...state,
    [target]: [lastIndex, fileList[lastIndex], fileList.length],
  };
};

export { getLastFile };
