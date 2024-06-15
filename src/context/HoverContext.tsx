import { createContext, useContext, useState } from "react";

type Hover = {
  cardHover: boolean;
  iconHover: boolean;
};

type ContextType = {
  isHovered: Hover;
  setIsHovered: React.Dispatch<React.SetStateAction<Hover>>;
};

const HoverContext = createContext({} as ContextType);

const HoverProvider = ({ children }: { children: React.ReactNode }) => {
  const [isHovered, setIsHovered] = useState<Hover>({
    cardHover: false,
    iconHover: false,
  });

  return (
    <HoverContext.Provider value={{ isHovered, setIsHovered }}>
      {children}
    </HoverContext.Provider>
  );
};

const useHover = () => {
  return useContext(HoverContext);
};

export { HoverProvider, useHover };
