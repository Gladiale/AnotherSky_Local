import { getFirstFile } from "../funcs/threeInfo/getFirstFile";
import { getLastFile } from "../funcs/threeInfo/getLastFile";
import { getNextFile } from "../funcs/threeInfo/getNextFile";
import { getPrevFile } from "../funcs/threeInfo/getPrevFile";
import { getRandomThreeFile } from "../funcs/threeInfo/getRandomThreeFile";
import { type ThreeInfoType } from "../threeInit";

type MainActionType = {
  type: "next" | "prev" | "first" | "last";
  payload: keyof ThreeInfoType;
};

type RandomActionType = {
  type: "random";
  payload: keyof ThreeInfoType | "all";
};

type ThreeInfoActionType = MainActionType | RandomActionType;

function threeInfoReducer(
  state: ThreeInfoType,
  action: ThreeInfoActionType
): ThreeInfoType {
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
      return getRandomThreeFile(state, action.payload);
    default:
      throw new Error("不明なActionです");
  }
}

export { threeInfoReducer, type ThreeInfoActionType };
