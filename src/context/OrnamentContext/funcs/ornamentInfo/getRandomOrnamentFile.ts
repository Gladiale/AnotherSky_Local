import { folderData } from "../../../../App";
import { getRandomFile } from "../../../../libs/utils/dataObjControl";
import { fixOrnamentTarget } from "./fixOrnamentTarget";
import { type OrnamentInfoType } from "../../ornamentInit";

const getRandomOrnamentFile = (
  state: OrnamentInfoType,
  target: keyof OrnamentInfoType | "all"
): OrnamentInfoType => {
  if (target === "all") {
    const backLight = getRandomFile(folderData.ornamentData, "back-light");
    const magicCircle1 = getRandomFile(folderData.ornamentData, "magic-circle");
    const magicCircle2 = getRandomFile(folderData.ornamentData, "magic-circle");

    return {
      backLight: backLight,
      magicCircle1st: magicCircle1,
      magicCircle2nd: magicCircle2,
    };
  }

  const ornamentTarget = fixOrnamentTarget(target);
  const targetData = getRandomFile(folderData.ornamentData, ornamentTarget);
  return {
    ...state,
    [target]: targetData,
  };
};

export { getRandomOrnamentFile };
