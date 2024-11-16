import { type SceneType } from "../../../SceneContext";
import { type MediaInfoType } from "../../mediaInfo";
import { fileFirstFunc } from "../common/fileFirstFunc";

const toMediaFileFirst = (state: MediaInfoType, scene: SceneType): MediaInfoType => {
  switch (scene) {
    case "card":
      return fileFirstFunc(state, "character");
    case "cg":
      return fileFirstFunc(state, "cg");
    default:
      return fileFirstFunc(state, "video");
  }
};

export { toMediaFileFirst };
