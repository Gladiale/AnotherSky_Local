import { type SceneType } from "../../../SceneContext";
import { type MediaActiveType, type MediaInfoType } from "../../mediaInfo";
import { fileFirstFunc } from "../common/fileFirstFunc";

const toMediaFileFirst = (
  state: MediaInfoType,
  scene: SceneType,
  active: MediaActiveType
): MediaInfoType => {
  switch (scene) {
    case "card":
      return fileFirstFunc(state, "character");
    case "cg":
      return active.anotherCharacter
        ? fileFirstFunc(state, "anotherCharacter")
        : fileFirstFunc(state, "cg");
    case "video":
      return fileFirstFunc(state, "video");
    default:
      return state;
  }
};

export { toMediaFileFirst };
