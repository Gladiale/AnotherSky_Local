import { getFirstFile } from "../funcs/ornamentInfo/getFirstFile";
import { getLastFile } from "../funcs/ornamentInfo/getLastFile";
import { getNextFile } from "../funcs/ornamentInfo/getNextFile";
import { getPrevFile } from "../funcs/ornamentInfo/getPrevFile";
import { getDefaultFile } from "../funcs/ornamentInfo/getDefaultFile";
import { getRandomOrnamentFile } from "../funcs/ornamentInfo/getRandomOrnamentFile";
import { type OrnamentInfoType } from "../ornamentInit";

type MainActionType = {
  type: "next" | "prev" | "first" | "last";
  payload: keyof OrnamentInfoType;
};

type RandomActionType = {
  type: "random";
  payload: keyof OrnamentInfoType | "all";
};

type DefaultActionType = {
  type: "default";
  payload: keyof OrnamentInfoType | (keyof OrnamentInfoType)[];
};

type OrnamentInfoActionType = MainActionType | RandomActionType | DefaultActionType;

function ornamentInfoReducer(
  state: OrnamentInfoType,
  action: OrnamentInfoActionType
): OrnamentInfoType {
  switch (action.type) {
    case "next":
      return getNextFile(state, action.payload);
    case "prev":
      return getPrevFile(state, action.payload);
    case "first":
      return getFirstFile(state, action.payload);
    case "last":
      return getLastFile(state, action.payload);
    case "random":
      return getRandomOrnamentFile(state, action.payload);
    case "default":
      return getDefaultFile(state, action.payload);
    default:
      throw new Error("不明なActionです");
  }
}

export { ornamentInfoReducer, type OrnamentInfoActionType };
