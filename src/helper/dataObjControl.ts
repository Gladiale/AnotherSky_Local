import { getRandomInt } from "./getRandomInt";

type DataObjType = Record<string, string[]>;
type RandomFileType = {
  folder: [number, string];
  file: [number, string];
};

const getFolderList = (dataObj: DataObjType): string[] => {
  const keyList: string[] = Object.keys(dataObj);
  return keyList;
};

const getFileList = (dataObj: DataObjType, folder: string): string[] => {
  const fileList: string[] = dataObj[folder];
  return fileList;
};

const getNextFile = (
  dataObj: DataObjType,
  folder: string,
  index: number
): [number, string] => {
  let nextIndex: number;
  let nextFile: string;
  const fileList: string[] = dataObj[folder];
  index < fileList.length - 1 ? (nextIndex = index + 1) : (nextIndex = 0);
  nextFile = fileList[nextIndex];
  return [nextIndex, nextFile];
};

const getPrevFile = (
  dataObj: DataObjType,
  folder: string,
  index: number
): [number, string] => {
  let prevIndex: number;
  let prevFile: string;
  const fileList: string[] = dataObj[folder];
  index === 0 ? (prevIndex = fileList.length - 1) : (prevIndex = index - 1);
  prevFile = fileList[prevIndex];
  return [prevIndex, prevFile];
};

const getRandomFile = (
  dataObj: DataObjType,
  folder: string
): [number, string] => {
  const fileList: string[] = dataObj[folder];
  const index = getRandomInt(fileList.length);
  return [index, fileList[index]];
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
    file: [randomFileIndex, randomFileName],
  };
};

export {
  getFolderList,
  getFileList,
  getNextFile,
  getPrevFile,
  getRandomFile,
  getRandomFolder,
  getRandomFolderFile,
};
