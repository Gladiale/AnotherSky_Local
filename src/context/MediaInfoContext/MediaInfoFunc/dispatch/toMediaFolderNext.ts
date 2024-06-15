import { type SceneType } from "../../../SceneContext";
import { type MediaInfoType } from "../../mediaInfo";
import { folderNextFunc } from "../common/folderNextFunc";

const toMediaFolderNext = (
  state: MediaInfoType,
  scene: SceneType
): MediaInfoType => {
  switch (scene) {
    case "card-stand":
      return folderNextFunc(state, "stand");
    case "card-cg":
      return folderNextFunc(state, "cg");
    default:
      return folderNextFunc(state, "video");
  }
};

export { toMediaFolderNext };
