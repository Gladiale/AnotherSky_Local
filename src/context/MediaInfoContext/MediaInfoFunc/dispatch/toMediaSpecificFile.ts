import { type MediaInfoType, type MediaOriginType } from "../../mediaInfo";

type SpecificPayloadType = {
  target: MediaOriginType;
  fileInfo: [[number, string], [number, string, number]];
};

const toMediaSpecificFile = (
  state: MediaInfoType,
  payload: SpecificPayloadType
): MediaInfoType => {
  const { target, fileInfo } = payload;
  return {
    folder: { ...state.folder, [target]: fileInfo[0] },
    file: { ...state.file, [target]: fileInfo[1] },
  };
};

export { type SpecificPayloadType, toMediaSpecificFile };
