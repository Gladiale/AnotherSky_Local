import { type SceneType } from "../../../SceneContext";
import { type MediaInfoType } from "../../mediaInfo";
import { folderNextFunc } from "../common/folderNextFunc";

const toMediaFolderNext = (state: MediaInfoType, scene: SceneType): MediaInfoType => {
  switch (scene) {
    case "card":
      return folderNextFunc(state, "character");
    case "cg":
      return folderNextFunc(state, "cg");
    case "anotherCharacter":
      return folderNextFunc(state, "anotherCharacter");
    case "video":
      return folderNextFunc(state, "video");
    default:
      return state;
  }
};

export { toMediaFolderNext };
