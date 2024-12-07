import { fileFirstFunc } from "./MediaInfoFunc/common/fileFirstFunc";
import { fileLastFunc } from "./MediaInfoFunc/common/fileLastFunc";
import { fileNextFunc } from "./MediaInfoFunc/common/fileNextFunc";
import { filePrevFunc } from "./MediaInfoFunc/common/filePrevFunc";
import { folderNextRandomFile } from "./MediaInfoFunc/common/folderNextRandomFile";
import { folderPrevRandomFile } from "./MediaInfoFunc/common/folderPrevRandomFile";
import { toMediaFilePrev } from "./MediaInfoFunc/dispatch/ToMediaFilePrev";
import { toMediaFileFirst } from "./MediaInfoFunc/dispatch/toMediaFileFirst";
import { toMediaFileLast } from "./MediaInfoFunc/dispatch/toMediaFileLast";
import { toMediaFileNext } from "./MediaInfoFunc/dispatch/toMediaFileNext";
import { toMediaRandom } from "./MediaInfoFunc/dispatch/toMediaRandom";
import { toMediaRandomWithParam } from "./MediaInfoFunc/dispatch/toMediaRandomWithParam";
import { toMediaFolderNext } from "./MediaInfoFunc/dispatch/toMediaFolderNext";
import { toMediaFolderPrev } from "./MediaInfoFunc/dispatch/toMediaFolderPrev";
import { initAnotherCharacter } from "./MediaInfoFunc/dispatch/initAnotherCharacter";
import {
  toMediaSpecificFile,
  type SpecificPayloadType,
} from "./MediaInfoFunc/dispatch/toMediaSpecificFile";
import { type SceneType } from "../SceneContext";
import { type MediaActiveType, type MediaInfoType } from "./mediaInfo";
import { type RandomTargetType } from "../../components/ControlIcon/RandomControl";

type MainActionType = {
  type: "next" | "prev" | "first" | "last" | "folderNext" | "folderPrev";
  payload: { scene: SceneType; mediaActive: MediaActiveType };
};

type SubActionType = {
  type:
    | "random"
    | "voiceNext"
    | "voicePrev"
    | "voiceFolderNext"
    | "voiceFolderPrev"
    | "voiceFirst"
    | "voiceLast"
    | "effectNext"
    | "effectPrev"
    | "effectFolderNext"
    | "effectFolderPrev"
    | "initAnother";
};

type OtherActionType = {
  type: "randomWithSelect";
  payload: RandomTargetType;
};

type SpecificActionType = {
  type: "specific";
  payload: SpecificPayloadType;
};

type ActionType = MainActionType | SubActionType | OtherActionType | SpecificActionType;

function reducerFunc(state: MediaInfoType, action: ActionType) {
  switch (action.type) {
    case "next":
      return toMediaFileNext(state, action.payload.scene, action.payload.mediaActive);
    case "prev":
      return toMediaFilePrev(state, action.payload.scene, action.payload.mediaActive);
    case "first":
      return toMediaFileFirst(state, action.payload.scene, action.payload.mediaActive);
    case "last":
      return toMediaFileLast(state, action.payload.scene, action.payload.mediaActive);
    case "folderNext":
      return toMediaFolderNext(state, action.payload.scene, action.payload.mediaActive);
    case "folderPrev":
      return toMediaFolderPrev(state, action.payload.scene, action.payload.mediaActive);
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
    case "voiceFolderPrev":
      return folderPrevRandomFile(state, "voice");
    case "effectNext":
      return fileNextFunc(state, "effect");
    case "effectPrev":
      return filePrevFunc(state, "effect");
    case "effectFolderNext":
      return folderNextRandomFile(state, "effect");
    case "effectFolderPrev":
      return folderPrevRandomFile(state, "effect");
    case "initAnother":
      return initAnotherCharacter(state);
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
