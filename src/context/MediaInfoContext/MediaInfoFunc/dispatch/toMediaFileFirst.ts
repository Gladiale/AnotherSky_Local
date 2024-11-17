import { type SceneType } from "../../../SceneContext";
import { type MediaInfoType } from "../../mediaInfo";
import { fileFirstFunc } from "../common/fileFirstFunc";

const toMediaFileFirst = (state: MediaInfoType, scene: SceneType): MediaInfoType => {
  switch (scene) {
    case "card":
      return fileFirstFunc(state, "character");
    case "cg":
      return fileFirstFunc(state, "cg");
    case "anotherCharacter":
      return fileFirstFunc(state, "anotherCharacter");
    case "video":
      return fileFirstFunc(state, "video");
    default:
      return state;
  }
};

export { toMediaFileFirst };
