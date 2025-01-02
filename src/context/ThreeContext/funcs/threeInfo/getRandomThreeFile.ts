import { getRandomFile } from "../../../../helper/dataObjControl";
import { MmdDataObj } from "../../../../data/MmdDataObj";
import { type ThreeInfoType } from "../../threeInit";

const getRandomThreeFile = (
  state: ThreeInfoType,
  target: keyof ThreeInfoType | "all"
): ThreeInfoType => {
  if (target === "all") {
    const model = getRandomFile(MmdDataObj, "model");
    const motion = getRandomFile(MmdDataObj, "motion");
    const pose = getRandomFile(MmdDataObj, "pose");

    return {
      model: model,
      motion: motion,
      pose: pose,
    };
  }

  const targetData = getRandomFile(MmdDataObj, target);
  return {
    ...state,
    [target]: targetData,
  };
};

export { getRandomThreeFile };
