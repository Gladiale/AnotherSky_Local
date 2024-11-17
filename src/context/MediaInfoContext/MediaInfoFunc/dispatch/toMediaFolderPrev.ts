import { type SceneType } from "../../../SceneContext";
import { type MediaInfoType } from "../../mediaInfo";
import { folderPrevFunc } from "../common/folderPrevFunc";

const toMediaFolderPrev = (state: MediaInfoType, scene: SceneType): MediaInfoType => {
  switch (scene) {
    case "card":
      return folderPrevFunc(state, "character");
    case "cg":
      return folderPrevFunc(state, "cg");
    case "anotherCharacter":
      return folderPrevFunc(state, "anotherCharacter");
    case "video":
      return folderPrevFunc(state, "video");
    default:
      return state;
  }
};

export { toMediaFolderPrev };
