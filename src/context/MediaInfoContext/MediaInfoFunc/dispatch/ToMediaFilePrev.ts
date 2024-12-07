import { type SceneType } from "../../../SceneContext";
import { type MediaActiveType, type MediaInfoType } from "../../mediaInfo";
import { filePrevFunc } from "../common/filePrevFunc";

const toMediaFilePrev = (
  state: MediaInfoType,
  scene: SceneType,
  active: MediaActiveType
): MediaInfoType => {
  switch (scene) {
    case "card":
      return filePrevFunc(state, "character");
    case "cg":
      return active.anotherCharacter
        ? filePrevFunc(state, "anotherCharacter")
        : filePrevFunc(state, "cg");
    case "video":
      return filePrevFunc(state, "video");
    default:
      return state;
  }
};

export { toMediaFilePrev };
