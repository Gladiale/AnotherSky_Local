import { folderData } from "../../../../App";
import { getRandomFile } from "../../../../libs/utils/dataObjControl";
import { type ThreeInfoType } from "../../threeInit";

const getRandomThreeFile = (
  state: ThreeInfoType,
  target: keyof ThreeInfoType | "all"
): ThreeInfoType => {
  if (target === "all") {
    const model = getRandomFile(folderData.mmdData, "model");
    const motion = getRandomFile(folderData.mmdData, "motion");
    const pose = getRandomFile(folderData.mmdData, "pose");
    const matCap = getRandomFile(folderData.mmdData, "matCap");

    return {
      model: model,
      matCap: matCap,
      motion: motion,
      pose: pose,
    };
  }

  const targetData = getRandomFile(folderData.mmdData, target);
  return {
    ...state,
    [target]: targetData,
  };
};

export { getRandomThreeFile };
