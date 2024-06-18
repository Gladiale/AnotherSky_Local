import { getFileList } from "../../../../helper/dataObjControl";
import { getTargetFunc } from "./getTargetFunc";
import { type MediaInfoType } from "../../mediaInfo";

type ChangeTargetType = "character" | "cg" | "video" | "voice" | "effect";

const fileFirstFunc = (state: MediaInfoType, target: ChangeTargetType) => {
  const [dataObj, targetFolder, targetFile] = getTargetFunc(target);

  const fileList: string[] = getFileList(
    dataObj,
    state.folder[targetFolder][1]
  );

  return {
    ...state,
    file: { ...state.file, [targetFile]: [0, fileList[0]] },
  };
};

export { fileFirstFunc };
