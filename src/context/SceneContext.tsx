import { createContext, useContext, useState } from "react";

export type SceneType =
  | "card-stand"
  | "card-cg"
  | "card-video"
  | "card-listImg"
  | "directoryMode";

export type DirectoryTargetType = "cg" | "character" | "video";

type SceneContextType = {
  scene: SceneType;
  setScene: React.Dispatch<React.SetStateAction<SceneType>>;
};

type DirectoryContextType = {
  directoryTarget: DirectoryTargetType;
  setDirectoryTarget: React.Dispatch<React.SetStateAction<DirectoryTargetType>>;
};

const SceneContext = createContext({} as SceneContextType);
const DirectoryTargetContext = createContext({} as DirectoryContextType);

const SceneProvider = ({ children }: { children: React.ReactNode }) => {
  const [scene, setScene] = useState<SceneType>("card-stand");
  const [directoryTarget, setDirectoryTarget] =
    useState<DirectoryTargetType>("cg");

  return (
    <SceneContext.Provider value={{ scene, setScene }}>
      <DirectoryTargetContext.Provider
        value={{ directoryTarget, setDirectoryTarget }}
      >
        {children}
      </DirectoryTargetContext.Provider>
    </SceneContext.Provider>
  );
};

const useScene = () => {
  return useContext(SceneContext);
};

const useDirectoryTarget = () => {
  return useContext(DirectoryTargetContext);
};

export { SceneProvider, useScene, useDirectoryTarget };
