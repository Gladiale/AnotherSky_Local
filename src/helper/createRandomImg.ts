import { type ImageListType } from "../context/ImageListState";
import { type MediaInfoType } from "../context/MediaInfoContext/mediaInfo";
import { CGDataObj } from "../data/CGDataObj";
import { StandImgDataObj } from "../data/StandImgDataObj";
import { getRandomFile, getRandomFolderFile } from "./dataObjControl";

const createRandomImg = (
  imageInfoList: [number, string][][],
  listState: ImageListType,
  mediaState: MediaInfoType
) => {
  let folder: [number, string];
  let file: [number, string];

  if (listState.folder) {
    if (listState.cg) {
      const cgData = getRandomFolderFile(CGDataObj);
      folder = cgData.folder;
      file = cgData.file;
    } else {
      const standData = getRandomFolderFile(StandImgDataObj);
      folder = standData.folder;
      file = standData.file;
    }
    return imageInfoList.push([folder, file]);
  }

  if (listState.cg) {
    folder = mediaState.folder.cgFolder;
    const cgData = getRandomFile(CGDataObj, folder[1]);
    file = cgData;
  } else {
    folder = mediaState.folder.standFolder;
    const standData = getRandomFile(CGDataObj, folder[1]);
    file = standData;
  }

  return imageInfoList.push([folder, file]);
};

export { createRandomImg };
