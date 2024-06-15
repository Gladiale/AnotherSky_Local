import { createContext, useContext, useReducer } from "react";
import { mediaInfoInit, type MediaInfoType } from "./mediaInfo";
import { ActionType, reducerFunc } from "./mediaInfoReducerFunc";

type ContextType = {
  mediaState: MediaInfoType;
  mediaDispatch: React.Dispatch<ActionType>;
};

const MediaInfoContext = createContext({} as ContextType);

const MediaInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const [mediaState, mediaDispatch] = useReducer(reducerFunc, mediaInfoInit);

  return (
    <MediaInfoContext.Provider value={{ mediaState, mediaDispatch }}>
      {children}
    </MediaInfoContext.Provider>
  );
};

const useMediaInfo = () => {
  return useContext(MediaInfoContext);
};

export { MediaInfoProvider, useMediaInfo };
