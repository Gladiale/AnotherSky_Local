import { createContext, useContext, useState } from "react";

export type ImageListType = {
  folder: boolean;
  target: "cg" | "chara";
  random: boolean;
  heightAuto: boolean;
  mode2: boolean;
};

const listStateInit: ImageListType = {
  folder: true,
  target: "cg",
  random: false,
  heightAuto: false,
  mode2: false,
};

type ContextType = {
  listState: ImageListType;
  setListState: React.Dispatch<React.SetStateAction<ImageListType>>;
};

const ImageListContext = createContext({} as ContextType);

const ImageListProvider = ({ children }: { children: React.ReactNode }) => {
  const [listState, setListState] = useState<ImageListType>(listStateInit);

  return (
    <ImageListContext.Provider value={{ listState, setListState }}>
      {children}
    </ImageListContext.Provider>
  );
};

const useImageList = () => {
  return useContext(ImageListContext);
};

export { ImageListProvider, useImageList };
