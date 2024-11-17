import { createContext, useContext, useReducer, useState } from "react";
import { mediaInfoInit, type MediaInfoType } from "./mediaInfo";
import { ActionType, reducerFunc } from "./mediaInfoReducerFunc";

type MediaInfoContextType = {
  mediaState: MediaInfoType;
  mediaDispatch: React.Dispatch<ActionType>;
};

type AnotherCharacterContextType = {
  anotherActive: boolean;
  setAnotherActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const MediaInfoContext = createContext({} as MediaInfoContextType);
const AnotherCharacterContext = createContext({} as AnotherCharacterContextType);

const MediaInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const [anotherActive, setAnotherActive] = useState<boolean>(false);
  const [mediaState, mediaDispatch] = useReducer(reducerFunc, mediaInfoInit);

  return (
    <MediaInfoContext.Provider value={{ mediaState, mediaDispatch }}>
      <AnotherCharacterContext.Provider value={{ anotherActive, setAnotherActive }}>
        {children}
      </AnotherCharacterContext.Provider>
    </MediaInfoContext.Provider>
  );
};

const useMediaInfo = () => {
  return useContext(MediaInfoContext);
};

const useAnotherCharacter = () => {
  return useContext(AnotherCharacterContext);
};

export { MediaInfoProvider, useMediaInfo, useAnotherCharacter };
