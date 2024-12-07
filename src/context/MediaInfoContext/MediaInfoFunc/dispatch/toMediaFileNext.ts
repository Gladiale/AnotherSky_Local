import { type SceneType } from "../../../SceneContext";
import { type MediaActiveType, type MediaInfoType } from "../../mediaInfo";
import { fileNextFunc } from "../common/fileNextFunc";

const toMediaFileNext = (
  state: MediaInfoType,
  scene: SceneType,
  active: MediaActiveType
): MediaInfoType => {
  switch (scene) {
    case "card":
      return fileNextFunc(state, "character");
    case "cg":
      return active.anotherCharacter
        ? fileNextFunc(state, "anotherCharacter")
        : fileNextFunc(state, "cg");
    case "video":
      return fileNextFunc(state, "video");
    default:
      return state;
  }
};

export { toMediaFileNext };
