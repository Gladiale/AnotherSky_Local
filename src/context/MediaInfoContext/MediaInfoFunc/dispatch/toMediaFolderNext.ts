import { type SceneType } from "../../../SceneContext";
import { type MediaActiveType, type MediaInfoType } from "../../mediaInfo";
import { folderNextFunc } from "../common/folderNextFunc";

const toMediaFolderNext = (
  state: MediaInfoType,
  scene: SceneType,
  active: MediaActiveType
): MediaInfoType => {
  switch (scene) {
    case "card":
      return folderNextFunc(state, "character");
    case "cg":
      return active.anotherCharacter
        ? folderNextFunc(state, "anotherCharacter")
        : folderNextFunc(state, "cg");
    case "video":
      return folderNextFunc(state, "video");
    default:
      return state;
  }
};

export { toMediaFolderNext };
