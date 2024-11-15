import { createContext, useContext } from "react";
import { useImageControl } from "../hooks/useImageControl";

type EffectControlContextType = {
  isEditMode: boolean;
  imageDeg: number;
  imageScale: number;
  imagePosition: { x: number; y: number };
  triggerEditMode: (e: React.MouseEvent<HTMLDivElement>, reset?: boolean) => void;
  changeImageDeg: (e: React.MouseEvent<HTMLDivElement>) => void;
  changeImageScale: (e: React.WheelEvent) => void;
  moveImageDirect: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const EffectControlContext = createContext({} as EffectControlContextType);

const EffectControlProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    isEditMode,
    imageDeg,
    imageScale,
    imagePosition,
    triggerEditMode,
    changeImageDeg,
    changeImageScale,
    moveImageDirect,
  } = useImageControl({ initialScale: 1, isEffect: true });

  return (
    <EffectControlContext.Provider
      value={{
        isEditMode,
        imageDeg,
        imageScale,
        imagePosition,
        triggerEditMode,
        changeImageDeg,
        changeImageScale,
        moveImageDirect,
      }}
    >
      {children}
    </EffectControlContext.Provider>
  );
};

const useEffectControl = () => {
  return useContext(EffectControlContext);
};

export { EffectControlProvider, useEffectControl };
