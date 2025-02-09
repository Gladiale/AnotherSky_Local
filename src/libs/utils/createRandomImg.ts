import { folderData } from "../../App";
import { getRandomFile, getRandomFolderFile } from "./dataObjControl";
import { type ImageListType } from "../../context/ImageListState";
import { type MediaInfoType } from "../../context/MediaInfoContext/mediaInfo";

const createRandomImg = (
  imageInfoList: [[number, string], [number, string, number]][],
  listState: ImageListType,
  mediaState: MediaInfoType
) => {
  let folder: [number, string];
  let file: [number, string, number];

  if (listState.folder) {
    if (listState.target === "cg") {
      const cgData = getRandomFolderFile(folderData.cgData);
      folder = cgData.folder;
      file = cgData.file;
    } else {
      const characterData = getRandomFolderFile(folderData.characterData);
      folder = characterData.folder;
      file = characterData.file;
    }
    return imageInfoList.push([folder, file]);
  }

  if (listState.target === "cg") {
    folder = mediaState.folder.cg;
    const cgData = getRandomFile(folderData.cgData, folder[1]);
    file = cgData;
  } else {
    folder = mediaState.folder.character;
    const characterData = getRandomFile(folderData.characterData, folder[1]);
    file = characterData;
  }

  return imageInfoList.push([folder, file]);
};

export { createRandomImg };
