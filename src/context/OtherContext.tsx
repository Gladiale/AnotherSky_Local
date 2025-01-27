import { createContext, useContext, useState } from "react";

type DirectionContextType = {
  isNext: boolean;
  setIsNext: React.Dispatch<React.SetStateAction<boolean>>;
};

const DirectionContext = createContext({} as DirectionContextType);

const OtherProvider = ({ children }: { children: React.ReactNode }) => {
  const [isNext, setIsNext] = useState<boolean>(true);

  return (
    <DirectionContext.Provider value={{ isNext, setIsNext }}>
      {children}
    </DirectionContext.Provider>
  );
};

const useDirection = () => {
  return useContext(DirectionContext);
};

export { OtherProvider, useDirection };
