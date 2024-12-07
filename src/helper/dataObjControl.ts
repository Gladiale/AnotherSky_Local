import { getRandomInt } from "./getRandomInt";

type DataObjType = Record<string, string[]>;
type RandomFileType = {
  folder: [number, string];
  file: [number, string, number];
};

const getFolderList = (dataObj: DataObjType): string[] => {
  const keyList: string[] = Object.keys(dataObj);
  return keyList;
};

const getFileList = (dataObj: DataObjType, folder: string): string[] => {
  const fileList: string[] = dataObj[folder];
  return fileList;
};

const getDirectoryData = (
  dataObj: DataObjType
): [[number, string], [number, string, number]][] => {
  const folderList = getFolderList(dataObj);
  const directoryData: [[number, string], [number, string, number]][] = [];

  folderList.forEach((folder, index) => {
    const fileList = getFileList(dataObj, folder);
    const file = fileList[0];
    directoryData.push([
      [index, folder],
      [0, file, fileList.length],
    ]);
  });
  return directoryData;
};

const getNextFile = (
  dataObj: DataObjType,
  folder: string,
  index: number
): [number, string, number] => {
  const fileList: string[] = dataObj[folder];
  const nextIndex: number = (index + 1) % fileList.length;
  return [nextIndex, fileList[nextIndex], fileList.length];
};

const getPrevFile = (
  dataObj: DataObjType,
  folder: string,
  index: number
): [number, string, number] => {
  const fileList: string[] = dataObj[folder];
  const prevIndex: number = (index - 1 + fileList.length) % fileList.length;
  return [prevIndex, fileList[prevIndex], fileList.length];
};

const getRandomFile = (
  dataObj: DataObjType,
  folder: string
): [number, string, number] => {
  const fileList: string[] = dataObj[folder];
  const index = getRandomInt(fileList.length);
  return [index, fileList[index], fileList.length];
};

const getRandomFolder = (dataObj: DataObjType): [number, string] => {
  const keyList: string[] = Object.keys(dataObj);
  const randomIndex = getRandomInt(keyList.length);
  return [randomIndex, keyList[randomIndex]];
};

const getRandomFolderFile = (dataObj: DataObjType): RandomFileType => {
  const [randomFolderIndex, randomFolderName] = getRandomFolder(dataObj);

  const fileList = dataObj[randomFolderName];
  const randomFileIndex = getRandomInt(fileList.length);
  const randomFileName = fileList[randomFileIndex];

  return {
    folder: [randomFolderIndex, randomFolderName],
    file: [randomFileIndex, randomFileName, fileList.length],
  };
};

export {
  getFolderList,
  getFileList,
  getNextFile,
  getPrevFile,
  getDirectoryData,
  getRandomFile,
  getRandomFolder,
  getRandomFolderFile,
};
