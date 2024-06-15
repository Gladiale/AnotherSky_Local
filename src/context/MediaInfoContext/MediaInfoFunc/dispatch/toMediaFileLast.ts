import { type SceneType } from "../../../SceneContext";
import { type MediaInfoType } from "../../mediaInfo";
import { fileLastFunc } from "../common/fileLastFunc";

const toMediaFileLast = (
  state: MediaInfoType,
  scene: SceneType
): MediaInfoType => {
  switch (scene) {
    case "card-stand":
      return fileLastFunc(state, "stand");
    case "card-cg":
      return fileLastFunc(state, "cg");
    default:
      return fileLastFunc(state, "video");
  }
};

export { toMediaFileLast };
