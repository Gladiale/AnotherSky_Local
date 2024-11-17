import { MediaInfoType } from "../../mediaInfo";

type SpecificPayloadType = {
  target: "cg" | "character" | "video";
  fileInfo: [[number, string], [number, string, number]];
};

const toMediaSpecificFile = (
  state: MediaInfoType,
  payload: SpecificPayloadType
): MediaInfoType => {
  const { target, fileInfo } = payload;
  switch (target) {
    case "cg":
      return {
        folder: { ...state.folder, cg: fileInfo[0] },
        file: { ...state.file, cg: fileInfo[1] },
      };
    case "character":
      return {
        folder: { ...state.folder, character: fileInfo[0] },
        file: { ...state.file, character: fileInfo[1] },
      };
    case "video":
      return {
        folder: { ...state.folder, video: fileInfo[0] },
        file: { ...state.file, video: fileInfo[1] },
      };
    default:
      throw new Error("不明なactionです");
  }
};

export { type SpecificPayloadType, toMediaSpecificFile };
