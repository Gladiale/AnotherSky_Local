import { createContext, useContext, useState } from "react";

export type SceneType =
  | "card-stand"
  | "card-cg"
  | "card-video"
  | "card-listImg";

type ContextType = {
  scene: SceneType;
  setScene: React.Dispatch<React.SetStateAction<SceneType>>;
};

const SceneContext = createContext({} as ContextType);

const SceneProvider = ({ children }: { children: React.ReactNode }) => {
  const [scene, setScene] = useState<SceneType>("card-stand");

  return (
    <SceneContext.Provider value={{ scene, setScene }}>
      {children}
    </SceneContext.Provider>
  );
};

const useScene = () => {
  return useContext(SceneContext);
};

export { SceneProvider, useScene };
