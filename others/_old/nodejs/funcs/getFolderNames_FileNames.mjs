import { readdir } from "fs/promises";

// 正規表現でゼロ埋め
// https://qiita.com/RAWSEQ/items/99f40ec11eef995dc174
const sortByNum = (a, b) => {
  const sa = a.replace(/(\d+)/g, (m) => m.padStart(5, "0"));
  const sb = b.replace(/(\d+)/g, (m) => m.padStart(5, "0"));
  return sa < sb ? -1 : sa > sb ? 1 : 0;
};

async function getFolderNames(path) {
  try {
    const entries = await readdir(path, { withFileTypes: true });
    const folders = entries
      .filter((entry) => entry.isDirectory())
      .map((folder) => folder.name);
    folders.sort(sortByNum);
    return folders;
  } catch (error) {
    console.error("フォルダ名の取得中にエラーが発生しました:", error);
  }
}

async function getFileNames(path) {
  try {
    const entries = await readdir(path, { withFileTypes: true });
    const files = entries
      .filter((entry) => entry.isFile())
      .map((file) => file.name);
    files.sort(sortByNum);
    return files;
  } catch (error) {
    console.error("ファイル名の取得中にエラーが発生しました:", error);
  }
}

export { getFolderNames, getFileNames };
