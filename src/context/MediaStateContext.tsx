import { createContext, useContext, useState } from "react";
import type { MediaStateType } from "../types";

const mediaStateInit: MediaStateType = {
  image: {
    deg: 0,
    scale: 1,
    position: { x: 0, y: 0 },
    isEditMode: false,
  },
  effect: {
    deg: 0,
    scale: 1,
    position: { x: 0, y: 0 },
    isEditMode: false,
  },
  video: {
    deg: 0,
    scale: 1,
    position: { x: 0, y: 0 },
    isEditMode: false,
  },
  touchMode: "closed",
};

type MediaStateContextType = {
  mediaState: MediaStateType;
  setMediaState: React.Dispatch<React.SetStateAction<MediaStateType>>;
};

const MediaStateContext = createContext({} as MediaStateContextType);

const MediaStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [mediaState, setMediaState] = useState<MediaStateType>(mediaStateInit);

  return (
    <MediaStateContext.Provider value={{ mediaState, setMediaState }}>
      {children}
    </MediaStateContext.Provider>
  );
};

const useMediaState = () => {
  return useContext(MediaStateContext);
};

export { MediaStateProvider, useMediaState, mediaStateInit };
