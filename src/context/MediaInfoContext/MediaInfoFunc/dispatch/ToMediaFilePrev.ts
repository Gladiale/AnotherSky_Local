import { type SceneType } from "../../../SceneContext";
import { type MediaInfoType } from "../../mediaInfo";
import { filePrevFunc } from "../common/filePrevFunc";

const toMediaFilePrev = (state: MediaInfoType, scene: SceneType): MediaInfoType => {
  switch (scene) {
    case "card":
      return filePrevFunc(state, "character");
    case "cg":
      return filePrevFunc(state, "cg");
    case "anotherCharacter":
      return filePrevFunc(state, "anotherCharacter");
    case "video":
      return filePrevFunc(state, "video");
    default:
      return state;
  }
};

export { toMediaFilePrev };
