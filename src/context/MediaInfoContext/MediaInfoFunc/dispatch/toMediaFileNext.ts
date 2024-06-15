import { type SceneType } from "../../../SceneContext";
import { type MediaInfoType } from "../../mediaInfo";
import { fileNextFunc } from "../common/fileNextFunc";

const toMediaFileNext = (
  state: MediaInfoType,
  scene: SceneType
): MediaInfoType => {
  switch (scene) {
    case "card-stand":
      return fileNextFunc(state, "stand");
    case "card-cg":
      return fileNextFunc(state, "cg");
    default:
      return fileNextFunc(state, "video");
  }
};

export { toMediaFileNext };
