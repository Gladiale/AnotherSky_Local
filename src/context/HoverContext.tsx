import { createContext, useContext, useState } from "react";

type HoverStateType = {
  card: boolean;
  icon: boolean;
};

type HoverContextType = {
  hoverState: HoverStateType;
  setHoverState: React.Dispatch<React.SetStateAction<HoverStateType>>;
};

const HoverContext = createContext({} as HoverContextType);

const HoverProvider = ({ children }: { children: React.ReactNode }) => {
  const [hoverState, setHoverState] = useState<HoverStateType>({
    card: false,
    icon: false,
  });

  return (
    <HoverContext.Provider value={{ hoverState, setHoverState }}>
      {children}
    </HoverContext.Provider>
  );
};

const useHover = () => {
  return useContext(HoverContext);
};

export { HoverProvider, useHover };
