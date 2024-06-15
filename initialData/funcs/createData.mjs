import path from "path";
import { getTargetPath } from "./getPath.mjs";
import { getFolderNames, getFileNames } from "./getFolderNames_FileNames.mjs";

async function createData(targetFolder) {
  // ターゲットのディレクトリネームを取得
  const dirname = getTargetPath(targetFolder);
  // ターゲットフォルダ名取得
  const folderList = await getFolderNames(dirname);

  const Data = {};
  for (const folder of folderList) {
    const targetPath = path.join(dirname, `/${folder}`);
    const files = await getFileNames(targetPath);
    Data[folder] = files;
  }
  return Data;
}

export { createData };
