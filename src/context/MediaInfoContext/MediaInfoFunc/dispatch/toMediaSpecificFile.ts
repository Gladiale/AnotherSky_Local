import { MediaInfoType } from "../../mediaInfo";

type SpecificPayloadType = {
  target: "cg-image" | "stand-image";
  fileInfo: [number, string][];
};

const toMediaSpecificFile = (
  state: MediaInfoType,
  payload: SpecificPayloadType
): MediaInfoType => {
  const { target, fileInfo } = payload;
  if (target === "cg-image") {
    return {
      folder: { ...state.folder, cgFolder: fileInfo[0] },
      file: { ...state.file, cgFile: fileInfo[1] },
    };
  } else {
    return {
      folder: { ...state.folder, standFolder: fileInfo[0] },
      file: { ...state.file, standFile: fileInfo[1] },
    };
  }
};

export { type SpecificPayloadType, toMediaSpecificFile };
