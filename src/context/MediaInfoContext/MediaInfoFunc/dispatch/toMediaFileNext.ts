import { type SceneType } from "../../../SceneContext";
import { type MediaInfoType } from "../../mediaInfo";
import { fileNextFunc } from "../common/fileNextFunc";

const toMediaFileNext = (state: MediaInfoType, scene: SceneType): MediaInfoType => {
  switch (scene) {
    case "card":
      return fileNextFunc(state, "character");
    case "cg":
      return fileNextFunc(state, "cg");
    case "anotherCharacter":
      return fileNextFunc(state, "anotherCharacter");
    case "video":
      return fileNextFunc(state, "video");
    default:
      return state;
  }
};

export { toMediaFileNext };
