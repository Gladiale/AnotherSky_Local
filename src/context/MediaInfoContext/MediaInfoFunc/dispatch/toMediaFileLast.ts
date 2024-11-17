import { type SceneType } from "../../../SceneContext";
import { type MediaInfoType } from "../../mediaInfo";
import { fileLastFunc } from "../common/fileLastFunc";

const toMediaFileLast = (state: MediaInfoType, scene: SceneType): MediaInfoType => {
  switch (scene) {
    case "card":
      return fileLastFunc(state, "character");
    case "cg":
      return fileLastFunc(state, "cg");
    case "anotherCharacter":
      return fileLastFunc(state, "anotherCharacter");
    case "video":
      return fileLastFunc(state, "video");
    default:
      return state;
  }
};

export { toMediaFileLast };
