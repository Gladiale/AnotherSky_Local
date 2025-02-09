import { folderData } from "../../../../App";
import { getFileList } from "../../../../libs/utils/dataObjControl";
import { fixOrnamentTarget } from "./fixOrnamentTarget";
import { type OrnamentInfoType } from "../../ornamentInit";

type KeywordType = "default" | "default1st" | "default2nd";

const getKeyword = (target: keyof OrnamentInfoType): KeywordType => {
  switch (target) {
    case "backLight":
      return "default";
    case "magicCircle1st":
      return "default1st";
    case "magicCircle2nd":
      return "default2nd";
    default:
      throw new Error("不明なtargetです");
  }
};

const findTargetIndex = (list: string[], keyword: KeywordType): number => {
  const element = list.find((element) => element.includes(keyword));
  return list.indexOf(element ? element : list[0]);
};

const getDefaultFile = (
  state: OrnamentInfoType,
  target: keyof OrnamentInfoType | (keyof OrnamentInfoType)[]
): OrnamentInfoType => {
  const newState = { ...state };
  const targetList = Array.isArray(target) ? target : [target];

  targetList.forEach((t) => {
    const ornamentTarget = fixOrnamentTarget(t);
    const fileList: string[] = getFileList(folderData.ornamentData, ornamentTarget);
    const defaultIndex = findTargetIndex(fileList, getKeyword(t));

    newState[t] = [defaultIndex, fileList[defaultIndex], fileList.length];
  });

  return newState;
};

export { getDefaultFile };
