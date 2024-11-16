import { type SceneType } from "../../../SceneContext";
import { type MediaInfoType } from "../../mediaInfo";
import { fileLastFunc } from "../common/fileLastFunc";

const toMediaFileLast = (state: MediaInfoType, scene: SceneType): MediaInfoType => {
  switch (scene) {
    case "card":
      return fileLastFunc(state, "character");
    case "cg":
      return fileLastFunc(state, "cg");
    default:
      return fileLastFunc(state, "video");
  }
};

export { toMediaFileLast };
