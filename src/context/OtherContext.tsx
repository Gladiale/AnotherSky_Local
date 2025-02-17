import { createContext, useContext, useState } from "react";

type DirectionContextType = {
  isNext: boolean;
  setIsNext: React.Dispatch<React.SetStateAction<boolean>>;
};

type ContentWidthContextType = {
  contentWidth: {
    main: number;
    chara: number;
  };
  setContentWidth: React.Dispatch<
    React.SetStateAction<{
      main: number;
      chara: number;
    }>
  >;
};

const DirectionContext = createContext({} as DirectionContextType);
const ContentWidthContext = createContext({} as ContentWidthContextType);

const OtherProvider = ({ children }: { children: React.ReactNode }) => {
  const [isNext, setIsNext] = useState<boolean>(true);
  const [contentWidth, setContentWidth] = useState<{ main: number; chara: number }>({
    main: 0,
    chara: 0,
  });

  return (
    <DirectionContext.Provider value={{ isNext, setIsNext }}>
      <ContentWidthContext.Provider value={{ contentWidth, setContentWidth }}>
        {children}
      </ContentWidthContext.Provider>
    </DirectionContext.Provider>
  );
};

const useDirection = () => {
  return useContext(DirectionContext);
};

const useContentWidth = () => {
  return useContext(ContentWidthContext);
};

export { OtherProvider, useDirection, useContentWidth };
