import { type SceneType } from "../../../SceneContext";
import { type MediaInfoType } from "../../mediaInfo";
import { folderFirstFunc } from "../common/folderFirstFunc";

const toMediaFolderFirst = (
  state: MediaInfoType,
  scene: SceneType
): MediaInfoType => {
  switch (scene) {
    case "card-stand":
      return folderFirstFunc(state, "stand");
    case "card-cg":
      return folderFirstFunc(state, "cg");
    default:
      return folderFirstFunc(state, "video");
  }
};

export { toMediaFolderFirst };
