import { createContext, useContext, useState } from "react";

export type ImageListType = {
  folder: boolean;
  cg: boolean;
  stand: boolean;
  random: boolean;
};

export type ImageListSubType = {
  heightAuto: boolean;
  mode2: boolean;
};

const listStateInit = {
  folder: true,
  cg: true,
  stand: false,
  random: false,
};

const listSubStateInit = {
  heightAuto: false,
  mode2: false,
};

type ContextType = {
  listState: ImageListType;
  setListState: React.Dispatch<React.SetStateAction<ImageListType>>;
  listSubState: ImageListSubType;
  setListSubState: React.Dispatch<React.SetStateAction<ImageListSubType>>;
};

const ImageListContext = createContext({} as ContextType);

const ImageListProvider = ({ children }: { children: React.ReactNode }) => {
  const [listState, setListState] = useState<ImageListType>(listStateInit);
  const [listSubState, setListSubState] =
    useState<ImageListSubType>(listSubStateInit);

  return (
    <ImageListContext.Provider
      value={{ listState, setListState, listSubState, setListSubState }}
    >
      {children}
    </ImageListContext.Provider>
  );
};

const useImageList = () => {
  return useContext(ImageListContext);
};

export { ImageListProvider, useImageList };
