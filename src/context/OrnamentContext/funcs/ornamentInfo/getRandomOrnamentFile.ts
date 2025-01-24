import { OrnamentDataObj } from "../../../../data/OrnamentDataObj";
import { getRandomFile } from "../../../../libs/utils/dataObjControl";
import { fixOrnamentTarget } from "./fixOrnamentTarget";
import { type OrnamentInfoType } from "../../ornamentInit";

const getRandomOrnamentFile = (
  state: OrnamentInfoType,
  target: keyof OrnamentInfoType | "all"
): OrnamentInfoType => {
  if (target === "all") {
    const backLight = getRandomFile(OrnamentDataObj, "back-light");
    const magicCircle1 = getRandomFile(OrnamentDataObj, "magic-circle");
    const magicCircle2 = getRandomFile(OrnamentDataObj, "magic-circle");

    return {
      backLight: backLight,
      magicCircle1st: magicCircle1,
      magicCircle2nd: magicCircle2,
    };
  }

  const ornamentTarget = fixOrnamentTarget(target);
  const targetData = getRandomFile(OrnamentDataObj, ornamentTarget);
  return {
    ...state,
    [target]: targetData,
  };
};

export { getRandomOrnamentFile };
