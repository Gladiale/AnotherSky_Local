import { getFileList } from "../../../../helper/dataObjControl";
import { type MediaInfoType } from "../../mediaInfo";
import { getTargetFunc } from "./getTargetFunc";

type ChangeTargetType = "stand" | "cg" | "video" | "voice" | "effect";

const fileNextFunc = (state: MediaInfoType, target: ChangeTargetType) => {
  const [dataObj, targetFolder, targetFile] = getTargetFunc(target);

  let fileIndex: number;
  let fileName: string;

  const fileList: string[] = getFileList(
    dataObj,
    state.folder[targetFolder][1]
  );
  const index: number = state.file[targetFile][0];
  if (index < fileList.length - 1) {
    fileIndex = index + 1;
  } else {
    fileIndex = 0;
  }
  fileName = fileList[fileIndex];
  return {
    ...state,
    file: { ...state.file, [targetFile]: [fileIndex, fileName] },
  };
};

export { fileNextFunc };
