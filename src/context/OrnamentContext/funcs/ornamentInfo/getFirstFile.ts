import { folderData } from "../../../../App";
import { getFileList } from "../../../../libs/utils/dataObjControl";
import { fixOrnamentTarget } from "./fixOrnamentTarget";
import { type OrnamentInfoType } from "../../ornamentInit";

const getFirstFile = (
  state: OrnamentInfoType,
  target: keyof OrnamentInfoType
): OrnamentInfoType => {
  const ornamentTarget = fixOrnamentTarget(target);
  const fileList: string[] = getFileList(folderData.ornamentData, ornamentTarget);

  return {
    ...state,
    [target]: [0, fileList[0], fileList.length],
  };
};

export { getFirstFile };
