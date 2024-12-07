import { createContext, useContext, useReducer, useState } from "react";
import { mediaInfoInit, type MediaInfoType, type MediaActiveType } from "./mediaInfo";
import { ActionType, reducerFunc } from "./mediaInfoReducerFunc";

type MediaInfoContextType = {
  mediaInfo: MediaInfoType;
  mediaInfoDispatch: React.Dispatch<ActionType>;
};

type MediaActiveContextType = {
  mediaActive: MediaActiveType;
  setMediaActive: React.Dispatch<React.SetStateAction<MediaActiveType>>;
};

const MediaInfoContext = createContext({} as MediaInfoContextType);
const MediaActiveContext = createContext({} as MediaActiveContextType);

const MediaInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const [mediaActive, setMediaActive] = useState<MediaActiveType>({
    anotherCharacter: false,
    doublePage: false,
  });
  const [mediaInfo, mediaInfoDispatch] = useReducer(reducerFunc, mediaInfoInit);

  return (
    <MediaInfoContext.Provider value={{ mediaInfo, mediaInfoDispatch }}>
      <MediaActiveContext.Provider value={{ mediaActive, setMediaActive }}>
        {children}
      </MediaActiveContext.Provider>
    </MediaInfoContext.Provider>
  );
};

const useMediaInfo = () => {
  return useContext(MediaInfoContext);
};

const useMediaActive = () => {
  return useContext(MediaActiveContext);
};

export { MediaInfoProvider, useMediaInfo, useMediaActive };
