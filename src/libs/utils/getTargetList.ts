import { getNextFile, getPrevFile } from "./dataObjControl";
import { type MediaInfoType } from "../../context/MediaInfoContext/mediaInfo";
import { type SpecificPayloadType } from "../../context/MediaInfoContext/MediaInfoFunc/dispatch/toMediaSpecificFile";

// FlipBook用
const getTargetList = (
  target: "cg" | "character" | "anotherCharacter",
  dataObj: Record<string, string[]>,
  mediaInfo: MediaInfoType
) => {
  const targetIndex = mediaInfo.file[target][0];

  const prevDataList = ["", ""].map((_, index) => {
    const fileData = getPrevFile(
      dataObj,
      mediaInfo.folder[target][1],
      targetIndex - 1 + index
    );
    return fileData;
  });

  const nextDataList = ["", "", ""].map((_, index) => {
    const fileData = getNextFile(
      dataObj,
      mediaInfo.folder[target][1],
      targetIndex + index
    );
    return fileData;
  });

  const firstFileInfo: SpecificPayloadType["fileInfo"] = [
    mediaInfo.folder[target],
    prevDataList[0],
  ];
  const lastFileInfo: SpecificPayloadType["fileInfo"] = [
    mediaInfo.folder[target],
    nextDataList[1],
  ] as const;

  const prevFileList = prevDataList.map((data) => data[1]);
  const nextFileList = nextDataList.map((data) => data[1]);

  const targetFileList = [...prevFileList, mediaInfo.file[target][1], ...nextFileList];

  return { firstFileInfo, lastFileInfo, targetFileList };
};

export { getTargetList };
