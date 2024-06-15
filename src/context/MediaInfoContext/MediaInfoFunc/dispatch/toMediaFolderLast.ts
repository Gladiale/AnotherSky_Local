import { type SceneType } from "../../../SceneContext";
import { type MediaInfoType } from "../../mediaInfo";
import { folderLastFunc } from "../common/folderLastFunc";

const toMediaFolderLast = (
  state: MediaInfoType,
  scene: SceneType
): MediaInfoType => {
  switch (scene) {
    case "card-stand":
      return folderLastFunc(state, "stand");
    case "card-cg":
      return folderLastFunc(state, "cg");
    default:
      return folderLastFunc(state, "video");
  }
};

export { toMediaFolderLast };
