import { getFileList } from "../../../../helper/dataObjControl";
import { getTargetFunc } from "./getTargetFunc";
import { type MediaInfoType } from "../../mediaInfo";

type ChangeTargetType = "character" | "cg" | "video" | "voice" | "effect";

const fileLastFunc = (state: MediaInfoType, target: ChangeTargetType) => {
  const [dataObj, targetFolder, targetFile] = getTargetFunc(target);

  const fileList: string[] = getFileList(
    dataObj,
    state.folder[targetFolder][1]
  );

  const fileIndex = fileList.length - 1;

  return {
    ...state,
    file: { ...state.file, [targetFile]: [fileIndex, fileList[fileIndex]] },
  };
};

export { fileLastFunc };
