import { type SceneType } from "../../../SceneContext";
import { type MediaActiveType, type MediaInfoType } from "../../mediaInfo";
import { fileLastFunc } from "../common/fileLastFunc";

const toMediaFileLast = (
  state: MediaInfoType,
  scene: SceneType,
  active: MediaActiveType
): MediaInfoType => {
  switch (scene) {
    case "card":
      return fileLastFunc(state, "character");
    case "cg":
      return active.anotherCharacter
        ? fileLastFunc(state, "anotherCharacter")
        : fileLastFunc(state, "cg");
    case "video":
      return fileLastFunc(state, "video");
    default:
      return state;
  }
};

export { toMediaFileLast };
