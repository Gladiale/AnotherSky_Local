import { getFileList } from "../../../../helper/dataObjControl";
import { type MediaInfoType } from "../../mediaInfo";
import { getTargetFunc } from "./getTargetFunc";

type ChangeTargetType = "stand" | "cg" | "video" | "voice" | "effect";

const filePrevFunc = (state: MediaInfoType, target: ChangeTargetType) => {
  const [dataObj, targetFolder, targetFile] = getTargetFunc(target);

  let fileIndex: number;
  let fileName: string;

  const fileList: string[] = getFileList(
    dataObj,
    state.folder[targetFolder][1]
  );
  const index: number = state.file[targetFile][0];
  if (index === 0) {
    fileIndex = fileList.length - 1;
  } else {
    fileIndex = index - 1;
  }
  fileName = fileList[fileIndex];
  return {
    ...state,
    file: { ...state.file, [targetFile]: [fileIndex, fileName] },
  };
};

export { filePrevFunc };
