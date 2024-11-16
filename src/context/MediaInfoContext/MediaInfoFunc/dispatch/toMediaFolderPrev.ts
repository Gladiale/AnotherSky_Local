import { type SceneType } from "../../../SceneContext";
import { type MediaInfoType } from "../../mediaInfo";
import { folderPrevFunc } from "../common/folderPrevFunc";

const toMediaFolderPrev = (state: MediaInfoType, scene: SceneType): MediaInfoType => {
  switch (scene) {
    case "card":
      return folderPrevFunc(state, "character");
    case "cg":
      return folderPrevFunc(state, "cg");
    default:
      return folderPrevFunc(state, "video");
  }
};

export { toMediaFolderPrev };
