import { createContext, useContext, useReducer, useState } from "react";
import { getNextFile, getPrevFile } from "../helper/dataObjControl";
import { CharacterDataObj } from "../data/CharacterDataObj";
import { type MediaInfoType } from "./MediaInfoContext/mediaInfo";

type CharacterStateContextType = {
  isCharacter: boolean;
  setIsCharacter: React.Dispatch<React.SetStateAction<boolean>>;
};

type CharacterInfoContextType = {
  characterInfo: CharacterInfoType;
  characterInfoDispatch: React.Dispatch<ActionType>;
};

const CharacterStateContext = createContext({} as CharacterStateContextType);
const CharacterInfoContext = createContext({} as CharacterInfoContextType);

type CharacterInfoType = {
  folder: [number, string];
  file: [number, string];
};

const characterInfoInit: CharacterInfoType = {
  folder: [0, ""],
  file: [0, ""],
};

type CharacterInfoActionType = {
  type: "prev" | "next" | "deleteData";
};

type CharacterInfoSubActionType = {
  type: "init";
  payload: MediaInfoType;
};

type ActionType = CharacterInfoActionType | CharacterInfoSubActionType;

const characterReducer = (
  state: CharacterInfoType,
  action: ActionType
): CharacterInfoType => {
  switch (action.type) {
    case "init":
      return {
        folder: action.payload.folder.character,
        file: action.payload.file.characterFile,
      };
    case "deleteData":
      return {
        folder: [0, ""],
        file: [0, ""],
      };
    case "next":
      const nextFile = getNextFile(
        CharacterDataObj,
        state.folder[1],
        state.file[0]
      );
      return { ...state, file: nextFile };
    case "prev":
      const prevFile = getPrevFile(
        CharacterDataObj,
        state.folder[1],
        state.file[0]
      );
      return { ...state, file: prevFile };
    default:
      throw new Error("不明なactionです");
  }
};

const CardCharacterProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCharacter, setIsCharacter] = useState<boolean>(false);
  const [characterInfo, characterInfoDispatch] = useReducer(
    characterReducer,
    characterInfoInit
  );

  return (
    <CharacterStateContext.Provider value={{ isCharacter, setIsCharacter }}>
      <CharacterInfoContext.Provider
        value={{ characterInfo, characterInfoDispatch }}
      >
        {children}
      </CharacterInfoContext.Provider>
    </CharacterStateContext.Provider>
  );
};

const useCardCharacterState = () => {
  return useContext(CharacterStateContext);
};
const useCardCharacterInfo = () => {
  return useContext(CharacterInfoContext);
};

export { CardCharacterProvider, useCardCharacterState, useCardCharacterInfo };
