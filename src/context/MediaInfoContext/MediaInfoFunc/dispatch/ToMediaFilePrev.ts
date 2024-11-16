import { type SceneType } from "../../../SceneContext";
import { type MediaInfoType } from "../../mediaInfo";
import { filePrevFunc } from "../common/filePrevFunc";

const toMediaFilePrev = (state: MediaInfoType, scene: SceneType): MediaInfoType => {
  switch (scene) {
    case "card":
      return filePrevFunc(state, "character");
    case "cg":
      return filePrevFunc(state, "cg");
    default:
      return filePrevFunc(state, "video");
  }
};

export { toMediaFilePrev };
