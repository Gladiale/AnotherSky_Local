import { type SceneType } from "../../../SceneContext";
import { type MediaActiveType, type MediaInfoType } from "../../mediaInfo";
import { folderPrevFunc } from "../common/folderPrevFunc";

const toMediaFolderPrev = (
  state: MediaInfoType,
  scene: SceneType,
  active: MediaActiveType
): MediaInfoType => {
  switch (scene) {
    case "card":
      return folderPrevFunc(state, "character");
    case "cg":
      return active.anotherCharacter
        ? folderPrevFunc(state, "anotherCharacter")
        : folderPrevFunc(state, "cg");
    case "video":
      return folderPrevFunc(state, "video");
    default:
      return state;
  }
};

export { toMediaFolderPrev };
