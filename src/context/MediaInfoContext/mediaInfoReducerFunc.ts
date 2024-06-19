import { RandomTargetType } from "../../components/ControlIcon/RandomControl";
import { fileFirstFunc } from "./MediaInfoFunc/common/fileFirstFunc";
import { fileLastFunc } from "./MediaInfoFunc/common/fileLastFunc";
import { fileNextFunc } from "./MediaInfoFunc/common/fileNextFunc";
import { filePrevFunc } from "./MediaInfoFunc/common/filePrevFunc";
import { folderNextRandomFile } from "./MediaInfoFunc/common/folderNextRandomFile";
import { toMediaFilePrev } from "./MediaInfoFunc/dispatch/ToMediaFilePrev";
import { toMediaFileFirst } from "./MediaInfoFunc/dispatch/toMediaFileFirst";
import { toMediaFileLast } from "./MediaInfoFunc/dispatch/toMediaFileLast";
import { toMediaFileNext } from "./MediaInfoFunc/dispatch/toMediaFileNext";
import { toMediaRandom } from "./MediaInfoFunc/dispatch/toMediaRandom";
import { toMediaRandomWithParam } from "./MediaInfoFunc/dispatch/toMediaRandomWithParam";
import {
  toMediaSpecificFile,
  type SpecificPayloadType,
} from "./MediaInfoFunc/dispatch/toMediaSpecificFile";
import { type SceneType } from "../SceneContext";
import { type MediaInfoType } from "./mediaInfo";
import { toMediaFolderNext } from "./MediaInfoFunc/dispatch/toMediaFolderNext";
import { toMediaFolderPrev } from "./MediaInfoFunc/dispatch/toMediaFolderPrev";

type MainActionType = {
  type: "next" | "prev" | "first" | "last" | "folderNext" | "folderPrev";
  payload: SceneType;
};

type SubActionType = {
  type:
    | "random"
    | "voiceNext"
    | "voicePrev"
    | "voiceFolderNext"
    | "voiceFirst"
    | "voiceLast"
    | "effectNext"
    | "effectPrev"
    | "effectFolderNext";
};

type OtherActionType = {
  type: "randomWithSelect";
  payload: RandomTargetType;
};

type SpecificActionType = {
  type: "specific";
  payload: SpecificPayloadType;
};

type ActionType =
  | MainActionType
  | SubActionType
  | OtherActionType
  | SpecificActionType;

function reducerFunc(state: MediaInfoType, action: ActionType) {
  switch (action.type) {
    case "next":
      return toMediaFileNext(state, action.payload);
    case "prev":
      return toMediaFilePrev(state, action.payload);
    case "first":
      return toMediaFileFirst(state, action.payload);
    case "last":
      return toMediaFileLast(state, action.payload);
    case "folderNext":
      return toMediaFolderNext(state, action.payload);
    case "folderPrev":
      return toMediaFolderPrev(state, action.payload);
    case "voiceNext":
      return fileNextFunc(state, "voice");
    case "voicePrev":
      return filePrevFunc(state, "voice");
    case "voiceFirst":
      return fileFirstFunc(state, "voice");
    case "voiceLast":
      return fileLastFunc(state, "voice");
    case "voiceFolderNext":
      return folderNextRandomFile(state, "voice");
    case "effectNext":
      return fileNextFunc(state, "effect");
    case "effectPrev":
      return filePrevFunc(state, "effect");
    case "effectFolderNext":
      return folderNextRandomFile(state, "effect");
    case "random":
      return toMediaRandom();
    case "randomWithSelect":
      return toMediaRandomWithParam(state, action.payload);
    case "specific":
      return toMediaSpecificFile(state, action.payload);
    default:
      throw new Error("不明なactionです");
  }
}

export { reducerFunc, type ActionType };
