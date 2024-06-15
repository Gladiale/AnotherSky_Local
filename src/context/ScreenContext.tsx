import { createContext, useContext, useState } from "react";

type ScreenModeType = "cardMode" | "cgMode";
type MediaSizeType = "contain" | "custom" | "none";

type ScreenContextType = {
  screenMode: ScreenModeType;
  setScreenMode: React.Dispatch<React.SetStateAction<ScreenModeType>>;
};

type MediaSizeContextType = {
  mediaSize: MediaSizeType;
  setMediaSize: React.Dispatch<React.SetStateAction<MediaSizeType>>;
};

const ScreenContext = createContext({} as ScreenContextType);
const MediaSizeContext = createContext({} as MediaSizeContextType);

const ScreenProvider = ({ children }: { children: React.ReactNode }) => {
  const [screenMode, setScreenMode] = useState<ScreenModeType>("cardMode");
  const [mediaSize, setMediaSize] = useState<MediaSizeType>("contain");

  return (
    <ScreenContext.Provider value={{ screenMode, setScreenMode }}>
      <MediaSizeContext.Provider value={{ mediaSize, setMediaSize }}>
        {children}
      </MediaSizeContext.Provider>
    </ScreenContext.Provider>
  );
};

const useScreenMode = () => {
  return useContext(ScreenContext);
};

const useMediaSize = () => {
  return useContext(MediaSizeContext);
};

export { ScreenProvider, useScreenMode, useMediaSize };
